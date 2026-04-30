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
    </div>
  
  )
    
}