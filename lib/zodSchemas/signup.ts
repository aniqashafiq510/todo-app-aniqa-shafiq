import {z} from "zod"



export const signupSchema = z.object({
    name : z.string() .min(2,"Name must be atlest two characters")
    .max(15, "Name shouldn't exceed 15 characters"),
    email : z.email("Invalid email").trim() .min(1,"Email is required"),
    password : z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
    confirmPassword : z.string()
})
.refine((data) => data.password === data.confirmPassword, {
     message: "Passwords do not match",
  path: ["confirmPassword"]
})

// z.infer<typeof signupSchema> tells “Take the Zod schema (formSchema) and automatically generate a 
// TypeScript type that matches whatever types you defined in the schema.”

export type SignupFormValues = z.infer<typeof signupSchema>;

 
  