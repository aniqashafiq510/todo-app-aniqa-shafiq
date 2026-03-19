import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


// addTask
export const POST= async (req : Request) => {
    try {
        const session = await auth.api.getSession({
            headers : req.headers
        })
        if(!session || !session.user.id){
            return NextResponse.json({
                error : "Unauthorized",
            }, {status : 401})
        }
        const body = await req.json()
        const {title, description, dueDate} = body 

        const task = await prisma.task.create({
            data : {
                title,
                description,
                dueDate: dueDate ? new Date(dueDate) : null ,
                userId : session.user.id
            }
        })
        return NextResponse.json(task)

        
    } catch (error) {
        console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });

    }
}

// fetchTasks of the logged user 
export const GET = async (req: Request) => {
  try {

    const session = await auth.api.getSession({
      headers: req.headers
    })

    const tasks = await prisma.task.findMany({
      where:{
        userId: session?.user.id
      },
      orderBy:{
        createdAt:"desc"
      }
    })

    return NextResponse.json(tasks)

  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    )
  }
}


