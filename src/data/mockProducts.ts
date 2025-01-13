export interface Product {
  name: string;
  sku: string;
  category: string;
  defaultSalesPrice: number;
  cost: number;
  productionTime: number;
}

export const mockProducts: Product[] = [
  {
    name: "Custom Propeller",
    sku: "PROP-001",
    category: "Marine Equipment",
    defaultSalesPrice: 2499.99,
    cost: 1200.00,
    productionTime: 7
  },
  {
    name: "Anchor Chain",
    sku: "CHAIN-002",
    category: "Marine Equipment",
    defaultSalesPrice: 899.99,
    cost: 450.00,
    productionTime: 3
  },
  {
    name: "Rudder Assembly",
    sku: "RUD-003",
    category: "Marine Equipment",
    defaultSalesPrice: 1899.99,
    cost: 950.00,
    productionTime: 5
  },
  {
    name: "Navigation Lights",
    sku: "LIGHT-004",
    category: "Marine Equipment",
    defaultSalesPrice: 299.99,
    cost: 150.00,
    productionTime: 2
  },
  {
    name: "Hydraulic Cylinders",
    sku: "HYD-005",
    category: "Marine Equipment",
    defaultSalesPrice: 1599.99,
    cost: 800.00,
    productionTime: 4
  },
  {
    name: "Propeller Blade",
    sku: "BLADE-006",
    category: "Marine Equipment",
    defaultSalesPrice: 899.99,
    cost: 450.00,
    productionTime: 3
  }
];