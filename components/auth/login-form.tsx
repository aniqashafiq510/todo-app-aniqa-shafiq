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
import { loginUser } from "@/lib/auth/authService"
import { loginSchema, LoginFormValues } from "@/lib/zodSchemas/login"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeClosed } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"






export function LoginForm() {
  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null)

  // react hook form(useForm)
  const {register, handleSubmit, formState : {errors, isSubmitting}} = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email : "", password : ""
    }
  })

  // submitHandler
  const onSubmit = async (v : LoginFormValues) => {
    setServerError(null)
    const res = await loginUser(v);
    if(res.error){
      setServerError(res.error)
      console.log(res.error)
      return
    }
    else{router.replace("/dashboard")
      toast.success("Logged In!",{position: "top-center"})
    }
  }

    const {showPassword, toggle} = usePasswordToggle()
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input {...register("email")}
                  id="email"
                  type="email"
                  placeholder="youremail@example.com"
                  required
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <button className="ml-auto"
                type="button" onClick={toggle}
                > {showPassword ? <EyeClosed size={22}/> : <Eye size={22}/> }</button>
                  
                </div>
                <Input {...register("password")} id="password" type={showPassword ? "text" : "password"} required />
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
              </Field>
              {serverError && <p className="text-red-500">{serverError}</p>}
              <Field>
                <Button type="submit" disabled={isSubmitting} >Login</Button>
                
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link href="/register">Register</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
