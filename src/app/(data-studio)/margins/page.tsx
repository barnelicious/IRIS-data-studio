import {
  marginByCategory,
  monthlyTrends,
  seedProjects,
  computeKPIs,
} from "@/lib/seed-data";
import Card from "@/components/ui/Card";
import MarginsKPIs from "./MarginsKPIs";
import MarginsCharts from "./MarginsCharts";

export default function MarginsPage() {
  const kpis = computeKPIs();
  const categories = marginByCategory();
  const belowTarget = categories.filter((c) => c.avgMargin < 60);
  const tier1Projects = seedProjects.filter((p) => p.tokenTier === 1);
  const tier2Projects = seedProjects.filter((p) => p.tokenTier === 2);
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
        title="Pricing Intelligence"
        subtitle="Token pricing vs expert rates by tier — min floor €700/token"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#1e2130]">
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Project</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Category</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Token Price</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Expert Rate</th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Tier</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Margin</th>
              </tr>
            </thead>
            <tbody>
              {[...seedProjects]
                .sort((a, b) => a.margin - b.margin)
                .map((p) => (
                  <tr
                    key={p.id}
                    className="border-b border-[#1e2130] hover:bg-[#1e2130]/50 transition-colors"
                  >
                    <td className="py-3 px-4 text-white font-medium">{p.name}</td>
                    <td className="py-3 px-4 text-gray-400 text-xs">{p.category}</td>
                    <td className="py-3 px-4 text-right text-white">€{p.tokenPrice}</td>
                    <td className="py-3 px-4 text-right text-gray-300">€{p.expertRate}/hr</td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          p.tokenTier === 1
                            ? "bg-blue-500/10 text-blue-400"
                            : "bg-purple-500/10 text-purple-400"
                        }`}
                      >
                        T{p.tokenTier}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span
                        className="font-semibold"
                        style={{
                          color:
                            p.margin >= 60
                              ? "#4ade80"
                              : p.margin >= 50
                                ? "#f59e0b"
                                : "#f87171",
                        }}
                      >
                        {p.margin}%
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
