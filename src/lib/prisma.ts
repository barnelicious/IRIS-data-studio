import { PrismaClient } from "@prisma/client";
import net from "net";
import dns from "dns";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient;
  dbAvailable: boolean | null;
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
export async function dbAvailable(): Promise<boolean> {
  if (globalForPrisma.dbAvailable !== null && globalForPrisma.dbAvailable !== undefined) {
    return globalForPrisma.dbAvailable;
  }

  const url = process.env.DATABASE_URL ?? "";
  const match = url.match(/@([^:/]+):(\d+)/);
  if (!match) {
    globalForPrisma.dbAvailable = false;
    return false;
  }

  const [, host, port] = match;

  // Fast DNS check — bail if hostname can't resolve in 500ms
  const ip = await dnsResolve(host);
  if (!ip) {
    globalForPrisma.dbAvailable = false;
    return false;
  }

  // Fast TCP check using resolved IP
  if (!(await tcpReachable(ip, Number(port)))) {
    globalForPrisma.dbAvailable = false;
    return false;
  }

  try {
    await prisma.$queryRaw`SELECT 1`;
    globalForPrisma.dbAvailable = true;
  } catch {
    globalForPrisma.dbAvailable = false;
  }
  return globalForPrisma.dbAvailable;
}
