import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface TableToolbarProps {
  onAddPart: () => void;
  onCreateSalesOrder?: () => void;
  hasSelectedParts?: boolean;
}

export function TableToolbar({ 
  onAddPart,
  onCreateSalesOrder,
  hasSelectedParts = false,
}: TableToolbarProps) {
  return (
    <div className="flex justify-end gap-2">
      {onCreateSalesOrder && (
        <Button 
          onClick={onCreateSalesOrder}
          className="mb-0"
          disabled={!hasSelectedParts}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Sales Order
        </Button>
      )}
      <Button 
        onClick={onAddPart} 
        className="mb-0"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Part
      </Button>
    </div>
  );
}