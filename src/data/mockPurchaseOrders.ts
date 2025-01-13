export interface PurchaseOrder {
  id: string;
  createdDate: string;
  orderNumber: string;
  supplier: string;
  totalValue: number;
  expectedArrival: string;
  deliveryStatus: "Not received";
  poAccepted: string | null;
}

export const mockPurchaseOrders: PurchaseOrder[] = [
  {
    id: "1",
    createdDate: "2024-12-13",
    orderNumber: "PO-3",
    supplier: "1", // Bronze Alloys
    totalValue: 261.60,
    expectedArrival: "2024-12-14",
    deliveryStatus: "Not received",
    poAccepted: "2024-12-13"
  },
  {
    id: "2",
    createdDate: "2024-12-13",
    orderNumber: "PO-4",
    supplier: "4", // Composite Materials
    totalValue: 151.20,
    expectedArrival: "2024-12-16",
    deliveryStatus: "Not received",
    poAccepted: null
  },
  {
    id: "3",
    createdDate: "2024-12-13",
    orderNumber: "PO-5",
    supplier: "2", // Stainless Steel
    totalValue: 53.28,
    expectedArrival: "2024-12-25",
    deliveryStatus: "Not received",
    poAccepted: "2024-12-14"
  },
  {
    id: "4",
    createdDate: "2024-12-24",
    orderNumber: "PO-1",
    supplier: "3", // Aluminum Alloys
    totalValue: 288.00,
    expectedArrival: "2025-01-07",
    deliveryStatus: "Not received",
    poAccepted: null
  },
  {
    id: "5",
    createdDate: "2024-12-25",
    orderNumber: "PO-3",
    supplier: "5", // Cast Iron
    totalValue: 0,
    expectedArrival: "2025-01-08",
    deliveryStatus: "Not received",
    poAccepted: null
  }
];