"use server"

import prisma from "../../lib/prisma" 

export async function SearchTasks(userId : string, query : string){
    const user = await prisma.user.findUnique({where: {id : userId}})

    if (!user) throw new Error("User not found");
    const searchedTasks  = await prisma.task.findMany(
        {where : {
            userId : userId,
            OR: [
                { title: { contains: query, mode: "insensitive" } },
                { description: { contains: query, mode: "insensitive" } }
            ]
        },
    orderBy: {
      createdAt: "desc",
    },
    }
    )

    return searchedTasks

    
}
