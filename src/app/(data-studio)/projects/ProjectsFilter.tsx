"use client";

import { useState, useMemo } from "react";
import Card from "@/components/ui/Card";
import StatusBadge from "@/components/ui/StatusBadge";
import { Search } from "lucide-react";
import type { SeedProject } from "@/lib/seed-data";

interface Props {
  projects: SeedProject[];
  categories: string[];
}

export default function ProjectsFilter({ projects, categories }: Props) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (statusFilter !== "ALL" && p.status !== statusFilter) return false;
      if (categoryFilter !== "ALL" && p.category !== categoryFilter)
        return false;
      if (
        search &&
        !p.name.toLowerCase().includes(search.toLowerCase()) &&
        !p.client.toLowerCase().includes(search.toLowerCase())
      )
        return false;
      return true;
    });
  }, [projects, search, statusFilter, categoryFilter]);

  return (
    <Card title={`Projects (${filtered.length})`}>
      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <input
            type="text"
            placeholder="Search projects or clients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-[#0f1117] border border-[#1e2130] rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 bg-[#0f1117] border border-[#1e2130] rounded-lg text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="ALL">All Statuses</option>
          <option value="ACTIVE">Active</option>
          <option value="COMPLETED">Completed</option>
          <option value="AT_RISK">At Risk</option>
          <option value="PAUSED">Paused</option>
        </select>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-2 bg-[#0f1117] border border-[#1e2130] rounded-lg text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="ALL">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#1e2130]">
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">
                Project
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">
                Client
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">
                Category
              </th>
              <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 uppercase">
                Status
              </th>
              <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase">
                Tokens
              </th>
              <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase">
                Margin
              </th>
              <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 uppercase">
                Tier
              </th>
              <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase">
                Started
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => {
              const completion = Math.round(
                (p.tokensUsed / p.tokensSold) * 100
              );
              return (
                <tr
                  key={p.id}
                  className="border-b border-[#1e2130] hover:bg-[#1e2130]/50 transition-colors"
                >
                  <td className="py-3 px-4">
                    <div className="text-white font-medium">{p.name}</div>
                  </td>
                  <td className="py-3 px-4 text-gray-400">{p.client}</td>
                  <td className="py-3 px-4 text-gray-400 text-xs">
                    {p.category}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <StatusBadge status={p.status} />
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <span className="text-gray-300">
                        {p.tokensUsed}/{p.tokensSold}
                      </span>
                      <div className="w-12 h-1.5 bg-[#0f1117] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${completion}%`,
                            background:
                              completion >= 70
                                ? "#4ade80"
                                : completion >= 40
                                  ? "#f59e0b"
                                  : "#f87171",
                          }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span
                      className="font-semibold"
                      style={{
                        color:
                          p.margin >= 60
                            ? "#4ade80"
                            : p.margin >= 50
                              ? "#f59e0b"
                              : "#f87171",
                      }}
                    >
                      {p.margin}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        p.tokenTier === 1
                          ? "bg-blue-500/10 text-blue-400"
                          : "bg-purple-500/10 text-purple-400"
                      }`}
                    >
                      T{p.tokenTier}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right text-gray-400 text-xs">
                    {new Date(p.startDate).toLocaleDateString("en-GB", {
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <div className="py-8 text-center text-gray-500">
          No projects match your filters
        </div>
      )}
    </Card>
  );
}
