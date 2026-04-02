import {z} from "zod"



export const loginSchema = z.object({
    email : z.email("Invalid email").trim() .min(1,"Email is required"),
    password : z
    .string()
    .min(1, "Password is required!")
})


// z.infer<typeof signupSchema> tells “Take the Zod schema (formSchema) and automatically generate a 
// TypeScript type that matches whatever types you defined in the schema.”

export type LoginFormValues = z.infer<typeof loginSchema>;

 
  