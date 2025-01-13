interface MaterialsAvailabilityCellProps {
  materialsAvailable: boolean;
  materialsDetails: string;
  onClick: () => void;
  isNotApplicable?: boolean;
  useOutOfStock?: boolean;
  showBuyButton?: boolean;
}

export function MaterialsAvailabilityCell({ 
  materialsAvailable, 
  materialsDetails, 
  onClick,
  isNotApplicable = false,
  useOutOfStock = false,
  showBuyButton = false
}: MaterialsAvailabilityCellProps) {
  if (showBuyButton) {
    return (
      <button
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md"
        onClick={onClick}
      >
        Buy
      </button>
    );
  }

  return (
    <div
      className="p-0 h-auto w-full text-center cursor-pointer"
      onClick={onClick}
    >
      {isNotApplicable || materialsDetails === "Not Applicable" 
        ? "Not Applicable" 
        : materialsAvailable 
          ? materialsDetails 
          : useOutOfStock ? "Out of Stock" : "Materials unavailable"}
    </div>
  );
}