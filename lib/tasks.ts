
import type { Task, TaskFormValues } from "@/types/types";



export const getTasks=async  () => {
    const res = await fetch("/api/tasks");
    if(!res.ok) throw new Error("Failed to fetch tasks")
    return res.json()
} 

export const toggleStatusApi  = async(task : Task) => {
    const res = await fetch(`/api/tasks/${task.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                completed: !task.completed
            })
        });
    if(!res.ok) throw new Error("Failed to update task")
      return  res.json()
}

export const delApi = async (taskId : string) => {
    const res = await fetch(`/api/tasks/${taskId}`, {
    method: "DELETE"
  })
  if(!res.ok) throw new Error("Failed to update task")
      return res.json()

}

//   get single task
export const getSingleTaskApi = async (taskId: string) => {
    const res = await fetch(`/api/tasks/${taskId}`);
  if (!res.ok) throw new Error("Failed to fetch task");
  return res.json();
}
// update task
export const updateTaskApi =async (taskId: string, data : Partial<Task>) => {
     const res = await fetch(`/api/tasks/${taskId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to update task");
  }

  return res.json();
}

export const addTaskApi =  async (data : TaskFormValues) => {
  const res = await fetch("/api/tasks", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
    })

    if (!res.ok) throw new Error("Failed to add task!")
      return res.json()
   
}

