// Specify the exact relative path to the "generated/prisma" directory

import { PrismaClient } from "../lib/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = global as unknown as {
  prisma?: PrismaClient;
  pgPool?: Pool;
};

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is not defined");
  }

  const isAccelerateUrl =
    connectionString.startsWith("prisma://") ||
    connectionString.startsWith("prisma+postgres://");

  if (isAccelerateUrl) {
    return new PrismaClient({
      accelerateUrl: connectionString,
      log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    });
  }

  // 1. Create a URL object to safely modify parameters
  const databaseUrl = new URL(connectionString);

  // 2. Remove parameters that cause warnings or crashes
  // Removes "SECURITY WARNING" about sslmode
  databaseUrl.searchParams.delete("sslmode");
  // Removes "Server-side exception" crash regarding channel_binding
  databaseUrl.searchParams.delete("channel_binding");

  const isLocalhost =
    ["localhost", "127.0.0.1", "::1"].includes(databaseUrl.hostname) ||
    databaseUrl.hostname.endsWith(".local");
  const sslMode = databaseUrl.searchParams.get("sslmode");

  // 3. Configure the pool with the clean URL and explicit SSL settings
  const pool =
    globalForPrisma.pgPool ||
    new Pool({
      connectionString: databaseUrl.toString(),
      ssl: !isLocalhost && sslMode !== "disable"
        ? {
            // Allow managed DBs with custom CAs; tighten if you have a CA bundle.
            rejectUnauthorized: false,
          }
        : undefined,
    });

  const adapter = new PrismaPg(pool);

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.pgPool = pool;
  }

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;