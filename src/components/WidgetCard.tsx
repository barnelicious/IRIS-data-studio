"use client";

import { Widget, Dataset } from "@/types/dashboard";
import { X, GripVertical } from "lucide-react";
import BarChartWidget from "./charts/BarChartWidget";
import LineChartWidget from "./charts/LineChartWidget";
import AreaChartWidget from "./charts/AreaChartWidget";
import PieChartWidget from "./charts/PieChartWidget";
import MetricWidget from "./charts/MetricWidget";
import TableWidget from "./charts/TableWidget";

interface Props {
  widget: Widget;
  dataset: Dataset;
  onRemove: (id: string) => void;
}

export default function WidgetCard({ widget, dataset, onRemove }: Props) {
  const renderChart = () => {
    switch (widget.type) {
      case "bar":
        return <BarChartWidget data={dataset.data} dataKey={widget.dataKey} color={widget.color} />;
      case "line":
        return <LineChartWidget data={dataset.data} dataKey={widget.dataKey} color={widget.color} />;
      case "area":
        return <AreaChartWidget data={dataset.data} dataKey={widget.dataKey} color={widget.color} />;
      case "pie":
        return <PieChartWidget data={dataset.data} dataKey={widget.dataKey} />;
      case "metric":
        return <MetricWidget data={dataset.data} dataKey={widget.dataKey} color={widget.color} />;
      case "table":
        return <TableWidget data={dataset.data} columns={dataset.columns} />;
      default:
        return <div className="flex items-center justify-center h-full text-[var(--muted-foreground)]">Unknown chart type</div>;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-[var(--border)] shadow-sm h-full flex flex-col overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--border)] bg-[var(--muted)]/50">
        <div className="flex items-center gap-2">
          <GripVertical size={14} className="text-[var(--muted-foreground)] cursor-grab active:cursor-grabbing drag-handle" />
          <h3 className="text-sm font-medium truncate">{widget.title}</h3>
        </div>
        <button
          onClick={() => onRemove(widget.id)}
          className="p-1 rounded hover:bg-[var(--muted)] text-[var(--muted-foreground)] hover:text-[var(--destructive)] transition-colors"
        >
          <X size={14} />
        </button>
      </div>
      <div className="flex-1 p-3 min-h-0">{renderChart()}</div>
    </div>
  );
}
