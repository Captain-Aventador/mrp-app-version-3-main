import { mockCustomers } from "./mockCustomers";

export interface WorkOrder {
  id: string;
  priority: number;
  orderNumber: string;
  customer: string;
  product: string;
  category: string;
  completedQuantity: number;
  quantity: number;
  productionQuantity: number;
  plannedTime: string;
  productionDeadline: string;
  deliveryDeadline: string;
  materialStatus: "Available" | "Partial" | "Out of Stock" | "Not Applicable";
  productionStatus: "Not Started" | "In Progress" | "Completed" | "On Hold" | "Ready to Ship";
}

export const mockWorkOrders: WorkOrder[] = [
  {
    id: "1",
    priority: 1,
    orderNumber: "WO-2024-001",
    customer: mockCustomers[0].name,
    product: "Custom Propeller",
    category: "Marine Equipment",
    productionQuantity: 55,
    completedQuantity: 45,
    quantity: 100,
    plannedTime: "120 hours",
    productionDeadline: "2024-03-25",
    deliveryDeadline: "2024-04-01",
    materialStatus: "Available",
    productionStatus: "In Progress"
  },
  {
    id: "2",
    priority: 5,
    orderNumber: "WO-2024-002",
    customer: mockCustomers[1].name,
    product: "Anchor Chain",
    category: "Marine Equipment",
    productionQuantity: 0,
    completedQuantity: 0,
    quantity: 50,
    plannedTime: "80 hours",
    productionDeadline: "2024-03-30",
    deliveryDeadline: "2024-04-15",
    materialStatus: "Out of Stock",
    productionStatus: "Not Started"
  },
  {
    id: "3",
    priority: 11,
    orderNumber: "WO-2024-003",
    customer: mockCustomers[2].name,
    product: "Rudder Assembly",
    category: "Marine Equipment",
    productionQuantity: 0,
    completedQuantity: 200,
    quantity: 200,
    plannedTime: "160 hours",
    productionDeadline: "2024-03-20",
    deliveryDeadline: "2024-03-28",
    materialStatus: "Not Applicable",
    productionStatus: "Ready to Ship"
  },
  {
    id: "4",
    priority: 3,
    orderNumber: "WO-2024-004",
    customer: mockCustomers[0].name,
    product: "Hydraulic Cylinders",
    category: "Marine Equipment",
    productionQuantity: 0,
    completedQuantity: 80,
    quantity: 80,
    plannedTime: "100 hours",
    productionDeadline: "2024-03-28",
    deliveryDeadline: "2024-04-05",
    materialStatus: "Not Applicable",
    productionStatus: "Ready to Ship"
  },
  {
    id: "5",
    priority: 4,
    orderNumber: "WO-2024-005",
    customer: mockCustomers[1].name,
    product: "Propeller Blade",
    category: "Marine Equipment",
    productionQuantity: 150,
    completedQuantity: 0,
    quantity: 150,
    plannedTime: "140 hours",
    productionDeadline: "2024-03-29",
    deliveryDeadline: "2024-04-10",
    materialStatus: "Available",
    productionStatus: "In Progress"
  }
];