export interface SalesMetric {
  month: string;
  revenue: number;
  orders: number;
  customers: number;
}

export interface ProductMetric {
  name: string;
  sales: number;
  revenue: number;
  growth: number;
}

export const monthlySalesData: SalesMetric[] = [
  { month: "Jan", revenue: 45000, orders: 120, customers: 85 },
  { month: "Feb", revenue: 52000, orders: 145, customers: 95 },
  { month: "Mar", revenue: 48000, orders: 130, customers: 90 },
  { month: "Apr", revenue: 61000, orders: 160, customers: 110 },
  { month: "May", revenue: 55000, orders: 150, customers: 100 },
  { month: "Jun", revenue: 67000, orders: 180, customers: 125 },
];

export const topProducts: ProductMetric[] = [
  { name: "Custom Propeller", sales: 245, revenue: 122500, growth: 15.5 },
  { name: "Anchor Chain", sales: 180, revenue: 81000, growth: 8.2 },
  { name: "Rudder Assembly", sales: 165, revenue: 156750, growth: 12.3 },
  { name: "Navigation Lights", sales: 320, revenue: 48000, growth: -2.5 },
  { name: "Hydraulic Cylinders", sales: 140, revenue: 112000, growth: 5.8 },
];