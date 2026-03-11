import { PrismaClient } from "@prisma/client";
import net from "net";
import dns from "dns";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient;
  dbAvailable: boolean | null;
  dbCheckPromise: Promise<boolean> | null;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

function dnsResolve(host: string, timeoutMs = 500): Promise<string | null> {
  return new Promise((resolve) => {
    const timer = setTimeout(() => resolve(null), timeoutMs);
    dns.lookup(host, (err, address) => {
      clearTimeout(timer);
      resolve(err ? null : address);
    });
  });
}

function tcpReachable(ip: string, port: number, timeoutMs = 500): Promise<boolean> {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(timeoutMs);
    socket
      .connect(port, ip, () => { socket.destroy(); resolve(true); })
      .on("error", () => resolve(false))
      .on("timeout", () => { socket.destroy(); resolve(false); });
  });
}

/**
 * Cached DB availability check — only pings the database once per server
 * lifetime. DNS resolve + TCP probe with short timeouts.
 */
async function checkDb(): Promise<boolean> {
  const url = process.env.DATABASE_URL ?? "";
  const match = url.match(/@([^:/]+):(\d+)/);
  if (!match) return false;

  const [, host, port] = match;

  const ip = await dnsResolve(host);
  if (!ip) return false;

  if (!(await tcpReachable(ip, Number(port)))) return false;

  try {
    await Promise.race([
      prisma.$queryRaw`SELECT 1`,
      new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), 2000)),
    ]);
    return true;
  } catch {
    return false;
  }
}

export async function dbAvailable(): Promise<boolean> {
  if (globalForPrisma.dbAvailable !== null && globalForPrisma.dbAvailable !== undefined) {
    return globalForPrisma.dbAvailable;
  }

  // Deduplicate concurrent calls — all callers share one check
  if (!globalForPrisma.dbCheckPromise) {
    globalForPrisma.dbCheckPromise = checkDb().then((result) => {
      globalForPrisma.dbAvailable = result;
      globalForPrisma.dbCheckPromise = null;
      return result;
    });
  }
  return globalForPrisma.dbCheckPromise;
}
