import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export default function DataStudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <div style={{ marginLeft: "var(--sidebar-width)" }}>
        <Header />
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
