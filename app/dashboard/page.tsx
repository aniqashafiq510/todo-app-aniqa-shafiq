"use client"


import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import SearchBar from "@/components/tasks/SearchBar";
import {SubscribeButton,ManageSubscriptionButton} from "@/components/dashboard/SubscribeButton";
import { TaskLimit } from "@/components/dashboard/task-limit";
import { TasksTable } from "@/components/dashboard/tasks-table";
import { useSubscriptionInfo } from "@/hooks/useSubscriptionInfo";
import { useSession } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import { useEffect} from "react";
import { useTasksManage } from "@/hooks/useTaskManage";

import Pagination from "@/components/tasks/Pagination";
import Link from "next/link";








export default function  Dashboardpage(){
  const router = useRouter()
  const {data : session, isPending} = useSession()
  const { userSubscription} = useSubscriptionInfo()
  const userId = session?.user?.id
  
  const isSubscribed = userSubscription?.subscriptionStatus === "active";
  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login"); // ✅ safe inside useEffect
    }
  }, [session, isPending, router]);

  // task mangement
  const {filters,
    setFilters,
    page,
    setPage,
    limit,
    searchedTasks,sortField,
    setSortField,
    sortOrder,
    setSortOrder,} = useTasksManage(userId)

  return(

    <div>
       {userSubscription && (
        isSubscribed ? (
        <div className="flex justify-end mt-3 mr-3 -mb-5">
          <ManageSubscriptionButton userId={userSubscription.id}/>
        </div>
       ) :(
        <div className="flex justify-end mt-3 mr-3 -mb-5">
          <SubscribeButton userId={userSubscription?.id}/>
        </div>
       ))}
      
      <div>
        {/* task limit message */}
        <div>
          <TaskLimit/>
        </div>

        <div className="flex w-full items-center justify-center p-6 md:p-10">
        {/* tasks table */}
      <div className="w-full max-w-lvh ">
        <DashboardHeader/>
        
        <SearchBar filters={filters} setFilters={setFilters} />

        <TasksTable externalTasks={searchedTasks}
        sortField={sortField}
        setSortField={setSortField}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder} />

        <Pagination
            page={page}
            setPage={setPage}
            hasNextPage={searchedTasks?.length === limit}
          />
        
        
      </div>
    </div>
      </div>

      <Link href="/dashboard/ai" className="fixed bottom-6 right-6 z-50 flex items-center gap-2
      rounded-full bg-black px-5 py-3 text-sm font-medium text-white shadow-lg transition
      hover:scale-105 hover:opacity-90 ">
        AI Assistant
      </Link>
    </div>
  
  )
    
}