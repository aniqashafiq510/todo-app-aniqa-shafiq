'use client'

import { useState } from "react"

export function PasswordToggle(){
    const [showPassword,setShowPassword] = useState(false)
    const toggle=()=> {
        setShowPassword((prev)=> !prev)
    }

    return{
        showPassword,
        toggle
    }
}