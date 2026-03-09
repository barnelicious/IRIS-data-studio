"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { DataPoint } from "@/types/dashboard";
import { CHART_COLORS } from "@/lib/sample-data";

interface Props {
  data: DataPoint[];
  dataKey: string;
}

export default function PieChartWidget({ data, dataKey }: Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          dataKey={dataKey}
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius="70%"
          innerRadius="40%"
          paddingAngle={2}
          label={({ name, percent }: { name?: string; percent?: number }) => `${name ?? ""} ${((percent ?? 0) * 100).toFixed(0)}%`}
          labelLine={{ stroke: "#94a3b8" }}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            background: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            fontSize: "13px",
          }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
