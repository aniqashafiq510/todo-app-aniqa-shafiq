import { Button } from "@/components/ui/button"
import Link from "next/link"




export default function Home() {
  return(
    <div className="flex justify-evenly mt-5">
      <div>
        <h1 className="font-bold text-3xl">TO-DO-APP</h1>
      </div>
      <div className="space-x-3">
        <Button> <Link href="/register">Sign Up</Link></Button>
        <Button> <Link href="/login"> Log In </Link></Button>
      </div>
    </div>
  )
}
