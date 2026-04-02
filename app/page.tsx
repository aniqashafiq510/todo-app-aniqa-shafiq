"use client"
import { handleLogOut } from "@/lib/logout"
import { Button } from "@/components/ui/button"
import { useSession } from "@/lib/auth/auth-client"
import Link from "next/link"
import { useState } from "react"




export default function Home() {
  const {data: session, isPending} = useSession()
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
  

  if (isPending) return <p className="mt-20 text-center text-2xl animate-pulse">Loading....</p>;
  return(
    <div className="flex justify-evenly mt-5">
      <div>
        <h1 className="font-bold text-3xl">TO-DO-APP</h1>
      </div>
      <div >
        {user ? (
          <div className="space-x-3">
             <Link href="/dashboard">Dashboard</Link>
        <Button disabled={loggingOut} className={`hover:bg-gray-600${
                    loggingOut ? "bg-gray-600 cursor-not-allowed"
                    : ""
                }`}
                 onClick={Logout}>
                    Log Out
                </Button>
          </div>
        ) : (
          <div className="space-x-3">
            <Button> <Link href="/register">Sign Up</Link></Button>
        <Button> <Link href="/login"> Log In </Link></Button>
          </div>
        )}
      </div>
    </div>
  )
}
