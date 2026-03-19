import { signIn , signUp} from "./auth-client";
import type {LoginFormValues} from '@/lib/zodSchemas/login'
import type {SignupFormValues} from '@/lib/zodSchemas/signup'


export async function loginUser({ email, password }: LoginFormValues) {
  try {
    const response = await signIn.email({ email, password });
    if (response.error) {
      return { success: false, error: response.error.message || "Something went wrong!" };
    }
    return { success: true };
  } catch (err) {
    console.log(err)
    return { success: false, error: "Network error. Please try again." };
  }
}


export async function signUpUser({name ,  email, password }: SignupFormValues) {
  try {
    const response = await signUp.email({ name , email, password });
    if (response.error) {
      return { success: false, error: response.error.message || "Something went wrong!" };
    }
    return { success: true };
  } catch (err) {
    console.log(err)
    return { success: false, error: "Network error. Please try again." };
  }
}



