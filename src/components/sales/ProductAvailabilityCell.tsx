import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ProductAvailabilityCellProps {
  inStock: number;
  onClick: () => void;
}

export function ProductAvailabilityCell({ inStock, onClick }: ProductAvailabilityCellProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className="p-0 h-auto w-full text-center cursor-pointer"
            onClick={onClick}
          >
            {inStock > 0 ? (
              <span>{inStock} available</span>
            ) : (
              "Not Available"
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="space-y-1">
            <p>Current Stock: {inStock}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}