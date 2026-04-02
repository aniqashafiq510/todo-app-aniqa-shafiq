"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { usePasswordToggle } from "@/hooks/pswd-toggler"
import { Eye, EyeClosed } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import {zodResolver} from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form"
import { signupSchema, SignupFormValues } from "@/lib/zodSchemas/signup"
import { signUpUser } from "@/lib/auth/authService"
import { toast } from "sonner"


export function SignupForm() {
  const {toggle,showPassword, showConfirmPassword, confirmToggle} = usePasswordToggle()
   const router = useRouter(); 
   const [serverError, setServerError] = useState<string | null>(null);

  //  react hook form with zod
 const {register, handleSubmit, formState : {errors, isSubmitting}} = useForm<SignupFormValues>({
    resolver : zodResolver(signupSchema),
    defaultValues : {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    }
  })
   
  const onSubmit = async (v : SignupFormValues) => {
    setServerError(null)
    
    const res = await signUpUser(v)

    if(res.error){
      setServerError(res.error)
      console.log(res.error)
      return
    }
    else{router.push("/dashboard")
      toast.success("Account created successfully", {position : "top-center"})
    }

   }
  
   

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input {...register("name")} id="name" type="text" placeholder="John Doe" required />
              {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input {...register("email")}
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
              
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password
                <button className="ml-auto" type="button" onClick={toggle}>
                {showPassword ? <EyeClosed size={22}/> : <Eye size={22}/>}
              </button>
              </FieldLabel>
              
              <Input {...register("password")}  placeholder="********"
              id="password" type={showPassword? "text" : "password"} required />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
                <button className="ml-auto" type="button" onClick={confirmToggle}>
                {showConfirmPassword ? <EyeClosed size={22}/> : <Eye size={22}/>}
              </button>
              </FieldLabel>
              <Input {...register("confirmPassword")} placeholder="********"
               id="confirm-password" type={showConfirmPassword? "text" : "password"} required />
               {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
              
            </Field>
            {serverError && <p className="text-red-500">{serverError}</p>}
            <FieldGroup>
              <Field>
                <Button type="submit" disabled={isSubmitting}>Create Account</Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account? <Link href="/login">Log in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
