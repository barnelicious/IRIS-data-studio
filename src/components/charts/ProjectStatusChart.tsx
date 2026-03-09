"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface Props {
  active: number;
  completed: number;
  atRisk: number;
  paused: number;
}

const COLORS: Record<string, string> = {
  Active: "#4ade80",
  Completed: "#3b82f6",
  "At Risk": "#f87171",
  Paused: "#f59e0b",
};

export default function ProjectStatusChart({ active, completed, atRisk, paused }: Props) {
  const data = [
    { name: "Active", value: active },
    { name: "Completed", value: completed },
    { name: "At Risk", value: atRisk },
    { name: "Paused", value: paused },
  ].filter((d) => d.value > 0);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius="75%"
          innerRadius="50%"
          paddingAngle={3}
          strokeWidth={0}
        >
          {data.map((entry) => (
            <Cell key={entry.name} fill={COLORS[entry.name]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            background: "#1e2130",
            border: "1px solid #2d3348",
            borderRadius: "8px",
            fontSize: "13px",
            color: "#e2e8f0",
          }}
        />
        <Legend
          wrapperStyle={{ fontSize: "12px", color: "#94a3b8" }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
