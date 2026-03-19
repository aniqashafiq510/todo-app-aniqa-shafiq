"use client"

import { signOut } from "@/lib/auth-client"





    
export const handleLogOut = async () => {
    
        await signOut()
        window.location.replace("/login")
        
        
    }
  
