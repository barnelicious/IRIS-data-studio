"use client";

import Card from "@/components/ui/Card";
import MarginTrendChart from "@/components/charts/MarginTrendChart";
import RevenueChart from "@/components/charts/RevenueChart";
import ProjectStatusChart from "@/components/charts/ProjectStatusChart";
import type { MonthlyTrend } from "@/lib/seed-data";

interface Props {
  trends: MonthlyTrend[];
  statusCounts: {
    active: number;
    completed: number;
    atRisk: number;
    paused: number;
  };
}

export default function DashboardCharts({ trends, statusCounts }: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card
        title="Margin Trend"
        subtitle="Last 12 months vs 60% target"
        className="lg:col-span-1"
      >
        <div className="h-64">
          <MarginTrendChart data={trends} targetMargin={60} />
        </div>
      </Card>

      <Card
        title="Revenue vs Cost"
        subtitle="Monthly revenue and cost of delivery"
        className="lg:col-span-1"
      >
        <div className="h-64">
          <RevenueChart data={trends} />
        </div>
      </Card>

      <Card
        title="Project Status"
        subtitle="Distribution across all projects"
        className="lg:col-span-1"
      >
        <div className="h-64">
          <ProjectStatusChart {...statusCounts} />
        </div>
      </Card>
    </div>
  );
}
