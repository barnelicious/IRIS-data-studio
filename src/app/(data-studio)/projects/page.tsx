import { getProjects, PROJECT_CATEGORIES } from "@/lib/db";
import ProjectsFilter from "./ProjectsFilter";

export default async function ProjectsPage() {
  const allProjects = await getProjects({ limit: 100 });

  const statusSummary = {
    total: allProjects.length,
    active: allProjects.filter((p) => p.status === "ACTIVE").length,
    completed: allProjects.filter((p) => p.status === "COMPLETED").length,
    atRisk: allProjects.filter((p) => p.status === "AT_RISK").length,
    paused: allProjects.filter((p) => p.status === "PAUSED").length,
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
        projects={allProjects}
        categories={[...PROJECT_CATEGORIES]}
      />
    </div>
  );
}
