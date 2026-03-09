export type ChartType = "bar" | "line" | "area" | "pie" | "metric" | "table";

export interface DataPoint {
  name: string;
  [key: string]: string | number;
}

export interface Widget {
  id: string;
  title: string;
  type: ChartType;
  dataKey: string;
  datasetId: string;
  color: string;
  layout: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
}

export interface Dataset {
  id: string;
  name: string;
  data: DataPoint[];
  columns: string[];
}

export interface Dashboard {
  id: string;
  name: string;
  widgets: Widget[];
}
