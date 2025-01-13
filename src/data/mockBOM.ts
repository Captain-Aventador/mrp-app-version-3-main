export interface BOMItem {
  id: string;
  name: string;
  description: string;
  revision: string;
  status: "Active" | "Draft" | "Archived";
  createdAt: string;
  lastModified: string;
  totalComponents: number;
  totalCost: number;
}

export const mockBOMItems: BOMItem[] = [
  {
    id: "BOM-001",
    name: "Independence-Variant Littoral Combat Ships (LCS)",
    description: "Complete propulsion system assembly for marine vessels",
    revision: "Rev.A",
    status: "Active",
    createdAt: "2024-01-15",
    lastModified: "2024-02-20",
    totalComponents: 45,
    totalCost: 25000.00
  },
  {
    id: "BOM-002",
    name: "Expeditionary Fast Transport (T-EPF)",
    description: "Integrated navigation control system",
    revision: "Rev.B",
    status: "Active",
    createdAt: "2024-01-20",
    lastModified: "2024-02-25",
    totalComponents: 32,
    totalCost: 18500.00
  },
  {
    id: "BOM-003",
    name: "Cape Class Patrol Boat (Prime Patrol 58)",
    description: "Standard hull assembly components",
    revision: "Rev.A",
    status: "Draft",
    createdAt: "2024-02-01",
    lastModified: "2024-02-28",
    totalComponents: 78,
    totalCost: 42000.00
  },
  {
    id: "BOM-004",
    name: "Special Operations Ship",
    description: "Complete electrical system for marine vessels",
    revision: "Rev.C",
    status: "Active",
    createdAt: "2024-02-10",
    lastModified: "2024-03-01",
    totalComponents: 56,
    totalCost: 31000.00
  }
];