import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export const aiRateLimit = new Ratelimit({
  redis,

  limiter: Ratelimit.slidingWindow(
    10,   // 10 requests
    "1 m" // per minute
  ),

  prefix: "ai-rate",
});