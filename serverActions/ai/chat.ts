"use server";

import { streamText } from "ai";
import { model } from "@/lib/ai/gemini";
import prisma from "../../lib/prisma";

export async function chatWithAI(userId: string, prompt: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) throw new Error("User not found");

  const tasks = await prisma.task.findMany({
    where: {
      userId,
    },
  });

  const result = streamText({
    model,
    prompt: `
Tasks:
${JSON.stringify(tasks)}

Prompt:
${prompt}
`,
  });

  return result.textStream;
}