"use server"

import prisma from "../../lib/prisma" 
import type { Filters } from "../../types/types";

export async function SearchTasks(userId : string, filters: Filters){
    const user = await prisma.user.findUnique({where: {id : userId}})
    const { query, status, dateType, date } = filters;

    if (!user) throw new Error("User not found");
    
    return await prisma.task.findMany({
    where: {
      userId,

      ...(query && {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
        ],
      }),

      ...(status !== "all" && {
            completed: status === "completed",
          }),

      ...(date && dateType && {
        [dateType]: {
          gte: new Date(date),
        },
      }),
    },
  });
}

// gte ... greater than or equal to
