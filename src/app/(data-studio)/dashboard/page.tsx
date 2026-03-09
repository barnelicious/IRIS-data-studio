export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Realized Margin", value: "54%", target: "60%" },
          { label: "Token Completion", value: "57%", target: "80%" },
          { label: "Active Projects", value: "42", target: null },
          { label: "Revenue at Risk", value: "€900K", target: null },
        ].map((kpi) => (
          <div
            key={kpi.label}
            className="bg-[#161926] border border-[#1e2130] rounded-xl p-5"
          >
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
              {kpi.label}
            </div>
            <div className="text-2xl font-bold text-white">{kpi.value}</div>
            {kpi.target && (
              <div className="text-xs text-gray-500 mt-1">
                Target: {kpi.target}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="bg-[#161926] border border-[#1e2130] rounded-xl p-6 h-64 flex items-center justify-center text-gray-500">
        Chart widgets will be rendered here
      </div>
    </div>
  );
}
