import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient;
  dbAvailable: boolean | null;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
    // Short timeout so we fail fast when DB is down
    transactionOptions: { timeout: 2000 },
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

/**
 * Cached DB availability check — only pings the database once per server
 * lifetime. Returns cached result on subsequent calls.
 */
export async function dbAvailable(): Promise<boolean> {
  if (globalForPrisma.dbAvailable !== null && globalForPrisma.dbAvailable !== undefined) {
    return globalForPrisma.dbAvailable;
  }
  try {
    await Promise.race([
      prisma.$queryRaw`SELECT 1`,
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("DB ping timeout")), 1000)
      ),
    ]);
    globalForPrisma.dbAvailable = true;
  } catch {
    globalForPrisma.dbAvailable = false;
  }
  return globalForPrisma.dbAvailable;
}
