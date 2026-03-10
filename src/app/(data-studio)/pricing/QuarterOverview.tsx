"use client";

import KPICard from "@/components/ui/KPICard";
import Card from "@/components/ui/Card";
import {
  Target,
  TrendingUp,
  Clock,
  ShieldCheck,
} from "lucide-react";
import type { QuarterConfig, QuarterProgress } from "@/lib/pricing-engine";
import {
  overheadCoverage,
  pricingPressure,
  quarterProgressRatio,
} from "@/lib/pricing-engine";

interface Props {
  config: QuarterConfig;
  progress: QuarterProgress;
  avgTokenPrice: number;
}

export default function QuarterOverview({ config, progress, avgTokenPrice }: Props) {
  const coverage = overheadCoverage(config, progress);
  const coveragePct = Math.round(coverage * 1000) / 10;
  const pressure = pricingPressure(config, progress);
  const timeProgress = Math.round(quarterProgressRatio(progress) * 100);
  const remainingOverhead = Math.max(0, config.quarterlyOverhead - progress.revenueToDate);

  const pressureColor =
    pressure.level === "low"
      ? "#4ade80"
      : pressure.level === "moderate"
        ? "#f59e0b"
        : "#f87171";

  const pressureLabel =
    pressure.level === "low"
      ? "Relaxed"
      : pressure.level === "moderate"
        ? "On Track"
        : "Aggressive";

  return (
    <div className="space-y-6">
      {/* KPI row */}
      <div className="grid grid-cols-4 gap-4">
        <KPICard
          label="Overhead Coverage"
          value={`${coveragePct}%`}
          subtitle={`€${Math.round(progress.revenueToDate / 1000)}k of €${Math.round(config.quarterlyOverhead / 1000)}k`}
          icon={ShieldCheck}
          accentColor={coveragePct >= 100 ? "#4ade80" : coveragePct >= 75 ? "#f59e0b" : "#f87171"}
          trend={{ value: coveragePct >= 100 ? 100 : Math.round(coveragePct - timeProgress), label: "vs time" }}
        />
        <KPICard
          label="Pricing Pressure"
          value={pressureLabel}
          subtitle={`${pressure.factor > 0 ? "+" : ""}${Math.round(pressure.factor * 100)}% adjustment`}
          icon={Target}
          accentColor={pressureColor}
        />
        <KPICard
          label="Quarter Progress"
          value={`${timeProgress}%`}
          subtitle={`Day ${progress.daysElapsed} of ${progress.totalDays} — ${config.quarterLabel}`}
          icon={Clock}
          accentColor="#3b82f6"
        />
        <KPICard
          label="Avg Token Price"
          value={`€${avgTokenPrice}`}
          subtitle={`Floor: €${config.minTokenPrice}`}
          icon={TrendingUp}
          accentColor="#8b5cf6"
        />
      </div>

      {/* Overhead progress bar */}
      <Card title="Quarterly Break-Even Tracker" subtitle={`${config.quarterLabel} — €${remainingOverhead.toLocaleString()} remaining to cover`}>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Overhead: €{config.quarterlyOverhead.toLocaleString()}</span>
            <span>Revenue: €{progress.revenueToDate.toLocaleString()}</span>
          </div>
          <div className="relative h-4 bg-[#1e2130] rounded-full overflow-hidden">
            {/* Time progress marker */}
            <div
              className="absolute top-0 h-full w-0.5 bg-white/30 z-10"
              style={{ left: `${timeProgress}%` }}
            />
            {/* Revenue coverage bar */}
            <div
              className="absolute top-0 left-0 h-full rounded-full transition-all duration-500"
              style={{
                width: `${Math.min(coveragePct, 100)}%`,
                background: coveragePct >= 100
                  ? "linear-gradient(90deg, #4ade80, #22c55e)"
                  : coveragePct >= 75
                    ? "linear-gradient(90deg, #f59e0b, #eab308)"
                    : "linear-gradient(90deg, #f87171, #ef4444)",
              }}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Quarter start</span>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-white/30 inline-block" />
                Time progress ({timeProgress}%)
              </span>
              <span className="flex items-center gap-1">
                <span
                  className="w-2 h-2 rounded-full inline-block"
                  style={{
                    background: coveragePct >= 100 ? "#4ade80" : coveragePct >= 75 ? "#f59e0b" : "#f87171",
                  }}
                />
                Revenue coverage ({coveragePct}%)
              </span>
            </div>
            <span>Quarter end</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
