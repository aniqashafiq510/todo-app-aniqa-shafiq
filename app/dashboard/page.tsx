"use client"


import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { TasksTable } from "@/components/dashboard/tasks-table";
import { useState } from "react";

export default function  Dashboardpage(){
  const [tasks,setTasks] = useState(
        [{id:1, task:"Grocery Shopping", description:"Buy milk,eggs,bread", date:"2024-7-20"},
        {id:2, task:"Project Proposal", description:"Draft presentation for client", date:"2024-7-25"},
        {id:3, task:"Gym Workout", description:"Full body routine", date:"2024-7-19"},
        ]
    )
    return(
    <div className="flex  w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-lvh ">
        <DashboardHeader/>
        <TasksTable tasks={tasks}/>
      </div>
    </div>
  )
    
}