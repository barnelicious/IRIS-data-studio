import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ─── Seed data (same as src/lib/seed-data.ts) ───────────────────

const PROJECT_CATEGORIES = [
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

interface SeedProject {
  name: string;
  client: string;
  category: string;
  status: "ACTIVE" | "COMPLETED" | "AT_RISK" | "PAUSED";
  tokensSold: number;
  tokensUsed: number;
  tokenPrice: number;
  expertRate: number;
  tokenTier: 1 | 2;
  margin: number;
  startDate: string;
  endDate: string | null;
}

const seedProjects: SeedProject[] = [
  { name: "Digital Transformation Roadmap", client: "Siemens Energy", category: "Strategy & Transformation", status: "ACTIVE", tokensSold: 48, tokensUsed: 32, tokenPrice: 850, expertRate: 350, tokenTier: 1, margin: 58.8, startDate: "2025-09-15", endDate: null },
  { name: "Market Entry Strategy APAC", client: "Bosch Group", category: "Strategy & Transformation", status: "COMPLETED", tokensSold: 24, tokensUsed: 24, tokenPrice: 900, expertRate: 380, tokenTier: 1, margin: 57.8, startDate: "2025-06-01", endDate: "2025-09-30" },
  { name: "Supply Chain Optimization", client: "BASF", category: "Operations & Supply Chain", status: "AT_RISK", tokensSold: 36, tokensUsed: 12, tokenPrice: 750, expertRate: 500, tokenTier: 2, margin: 33.3, startDate: "2025-10-01", endDate: null },
  { name: "Procurement Excellence Program", client: "ThyssenKrupp", category: "Operations & Supply Chain", status: "ACTIVE", tokensSold: 30, tokensUsed: 22, tokenPrice: 800, expertRate: 320, tokenTier: 1, margin: 60.0, startDate: "2025-11-15", endDate: null },
  { name: "M&A Due Diligence — Tech Vertical", client: "Deutsche Bank", category: "Finance & M&A", status: "COMPLETED", tokensSold: 24, tokensUsed: 24, tokenPrice: 950, expertRate: 400, tokenTier: 1, margin: 57.9, startDate: "2025-08-20", endDate: "2025-11-15" },
  { name: "Post-Merger Integration Planning", client: "Allianz", category: "Finance & M&A", status: "ACTIVE", tokensSold: 40, tokensUsed: 18, tokenPrice: 880, expertRate: 450, tokenTier: 2, margin: 48.9, startDate: "2026-01-10", endDate: null },
  { name: "AI/ML Product Strategy", client: "SAP", category: "Technology & Innovation", status: "ACTIVE", tokensSold: 60, tokensUsed: 45, tokenPrice: 1000, expertRate: 600, tokenTier: 2, margin: 40.0, startDate: "2025-11-10", endDate: null },
  { name: "Cloud Migration Assessment", client: "Continental AG", category: "Technology & Innovation", status: "COMPLETED", tokensSold: 20, tokensUsed: 20, tokenPrice: 850, expertRate: 380, tokenTier: 1, margin: 55.3, startDate: "2025-07-01", endDate: "2025-10-01" },
  { name: "GDPR Compliance Overhaul", client: "Delivery Hero", category: "Legal & Regulatory", status: "ACTIVE", tokensSold: 18, tokensUsed: 10, tokenPrice: 800, expertRate: 300, tokenTier: 1, margin: 62.5, startDate: "2026-01-05", endDate: null },
  { name: "Regulatory Strategy — Financial Services", client: "Commerzbank", category: "Legal & Regulatory", status: "PAUSED", tokensSold: 15, tokensUsed: 5, tokenPrice: 780, expertRate: 350, tokenTier: 1, margin: 55.1, startDate: "2025-12-01", endDate: null },
  { name: "Leadership Development Program", client: "Henkel", category: "Human Capital", status: "ACTIVE", tokensSold: 32, tokensUsed: 28, tokenPrice: 750, expertRate: 280, tokenTier: 1, margin: 62.7, startDate: "2025-10-15", endDate: null },
  { name: "Workforce Planning & Analytics", client: "Deutsche Post DHL", category: "Human Capital", status: "AT_RISK", tokensSold: 28, tokensUsed: 8, tokenPrice: 720, expertRate: 340, tokenTier: 1, margin: 52.8, startDate: "2026-01-20", endDate: null },
  { name: "Go-to-Market Strategy Redesign", client: "Zalando", category: "Marketing & Commercial", status: "ACTIVE", tokensSold: 22, tokensUsed: 16, tokenPrice: 830, expertRate: 360, tokenTier: 1, margin: 56.6, startDate: "2025-11-01", endDate: null },
  { name: "Pricing Architecture Review", client: "HelloFresh", category: "Marketing & Commercial", status: "COMPLETED", tokensSold: 16, tokensUsed: 16, tokenPrice: 900, expertRate: 390, tokenTier: 1, margin: 56.7, startDate: "2025-07-15", endDate: "2025-10-15" },
  { name: "Enterprise Risk Framework", client: "Munich Re", category: "Risk & Compliance", status: "ACTIVE", tokensSold: 36, tokensUsed: 24, tokenPrice: 870, expertRate: 420, tokenTier: 2, margin: 51.7, startDate: "2025-09-01", endDate: null },
  { name: "Data Governance Maturity Assessment", client: "Infineon", category: "Data & Analytics", status: "ACTIVE", tokensSold: 26, tokensUsed: 20, tokenPrice: 820, expertRate: 350, tokenTier: 1, margin: 57.3, startDate: "2025-12-01", endDate: null },
  { name: "BI Platform Selection", client: "Fresenius", category: "Data & Analytics", status: "COMPLETED", tokensSold: 12, tokensUsed: 12, tokenPrice: 780, expertRate: 300, tokenTier: 1, margin: 61.5, startDate: "2025-08-01", endDate: "2025-10-30" },
  { name: "ESG Reporting Framework", client: "Volkswagen", category: "Sustainability & ESG", status: "ACTIVE", tokensSold: 20, tokensUsed: 14, tokenPrice: 800, expertRate: 320, tokenTier: 1, margin: 60.0, startDate: "2026-01-15", endDate: null },
  { name: "Clinical Trial Optimization", client: "Bayer", category: "Healthcare & Life Sciences", status: "ACTIVE", tokensSold: 44, tokensUsed: 30, tokenPrice: 950, expertRate: 550, tokenTier: 2, margin: 42.1, startDate: "2025-10-01", endDate: null },
  { name: "Medical Device Go-to-Market", client: "Fresenius Medical", category: "Healthcare & Life Sciences", status: "AT_RISK", tokensSold: 18, tokensUsed: 4, tokenPrice: 850, expertRate: 480, tokenTier: 2, margin: 43.5, startDate: "2026-02-01", endDate: null },
  { name: "Renewable Energy Portfolio Strategy", client: "E.ON", category: "Energy & Infrastructure", status: "ACTIVE", tokensSold: 38, tokensUsed: 26, tokenPrice: 880, expertRate: 400, tokenTier: 1, margin: 54.5, startDate: "2025-09-15", endDate: null },
  { name: "Grid Modernization Advisory", client: "RWE", category: "Energy & Infrastructure", status: "COMPLETED", tokensSold: 30, tokensUsed: 30, tokenPrice: 900, expertRate: 380, tokenTier: 1, margin: 57.8, startDate: "2025-05-01", endDate: "2025-09-01" },
  { name: "Portfolio Company Value Creation", client: "KKR Europe", category: "Private Equity & Investments", status: "ACTIVE", tokensSold: 50, tokensUsed: 38, tokenPrice: 1100, expertRate: 650, tokenTier: 2, margin: 40.9, startDate: "2025-08-01", endDate: null },
  { name: "Investment Thesis Validation", client: "EQT Partners", category: "Private Equity & Investments", status: "COMPLETED", tokensSold: 10, tokensUsed: 10, tokenPrice: 1000, expertRate: 500, tokenTier: 2, margin: 50.0, startDate: "2025-11-01", endDate: "2025-12-15" },
  { name: "CX Journey Mapping & Optimization", client: "Lufthansa", category: "Customer Experience", status: "ACTIVE", tokensSold: 24, tokensUsed: 18, tokenPrice: 800, expertRate: 330, tokenTier: 1, margin: 58.8, startDate: "2025-12-01", endDate: null },
  { name: "Operating Model Redesign", client: "Merck KGaA", category: "Organizational Design", status: "ACTIVE", tokensSold: 34, tokensUsed: 22, tokenPrice: 860, expertRate: 400, tokenTier: 1, margin: 53.5, startDate: "2025-11-01", endDate: null },
  { name: "Shared Services Center Setup", client: "Evonik", category: "Organizational Design", status: "AT_RISK", tokensSold: 28, tokensUsed: 6, tokenPrice: 780, expertRate: 350, tokenTier: 1, margin: 55.1, startDate: "2026-02-10", endDate: null },
  { name: "Cybersecurity Maturity Assessment", client: "Deutsche Telekom", category: "Technology & Innovation", status: "ACTIVE", tokensSold: 22, tokensUsed: 15, tokenPrice: 850, expertRate: 420, tokenTier: 2, margin: 50.6, startDate: "2026-01-05", endDate: null },
  { name: "Tax Restructuring Advisory", client: "Siemens Healthineers", category: "Finance & M&A", status: "ACTIVE", tokensSold: 16, tokensUsed: 12, tokenPrice: 920, expertRate: 380, tokenTier: 1, margin: 58.7, startDate: "2026-02-01", endDate: null },
  { name: "Brand Strategy Refresh", client: "Adidas", category: "Marketing & Commercial", status: "PAUSED", tokensSold: 20, tokensUsed: 8, tokenPrice: 800, expertRate: 340, tokenTier: 1, margin: 57.5, startDate: "2025-12-15", endDate: null },
];

const monthlyTrends = [
  { month: "Apr 25", revenue: 142000, cost: 62500, margin: 56.0, tokensSold: 168, tokensUsed: 95, projects: 18 },
  { month: "May 25", revenue: 155000, cost: 70500, margin: 54.5, tokensSold: 182, tokensUsed: 108, projects: 20 },
  { month: "Jun 25", revenue: 168000, cost: 77300, margin: 54.0, tokensSold: 198, tokensUsed: 112, projects: 22 },
  { month: "Jul 25", revenue: 175000, cost: 80500, margin: 54.0, tokensSold: 205, tokensUsed: 118, projects: 24 },
  { month: "Aug 25", revenue: 162000, cost: 72900, margin: 55.0, tokensSold: 190, tokensUsed: 105, projects: 23 },
  { month: "Sep 25", revenue: 195000, cost: 90700, margin: 53.5, tokensSold: 230, tokensUsed: 130, projects: 26 },
  { month: "Oct 25", revenue: 210000, cost: 98700, margin: 53.0, tokensSold: 248, tokensUsed: 140, projects: 28 },
  { month: "Nov 25", revenue: 225000, cost: 103500, margin: 54.0, tokensSold: 265, tokensUsed: 152, projects: 30 },
  { month: "Dec 25", revenue: 198000, cost: 89100, margin: 55.0, tokensSold: 232, tokensUsed: 135, projects: 27 },
  { month: "Jan 26", revenue: 235000, cost: 110500, margin: 53.0, tokensSold: 278, tokensUsed: 158, projects: 32 },
  { month: "Feb 26", revenue: 248000, cost: 116600, margin: 53.0, tokensSold: 292, tokensUsed: 165, projects: 34 },
  { month: "Mar 26", revenue: 260000, cost: 119600, margin: 54.0, tokensSold: 306, tokensUsed: 174, projects: 35 },
];

async function main() {
  console.log("Seeding IRIS Data Studio database...");

  // Clear existing data
  await prisma.engagement.deleteMany();
  await prisma.project.deleteMany();
  await prisma.client.deleteMany();
  await prisma.expert.deleteMany();
  await prisma.monthlyTrend.deleteMany();

  // Create clients (deduplicated from projects)
  const clientNames = [...new Set(seedProjects.map((p) => p.client))];
  const clientMap = new Map<string, string>();

  for (const name of clientNames) {
    const client = await prisma.client.create({
      data: { name },
    });
    clientMap.set(name, client.id);
  }
  console.log(`  Created ${clientMap.size} clients`);

  // Create projects
  let projectCount = 0;
  for (const p of seedProjects) {
    const clientId = clientMap.get(p.client)!;
    await prisma.project.create({
      data: {
        name: p.name,
        category: p.category,
        status: p.status,
        clientId,
        tokensSold: p.tokensSold,
        tokensUsed: p.tokensUsed,
        tokenPrice: p.tokenPrice,
        expertRate: p.expertRate,
        tokenTier: p.tokenTier,
        margin: p.margin,
        startDate: new Date(p.startDate),
        endDate: p.endDate ? new Date(p.endDate) : null,
      },
    });
    projectCount++;
  }
  console.log(`  Created ${projectCount} projects`);

  // Create monthly trends
  for (const t of monthlyTrends) {
    await prisma.monthlyTrend.create({
      data: {
        month: t.month,
        revenue: t.revenue,
        cost: t.cost,
        margin: t.margin,
        tokensSold: t.tokensSold,
        tokensUsed: t.tokensUsed,
        projects: t.projects,
      },
    });
  }
  console.log(`  Created ${monthlyTrends.length} monthly trends`);

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
