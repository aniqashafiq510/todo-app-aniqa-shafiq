"use client"

import { UpdateTask } from "@/components/dashboard/edit-task-dialog";
import { useParams } from "next/navigation";


export default function Page(){
    const params = useParams()
    const taskIdRaw = params?.id;

  // Normalize it to a string
  const taskId = Array.isArray(taskIdRaw) ? taskIdRaw[0] : taskIdRaw;
    if (!taskId) return null

    return(
        <div className=" w-full ">
            <div className=" flex justify-center items-center mt-10">
                <UpdateTask taskId={taskId}/>
            </div>
            
        </div>
    )
}