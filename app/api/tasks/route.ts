import { auth } from "@/lib/auth/auth";
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

        // show task limit for free users
         const user = await prisma.user.findUnique({
              where: { id: session.user.id },
              select: {
                id: true,
                subscriptionPlan: true,
                subscriptionStatus: true,
              },
            });

            if (!user) {
              return NextResponse.json({ error: "User not found" }, { status: 404 });
            }

            const isPro =
              user.subscriptionPlan === "pro" &&
              user.subscriptionStatus === "active";

            const taskCount = await prisma.task.count({
              where: { userId: user.id },
            });

            if (!isPro && taskCount >= 5) {
              return NextResponse.json(
                { error: "Free plan limit reached (10 tasks)" },
                { status: 403 }
              );
            }

            // add Task
        const body = await req.json()
        const {title, description, dueDate} = body 

       const task = await prisma.task.create({
            data : {
                title,
                description,
                dueDate: dueDate ? new Date(dueDate) : null ,
                userId : user.id
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


