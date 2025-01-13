import { ProductAvailability } from "@/utils/productAvailability";
import { checkWorkOrderStatus } from "@/utils/statusChecks";
import { MaterialsStatusCell } from "./MaterialsStatusCell";
import { ProductionStatusDisplay } from "./ProductionStatusDisplay";

interface AvailabilityStatusCellsProps {
  searchTerm: string;
  productAvailability?: ProductAvailability;
  requestedQuantity: number;
}

export function AvailabilityStatusCells({
  searchTerm,
  productAvailability,
  requestedQuantity,
}: AvailabilityStatusCellsProps) {
  if (!productAvailability) return null;

  const workOrder = checkWorkOrderStatus(searchTerm);
  const quantityExceedsAvailability = requestedQuantity > (productAvailability?.inStock || 0);
  const workOrderTotalQuantity = workOrder ? workOrder.productionQuantity + workOrder.completedQuantity : 0;

  return (
    <>
      <td className="p-1 align-middle border">
        <MaterialsStatusCell
          searchTerm={searchTerm}
          quantityExceedsAvailability={quantityExceedsAvailability}
          workOrderExists={!!workOrder}
          workOrderTotalQuantity={workOrderTotalQuantity}
          requestedQuantity={requestedQuantity}
        />
      </td>
      <td className="p-1 align-middle border">
        <ProductionStatusDisplay
          searchTerm={searchTerm}
          quantityExceedsAvailability={quantityExceedsAvailability}
          workOrder={workOrder}
        />
      </td>
    </>
  );
}