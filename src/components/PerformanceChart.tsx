import { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useNavHistory } from "@/hooks/useNavHistory";

type TimeFilter = "1M" | "3M" | "6M" | "1Y" | "ALL";

interface Props {
  fundId: string | undefined;
  fundName: string;
}

const filterDays: Record<TimeFilter, number> = {
  "1M": 30,
  "3M": 90,
  "6M": 180,
  "1Y": 365,
  "ALL": Infinity,
};

const PerformanceChart = ({ fundId, fundName }: Props) => {
  const { data: navData, isLoading } = useNavHistory(fundId);
  const [filter, setFilter] = useState<TimeFilter>("ALL");

  const filteredData = useMemo(() => {
    if (!navData?.length) return [];
    if (filter === "ALL") return navData;
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - filterDays[filter]);
    const cutoffStr = cutoff.toISOString().split("T")[0];
    return navData.filter((d) => d.date >= cutoffStr);
  }, [navData, filter]);

  if (isLoading) {
    return (
      <div className="bg-card border border-border p-6 mb-6">
        <h3 className="font-serif text-lg font-bold mb-2 text-foreground">Performance</h3>
        <div className="h-64 flex items-center justify-center">
          <p className="text-muted-foreground text-sm">Loading chart data...</p>
        </div>
      </div>
    );
  }

  if (!filteredData.length) {
    return (
      <div className="bg-card border border-border p-6 mb-6">
        <h3 className="font-serif text-lg font-bold mb-2 text-foreground">Performance</h3>
        <p className="text-muted-foreground text-sm">
          Performance data will be available after sufficient trading history. Check back soon or contact us for the latest figures.
        </p>
      </div>
    );
  }

  const filters: TimeFilter[] = ["1M", "3M", "6M", "1Y", "ALL"];

  return (
    <div className="bg-card border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-serif text-lg font-bold text-foreground">Performance</h3>
        <div className="flex gap-1">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 text-xs font-medium transition-colors ${
                filter === f
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 18% 22%)" vertical={false} />
            <XAxis
              dataKey="dateFormatted"
              tick={{ fontSize: 11, fill: "hsl(215 12% 55%)" }}
              tickLine={false}
              axisLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              tick={{ fontSize: 11, fill: "hsl(215 12% 55%)" }}
              tickLine={false}
              axisLine={false}
              domain={["auto", "auto"]}
              tickFormatter={(v) => `${v.toFixed(2)}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(215 25% 15%)",
                border: "1px solid hsl(215 18% 22%)",
                borderRadius: 0,
                fontSize: 12,
              }}
              labelStyle={{ color: "hsl(40 20% 92%)" }}
              itemStyle={{ color: "hsl(38 70% 55%)" }}
              formatter={(value: number) => [`Rs ${value.toFixed(4)}`, "NAV"]}
            />
            <Line
              type="monotone"
              dataKey="nav"
              stroke="hsl(38 70% 55%)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: "hsl(38 70% 55%)" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceChart;
