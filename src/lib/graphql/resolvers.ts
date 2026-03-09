import {
  seedProjects,
  monthlyTrends,
  computeKPIs,
  marginByCategory,
} from "@/lib/seed-data";

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
    ) => {
      let filtered = [...seedProjects];
      if (status) filtered = filtered.filter((p) => p.status === status);
      if (category) filtered = filtered.filter((p) => p.category === category);
      return filtered.slice(offset, offset + limit);
    },

    project: (_: unknown, { id }: { id: string }) => {
      return seedProjects.find((p) => p.id === id) ?? null;
    },

    monthlyTrends: () => monthlyTrends,

    marginByCategory: () => marginByCategory(),
  },
};

export default resolvers;
