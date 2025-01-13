import { Part } from "../PartForm";
import { stockData } from "@/pages/CurrentStock";

export const getAvailableStock = (part: Part) => {
  const stockItem = stockData.find(item => item.name === part.name);
  if (!stockItem) return 0;
  
  const availableStock = parseInt(stockItem.availableStock) || 0;
  return availableStock;
};

export const getRequirementQuantity = (quantity: string, stockQuantity: number) => {
  const parsedQuantity = parseInt(quantity);
  if (isNaN(parsedQuantity)) return "-";
  
  if (parsedQuantity <= stockQuantity) {
    return "Not Applicable";
  }
  return (parsedQuantity - stockQuantity).toString();
};