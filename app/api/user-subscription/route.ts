import { auth } from "@/lib/auth/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export const GET = async (req : Request) => {

    try {
        
        const session = await auth.api.getSession({
      headers: req.headers
    })
    const userId = session?.user.id

    const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      subscriptionPlan: true,
      subscriptionStatus: true,
      stripeCustomerId: true,
    },
  });

  if(!user) return NextResponse.json({error : "User not found"}, {status : 404})

return NextResponse.json(user);

    } catch (error) {
        console.log(error)
    }
}