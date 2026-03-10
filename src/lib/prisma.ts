import { PrismaClient } from "@prisma/client";
import net from "net";

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

function tcpReachable(host: string, port: number, timeoutMs = 300): Promise<boolean> {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(timeoutMs);
    socket
      .connect(port, host, () => { socket.destroy(); resolve(true); })
      .on("error", () => resolve(false))
      .on("timeout", () => { socket.destroy(); resolve(false); });
  });
}

/**
 * Cached DB availability check — only pings the database once per server
 * lifetime. Fast TCP probe before attempting Prisma connection.
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
  if (!(await tcpReachable(host, Number(port)))) {
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
