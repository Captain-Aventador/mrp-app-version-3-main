import { SalesOrder } from "@/types/sales";

export const salesOrders: SalesOrder[] = [
  {
    id: "ORD-001",
    customer: "Naval Sea Systems Command (NAVSEA)",
    product: "Naval Equipment",
    quantity: 1,
    orderDate: "2024-03-17",
    deliveryDeadline: "2024-04-05",
    status: "PO Received",
    totalAmount: 4999.00,
    inventoryStatus: "In Stock",
    productionStatus: "Not Required",
    deliveryStatus: "Not Shipped",
    items: [
      {
        id: 1,
        item: "Naval Equipment A",
        partIdentifier: "NEQ-001",
        quantity: "1",
        pricePerUnit: "4999.00",
        discount: "0%",
        totalPrice: "4999.00",
        tax: "0.00",
        location: "Warehouse A",
        inventoryStatus: "In Stock",
        productionStatus: "Not Required",
        ingredientsAvailability: "Available"
      }
    ]
  },
  {
    id: "ORD-002",
    customer: "Royal Australian Navy",
    product: "Naval Equipment",
    quantity: 1,
    orderDate: "2024-03-18",
    deliveryDeadline: "2024-04-06",
    status: "In SCM",
    totalAmount: 14999.50,
    inventoryStatus: "In Stock",
    productionStatus: "In Progress",
    deliveryStatus: "Not Shipped",
    items: [
      {
        id: 1,
        item: "Naval Equipment B",
        partIdentifier: "NEQ-002",
        quantity: "1",
        pricePerUnit: "14999.50",
        discount: "0%",
        totalPrice: "14999.50",
        tax: "0.00",
        location: "Warehouse B",
        inventoryStatus: "In Stock",
        productionStatus: "In Progress",
        ingredientsAvailability: "Available"
      }
    ]
  },
  {
    id: "ORD-003",
    customer: "Royal Navy of Oman",
    product: "Naval Equipment",
    quantity: 1,
    orderDate: "2024-03-19",
    deliveryDeadline: "2024-04-07",
    status: "Delayed",
    totalAmount: 5000.00,
    inventoryStatus: "Out of Stock",
    productionStatus: "Blocked",
    deliveryStatus: "Not Shipped",
    items: [
      {
        id: 1,
        item: "Naval Equipment C",
        partIdentifier: "NEQ-003",
        quantity: "1",
        pricePerUnit: "5000.00",
        discount: "0%",
        totalPrice: "5000.00",
        tax: "0.00",
        location: "Warehouse C",
        inventoryStatus: "Out of Stock",
        productionStatus: "Blocked",
        ingredientsAvailability: "Unavailable"
      }
    ]
  },
  {
    id: "ORD-004",
    customer: "United States Navy",
    product: "Naval Equipment",
    quantity: 1,
    orderDate: "2024-03-20",
    deliveryDeadline: "2024-04-08",
    status: "PO Received",
    totalAmount: 11249.25,
    inventoryStatus: "In Stock",
    productionStatus: "Not Required",
    deliveryStatus: "Not Shipped",
    items: [
      {
        id: 1,
        item: "Naval Equipment D",
        partIdentifier: "NEQ-004",
        quantity: "1",
        pricePerUnit: "11249.25",
        discount: "0%",
        totalPrice: "11249.25",
        tax: "0.00",
        location: "Warehouse D",
        inventoryStatus: "In Stock",
        productionStatus: "Not Required",
        ingredientsAvailability: "Available"
      }
    ]
  },
  {
    id: "ORD-005",
    customer: "Royal Australian Navy",
    product: "Naval Equipment",
    quantity: 1,
    orderDate: "2024-03-21",
    deliveryDeadline: "2024-04-09",
    status: "In SCM",
    totalAmount: 8000.00,
    inventoryStatus: "In Stock",
    productionStatus: "In Progress",
    deliveryStatus: "Not Shipped",
    items: [
      {
        id: 1,
        item: "Naval Equipment E",
        partIdentifier: "NEQ-005",
        quantity: "1",
        pricePerUnit: "8000.00",
        discount: "0%",
        totalPrice: "8000.00",
        tax: "0.00",
        location: "Warehouse E",
        inventoryStatus: "In Stock",
        productionStatus: "In Progress",
        ingredientsAvailability: "Available"
      }
    ]
  },
  {
    id: "ORD-006",
    customer: "Royal Navy of Oman",
    product: "Naval Equipment",
    quantity: 1,
    orderDate: "2024-03-22",
    deliveryDeadline: "2024-04-10",
    status: "Delayed",
    totalAmount: 6400.00,
    inventoryStatus: "Out of Stock",
    productionStatus: "Blocked",
    deliveryStatus: "Not Shipped",
    items: [
      {
        id: 1,
        item: "Naval Equipment F",
        partIdentifier: "NEQ-006",
        quantity: "1",
        pricePerUnit: "6400.00",
        discount: "0%",
        totalPrice: "6400.00",
        tax: "0.00",
        location: "Warehouse F",
        inventoryStatus: "Out of Stock",
        productionStatus: "Blocked",
        ingredientsAvailability: "Unavailable"
      }
    ]
  },
  {
    id: "ORD-007",
    customer: "Commonwealth of Australia",
    product: "Naval Equipment",
    quantity: 1,
    orderDate: "2024-03-23",
    deliveryDeadline: "2024-04-11",
    status: "PO Received",
    totalAmount: 9999.00,
    inventoryStatus: "In Stock",
    productionStatus: "Not Required",
    deliveryStatus: "Not Shipped",
    items: [
      {
        id: 1,
        item: "Naval Equipment G",
        partIdentifier: "NEQ-007",
        quantity: "1",
        pricePerUnit: "9999.00",
        discount: "0%",
        totalPrice: "9999.00",
        tax: "0.00",
        location: "Warehouse G",
        inventoryStatus: "In Stock",
        productionStatus: "Not Required",
        ingredientsAvailability: "Available"
      }
    ]
  },
  {
    id: "ORD-008",
    customer: "Armed Forces of Malta",
    product: "Naval Equipment",
    quantity: 1,
    orderDate: "2024-03-24",
    deliveryDeadline: "2024-04-12",
    status: "In SCM",
    totalAmount: 7500.00,
    inventoryStatus: "In Stock",
    productionStatus: "In Progress",
    deliveryStatus: "Not Shipped",
    items: [
      {
        id: 1,
        item: "Naval Equipment H",
        partIdentifier: "NEQ-008",
        quantity: "1",
        pricePerUnit: "7500.00",
        discount: "0%",
        totalPrice: "7500.00",
        tax: "0.00",
        location: "Warehouse H",
        inventoryStatus: "In Stock",
        productionStatus: "In Progress",
        ingredientsAvailability: "Available"
      }
    ]
  }
];