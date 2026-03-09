import { getProjects, computeKPIs, marginByCategory } from "@/lib/db";
import Card from "@/components/ui/Card";
import StatusBadge from "@/components/ui/StatusBadge";
import TokensKPIs from "./TokensKPIs";
import TokensCharts from "./TokensCharts";

export default async function TokensPage() {
  const [kpis, categories, allProjects] = await Promise.all([
    computeKPIs(),
    marginByCategory(),
    getProjects({ limit: 1000 }),
  ]);

  const projectsByCompletion = [...allProjects]
    .filter((p) => p.status !== "COMPLETED")
    .map((p) => ({
      ...p,
      completionRate: Math.round((p.tokensUsed / p.tokensSold) * 100),
      unusedValue: (p.tokensSold - p.tokensUsed) * p.tokenPrice,
    }))
    .sort((a, b) => a.completionRate - b.completionRate);

  const lowCompletionCount = projectsByCompletion.filter(
    (p) => p.completionRate < 40
  ).length;

  return (
    <div className="space-y-6">
      <TokensKPIs
        tokenCompletionRate={kpis.tokenCompletionRate}
        totalTokensUsed={kpis.totalTokensUsed}
        totalTokensSold={kpis.totalTokensSold}
        unusedTokens={kpis.totalTokensSold - kpis.totalTokensUsed}
        revenueAtRisk={kpis.revenueAtRisk}
        lowCompletionCount={lowCompletionCount}
      />

      <TokensCharts categories={categories} />

      <Card
        title="Token Usage by Project"
        subtitle="Sorted by completion rate — lowest first (highest risk)"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#1e2130]">
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Project</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Client</th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Sold</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Used</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Completion</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase">At Risk (€)</th>
              </tr>
            </thead>
            <tbody>
              {projectsByCompletion.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-[#1e2130] hover:bg-[#1e2130]/50 transition-colors"
                >
                  <td className="py-3 px-4 text-white font-medium">{p.name}</td>
                  <td className="py-3 px-4 text-gray-400">{p.client}</td>
                  <td className="py-3 px-4 text-center">
                    <StatusBadge status={p.status} />
                  </td>
                  <td className="py-3 px-4 text-right text-white">{p.tokensSold}</td>
                  <td className="py-3 px-4 text-right text-gray-300">{p.tokensUsed}</td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-16 h-1.5 bg-[#0f1117] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${p.completionRate}%`,
                            background:
                              p.completionRate >= 70
                                ? "#4ade80"
                                : p.completionRate >= 40
                                  ? "#f59e0b"
                                  : "#f87171",
                          }}
                        />
                      </div>
                      <span
                        className="text-xs font-medium"
                        style={{
                          color:
                            p.completionRate >= 70
                              ? "#4ade80"
                              : p.completionRate >= 40
                                ? "#f59e0b"
                                : "#f87171",
                        }}
                      >
                        {p.completionRate}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right text-red-400 font-medium">
                    €{p.unusedValue.toLocaleString()}
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
