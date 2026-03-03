"use client"

import { cn } from "@/lib/utils"
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

import { PasswordToggle } from "@/hooks/pswd-toggler"
import { Eye, EyeClosed } from "lucide-react"

export function LoginForm({
    
  className,
  ...props
}: React.ComponentProps<"div">) {
    const {showPassword, toggle} = PasswordToggle()
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="youremail@example.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <button className="ml-auto"
                type="button" onClick={toggle}
                > {showPassword ? <EyeClosed size={22}/> : <Eye size={22}/> }</button>
                  {/* <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a> */}
                </div>
                <Input id="password" type={showPassword ? "text" : "password"} required />
                
              </Field>
              <Field>
                <Button type="submit">Login</Button>
                
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="#">Register</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
