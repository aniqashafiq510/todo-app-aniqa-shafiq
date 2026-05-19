"use server";

import { auth } from "@/lib/auth/auth";
import prisma from "@/lib/prisma";
import { streamText } from "ai";
import { model } from "@/lib/ai/gemini";
import { headers } from "next/headers";
import type { AIChat } from "@/types/types";
import {aiRateLimit} from "@/lib/ai/ratelimit"
import {getSubscription} from "@/lib/ai/subscription"
import {saveMessage, getTodayUsage} from "@/lib/ai/aiUsage"

  

export async function chatWithAI(messages: AIChat[]) 
{

  try {

    if (!messages.length) {
    throw new Error("Messages are required");
  }

  // AUTHENTICATION
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user.id) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id

  // rate limiting
  const { success } = await aiRateLimit.limit(userId);
  if (!success) {
    throw new Error(
      "Too many requests. Try again later."
    );
  }

  // subscription
  const sub = await getSubscription(userId);
  if (!sub.plan) {
    throw new Error( "Subscription not active");
  }
 
  // DAILY LIMIT CHECK (FREE = 20/day)
  const usage = await getTodayUsage(userId);
  if (
    sub.limit !== Infinity &&
    usage >= sub.limit
  ) {
    throw new Error(
      `Free plan limit reached. Upgrade to PRO for unlimited AI access or try again tomorrow.`
    );
  }

  // save user msg 

  const lastUserMessage = [...messages]
  .reverse()
  .find((m) => m.role === "user");

  if (lastUserMessage) {
          await saveMessage(
        userId,
        "user",
        lastUserMessage.content
      );
  }
      
  // USER
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },

    select: {
      id: true,
      email: true,
      name: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // TASKS
  const tasks = await prisma.task.findMany({
    where: {
      userId: user.id,
    },

    orderBy: {
      createdAt: "desc",
    },

    select: {
      id: true,
      title: true,
      description: true,
      completed: true,
      dueDate: true,
    },
  });

  // SYSTEM PROMPT
  const systemPrompt = `
You are an AI productivity assistant.

Current User:
- Name: ${user.name ?? "Unknown"}
- Email: ${user.email}

User Tasks:
${JSON.stringify(tasks, null, 2)}

Current time: ${new Date().toISOString()}

Subscription Plan:
${sub.plan}


Instructions:
- Help the user organize work
- Suggest priorities
- Recommend productivity improvements
- Never mention internal database structure
`;

  // AI STREAM
  const result = streamText({
  model,

  system: systemPrompt,

  messages,

  async onFinish(event) {

    const finalText =
      event.text;

    await saveMessage(
      userId,
      "assistant",
      finalText
    );
  },
});

  return result.textStream;
    
  } 
  catch (error) {

  console.error(
    "AI CHAT ERROR:",
    error
  );

  // Forward original error message
  if (error instanceof Error) {
    throw new Error(error.message);
  }

  throw new Error(
    "AI service unavailable"
  );
}
}