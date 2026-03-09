"use client";

import { DataPoint } from "@/types/dashboard";

interface Props {
  data: DataPoint[];
  columns: string[];
}

export default function TableWidget({ data, columns }: Props) {
  return (
    <div className="h-full overflow-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[var(--border)]">
            {columns.map((col) => (
              <th
                key={col}
                className="text-left py-2 px-3 font-semibold text-[var(--muted-foreground)] uppercase text-xs sticky top-0 bg-white"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-b border-[var(--border)] hover:bg-[var(--muted)] transition-colors">
              {columns.map((col) => (
                <td key={col} className="py-2 px-3">
                  {typeof row[col] === "number" ? Number(row[col]).toLocaleString() : row[col]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
