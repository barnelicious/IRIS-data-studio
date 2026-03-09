"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface DataPoint {
  month: string;
  revenue: number;
  cost: number;
}

export default function RevenueChart({ data }: { data: DataPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e2130" />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 11, fill: "#64748b" }}
          stroke="#1e2130"
        />
        <YAxis
          tick={{ fontSize: 11, fill: "#64748b" }}
          stroke="#1e2130"
          tickFormatter={(v) => `€${(v / 1000).toFixed(0)}K`}
        />
        <Tooltip
          contentStyle={{
            background: "#1e2130",
            border: "1px solid #2d3348",
            borderRadius: "8px",
            fontSize: "13px",
            color: "#e2e8f0",
          }}
          formatter={(value, name) => [
            `€${Number(value).toLocaleString()}`,
            name === "revenue" ? "Revenue" : "Cost",
          ]}
        />
        <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        <Bar dataKey="cost" fill="#ef4444" opacity={0.6} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
