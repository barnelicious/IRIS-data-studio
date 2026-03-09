"use client";

import { useState } from "react";
import { ChartType, Dataset } from "@/types/dashboard";
import { BarChart3, LineChart, PieChart, TrendingUp, Table, AreaChart, X } from "lucide-react";

const chartTypes: { type: ChartType; label: string; icon: React.ReactNode }[] = [
  { type: "metric", label: "Metric", icon: <TrendingUp size={20} /> },
  { type: "bar", label: "Bar Chart", icon: <BarChart3 size={20} /> },
  { type: "line", label: "Line Chart", icon: <LineChart size={20} /> },
  { type: "area", label: "Area Chart", icon: <AreaChart size={20} /> },
  { type: "pie", label: "Pie Chart", icon: <PieChart size={20} /> },
  { type: "table", label: "Table", icon: <Table size={20} /> },
];

interface Props {
  datasets: Dataset[];
  onAdd: (type: ChartType, datasetId: string, dataKey: string, title: string) => void;
  onClose: () => void;
}

export default function AddWidgetPanel({ datasets, onAdd, onClose }: Props) {
  const [selectedType, setSelectedType] = useState<ChartType>("bar");
  const [selectedDataset, setSelectedDataset] = useState(datasets[0]?.id ?? "");
  const [selectedColumn, setSelectedColumn] = useState("");
  const [title, setTitle] = useState("");

  const dataset = datasets.find((d) => d.id === selectedDataset);
  const numericColumns = dataset?.columns.filter((c) => c !== "name") ?? [];

  const handleAdd = () => {
    const col = selectedColumn || numericColumns[0] || "";
    const widgetTitle = title || `${selectedType} - ${col}`;
    onAdd(selectedType, selectedDataset, col, widgetTitle);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Add Widget</h2>
          <button onClick={onClose} className="p-1 rounded hover:bg-[var(--muted)] text-[var(--muted-foreground)]">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-5">
          {/* Chart Type */}
          <div>
            <label className="text-sm font-medium text-[var(--muted-foreground)] mb-2 block">Chart Type</label>
            <div className="grid grid-cols-3 gap-2">
              {chartTypes.map((ct) => (
                <button
                  key={ct.type}
                  onClick={() => setSelectedType(ct.type)}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-lg border-2 transition-all ${
                    selectedType === ct.type
                      ? "border-[var(--primary)] bg-blue-50 text-[var(--primary)]"
                      : "border-[var(--border)] hover:border-[var(--muted-foreground)]"
                  }`}
                >
                  {ct.icon}
                  <span className="text-xs font-medium">{ct.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Dataset */}
          <div>
            <label className="text-sm font-medium text-[var(--muted-foreground)] mb-2 block">Dataset</label>
            <select
              value={selectedDataset}
              onChange={(e) => {
                setSelectedDataset(e.target.value);
                setSelectedColumn("");
              }}
              className="w-full px-3 py-2 rounded-lg border border-[var(--border)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            >
              {datasets.map((ds) => (
                <option key={ds.id} value={ds.id}>
                  {ds.name}
                </option>
              ))}
            </select>
          </div>

          {/* Column */}
          {selectedType !== "table" && (
            <div>
              <label className="text-sm font-medium text-[var(--muted-foreground)] mb-2 block">Data Column</label>
              <select
                value={selectedColumn || numericColumns[0] || ""}
                onChange={(e) => setSelectedColumn(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[var(--border)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              >
                {numericColumns.map((col) => (
                  <option key={col} value={col}>
                    {col}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Title */}
          <div>
            <label className="text-sm font-medium text-[var(--muted-foreground)] mb-2 block">Widget Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Auto-generated if empty"
              className="w-full px-3 py-2 rounded-lg border border-[var(--border)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
          </div>

          <button
            onClick={handleAdd}
            className="w-full py-2.5 bg-[var(--primary)] text-white rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
          >
            Add Widget
          </button>
        </div>
      </div>
    </div>
  );
}
