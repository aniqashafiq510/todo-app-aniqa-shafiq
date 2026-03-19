"use client"

import { useState } from "react"

export function useDeleteToggler(){
    const [showDelete,setShowDelete] = useState(false)
    const deltoggle=()=> {
        setShowDelete((prev)=> !prev)
    }
    return{
        showDelete, deltoggle
    }
}