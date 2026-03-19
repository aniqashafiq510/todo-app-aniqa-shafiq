"use client"

import useTasks from "@/hooks/useTasks"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import type {TaskFormValues} from '@/types/types'






export function AddTask(){
    const router = useRouter()
    const {error, addTask} = useTasks()
    // react hook form
    const {register, handleSubmit, formState : { isSubmitting}} = useForm({
        defaultValues : {
            title : "", description: "", dueDate : ""
        }
    })

    // submithandler
    const onSubmit =async (data : TaskFormValues) => {
        try {
      await addTask(data);

      toast.success("Task has added!", { position: "top-center" });
      router.push("/dashboard");
    } catch (err) {
      console.log(err)
    }
    }
    return(
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="bg-gray-200 rounded-md p-5 mt-10">
                {/* heading */}
            <div className="flex justify-center">
                <h1 className="font-bold text-3xl">Add New Task</h1>
            </div>
            {/* input fields */}
            <div className="mt-5 p-3 w-xl">
                <div className="flex flex-col mb-3">
                    <label className="font-semibold text-xl mb-1 ">Task Title</label>
                <input {...register("title")} required type="text" className="outline-none border border-gray-400 p-2 rounded-md
                shadow-md shadow-gray-500"
                 placeholder="e.g. finish project report" />
                 
                </div>
                <div className="flex flex-col mb-3">
                    <label className="font-semibold text-xl mb-1 ">Description</label>
                <input {...register("description")} type="text" className="outline-none border border-gray-400 p-2 rounded-md
                shadow-md shadow-gray-500"
                 placeholder="provide details.." />
                 
                </div>
                <div className="flex flex-col">
                    <label className="font-semibold text-xl mb-1 ">Due Date</label>
                <input {...register("dueDate")} required type="date" className="outline-none border border-gray-400 p-2 rounded-md
                shadow-md shadow-gray-500 "
                 placeholder="e.g. finish project report" />
                
                </div>
                {error && <p className="text-red-500">{error}</p> }
            </div>
            {/* buttons */}
            <div className="flex justify-center space-x-2 mt-4 ">
                <button onClick={()=> router.back()} type="button" className="bg-gray-400 hover:bg-gray-500 rounded-4xl p-3 font-semibold
                "> Cancel</button>
                <button type="submit" disabled={isSubmitting}
                className={`px-4 py-2 rounded-4xl text-white font-medium transition
                    ${
                    isSubmitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-700"
                    }`}> Save Task </button>
            </div>

            </div>
            </form>
        </div>
    )
}