import prisma from "@/lib/prisma";

export async function getTodayUsage(userId: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return await prisma.aIMessage.count({
    where: {
      userId,
      role: "user",
      createdAt: {
        gte: today,
      },
    },
  });
}

export async function saveMessage(
  userId: string,
  role: "user" | "assistant",
  content: string
) {
  await prisma.aIMessage.create({
    data: {
      userId,
      role,
      content,
    },
  });
}

