export type InventoryStatus = "In Stock" | "Out of Stock" | "Reserved" | "Partially";
export type DeliveryStatus = "Not Shipped" | "Ready for Shipping" | "Shipped";
export type ProductionStatus = "Not Started" | "Not Required" | "Work in Progress" | "In Progress" | "Blocked" | "Completed";
export type OrderStatus = "PO Received" | "In SCM" | "Delayed" | "Pending" | "Approved" | "Reject";

export interface TableItem {
  id: number;
  item: string;
  quantity: string;
  pricePerUnit: string;
  discount: string;
  totalPrice: string;
  tax: string;
  location: string;
  inventoryStatus: string;
  ingredientsAvailability: string;
  productionStatus: string;
  partIdentifier: string;
}

export interface ShippingFee {
  description: string;
  cost: number;
  tax: string;
}

export interface SalesOrder {
  id: string;
  customer: string;
  product: string;
  quantity: number;
  totalAmount: number;
  orderDate: string;
  deliveryDate?: string;
  deliveryDeadline: string;
  status: OrderStatus;
  inventoryStatus: InventoryStatus;
  productionStatus: ProductionStatus;
  deliveryStatus: DeliveryStatus;
  tax?: number;
  costOfGoodsSold?: number;
  billingAddress?: string;
  shippingAddress?: string;
  customerReference?: string;
  discount?: number;
  shippingFee?: ShippingFee;
  items?: TableItem[];
  createdDate?: string;
  shipFromAddress?: string;
  program?: string;
  project?: string;
}