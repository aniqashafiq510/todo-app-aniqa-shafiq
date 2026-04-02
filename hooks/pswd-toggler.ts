'use client'

import { useState } from "react"

export function usePasswordToggle(){
    const [showPassword,setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const toggle=()=> {
        setShowPassword((prev)=> !prev)
    }
    const confirmToggle=()=> {
        setShowConfirmPassword((prev) => !prev)
    }

    return{
        showPassword,
        toggle,
        showConfirmPassword, confirmToggle
    }
}