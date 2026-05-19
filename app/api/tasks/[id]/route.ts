import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"


export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const task = await prisma.task.findUnique({
      where: { id },
    })

    if (!task) return NextResponse.json({ error: "Task not found" }, { status: 404 })

    return NextResponse.json(task)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}

type PatchBody = {
  title?: string
  description?: string
  dueDate?: Date | null
  completed?: boolean
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body: PatchBody = await req.json()

  // Only include fields that are defined
  const data: PatchBody = {}
  if (body.title !== undefined) data.title = body.title
  if (body.description !== undefined) data.description = body.description
  if (body.dueDate !== undefined) data.dueDate = body.dueDate ? new Date(body.dueDate) : null
  if (body.completed !== undefined) data.completed = body.completed

  try {
    const task = await prisma.task.update({
      where: { id },
      data
    })

    

    return NextResponse.json(task)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 })
  }
}


// Del api
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> } // ⚠️ important
) {
  try {
    const { id } = await params // ✅ await required

    await prisma.task.delete({
      where: {
        id: id
      }
    })

    return NextResponse.json({ message: "Task deleted successfully" })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 }
    )
  }
}