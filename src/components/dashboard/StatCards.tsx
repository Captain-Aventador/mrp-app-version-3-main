import { Card } from "@/components/ui/card";

interface StatCardsProps {
  selectedYear: string;
}

export function StatCards({ selectedYear }: StatCardsProps) {
  const yearlyData = {
    "2024": {
      inventory: 2500,
      inventoryGrowth: "+25.1%",
      orders: 150,
      pendingOrders: 15,
      suppliers: 52,
      newSuppliers: 4,
      revenue: 65000,
      revenueGrowth: "+20%"
    },
    "2023": {
      inventory: 2200,
      inventoryGrowth: "+18.1%",
      orders: 110,
      pendingOrders: 10,
      suppliers: 45,
      newSuppliers: 3,
      revenue: 48000,
      revenueGrowth: "+12%"
    },
    "2022": {
      inventory: 2000,
      inventoryGrowth: "+15%",
      orders: 95,
      pendingOrders: 8,
      suppliers: 40,
      newSuppliers: 2,
      revenue: 42000,
      revenueGrowth: "+10%"
    }
  };

  const getYearData = () => {
    if (selectedYear === "all") {
      // Calculate aggregates for all years
      const years = Object.values(yearlyData);
      return {
        inventory: years.reduce((sum, year) => sum + year.inventory, 0),
        inventoryGrowth: "+19.4%", // Average growth
        orders: years.reduce((sum, year) => sum + year.orders, 0),
        pendingOrders: years.reduce((sum, year) => sum + year.pendingOrders, 0),
        suppliers: Math.max(...years.map(year => year.suppliers)),
        newSuppliers: years.reduce((sum, year) => sum + year.newSuppliers, 0),
        revenue: years.reduce((sum, year) => sum + year.revenue, 0),
        revenueGrowth: "+14%", // Average growth
      };
    }

    return yearlyData[selectedYear as keyof typeof yearlyData] || yearlyData["2024"];
  };

  const data = getYearData();

  return (
    <div className="grid gap-6 md:grid-cols-4">
      <Card className="p-6">
        <div className="text-sm font-medium text-muted-foreground">
          Total Inventory
        </div>
        <div className="mt-2 text-3xl font-bold">{data.inventory.toLocaleString()}</div>
        <div className="mt-1 text-sm text-green-600">
          {data.inventoryGrowth} from last period
        </div>
      </Card>
      <Card className="p-6">
        <div className="text-sm font-medium text-muted-foreground">
          Active Orders
        </div>
        <div className="mt-2 text-3xl font-bold">{data.orders}</div>
        <div className="mt-1 text-sm text-muted-foreground">
          {data.pendingOrders} pending approval
        </div>
      </Card>
      <Card className="p-6">
        <div className="text-sm font-medium text-muted-foreground">
          Total Suppliers
        </div>
        <div className="mt-2 text-3xl font-bold">{data.suppliers}</div>
        <div className="mt-1 text-sm text-muted-foreground">
          {data.newSuppliers} new this period
        </div>
      </Card>
      <Card className="p-6">
        <div className="text-sm font-medium text-muted-foreground">
          Revenue
        </div>
        <div className="mt-2 text-3xl font-bold">${data.revenue.toLocaleString()}</div>
        <div className="mt-1 text-sm text-green-600">
          {data.revenueGrowth} from last period
        </div>
      </Card>
    </div>
  );
}