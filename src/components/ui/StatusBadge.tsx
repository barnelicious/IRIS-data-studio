const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
  ACTIVE: { bg: "bg-emerald-500/10", text: "text-emerald-400", label: "Active" },
  COMPLETED: { bg: "bg-blue-500/10", text: "text-blue-400", label: "Completed" },
  AT_RISK: { bg: "bg-red-500/10", text: "text-red-400", label: "At Risk" },
  PAUSED: { bg: "bg-yellow-500/10", text: "text-yellow-400", label: "Paused" },
};

export default function StatusBadge({ status }: { status: string }) {
  const config = statusConfig[status] ?? statusConfig.ACTIVE;
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
    >
      {config.label}
    </span>
  );
}
