import { MetricsCards } from "@/components/reports/MetricsCards";
import { RevenueChart } from "@/components/reports/RevenueChart";
import { TopProductsTable } from "@/components/reports/TopProductsTable";

export function Reports() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Reports</h1>
      </div>
      
      <MetricsCards />
      
      <div className="grid gap-6 md:grid-cols-2">
        <RevenueChart />
        <TopProductsTable />
      </div>
    </div>
  );
}