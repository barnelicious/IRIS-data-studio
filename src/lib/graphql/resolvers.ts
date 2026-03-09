import {
  getProjects,
  getProject,
  getMonthlyTrends,
  computeKPIs,
  marginByCategory,
} from "@/lib/db";

const resolvers = {
  Query: {
    health: () => ({
      status: "ok",
      timestamp: new Date().toISOString(),
    }),

    dashboardKPIs: () => computeKPIs(),

    projects: (
      _: unknown,
      {
        limit = 50,
        offset = 0,
        status,
        category,
      }: {
        limit?: number;
        offset?: number;
        status?: string;
        category?: string;
      }
    ) => getProjects({ limit, offset, status, category }),

    project: (_: unknown, { id }: { id: string }) => getProject(id),

    monthlyTrends: () => getMonthlyTrends(),

    marginByCategory: () => marginByCategory(),
  },
};

export default resolvers;
