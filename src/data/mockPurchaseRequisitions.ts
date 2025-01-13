import type { SalesOrder } from "@/types/sales";

export const mockPurchaseRequisitions: SalesOrder[] = [
  {
    id: "REQ-001",
    customer: "Marine Systems Inc.",
    product: "Custom Propeller",
    quantity: 5,
    totalAmount: 12499.95,
    orderDate: "2024-03-15",
    deliveryDeadline: "2024-04-15",
    status: "In SCM",
    inventoryStatus: "In Stock",
    productionStatus: "Not Required",
    deliveryStatus: "Not Shipped",
    tax: 1249.99,
    billingAddress: "123 Marine Way, Seattle, WA 98101",
    shippingAddress: "456 Harbor Drive, Seattle, WA 98101",
    program: "Maritime Defense Program",
    project: "Coastal Security Initiative",
    items: [{
      id: 1,
      item: "Custom Propeller",
      quantity: "5",
      pricePerUnit: "2499.99",
      discount: "0",
      totalPrice: "12499.95",
      tax: "1249.99",
      location: "Main Warehouse",
      inventoryStatus: "In Stock",
      ingredientsAvailability: "Available",
      productionStatus: "Not Required",
      partIdentifier: "PROP-001"
    }]
  }
];