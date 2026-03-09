"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Props {
  label: string;
  value: string;
  subtitle?: string;
  trend?: { value: number; label: string };
  icon?: LucideIcon;
  accentColor?: string;
}

export default function KPICard({
  label,
  value,
  subtitle,
  trend,
  icon: Icon,
  accentColor = "#3b82f6",
}: Props) {
  return (
    <div className="bg-[#161926] border border-[#1e2130] rounded-xl p-5 relative overflow-hidden">
      <div
        className="absolute top-0 left-0 w-1 h-full"
        style={{ background: accentColor }}
      />
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
            {label}
          </div>
          <div className="text-2xl font-bold text-white">{value}</div>
          {subtitle && (
            <div className="text-xs text-gray-500 mt-1">{subtitle}</div>
          )}
          {trend && (
            <div
              className="flex items-center gap-1 mt-2 text-xs font-medium"
              style={{ color: trend.value >= 0 ? "#4ade80" : "#f87171" }}
            >
              {trend.value >= 0 ? (
                <TrendingUp size={12} />
              ) : (
                <TrendingDown size={12} />
              )}
              <span>
                {trend.value > 0 ? "+" : ""}
                {trend.value}% {trend.label}
              </span>
            </div>
          )}
        </div>
        {Icon && (
          <div
            className="p-2 rounded-lg"
            style={{ background: `${accentColor}15` }}
          >
            <Icon size={20} style={{ color: accentColor }} />
          </div>
        )}
      </div>
    </div>
  );
}
