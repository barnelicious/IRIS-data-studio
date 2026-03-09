"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

interface DataPoint {
  month: string;
  revenue: number;
  cost: number;
  margin: number;
}

interface Props {
  data: DataPoint[];
  targetMargin?: number;
}

export default function MarginTrendChart({ data, targetMargin = 60 }: Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="marginGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e2130" />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 11, fill: "#64748b" }}
          stroke="#1e2130"
        />
        <YAxis
          domain={[45, 65]}
          tick={{ fontSize: 11, fill: "#64748b" }}
          stroke="#1e2130"
          tickFormatter={(v) => `${v}%`}
        />
        <Tooltip
          contentStyle={{
            background: "#1e2130",
            border: "1px solid #2d3348",
            borderRadius: "8px",
            fontSize: "13px",
            color: "#e2e8f0",
          }}
          formatter={(value) => [`${value}%`, "Margin"]}
        />
        <ReferenceLine
          y={targetMargin}
          stroke="#4ade80"
          strokeDasharray="6 4"
          label={{
            value: `Target ${targetMargin}%`,
            position: "right",
            fill: "#4ade80",
            fontSize: 11,
          }}
        />
        <Area
          type="monotone"
          dataKey="margin"
          stroke="#3b82f6"
          strokeWidth={2}
          fill="url(#marginGradient)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
