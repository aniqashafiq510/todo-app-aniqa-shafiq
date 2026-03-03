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


export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
    const {toggle,showPassword, showConfirmPassword, confirmToggle} = usePasswordToggle()
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input id="name" type="text" placeholder="John Doe" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
              
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password
                <button className="ml-auto" type="button" onClick={toggle}>
                {showPassword ? <EyeClosed size={22}/> : <Eye size={22}/>}
              </button>
              </FieldLabel>
              
              <Input id="password" type={showPassword? "text" : "password"} required />
              
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
                <button className="ml-auto" type="button" onClick={confirmToggle}>
                {showConfirmPassword ? <EyeClosed size={22}/> : <Eye size={22}/>}
              </button>
              </FieldLabel>
              <Input id="confirm-password" type={showConfirmPassword? "text" : "password"} required />
              
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit">Create Account</Button>
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
