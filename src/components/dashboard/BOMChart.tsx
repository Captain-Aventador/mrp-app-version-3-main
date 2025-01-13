import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface BOMChartProps {
  selectedYear: string;
}

export function BOMChart({ selectedYear }: BOMChartProps) {
  const yearlyData = {
    "2024": [
      { id: "LM4029MC", value: 300 },
      { id: "LM4029SB", value: 280 },
      { id: "LM4029PS", value: 290 },
      { id: "LM4029PH", value: 270 },
      { id: "LM4029D", value: 260 },
    ],
    "2023": [
      { id: "LM4029MC", value: 250 },
      { id: "LM4029SB", value: 240 },
      { id: "LM4029PS", value: 230 },
      { id: "LM4029PH", value: 220 },
      { id: "LM4029D", value: 210 },
    ],
    "2022": [
      { id: "LM4029MC", value: 220 },
      { id: "LM4029SB", value: 210 },
      { id: "LM4029PS", value: 200 },
      { id: "LM4029PH", value: 190 },
      { id: "LM4029D", value: 180 },
    ]
  };

  const getData = () => {
    if (selectedYear === "all") {
      const items = ["LM4029MC", "LM4029SB", "LM4029PS", "LM4029PH", "LM4029D"];
      return items.map(id => {
        const totalValue = Object.values(yearlyData).reduce((sum, year) => {
          const item = year.find(i => i.id === id);
          return sum + (item?.value || 0);
        }, 0);
        return {
          id,
          value: totalValue
        };
      });
    }
    return yearlyData[selectedYear as keyof typeof yearlyData] || [];
  };

  return (
    <Card className="p-6">
      <h2 className="mb-4 text-lg font-semibold">
        BOM Details {selectedYear !== "all" ? `(${selectedYear})` : "(Total Across Years)"}
      </h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={getData()} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="id" type="category" />
            <Tooltip />
            <Bar dataKey="value" fill="#0C4A6E" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}