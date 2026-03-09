"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from "recharts";

interface CategoryData {
  category: string;
  avgMargin: number;
  revenue: number;
  projects: number;
}

export default function CategoryMarginChart({ data }: { data: CategoryData[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 10, right: 30, left: 20, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#1e2130" horizontal={false} />
        <XAxis
          type="number"
          domain={[0, 70]}
          tick={{ fontSize: 11, fill: "#64748b" }}
          stroke="#1e2130"
          tickFormatter={(v) => `${v}%`}
        />
        <YAxis
          dataKey="category"
          type="category"
          width={160}
          tick={{ fontSize: 11, fill: "#94a3b8" }}
          stroke="#1e2130"
        />
        <Tooltip
          contentStyle={{
            background: "#1e2130",
            border: "1px solid #2d3348",
            borderRadius: "8px",
            fontSize: "13px",
            color: "#e2e8f0",
          }}
          formatter={(value) => [`${value}%`, "Avg Margin"]}
        />
        <ReferenceLine x={60} stroke="#4ade80" strokeDasharray="6 4" />
        <Bar dataKey="avgMargin" radius={[0, 4, 4, 0]}>
          {data.map((entry, i) => (
            <Cell
              key={i}
              fill={entry.avgMargin >= 60 ? "#4ade80" : entry.avgMargin >= 50 ? "#3b82f6" : "#f87171"}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
