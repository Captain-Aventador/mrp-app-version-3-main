import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface SalesTrendChartProps {
  selectedYear: string;
}

export function SalesTrendChart({ selectedYear }: SalesTrendChartProps) {
  const allSalesTrendData = {
    "2024": [
      { month: "Jan", "2024": 550000 },
      { month: "Feb", "2024": 480000 },
      { month: "Mar", "2024": 520000 },
      { month: "Apr", "2024": 490000 }
    ],
    "2023": [
      { month: "Jan", "2023": 450000 },
      { month: "Feb", "2023": 400000 },
      { month: "Mar", "2023": 420000 },
      { month: "Apr", "2023": 380000 }
    ],
    "2022": [
      { month: "Jan", "2022": 400000 },
      { month: "Feb", "2022": 380000 },
      { month: "Mar", "2022": 390000 },
      { month: "Apr", "2022": 360000 }
    ]
  };

  const getData = () => {
    if (selectedYear === "all") {
      // Combine data from all years
      const months = ["Jan", "Feb", "Mar", "Apr"];
      return months.map(month => {
        const combinedData: any = { month };
        Object.entries(allSalesTrendData).forEach(([year, data]) => {
          const monthData = data.find(d => d.month === month);
          if (monthData) {
            combinedData[year] = monthData[year];
          }
        });
        return combinedData;
      });
    }
    return allSalesTrendData[selectedYear as keyof typeof allSalesTrendData] || [];
  };

  const getDataKeys = () => {
    if (selectedYear === "all") {
      return Object.keys(allSalesTrendData);
    }
    return [selectedYear];
  };

  return (
    <Card className="p-6">
      <h2 className="mb-4 text-lg font-semibold">Sales Trend</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={getData()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            {getDataKeys().map((year, index) => (
              <Bar 
                key={year} 
                dataKey={year} 
                fill={`hsl(${200 + (index * 30)}, 70%, 50%)`} 
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}