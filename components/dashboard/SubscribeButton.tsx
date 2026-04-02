"use client"

import { createCheckoutSession, createBillingPortalSession } from "@/lib/stripe/stripe-server";
import { Button } from "../ui/button";


export   function SubscribeButton({ userId }: { userId: string }) {
  const handleSubscribe = async () => {
  const url = await createCheckoutSession(userId, "price_1TG16uF2abOyURkKnWHk6q5I");

  if (!url) {
    console.error("Checkout session URL is null!");
    return;
  }

  window.location.href = url;
};

  return (
    <Button onClick={handleSubscribe} >
      Subscribe to Pro
    </Button>
  );
}

// manage susbcription button
export function ManageSubscriptionButton({ userId }: { userId: string }) {
  const handleManage = async () => {
    const url = await createBillingPortalSession(userId);

    if (!url) {
      console.error("Billing portal URL not found!");
      return;
    }

    window.location.href = url;
  };

  return (
    <Button onClick={handleManage}>
      Manage Subscription
    </Button>
  );
}