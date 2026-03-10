import { prisma, dbAvailable } from "./prisma";
import {
  seedProjects,
  monthlyTrends as seedTrends,
  computeKPIs as seedComputeKPIs,
  marginByCategory as seedMarginByCategory,
  type SeedProject,
} from "./seed-data";

export const PROJECT_CATEGORIES = [
  "Strategy & Transformation",
  "Operations & Supply Chain",
  "Finance & M&A",
  "Technology & Innovation",
  "Legal & Regulatory",
  "Human Capital",
  "Marketing & Commercial",
  "Risk & Compliance",
  "Data & Analytics",
  "Sustainability & ESG",
  "Healthcare & Life Sciences",
  "Energy & Infrastructure",
  "Private Equity & Investments",
  "Customer Experience",
  "Organizational Design",
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export interface ProjectWithClient {
  id: string;
  name: string;
  client: string;
  category: string;
  status: "ACTIVE" | "COMPLETED" | "AT_RISK" | "PAUSED";
  tokensSold: number;
  tokensUsed: number;
  tokenPrice: number;
  expertRate: number;
  tokenTier: number;
  margin: number;
  startDate: string;
  endDate: string | null;
}

function formatProject(p: {
  id: string;
  name: string;
  category: string;
  status: string;
  tokensSold: number;
  tokensUsed: number;
  tokenPrice: number;
  expertRate: number;
  tokenTier: number;
  margin: number;
  startDate: Date;
  endDate: Date | null;
  client: { name: string };
}): ProjectWithClient {
  return {
    id: p.id,
    name: p.name,
    client: p.client.name,
    category: p.category,
    status: p.status as ProjectWithClient["status"],
    tokensSold: p.tokensSold,
    tokensUsed: p.tokensUsed,
    tokenPrice: p.tokenPrice,
    expertRate: p.expertRate,
    tokenTier: p.tokenTier,
    margin: p.margin,
    startDate: p.startDate.toISOString().split("T")[0],
    endDate: p.endDate ? p.endDate.toISOString().split("T")[0] : null,
  };
}

function seedToProject(p: SeedProject): ProjectWithClient {
  return {
    id: p.id,
    name: p.name,
    client: p.client,
    category: p.category,
    status: p.status,
    tokensSold: p.tokensSold,
    tokensUsed: p.tokensUsed,
    tokenPrice: p.tokenPrice,
    expertRate: p.expertRate,
    tokenTier: p.tokenTier,
    margin: p.margin,
    startDate: p.startDate,
    endDate: p.endDate,
  };
}


export async function getProjects(opts?: {
  limit?: number;
  offset?: number;
  status?: string;
  category?: string;
}): Promise<ProjectWithClient[]> {
  if (!(await dbAvailable())) {
    let projects = seedProjects.map(seedToProject);
    if (opts?.status) projects = projects.filter((p) => p.status === opts.status);
    if (opts?.category) projects = projects.filter((p) => p.category === opts.category);
    const offset = opts?.offset ?? 0;
    const limit = opts?.limit ?? 50;
    return projects.slice(offset, offset + limit);
  }

  const where: Record<string, unknown> = {};
  if (opts?.status) where.status = opts.status;
  if (opts?.category) where.category = opts.category;

  const rows = await prisma.project.findMany({
    where,
    include: { client: true },
    orderBy: { createdAt: "desc" },
    take: opts?.limit ?? 50,
    skip: opts?.offset ?? 0,
  });

  return rows.map(formatProject);
}

export async function getProject(id: string): Promise<ProjectWithClient | null> {
  if (!(await dbAvailable())) {
    const seed = seedProjects.find((p) => p.id === id);
    return seed ? seedToProject(seed) : null;
  }

  const row = await prisma.project.findUnique({
    where: { id },
    include: { client: true },
  });
  return row ? formatProject(row) : null;
}

export interface MonthlyTrend {
  month: string;
  revenue: number;
  cost: number;
  margin: number;
  tokensSold: number;
  tokensUsed: number;
  projects: number;
}

export async function getMonthlyTrends(): Promise<MonthlyTrend[]> {
  if (!(await dbAvailable())) {
    return seedTrends;
  }

  return prisma.monthlyTrend.findMany({
    orderBy: { month: "asc" },
    select: {
      month: true,
      revenue: true,
      cost: true,
      margin: true,
      tokensSold: true,
      tokensUsed: true,
      projects: true,
    },
  });
}

export async function computeKPIs() {
  if (!(await dbAvailable())) {
    return seedComputeKPIs();
  }

  const projects = await getProjects({ limit: 500 });

  const active = projects.filter((p) => p.status === "ACTIVE");
  const atRisk = projects.filter((p) => p.status === "AT_RISK");
  const totalSold = projects.reduce((s, p) => s + p.tokensSold, 0);
  const totalUsed = projects.reduce((s, p) => s + p.tokensUsed, 0);
  const totalRevenue = projects.reduce((s, p) => s + p.tokensSold * p.tokenPrice, 0);
  const unusedTokenRevenue = projects.reduce(
    (s, p) => s + (p.tokensSold - p.tokensUsed) * p.tokenPrice,
    0
  );
  const avgMargin =
    projects.reduce((s, p) => s + p.margin, 0) / projects.length;

  return {
    realizedMargin: Math.round(avgMargin * 10) / 10,
    targetMargin: 60.0,
    tokenCompletionRate: Math.round((totalUsed / totalSold) * 1000) / 10,
    activeProjects: active.length,
    atRiskProjects: atRisk.length,
    totalProjects: projects.length,
    revenueAtRisk: unusedTokenRevenue,
    totalRevenue,
    totalTokensSold: totalSold,
    totalTokensUsed: totalUsed,
    avgTokenPrice: Math.round(totalRevenue / totalSold),
  };
}

export async function marginByCategory() {
  if (!(await dbAvailable())) {
    return seedMarginByCategory();
  }

  const projects = await getProjects({ limit: 500 });

  const categories = new Map<
    string,
    { revenue: number; projects: number; totalMargin: number; tokensSold: number; tokensUsed: number }
  >();
  for (const p of projects) {
    const entry = categories.get(p.category) ?? {
      revenue: 0,
      projects: 0,
      totalMargin: 0,
      tokensSold: 0,
      tokensUsed: 0,
    };
    entry.revenue += p.tokensSold * p.tokenPrice;
    entry.projects += 1;
    entry.totalMargin += p.margin;
    entry.tokensSold += p.tokensSold;
    entry.tokensUsed += p.tokensUsed;
    categories.set(p.category, entry);
  }
  return Array.from(categories.entries())
    .map(([category, data]) => ({
      category,
      avgMargin: Math.round((data.totalMargin / data.projects) * 10) / 10,
      revenue: data.revenue,
      projects: data.projects,
      tokensSold: data.tokensSold,
      tokensUsed: data.tokensUsed,
      completionRate: Math.round((data.tokensUsed / data.tokensSold) * 100),
    }))
    .sort((a, b) => b.revenue - a.revenue);
}
