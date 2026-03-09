"use client";

import {
  TrendingUp,
  Coins,
  FolderKanban,
  AlertTriangle,
  DollarSign,
  Target,
} from "lucide-react";
import KPICard from "@/components/ui/KPICard";

interface Props {
  realizedMargin: number;
  targetMargin: number;
  tokenCompletionRate: number;
  totalTokensUsed: number;
  totalTokensSold: number;
  activeProjects: number;
  totalProjects: number;
  atRiskProjects: number;
  revenueAtRisk: number;
  avgTokenPrice: number;
}

export default function DashboardKPIs(props: Props) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      <KPICard
        label="Realized Margin"
        value={`${props.realizedMargin}%`}
        subtitle={`Target: ${props.targetMargin}%`}
        trend={{ value: -1.2, label: "vs last month" }}
        icon={TrendingUp}
        accentColor={props.realizedMargin >= 60 ? "#4ade80" : "#f87171"}
      />
      <KPICard
        label="Token Completion"
        value={`${props.tokenCompletionRate}%`}
        subtitle={`${props.totalTokensUsed} of ${props.totalTokensSold} tokens`}
        trend={{ value: -2.5, label: "vs last month" }}
        icon={Coins}
        accentColor={props.tokenCompletionRate >= 70 ? "#4ade80" : "#f59e0b"}
      />
      <KPICard
        label="Active Projects"
        value={`${props.activeProjects}`}
        subtitle={`${props.totalProjects} total`}
        icon={FolderKanban}
        accentColor="#3b82f6"
      />
      <KPICard
        label="At Risk"
        value={`${props.atRiskProjects}`}
        subtitle="Projects need attention"
        icon={AlertTriangle}
        accentColor="#f87171"
      />
      <KPICard
        label="Revenue at Risk"
        value={`€${(props.revenueAtRisk / 1000).toFixed(0)}K`}
        subtitle="Unused token value"
        icon={DollarSign}
        accentColor="#f59e0b"
      />
      <KPICard
        label="Avg Token Price"
        value={`€${props.avgTokenPrice}`}
        subtitle="Min floor: €700"
        icon={Target}
        accentColor="#8b5cf6"
      />
    </div>
  );
}
