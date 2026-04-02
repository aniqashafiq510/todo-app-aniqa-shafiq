"use client"

import useTasks from "@/hooks/useTasks";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import type {UpdateTaskProps, TaskFormValues} from '@/types/types'


export function UpdateTask({ taskId }: UpdateTaskProps) {
  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null)
  const { fetchSingleTask, updateTask,loading } = useTasks();
  const { register, handleSubmit, setValue, formState: { isSubmitting } } = useForm<TaskFormValues>({
    defaultValues: { title: "", description: "", dueDate: "" }
  })

  // Prefill form with current task data
  useEffect(() => {
    const loadTask = async () => {
      const task = await fetchSingleTask(taskId);
      if (task) {
        setValue("title", task.title);
        setValue("description", task.description || "");
        setValue("dueDate", task.dueDate ? task.dueDate.split("T")[0] : "");
      }
    };
    loadTask();
  }, [taskId, setValue,fetchSingleTask]);

   if(loading) return <p className="mt-20 text-center text-2xl animate-pulse">Loading....</p>;

  const onSubmit = async (data: TaskFormValues) => {
    setServerError(null);
    try {
      await updateTask(taskId, data);
      router.replace("/dashboard"); // redirect after update
    } catch (err: unknown) {
      setServerError( "Failed to update task");
      console.log(err)
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-gray-200 rounded-md p-5 mt-10">
          <div className="flex justify-center">
            <h1 className="font-bold text-3xl">Edit Task</h1>
          </div>
          
          <div className="mt-5 p-3 w-xl">
            <div className="flex flex-col mb-3">
              <label className="font-semibold text-xl mb-1">Task Title</label>
              <input {...register("title")} type="text" className="outline-none border border-gray-400 p-2 rounded-md shadow-md shadow-gray-500" />
            </div>
            <div className="flex flex-col mb-3">
              <label className="font-semibold text-xl mb-1">Description</label>
              <input {...register("description")} type="text" className="outline-none border border-gray-400 p-2 rounded-md shadow-md shadow-gray-500" />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold text-xl mb-1">Due Date</label>
              <input {...register("dueDate")} type="date" className="outline-none border border-gray-400 p-2 rounded-md shadow-md shadow-gray-500" />
            </div>
            
          </div>
          {serverError && <p className="text-red-500">{serverError}</p>}
          <div className="flex justify-center space-x-2 mt-4">
            <button onClick={() => router.back()} type="button" className="bg-gray-400 hover:bg-gray-500 rounded-4xl p-3 font-semibold">Cancel</button>
            <button type="submit" disabled={isSubmitting} className={`bg-blue-400 hover:bg-blue-500 rounded-4xl p-3 font-semibold${isSubmitting ? "cursor-not-allowed bg-blue-300" : ""}`}>Update Task</button>
          </div>
        </div>
      </form>
    </div>
  )
}