"use client";

import { getSubscriptionInfo } from "@/lib/subscriptionInfo";
import type { SubscriptionInfo } from "@/types/types";
import { useEffect, useState } from "react";



export function useSubscriptionInfo() {
  const [userSubscription, setUserSubscription] = useState<SubscriptionInfo| null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscriptionInfo = async () => {
      try {
        const data = await getSubscriptionInfo()
        setUserSubscription(data);
      } catch (err) {
        console.error("Failed to fetch subscription info:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptionInfo();
  }, []);

  return { userSubscription, loading };
}