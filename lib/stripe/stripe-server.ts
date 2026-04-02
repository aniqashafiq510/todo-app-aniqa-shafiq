"use server"

import Stripe from "stripe";
import prisma from "../prisma" 

 const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-03-25.dahlia" });

export async function createCheckoutSession(userId: string, priceId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) throw new Error("User not found");
  let customerId = user.stripeCustomerId;

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email,
    });

    await prisma.user.update({
      where: { id: userId },
      data: { stripeCustomerId: customer.id },
    });

    customerId = customer.id; // ✅ IMPORTANT FIX
  }

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?canceled=true`,
  });

  return session.url;
}



// managing subscription

export async function createBillingPortalSession(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user || !user.stripeCustomerId) return null;

  const session = await stripe.billingPortal.sessions.create({
    customer: user.stripeCustomerId,
    return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
  });

  return session.url;
}