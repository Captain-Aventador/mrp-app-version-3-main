import { salesOrders } from "@/data/mockSalesOrders";
import { StockItem } from "@/types/stock";

export const calculateAvailableStock = (productName: string): {
  availableStock: number;
  inProduction: number;
} => {
  const relatedOrders = salesOrders.filter(order => order.product === productName);
  
  let availableStock = 0;
  let inProduction = 0;

  relatedOrders.forEach(order => {
    if (order.inventoryStatus === "In Stock") {
      availableStock = order.quantity;
    } else if (order.inventoryStatus === "Partially") {
      // For partially available items, split the quantity 50-50
      availableStock = Math.floor(order.quantity / 2);
      inProduction = Math.ceil(order.quantity / 2);
    }
  });

  return { availableStock, inProduction };
};