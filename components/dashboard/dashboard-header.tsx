"use client"
import { useSession, signOut } from "@/lib/auth-client";

import Link from "next/link";
import { useRouter } from "next/navigation";



export function DashboardHeader(){
    const {data : session} = useSession()
    const user = session?.user
    const router = useRouter()

    const handdleLogout = async () => {
        await signOut()
        router.push("/login")
    }
    return(
        <div>
            <header className="flex justify-around bg-gray-200 rounded-md p-2 font-bold">
                <h2 className="text-xl">TaskFlow</h2>
                <h1 className="text-xl" >My Tasks</h1>
                <div className="flex justify-between space-x-2">
                    <h1 className="text-sm bg-gray-300 hover:underline p-1 rounded-full"> {user?.name}</h1>
                <button
                onClick={handdleLogout}
                className="bg-orange-300 hover:bg-orange-400 p-1 rounded-sm">
                    Log Out
                </button>
                </div>
            </header>
        </div>
    )
}