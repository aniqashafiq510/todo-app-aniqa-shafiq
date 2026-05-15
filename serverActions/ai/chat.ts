"use server";

import { auth } from "@/lib/auth/auth"; // NextAuth / Auth.js session helper
import  prisma  from "@/lib/prisma";
import { streamText } from "ai";
import { model } from "@/lib/ai/gemini";
import { headers } from "next/headers";


export async function chatWithAI(prompt: string) {
  

  if (!prompt.trim()) {
    throw new Error("Prompt is required");
  }

// authetication
  const session = await auth.api.getSession({
            headers : await headers()
        })

  if(!session || !session.user.id){
              throw new Error("Unauthorized");
          }

const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
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

 
  // ai integration

  const context = `
You are an AI productivity assistant.

Current User:
- Name: ${user.name ?? "Unknown"}
- Email: ${user.email}

User Tasks:
${JSON.stringify(tasks,null,2)}

User Request:
${prompt}

Instructions:
- Help the user organize work
- Suggest priorities
- Recommend productivity improvements
- Never mention internal database structure
`;


   // Request the stream from the model
  const result = streamText({
    model,
    prompt: context,
  });

  
  return result.textStream;

} 