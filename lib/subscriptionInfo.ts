

export const getSubscriptionInfo = async () => {
    const res = await fetch("/api/user-subscription")
    if(!res.ok) throw new Error("Failed to fetch subscription info.")
    return res.json()
}