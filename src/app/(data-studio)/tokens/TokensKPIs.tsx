"use client";

import { Coins, AlertTriangle, TrendingDown, DollarSign } from "lucide-react";
import KPICard from "@/components/ui/KPICard";

interface Props {
  tokenCompletionRate: number;
  totalTokensUsed: number;
  totalTokensSold: number;
  unusedTokens: number;
  revenueAtRisk: number;
  lowCompletionCount: number;
}

export default function TokensKPIs(props: Props) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <KPICard
        label="Token Completion Rate"
        value={`${props.tokenCompletionRate}%`}
        subtitle={`${props.totalTokensUsed} of ${props.totalTokensSold} used`}
        icon={Coins}
        accentColor="#f59e0b"
      />
      <KPICard
        label="Unused Tokens"
        value={`${props.unusedTokens}`}
        subtitle="Tokens not yet consumed"
        icon={TrendingDown}
        accentColor="#f87171"
      />
      <KPICard
        label="Revenue at Risk"
        value={`€${(props.revenueAtRisk / 1000).toFixed(0)}K`}
        subtitle="Value of unused tokens"
        icon={DollarSign}
        accentColor="#f59e0b"
      />
      <KPICard
        label="Low Completion Projects"
        value={`${props.lowCompletionCount}`}
        subtitle="Below 40% completion"
        icon={AlertTriangle}
        accentColor="#f87171"
      />
    </div>
  );
}
