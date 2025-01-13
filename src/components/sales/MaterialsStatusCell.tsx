import { MaterialsAvailabilityCell } from "./MaterialsAvailabilityCell";
import { checkMaterialsInStock, checkPurchaseOrder } from "@/utils/statusChecks";

interface MaterialsStatusCellProps {
  searchTerm: string;
  quantityExceedsAvailability: boolean;
  workOrderExists: boolean;
  workOrderTotalQuantity: number;
  requestedQuantity: number;
}

export function MaterialsStatusCell({
  searchTerm,
  quantityExceedsAvailability,
  workOrderExists,
  workOrderTotalQuantity,
  requestedQuantity
}: MaterialsStatusCellProps) {
  // Demo: Show "Expected Date" for Anchor Chain when quantity exceeds production
  if (searchTerm === "Anchor Chain" && quantityExceedsAvailability) {
    return (
      <MaterialsAvailabilityCell
        materialsAvailable={true}
        materialsDetails="Expected: 2024-12-14"
        onClick={() => console.log('Show materials details')}
      />
    );
  }

  // If quantity doesn't exceed availability, show Not Required
  if (!quantityExceedsAvailability) {
    return (
      <MaterialsAvailabilityCell
        materialsAvailable={true}
        materialsDetails="Not required"
        onClick={() => console.log('Show materials details')}
        isNotApplicable={true}
      />
    );
  }

  // Check if work order covers the requested quantity
  if (workOrderExists && requestedQuantity <= workOrderTotalQuantity) {
    return (
      <MaterialsAvailabilityCell
        materialsAvailable={true}
        materialsDetails="Not required"
        onClick={() => console.log('Show materials details')}
        isNotApplicable={true}
      />
    );
  }

  // Check materials availability in stock
  const availableStock = checkMaterialsInStock(searchTerm);
  if (availableStock > 0) {
    return (
      <MaterialsAvailabilityCell
        materialsAvailable={true}
        materialsDetails="In Stock"
        onClick={() => console.log('Show materials details')}
      />
    );
  }

  // Check if materials are in purchase orders
  const materialPO = checkPurchaseOrder(searchTerm);
  if (materialPO) {
    return (
      <MaterialsAvailabilityCell
        materialsAvailable={true}
        materialsDetails={`Expected: ${materialPO.expectedArrival}`}
        onClick={() => console.log('Show materials details')}
      />
    );
  }

  // If no materials found anywhere, show Buy button
  return (
    <MaterialsAvailabilityCell
      materialsAvailable={false}
      materialsDetails="Materials unavailable"
      onClick={() => console.log('Show materials details')}
      showBuyButton={true}
    />
  );
}