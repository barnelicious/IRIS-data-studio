import { computeKPIs, monthlyTrends, seedProjects } from "@/lib/seed-data";
import Card from "@/components/ui/Card";
import StatusBadge from "@/components/ui/StatusBadge";
import DashboardKPIs from "./DashboardKPIs";
import DashboardCharts from "./DashboardCharts";

export default function DashboardPage() {
  const kpis = computeKPIs();
  const atRiskProjects = seedProjects.filter((p) => p.status === "AT_RISK");
  const recentProjects = seedProjects
    .filter((p) => p.status === "ACTIVE")
    .slice(0, 5);

  const statusCounts = {
    active: seedProjects.filter((p) => p.status === "ACTIVE").length,
    completed: seedProjects.filter((p) => p.status === "COMPLETED").length,
    atRisk: seedProjects.filter((p) => p.status === "AT_RISK").length,
    paused: seedProjects.filter((p) => p.status === "PAUSED").length,
  };

  return (
    <div className="space-y-6">
      <DashboardKPIs {...kpis} />

      <DashboardCharts trends={monthlyTrends} statusCounts={statusCounts} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card
          title="Projects at Risk"
          subtitle={`${atRiskProjects.length} projects need immediate attention`}
        >
          {atRiskProjects.length === 0 ? (
            <p className="text-gray-500 text-sm">No at-risk projects</p>
          ) : (
            <div className="space-y-3">
              {atRiskProjects.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between p-3 bg-red-500/5 border border-red-500/10 rounded-lg"
                >
                  <div>
                    <div className="text-sm font-medium text-white">
                      {p.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {p.client} &middot; {p.category}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-red-400">
                      {Math.round((p.tokensUsed / p.tokensSold) * 100)}% used
                    </div>
                    <div className="text-xs text-gray-500">
                      {p.tokensUsed}/{p.tokensSold} tokens
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card
          title="Active Projects"
          subtitle={`${statusCounts.active} projects in progress`}
        >
          <div className="space-y-3">
            {recentProjects.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between p-3 bg-[#0f1117] rounded-lg"
              >
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white truncate">
                    {p.name}
                  </div>
                  <div className="text-xs text-gray-500">{p.client}</div>
                </div>
                <div className="flex items-center gap-4 ml-4">
                  <div className="text-right">
                    <div
                      className="text-sm font-semibold"
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
                    </div>
                    <div className="text-xs text-gray-500">margin</div>
                  </div>
                  <StatusBadge status={p.status} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
