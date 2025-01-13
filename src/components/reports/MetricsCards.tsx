import { Card } from "@/components/ui/card";
import { monthlySalesData } from "@/data/mockReports";
import { TrendingUpIcon, ShoppingCartIcon, UsersIcon } from "lucide-react";

export function MetricsCards() {
  const currentMonth = monthlySalesData[monthlySalesData.length - 1];
  const prevMonth = monthlySalesData[monthlySalesData.length - 2];

  const calculateGrowth = (current: number, previous: number) => {
    return ((current - previous) / previous) * 100;
  };

  const metrics = [
    {
      title: "Revenue",
      value: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(currentMonth.revenue),
      growth: calculateGrowth(currentMonth.revenue, prevMonth.revenue),
      icon: TrendingUpIcon,
    },
    {
      title: "Orders",
      value: currentMonth.orders,
      growth: calculateGrowth(currentMonth.orders, prevMonth.orders),
      icon: ShoppingCartIcon,
    },
    {
      title: "Customers",
      value: currentMonth.customers,
      growth: calculateGrowth(currentMonth.customers, prevMonth.customers),
      icon: UsersIcon,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {metrics.map((metric) => (
        <Card key={metric.title} className="p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">
              {metric.title}
            </h3>
            <metric.icon className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-2xl font-bold mt-2">{metric.value}</p>
          <p className={`text-sm mt-2 ${
            metric.growth >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {metric.growth >= 0 ? '↑' : '↓'} {Math.abs(metric.growth).toFixed(1)}%
          </p>
        </Card>
      ))}
    </div>
  );
}