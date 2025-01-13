import { ProductionStatusCell } from "./ProductionStatusCell";
import { checkMaterialsInStock, checkPurchaseOrder } from "@/utils/statusChecks";

interface ProductionStatusDisplayProps {
  searchTerm: string;
  quantityExceedsAvailability: boolean;
  workOrder: any;
}

export function ProductionStatusDisplay({
  searchTerm,
  quantityExceedsAvailability,
  workOrder
}: ProductionStatusDisplayProps) {
  // Demo: Always show Make button for Custom Propeller when quantity exceeds production
  if (searchTerm === "Custom Propeller" && quantityExceedsAvailability) {
    return (
      <ProductionStatusCell
        inProduction={0}
        onClick={() => console.log('Show production details')}
        showMakeButton={true}
      />
    );
  }

  if (!quantityExceedsAvailability) {
    return (
      <ProductionStatusCell
        inProduction={0}
        onClick={() => console.log('Show production details')}
        isNotApplicable={true}
      />
    );
  }

  if (workOrder) {
    // Show both production and completed quantities when they exist
    if (workOrder.productionQuantity > 0 || workOrder.completedQuantity > 0) {
      return (
        <ProductionStatusCell
          inProduction={workOrder.productionQuantity}
          completedQuantity={workOrder.completedQuantity}
          onClick={() => console.log('Show production details')}
          showCompletedQuantity={true}
          expectedDate={workOrder.productionDeadline}
        />
      );
    }

    // Check if materials are available to show Make button
    const availableStock = checkMaterialsInStock(searchTerm);
    if (availableStock > 0) {
      return (
        <ProductionStatusCell
          inProduction={0}
          onClick={() => console.log('Show production details')}
          showMakeButton={true}
        />
      );
    }

    // Check if materials are in purchase orders
    const materialPO = checkPurchaseOrder(searchTerm);
    if (materialPO) {
      return (
        <ProductionStatusCell
          inProduction={0}
          onClick={() => console.log('Show production details')}
        />
      );
    }
  }

  // Default state when no production is ongoing
  return (
    <ProductionStatusCell
      inProduction={0}
      onClick={() => console.log('Show production details')}
    />
  );
}