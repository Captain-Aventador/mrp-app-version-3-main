import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface SupplyDemandChartProps {
  selectedYear: string;
}

export function SupplyDemandChart({ selectedYear }: SupplyDemandChartProps) {
  const yearlyData = {
    "2024": [
      { quarter: "Q1", demand: 580, supply: 540 },
      { quarter: "Q2", demand: 600, supply: 550 },
      { quarter: "Q3", demand: 620, supply: 580 },
      { quarter: "Q4", demand: 640, supply: 600 },
    ],
    "2023": [
      { quarter: "Q1", demand: 540, supply: 500 },
      { quarter: "Q2", demand: 550, supply: 520 },
      { quarter: "Q3", demand: 560, supply: 530 },
      { quarter: "Q4", demand: 570, supply: 540 },
    ],
    "2022": [
      { quarter: "Q1", demand: 500, supply: 480 },
      { quarter: "Q2", demand: 520, supply: 500 },
      { quarter: "Q3", demand: 530, supply: 510 },
      { quarter: "Q4", demand: 540, supply: 520 },
    ]
  };

  const getData = () => {
    if (selectedYear === "all") {
      const quarters = ["Q1", "Q2", "Q3", "Q4"];
      return quarters.map(quarter => {
        const quarterData = Object.values(yearlyData).map(yearData => 
          yearData.find(q => q.quarter === quarter)
        );
        
        return {
          quarter,
          demand: Math.round(quarterData.reduce((sum, data) => sum + (data?.demand || 0), 0) / Object.keys(yearlyData).length),
          supply: Math.round(quarterData.reduce((sum, data) => sum + (data?.supply || 0), 0) / Object.keys(yearlyData).length)
        };
      });
    }
    return yearlyData[selectedYear as keyof typeof yearlyData] || [];
  };

  return (
    <Card className="p-6">
      <h2 className="mb-4 text-lg font-semibold">
        Supply vs Demand {selectedYear !== "all" ? `for ${selectedYear}` : "(Average Across Years)"}
      </h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={getData()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="quarter" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="demand"
              stroke="#0369A1"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="supply"
              stroke="#7DD3FC"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}