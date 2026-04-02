import { stripe } from "@/lib/stripe/stripe";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {

  const payload = await req.text();
  const sig = req.headers.get("stripe-signature")!;
  let event: Stripe.Event;

  // this is for checking that the event is from stripe or from somewhere else
  try {
    event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Signature verification failed:", err);
    return new NextResponse(`Webhook Error: ${err}`, { status: 400 });
  }

  console.log("Event received:", event.type);

  try {
    switch (event.type) {

  // ✅ Step 1: checkout complete (initial success)
  case "checkout.session.completed": {
    const session = event.data.object as Stripe.Checkout.Session;

    await prisma.user.update({
      where: { stripeCustomerId: session.customer as string },
      data: {
        subscriptionPlan: "pro",
      },
    });

    console.log("Checkout completed");
    break;
  }

  // ✅ Step 2: real subscription status (MOST IMPORTANT)
  case "customer.subscription.created":
  case "customer.subscription.updated": {
    const sub = event.data.object as Stripe.Subscription;

    await prisma.user.update({
      where: { stripeCustomerId: sub.customer as string },
      data: {
        subscriptionStatus: sub.status,
        stripeSubscriptionId: sub.id,
      },
    });

    console.log("Subscription status:", sub.status);
    break;
  }

  // ❌ payment failed
  case "invoice.payment_failed": {
    const invoice = event.data.object as Stripe.Invoice;

    await prisma.user.update({
      where: { stripeCustomerId: invoice.customer as string },
      data: {
        subscriptionStatus: "past_due",
      },
    });

    console.log("Payment failed");
    break;
  }

  // ❌ canceled
  case "customer.subscription.deleted": {
    const sub = event.data.object as Stripe.Subscription;

    await prisma.user.update({
      where: { stripeCustomerId: sub.customer as string },
      data: {
        subscriptionPlan: null,
        subscriptionStatus: "canceled",
      },
    });

    console.log("Subscription canceled");
    break;
  }

  default:
    console.log("Unhandled event:", event.type);
}
  } catch (err) {
    console.error(" Prisma update failed:", err);
  }

  return new NextResponse("Webhook received", { status: 200 });
}