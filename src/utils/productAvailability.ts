import { mockWorkOrders } from "@/data/mockWorkOrders";
import { stockData } from "@/pages/CurrentStock";

export interface ProductAvailability {
  inStock: number;
  inProduction: number;
  materialsAvailable: boolean;
  materialsDetails: string;
  expectedDate?: string;
  totalReserved: number;
  totalAvailable: number;
}

export const calculateTotalReserved = (productName: string): number => {
  const stockItem = stockData.find(item => item.name === productName);
  if (!stockItem) return 0;
  
  return parseInt(stockItem.reservedStock) || 0;
};

export const determineInventoryStatus = (availableStock: number, requestedQuantity: number) => {
  if (availableStock === 0) return "Out of Stock";
  if (availableStock >= requestedQuantity) return "In Stock";
  return "Partially";
};

export const calculateCompletedQuantity = (productName: string): number => {
  return mockWorkOrders
    .filter(order => order.product === productName && order.productionStatus === "Completed")
    .reduce((total, order) => total + order.completedQuantity, 0);
};

export const checkProductAvailability = (productName: string, requestedQuantity?: number): ProductAvailability => {
  const stockItem = stockData.find(item => item.name === productName);
  const workOrder = mockWorkOrders.find(wo => wo.product === productName);
  
  if (stockItem) {
    const reservedStock = parseInt(stockItem.reservedStock) || 0;
    const baseAvailableStock = parseInt(stockItem.availableStock) || 0;
    const completedQuantity = calculateCompletedQuantity(productName);
    const totalAvailableStock = baseAvailableStock + completedQuantity;
    
    // Check material availability in Current Stock
    const materialsAvailable = baseAvailableStock > 0;
    
    // Get production status from Work Orders
    const productionQuantity = workOrder?.productionQuantity || 0;
    const workOrderCompletedQuantity = workOrder?.completedQuantity || 0;
    const hasNoProduction = productionQuantity === 0 && workOrderCompletedQuantity === 0;

    return {
      inStock: totalAvailableStock,
      inProduction: productionQuantity,
      materialsAvailable,
      materialsDetails: materialsAvailable ? "In Stock" : "Materials unavailable",
      expectedDate: workOrder?.productionDeadline,
      totalReserved: reservedStock,
      totalAvailable: totalAvailableStock
    };
  }

  return {
    inStock: 0,
    inProduction: 0,
    materialsAvailable: false,
    materialsDetails: "Product not found in stock",
    totalReserved: 0,
    totalAvailable: 0
  };
};

export const getProductStockSummary = (productName: string) => {
  const stockItem = stockData.find(item => item.name === productName);
  if (!stockItem) {
    return {
      currentStock: 0,
      reserved: 0,
      totalAvailable: 0
    };
  }

  const reservedStock = parseInt(stockItem.reservedStock) || 0;
  const baseAvailableStock = parseInt(stockItem.availableStock) || 0;
  const completedQuantity = calculateCompletedQuantity(productName);
  const totalAvailableStock = baseAvailableStock + completedQuantity;

  return {
    currentStock: totalAvailableStock + reservedStock,
    reserved: reservedStock,
    totalAvailable: totalAvailableStock
  };
};