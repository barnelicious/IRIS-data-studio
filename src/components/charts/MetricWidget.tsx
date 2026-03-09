"use client";

import { DataPoint } from "@/types/dashboard";
import { TrendingUp } from "lucide-react";

interface Props {
  data: DataPoint[];
  dataKey: string;
  color: string;
}

export default function MetricWidget({ data, dataKey, color }: Props) {
  const total = data.reduce((sum, d) => sum + (Number(d[dataKey]) || 0), 0);
  const formatted =
    total >= 1000
      ? `${(total / 1000).toFixed(1)}k`
      : total.toLocaleString();

  const lastTwo = data.slice(-2);
  const change =
    lastTwo.length === 2
      ? (((Number(lastTwo[1][dataKey]) - Number(lastTwo[0][dataKey])) /
          Number(lastTwo[0][dataKey])) *
          100)
      : 0;

  return (
    <div className="flex flex-col items-center justify-center h-full gap-1">
      <div className="text-3xl font-bold" style={{ color }}>
        {formatted}
      </div>
      <div className="flex items-center gap-1 text-sm" style={{ color: change >= 0 ? "#10b981" : "#ef4444" }}>
        <TrendingUp size={14} className={change < 0 ? "rotate-180" : ""} />
        <span>{Math.abs(change).toFixed(1)}%</span>
      </div>
    </div>
  );
}
