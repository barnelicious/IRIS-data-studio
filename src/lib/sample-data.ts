import { Dataset } from "@/types/dashboard";

export const sampleDatasets: Dataset[] = [
  {
    id: "sales",
    name: "Monthly Sales",
    columns: ["name", "revenue", "orders", "customers", "profit"],
    data: [
      { name: "Jan", revenue: 4200, orders: 120, customers: 95, profit: 1800 },
      { name: "Feb", revenue: 3800, orders: 98, customers: 82, profit: 1500 },
      { name: "Mar", revenue: 5100, orders: 145, customers: 110, profit: 2200 },
      { name: "Apr", revenue: 4700, orders: 132, customers: 105, profit: 2000 },
      { name: "May", revenue: 5800, orders: 168, customers: 130, profit: 2600 },
      { name: "Jun", revenue: 6200, orders: 185, customers: 148, profit: 2900 },
      { name: "Jul", revenue: 5500, orders: 155, customers: 125, profit: 2400 },
      { name: "Aug", revenue: 6800, orders: 198, customers: 160, profit: 3200 },
      { name: "Sep", revenue: 7200, orders: 210, customers: 172, profit: 3500 },
      { name: "Oct", revenue: 6500, orders: 188, customers: 150, profit: 3000 },
      { name: "Nov", revenue: 8100, orders: 240, customers: 195, profit: 3900 },
      { name: "Dec", revenue: 9200, orders: 275, customers: 220, profit: 4500 },
    ],
  },
  {
    id: "traffic",
    name: "Website Traffic",
    columns: ["name", "visitors", "pageViews", "bounceRate", "avgSession"],
    data: [
      { name: "Mon", visitors: 1200, pageViews: 3400, bounceRate: 42, avgSession: 3.2 },
      { name: "Tue", visitors: 1450, pageViews: 4100, bounceRate: 38, avgSession: 3.8 },
      { name: "Wed", visitors: 1380, pageViews: 3900, bounceRate: 40, avgSession: 3.5 },
      { name: "Thu", visitors: 1520, pageViews: 4300, bounceRate: 35, avgSession: 4.1 },
      { name: "Fri", visitors: 1100, pageViews: 2900, bounceRate: 45, avgSession: 2.8 },
      { name: "Sat", visitors: 800, pageViews: 2100, bounceRate: 50, avgSession: 2.4 },
      { name: "Sun", visitors: 750, pageViews: 1900, bounceRate: 52, avgSession: 2.2 },
    ],
  },
  {
    id: "products",
    name: "Product Categories",
    columns: ["name", "sales", "inventory", "returns", "rating"],
    data: [
      { name: "Electronics", sales: 45000, inventory: 320, returns: 45, rating: 4.5 },
      { name: "Clothing", sales: 32000, inventory: 580, returns: 78, rating: 4.2 },
      { name: "Home & Garden", sales: 28000, inventory: 420, returns: 32, rating: 4.6 },
      { name: "Sports", sales: 18000, inventory: 250, returns: 22, rating: 4.4 },
      { name: "Books", sales: 12000, inventory: 890, returns: 15, rating: 4.7 },
      { name: "Toys", sales: 15000, inventory: 340, returns: 28, rating: 4.3 },
    ],
  },
];

export const CHART_COLORS = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
  "#06b6d4",
  "#84cc16",
];
