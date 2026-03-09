"use client";

import { TrendingUp, Target, AlertTriangle } from "lucide-react";
import KPICard from "@/components/ui/KPICard";

interface Props {
  overallMargin: number;
  targetMargin: number;
  tier1Margin: number;
  tier2Margin: number;
  belowTargetCount: number;
  totalCategories: number;
}

export default function MarginsKPIs(props: Props) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <KPICard
        label="Overall Margin"
        value={`${props.overallMargin}%`}
        subtitle={`Target: ${props.targetMargin}%`}
        trend={{ value: -1.2, label: "vs last month" }}
        icon={TrendingUp}
        accentColor="#f87171"
      />
      <KPICard
        label="Tier 1 Margin"
        value={`${props.tier1Margin}%`}
        subtitle="Expert rate €0-400/hr"
        icon={Target}
        accentColor="#4ade80"
      />
      <KPICard
        label="Tier 2 Margin"
        value={`${props.tier2Margin}%`}
        subtitle="Expert rate €401-800/hr"
        icon={Target}
        accentColor="#f59e0b"
      />
      <KPICard
        label="Categories Below Target"
        value={`${props.belowTargetCount}`}
        subtitle={`of ${props.totalCategories} categories`}
        icon={AlertTriangle}
        accentColor="#f87171"
      />
    </div>
  );
}
