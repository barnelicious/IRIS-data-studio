import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // API routes handled via Next.js route handlers + Apollo Server
  // NestJS integration planned for later phases

  // Persist Turbopack compilation cache to disk across dev restarts
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
};

export default nextConfig;
