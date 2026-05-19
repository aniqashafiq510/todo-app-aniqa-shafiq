import prisma from "@/lib/prisma";

export const PLAN_LIMITS = {
  free: 20,
  pro: Infinity,
};

export async function getSubscription(
  userId: string
) {

  const user = await prisma.user.findUnique({
    where: { id: userId },

    select: {
      subscriptionPlan: true,
      subscriptionStatus: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // PRO only if active
  const isPro =
    user.subscriptionPlan === "pro" && 
    user.subscriptionStatus === "active"
    

  return {
    plan: isPro ? "pro" : "free",
    limit: isPro
      ? PLAN_LIMITS.pro
      : PLAN_LIMITS.free,
  };
}