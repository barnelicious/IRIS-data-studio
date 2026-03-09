"use client";

import { useState, useCallback } from "react";
import { ResponsiveGridLayout, useContainerWidth, verticalCompactor } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import { ChartType } from "@/types/dashboard";
import { sampleDatasets } from "@/lib/sample-data";
import { createDefaultDashboard, createWidget } from "@/lib/dashboard-store";
import WidgetCard from "./WidgetCard";
import AddWidgetPanel from "./AddWidgetPanel";
import { Plus, LayoutDashboard } from "lucide-react";

interface LayoutItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  minH?: number;
}

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(() => createDefaultDashboard());
  const [showAddPanel, setShowAddPanel] = useState(false);
  const { width, containerRef } = useContainerWidth();

  const layouts: LayoutItem[] = dashboard.widgets.map((w) => ({
    i: w.id,
    x: w.layout.x,
    y: w.layout.y,
    w: w.layout.w,
    h: w.layout.h,
    minW: 2,
    minH: 2,
  }));

  const handleLayoutChange = useCallback(
    (newLayout: readonly LayoutItem[]) => {
      setDashboard((prev) => ({
        ...prev,
        widgets: prev.widgets.map((w) => {
          const l = newLayout.find((item) => item.i === w.id);
          if (!l) return w;
          return {
            ...w,
            layout: { x: l.x, y: l.y, w: l.w, h: l.h },
          };
        }),
      }));
    },
    []
  );

  const handleRemoveWidget = useCallback((id: string) => {
    setDashboard((prev) => ({
      ...prev,
      widgets: prev.widgets.filter((w) => w.id !== id),
    }));
  }, []);

  const handleAddWidget = useCallback(
    (type: ChartType, datasetId: string, dataKey: string, title: string) => {
      const widget = createWidget(type, datasetId, dataKey, title);
      setDashboard((prev) => ({
        ...prev,
        widgets: [...prev.widgets, widget],
      }));
    },
    []
  );

  const getDataset = (id: string) => sampleDatasets.find((d) => d.id === id)!;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b border-[var(--border)]">
        <div className="max-w-[1600px] mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LayoutDashboard size={24} className="text-[var(--primary)]" />
            <div>
              <h1 className="text-lg font-semibold">{dashboard.name}</h1>
              <p className="text-xs text-[var(--muted-foreground)]">
                {dashboard.widgets.length} widgets
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowAddPanel(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[var(--primary)] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity shadow-sm"
          >
            <Plus size={16} />
            Add Widget
          </button>
        </div>
      </header>

      {/* Grid */}
      <main className="max-w-[1600px] mx-auto px-6 py-6" ref={containerRef}>
        {dashboard.widgets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-[var(--muted-foreground)]">
            <LayoutDashboard size={48} className="mb-4 opacity-40" />
            <p className="text-lg font-medium mb-2">No widgets yet</p>
            <p className="text-sm mb-4">Add your first widget to get started</p>
            <button
              onClick={() => setShowAddPanel(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[var(--primary)] text-white rounded-lg text-sm font-medium"
            >
              <Plus size={16} />
              Add Widget
            </button>
          </div>
        ) : width > 0 ? (
          <ResponsiveGridLayout
            className="layout"
            layouts={{ lg: layouts }}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
            rowHeight={80}
            width={width}
            dragConfig={{ handle: ".drag-handle" }}
            onLayoutChange={handleLayoutChange}
            compactor={verticalCompactor}
            margin={[16, 16]}
          >
            {dashboard.widgets.map((widget) => (
              <div key={widget.id}>
                <WidgetCard
                  widget={widget}
                  dataset={getDataset(widget.datasetId)}
                  onRemove={handleRemoveWidget}
                />
              </div>
            ))}
          </ResponsiveGridLayout>
        ) : null}
      </main>

      {/* Add Widget Panel */}
      {showAddPanel && (
        <AddWidgetPanel
          datasets={sampleDatasets}
          onAdd={handleAddWidget}
          onClose={() => setShowAddPanel(false)}
        />
      )}
    </div>
  );
}
