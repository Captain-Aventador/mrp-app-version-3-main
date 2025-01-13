export interface Material {
  id: string;
  name: string;
  sku: string;
  category: string;
  defaultSupplier: string;
  defaultPurchasePrice: number;
  defaultSalesPrice: number;
}

export const mockMaterials: Material[] = [
  {
    id: "1",
    name: "Bronze Alloys",
    sku: "BA-001",
    category: "Metal Alloys",
    defaultSupplier: "Metal Suppliers Inc.",
    defaultPurchasePrice: 45.00,
    defaultSalesPrice: 65.00
  },
  {
    id: "2",
    name: "Stainless Steel",
    sku: "SS-001",
    category: "Metals",
    defaultSupplier: "Steel Works Ltd.",
    defaultPurchasePrice: 35.00,
    defaultSalesPrice: 55.00
  },
  {
    id: "3",
    name: "Aluminum Alloys",
    sku: "AA-001",
    category: "Metal Alloys",
    defaultSupplier: "Aluminum Specialists",
    defaultPurchasePrice: 28.00,
    defaultSalesPrice: 42.00
  },
  {
    id: "4",
    name: "Composite Materials",
    sku: "CM-001",
    category: "Composites",
    defaultSupplier: "Advanced Materials Co.",
    defaultPurchasePrice: 65.00,
    defaultSalesPrice: 95.00
  },
  {
    id: "5",
    name: "Cast Iron",
    sku: "CI-001",
    category: "Metals",
    defaultSupplier: "Iron Foundry Inc.",
    defaultPurchasePrice: 25.00,
    defaultSalesPrice: 40.00
  },
  {
    id: "6",
    name: "Titanium",
    sku: "TI-001",
    category: "Metals",
    defaultSupplier: "Premium Metals Corp",
    defaultPurchasePrice: 85.00,
    defaultSalesPrice: 120.00
  },
  {
    id: "7",
    name: "Galvanized Steel",
    sku: "GS-001",
    category: "Metals",
    defaultSupplier: "Steel Works Ltd.",
    defaultPurchasePrice: 30.00,
    defaultSalesPrice: 48.00
  },
  {
    id: "8",
    name: "Rudder Blade",
    sku: "RB-001",
    category: "Components",
    defaultSupplier: "Marine Parts Co.",
    defaultPurchasePrice: 150.00,
    defaultSalesPrice: 225.00
  },
  {
    id: "9",
    name: "Bearings",
    sku: "BR-001",
    category: "Components",
    defaultSupplier: "Industrial Parts Ltd.",
    defaultPurchasePrice: 15.00,
    defaultSalesPrice: 25.00
  },
  {
    id: "10",
    name: "ABS Plastic",
    sku: "AP-001",
    category: "Plastics",
    defaultSupplier: "Polymer Solutions",
    defaultPurchasePrice: 18.00,
    defaultSalesPrice: 30.00
  },
  {
    id: "11",
    name: "Lenses",
    sku: "LE-001",
    category: "Optical",
    defaultSupplier: "Optical Systems Inc.",
    defaultPurchasePrice: 45.00,
    defaultSalesPrice: 75.00
  },
  {
    id: "12",
    name: "Light-Emitting Diodes",
    sku: "LED-001",
    category: "Electronics",
    defaultSupplier: "Electronic Components Co.",
    defaultPurchasePrice: 2.50,
    defaultSalesPrice: 5.00
  },
  {
    id: "13",
    name: "Seals and Gaskets",
    sku: "SG-001",
    category: "Components",
    defaultSupplier: "Sealing Solutions Ltd.",
    defaultPurchasePrice: 8.00,
    defaultSalesPrice: 15.00
  },
  {
    id: "14",
    name: "Powder Coating",
    sku: "PC-001",
    category: "Finishes",
    defaultSupplier: "Surface Finishing Co.",
    defaultPurchasePrice: 12.00,
    defaultSalesPrice: 22.00
  }
];