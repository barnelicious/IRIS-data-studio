// Seed data resolvers — will be replaced by Prisma queries in Phase 1
const resolvers = {
  Query: {
    health: () => ({
      status: "ok",
      timestamp: new Date().toISOString(),
    }),

    dashboardKPIs: () => ({
      realizedMargin: 54.0,
      targetMargin: 60.0,
      tokenCompletionRate: 57.0,
      activeProjects: 42,
      revenueAtRisk: 900000,
      totalTokensSold: 1580,
      totalTokensUsed: 901,
    }),

    projects: (
      _: unknown,
      { limit = 20, offset = 0 }: { limit?: number; offset?: number }
    ) => {
      return seedProjects.slice(offset, offset + limit);
    },

    project: (_: unknown, { id }: { id: string }) => {
      return seedProjects.find((p) => p.id === id) ?? null;
    },
  },
};

// Minimal seed data — will be replaced by Prisma + PostgreSQL
const seedProjects = [
  {
    id: "1",
    name: "Digital Transformation Advisory",
    category: "Strategy & Transformation",
    status: "ACTIVE",
    tokensSold: 48,
    tokensUsed: 32,
    tokenPrice: 850,
    expertRate: 350,
    tokenTier: 1,
    margin: 58.8,
    createdAt: "2025-09-15T00:00:00Z",
  },
  {
    id: "2",
    name: "Supply Chain Optimization",
    category: "Operations & Supply Chain",
    status: "AT_RISK",
    tokensSold: 36,
    tokensUsed: 12,
    tokenPrice: 750,
    expertRate: 500,
    tokenTier: 2,
    margin: 33.3,
    createdAt: "2025-10-01T00:00:00Z",
  },
  {
    id: "3",
    name: "M&A Due Diligence",
    category: "Finance & M&A",
    status: "COMPLETED",
    tokensSold: 24,
    tokensUsed: 24,
    tokenPrice: 900,
    expertRate: 380,
    tokenTier: 1,
    margin: 57.8,
    createdAt: "2025-08-20T00:00:00Z",
  },
  {
    id: "4",
    name: "AI/ML Product Strategy",
    category: "Technology & Innovation",
    status: "ACTIVE",
    tokensSold: 60,
    tokensUsed: 45,
    tokenPrice: 1000,
    expertRate: 600,
    tokenTier: 2,
    margin: 40.0,
    createdAt: "2025-11-10T00:00:00Z",
  },
  {
    id: "5",
    name: "Regulatory Compliance Review",
    category: "Legal & Regulatory",
    status: "ACTIVE",
    tokensSold: 18,
    tokensUsed: 10,
    tokenPrice: 800,
    expertRate: 300,
    tokenTier: 1,
    margin: 62.5,
    createdAt: "2026-01-05T00:00:00Z",
  },
];

export default resolvers;
