"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  TrendingUp,
  Coins,
  FolderKanban,
  Database,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/margins", label: "Margins", icon: TrendingUp },
  { href: "/tokens", label: "Tokens", icon: Coins },
  { href: "/projects", label: "Projects", icon: FolderKanban },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="fixed top-0 left-0 h-screen flex flex-col bg-[#0c0e14] border-r border-[#1e2130]"
      style={{ width: "var(--sidebar-width)" }}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-3 px-5 border-b border-[#1e2130]"
        style={{ height: "var(--header-height)" }}
      >
        <Database size={22} className="text-blue-400" />
        <div>
          <span className="text-sm font-semibold text-white tracking-wide">
            IRIS
          </span>
          <span className="text-sm text-gray-400 ml-1.5">Data Studio</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-500/10 text-blue-400"
                  : "text-gray-400 hover:text-gray-200 hover:bg-[#161926]"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-[#1e2130]">
        <div className="text-xs text-gray-500">KGG Data Studio</div>
        <div className="text-xs text-gray-600 mt-0.5">Phase 1 PoC</div>
      </div>
    </aside>
  );
}
