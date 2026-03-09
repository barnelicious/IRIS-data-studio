"use client";

import Card from "@/components/ui/Card";
import TokenCompletionChart from "@/components/charts/TokenCompletionChart";

interface CategoryData {
  category: string;
  completionRate: number;
  tokensSold: number;
  tokensUsed: number;
}

export default function TokensCharts({
  categories,
}: {
  categories: CategoryData[];
}) {
  return (
    <Card
      title="Token Completion by Category"
      subtitle="Green ≥80%, Yellow ≥50%, Red <50%"
    >
      <div className="h-[400px]">
        <TokenCompletionChart data={categories} />
      </div>
    </Card>
  );
}
