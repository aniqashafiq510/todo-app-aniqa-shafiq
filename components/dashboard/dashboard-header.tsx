"use client"
import { useSession} from "@/lib/auth/auth-client";
import { handleLogOut } from "../../lib/logout";
import { Button } from "../ui/button";
import { useState } from "react";


export function DashboardHeader(){
    const {data : session} = useSession()
    const user = session?.user
    const [loggingOut, setLoggingOut] = useState(false)

    const Logout = async() => {
        setLoggingOut(true)
        try {
            await handleLogOut()
            setLoggingOut(false)
            
        } catch (error) {
            console.log(error)
            setLoggingOut(false)
        }
    }
    
    return(
        <div>
            <header className="flex justify-around bg-gray-200 rounded-md p-2 font-bold">
                <h2 className="text-xl">TaskFlow</h2>
                <h1 className="text-xl" >My Tasks</h1>
                <div className="flex justify-between space-x-2">
                    <h1 className="text-sm bg-gray-300 hover:underline p-2 rounded-full"> {user?.name}</h1>
                <Button disabled={loggingOut} className={`hover:bg-gray-600${
                    loggingOut ? "bg-gray-600 cursor-not-allowed"
                    : ""
                }`}
                 onClick={Logout}>
                    Log Out
                </Button>
                </div>
            </header>
        </div>
    )
}