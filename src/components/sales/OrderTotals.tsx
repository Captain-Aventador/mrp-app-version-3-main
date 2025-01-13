import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface OrderTotalsProps {
  onAddRow: () => void;
  totalWithTax: string;
  totalUnits: string;
  subtotal: string;
  tax: string;
}

export function OrderTotals({ 
  onAddRow, 
  totalWithTax,
  totalUnits,
  subtotal,
  tax 
}: OrderTotalsProps) {
  return (
    <div className="flex justify-between items-center mt-2">
      <Button 
        variant="link" 
        className="p-0 h-auto font-normal hover:no-underline"
        onClick={onAddRow}
      >
        <Plus className="h-4 w-4 mr-1" />
        Add row
      </Button>
      <span className="text-sm text-muted-foreground">
        Total items not shipped (with tax): {totalWithTax} USD
      </span>
    </div>
  );
}