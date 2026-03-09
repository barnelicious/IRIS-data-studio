import { seedProjects, PROJECT_CATEGORIES } from "@/lib/seed-data";
import Card from "@/components/ui/Card";
import StatusBadge from "@/components/ui/StatusBadge";
import ProjectsFilter from "./ProjectsFilter";

export default function ProjectsPage() {
  const statusSummary = {
    total: seedProjects.length,
    active: seedProjects.filter((p) => p.status === "ACTIVE").length,
    completed: seedProjects.filter((p) => p.status === "COMPLETED").length,
    atRisk: seedProjects.filter((p) => p.status === "AT_RISK").length,
    paused: seedProjects.filter((p) => p.status === "PAUSED").length,
  };

  return (
    <div className="space-y-6">
      {/* Status summary pills */}
      <div className="flex flex-wrap gap-3">
        {[
          { label: "All", count: statusSummary.total, color: "text-white bg-white/10" },
          { label: "Active", count: statusSummary.active, color: "text-emerald-400 bg-emerald-500/10" },
          { label: "Completed", count: statusSummary.completed, color: "text-blue-400 bg-blue-500/10" },
          { label: "At Risk", count: statusSummary.atRisk, color: "text-red-400 bg-red-500/10" },
          { label: "Paused", count: statusSummary.paused, color: "text-yellow-400 bg-yellow-500/10" },
        ].map((s) => (
          <div
            key={s.label}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${s.color}`}
          >
            {s.label}
            <span className="text-xs opacity-70">{s.count}</span>
          </div>
        ))}
      </div>

      {/* Projects Table with client-side filtering */}
      <ProjectsFilter
        projects={seedProjects}
        categories={[...PROJECT_CATEGORIES]}
      />
    </div>
  );
}
