"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth/auth";
import prisma from "@/lib/prisma";

export async function getChatHistory(limit:number, cursor?: string) {

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;

  const messages = await prisma.aIMessage.findMany({
    where: {
      userId,
    },

    orderBy: {
      createdAt: "desc",
    },

    take: limit + 1,

    ...(cursor && {
      cursor: {
        id: cursor,
      },
      skip: 1,
    }),
  });


const hasMore = messages.length > limit;

const realMessages = hasMore
  ? messages.slice(0, limit)
  : messages;

const nextCursor = hasMore
  ? realMessages[realMessages.length - 1].id
  : null;

  return {
    messages: realMessages.reverse(), // oldest → newest
    nextCursor
  };
}