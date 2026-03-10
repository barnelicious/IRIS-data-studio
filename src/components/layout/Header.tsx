"use client";

import { usePathname } from "next/navigation";
import { Bell } from "lucide-react";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/pricing": "Token Pricing",
  "/margins": "Margin Analysis",
  "/tokens": "Token Management",
  "/projects": "Projects",
};

export default function Header() {
  const pathname = usePathname();
  const title = pageTitles[pathname] ?? "IRIS Data Studio";

  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-between px-8 bg-[#0f1117]/80 backdrop-blur-sm border-b border-[#1e2130]"
      style={{ height: "var(--header-height)" }}
    >
      <h1 className="text-base font-semibold text-white">{title}</h1>
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-lg text-gray-400 hover:text-gray-200 hover:bg-[#161926] transition-colors">
          <Bell size={18} />
        </button>
        <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-xs font-medium text-blue-400">
          KG
        </div>
      </div>
    </header>
  );
}
