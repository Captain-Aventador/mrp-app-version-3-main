import { mockWorkOrders } from "@/data/mockWorkOrders";
import { mockPurchaseOrders } from "@/data/mockPurchaseOrders";
import { mockMaterials } from "@/data/mockMaterials";
import { stockData } from "@/pages/CurrentStock";

export const checkWorkOrderStatus = (productName: string) => {
  return mockWorkOrders.find(wo => wo.product === productName);
};

export const checkMaterialsInStock = (productName: string) => {
  const product = mockMaterials.find(m => m.name === productName);
  if (product) {
    const stockItem = stockData.find(item => item.name === product.name);
    return stockItem ? parseInt(stockItem.availableStock) : 0;
  }
  return 0;
};

export const checkPurchaseOrder = (productName: string) => {
  const product = mockMaterials.find(m => m.name === productName);
  if (product) {
    return mockPurchaseOrders.find(po => po.supplier === product.defaultSupplier);
  }
  return null;
};