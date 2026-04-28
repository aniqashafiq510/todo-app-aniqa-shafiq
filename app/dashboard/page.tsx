"use client"


import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import SearchBar from "@/components/dashboard/searchBar";
import {SubscribeButton,ManageSubscriptionButton} from "@/components/dashboard/SubscribeButton";
import { TaskLimit } from "@/components/dashboard/task-limit";
import { TasksTable } from "@/components/dashboard/tasks-table";
import { useSubscriptionInfo } from "@/hooks/useSubscriptionInfo";
import { useSession } from "@/lib/auth/auth-client";
import { SearchTasks } from "@/serverActions/tasks/searchTasks";
import { useRouter } from "next/navigation";
import { useEffect,useState } from "react";
import type { Task } from "@/types/types";





export default function  Dashboardpage(){
  const router = useRouter()
  const {data : session, isPending} = useSession()
  const { userSubscription} = useSubscriptionInfo()
  
  const isSubscribed = userSubscription?.subscriptionStatus === "active";
  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login"); // ✅ safe inside useEffect
    }
  }, [session, isPending, router]);

  // searching
  const [query, setQuery] = useState("");
  const [searchedTasks, setSearchedTasks] = useState<Task[] | null>(null);;
  const userId = session?.user?.id

  // debounce
  useEffect(() => {
  if (!userId) return;

  const timer = setTimeout(async () => {

    // if search is empty → reset to API mode
    if (!query.trim()) {
      setSearchedTasks(null);
      return;
    }

    const data = await SearchTasks(userId, query);

    setSearchedTasks(data);

  }, 500);

  return () => clearTimeout(timer);
}, [query, userId]);

   return(

    <div>
       {userSubscription && (
        isSubscribed ? (
        <div className="flex justify-end m-5">
          <ManageSubscriptionButton userId={userSubscription.id}/>
        </div>
       ) :(
        <div className="flex justify-end m-5">
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
        
        <SearchBar query={query} setQuery={setQuery} />

        <TasksTable externalTasks={searchedTasks} />
        
        
      </div>
    </div>
      </div>
    </div>
  
  )
    
}