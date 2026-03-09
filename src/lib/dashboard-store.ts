import { Dashboard, Widget, ChartType } from "@/types/dashboard";
import { CHART_COLORS } from "./sample-data";

let nextId = 1;

export function createWidget(
  type: ChartType,
  datasetId: string,
  dataKey: string,
  title: string,
  layout?: Partial<Widget["layout"]>
): Widget {
  const id = `widget-${nextId++}`;
  return {
    id,
    title,
    type,
    dataKey,
    datasetId,
    color: CHART_COLORS[nextId % CHART_COLORS.length],
    layout: {
      x: layout?.x ?? 0,
      y: layout?.y ?? Infinity,
      w: layout?.w ?? 4,
      h: layout?.h ?? 3,
    },
  };
}

export function createDefaultDashboard(): Dashboard {
  return {
    id: "default",
    name: "Sales Dashboard",
    widgets: [
      createWidget("metric", "sales", "revenue", "Total Revenue", { x: 0, y: 0, w: 3, h: 2 }),
      createWidget("metric", "sales", "orders", "Total Orders", { x: 3, y: 0, w: 3, h: 2 }),
      createWidget("metric", "sales", "customers", "Total Customers", { x: 6, y: 0, w: 3, h: 2 }),
      createWidget("metric", "sales", "profit", "Total Profit", { x: 9, y: 0, w: 3, h: 2 }),
      createWidget("bar", "sales", "revenue", "Monthly Revenue", { x: 0, y: 2, w: 6, h: 4 }),
      createWidget("line", "sales", "orders", "Order Trends", { x: 6, y: 2, w: 6, h: 4 }),
      createWidget("area", "traffic", "visitors", "Daily Visitors", { x: 0, y: 6, w: 8, h: 4 }),
      createWidget("pie", "products", "sales", "Sales by Category", { x: 8, y: 6, w: 4, h: 4 }),
      createWidget("table", "sales", "revenue", "Sales Data", { x: 0, y: 10, w: 12, h: 4 }),
    ],
  };
}
