"use client";

import Card from "@/components/ui/Card";
import MarginTrendChart from "@/components/charts/MarginTrendChart";
import CategoryMarginChart from "@/components/charts/CategoryMarginChart";
import type { MonthlyTrend } from "@/lib/seed-data";

interface CategoryData {
  category: string;
  avgMargin: number;
  revenue: number;
  projects: number;
}

interface Props {
  categories: CategoryData[];
  trends: MonthlyTrend[];
}

export default function MarginsCharts({ categories, trends }: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card
        title="Margin by Category"
        subtitle="Average margin vs 60% target (green line)"
      >
        <div className="h-[400px]">
          <CategoryMarginChart data={categories} />
        </div>
      </Card>

      <Card
        title="Margin Trend"
        subtitle="12-month margin trend vs target"
      >
        <div className="h-[400px]">
          <MarginTrendChart data={trends} targetMargin={60} />
        </div>
      </Card>
    </div>
  );
}
