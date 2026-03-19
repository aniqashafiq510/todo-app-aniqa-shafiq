"use client"


import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { TasksTable } from "@/components/dashboard/tasks-table";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";




export default function  Dashboardpage(){
  const router = useRouter()
  const {data : session, isPending} = useSession()

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login"); // ✅ safe inside useEffect
    }
  }, [session, isPending, router]);

   return(

    
      <div className="flex mt-5  w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-lvh ">
        <DashboardHeader/>
        <TasksTable/>
      </div>
    </div>
  
  )
    
}