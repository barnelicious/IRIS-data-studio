import {
  marginByCategory,
  getMonthlyTrends,
  getProjects,
  computeKPIs,
} from "@/lib/db";
import Card from "@/components/ui/Card";
import MarginsKPIs from "./MarginsKPIs";
import dynamic from "next/dynamic";
const MarginsCharts = dynamic(() => import("./MarginsCharts"), {
  loading: () => <div className="h-64 bg-[#0f1117] rounded-xl animate-pulse" />,
});

export default async function MarginsPage() {
  const [kpis, categories, monthlyTrends, allProjects] = await Promise.all([
    computeKPIs(),
    marginByCategory(),
    getMonthlyTrends(),
    getProjects({ limit: 100 }),
  ]);

  const belowTarget = categories.filter((c) => c.avgMargin < 60);
  const tier1Projects = allProjects.filter((p) => p.tokenTier === 1);
  const tier2Projects = allProjects.filter((p) => p.tokenTier === 2);
  const tier1AvgMargin =
    Math.round(
      (tier1Projects.reduce((s, p) => s + p.margin, 0) / tier1Projects.length) *
        10
    ) / 10;
  const tier2AvgMargin =
    Math.round(
      (tier2Projects.reduce((s, p) => s + p.margin, 0) / tier2Projects.length) *
        10
    ) / 10;

  return (
    <div className="space-y-6">
      <MarginsKPIs
        overallMargin={kpis.realizedMargin}
        targetMargin={kpis.targetMargin}
        tier1Margin={tier1AvgMargin}
        tier2Margin={tier2AvgMargin}
        belowTargetCount={belowTarget.length}
        totalCategories={categories.length}
      />

      <MarginsCharts categories={categories} trends={monthlyTrends} />

      <Card
        title="Margin by Topic"
        subtitle="Average margin, revenue, and token usage across practice areas"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#1e2130]">
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Topic</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Projects</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Revenue</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Tokens Sold</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Completion</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Avg Margin</th>
              </tr>
            </thead>
            <tbody>
              {[...categories]
                .sort((a, b) => a.avgMargin - b.avgMargin)
                .map((c) => (
                  <tr
                    key={c.category}
                    className="border-b border-[#1e2130] hover:bg-[#1e2130]/50 transition-colors"
                  >
                    <td className="py-3 px-4 text-white font-medium">{c.category}</td>
                    <td className="py-3 px-4 text-right text-gray-300">{c.projects}</td>
                    <td className="py-3 px-4 text-right text-white">€{(c.revenue / 1000).toFixed(0)}k</td>
                    <td className="py-3 px-4 text-right text-gray-300">{c.tokensSold}</td>
                    <td className="py-3 px-4 text-right">
                      <span
                        className="text-xs font-medium"
                        style={{
                          color:
                            c.completionRate >= 80
                              ? "#4ade80"
                              : c.completionRate >= 50
                                ? "#f59e0b"
                                : "#f87171",
                        }}
                      >
                        {c.completionRate}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span
                        className="font-semibold"
                        style={{
                          color:
                            c.avgMargin >= 60
                              ? "#4ade80"
                              : c.avgMargin >= 50
                                ? "#f59e0b"
                                : "#f87171",
                        }}
                      >
                        {c.avgMargin}%
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
