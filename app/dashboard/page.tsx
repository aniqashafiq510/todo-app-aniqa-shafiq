"use client"


import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { TasksTable } from "@/components/dashboard/tasks-table";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function  Dashboardpage(){
  
  const router = useRouter()
  const { data : session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session?.user){
      router.push("/login")
    }
  }, [isPending, session, router]);
  const [tasks,setTasks] = useState(
        [{id:1, task:"Grocery Shopping", description:"Buy milk,eggs,bread", date:"2024-7-20"},
        {id:2, task:"Project Proposal", description:"Draft presentation for client", date:"2024-7-25"},
        {id:3, task:"Gym Workout", description:"Full body routine", date:"2024-7-19"},
        ]
    )

  if (isPending)
    return <p className="text-center mt-8">Loading...</p>; 
  if (!session?.user)
    return <p className="text-center mt-8">Redirecting...</p>; 


  
    return(
    <div className="flex  w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-lvh ">
        <DashboardHeader/>
        <TasksTable tasks={tasks}/>
      </div>
    </div>
  )
    
}