interface ProductionStatusCellProps {
  inProduction: number;
  completedQuantity?: number;
  onClick: () => void;
  isNotApplicable?: boolean;
  expectedDate?: string;
  showMakeButton?: boolean;
  showCompletedQuantity?: boolean;
}

export function ProductionStatusCell({ 
  inProduction, 
  completedQuantity = 0,
  onClick,
  isNotApplicable = false,
  expectedDate,
  showMakeButton = false,
  showCompletedQuantity = false
}: ProductionStatusCellProps) {
  if (isNotApplicable) {
    return (
      <div
        className="p-0 h-auto w-full text-center cursor-pointer"
        onClick={onClick}
      >
        Not Applicable
      </div>
    );
  }

  if (showCompletedQuantity && inProduction > 0) {
    return (
      <div
        className="p-0 h-auto w-full text-center flex flex-col space-y-1 cursor-pointer"
        onClick={onClick}
      >
        <span>{inProduction} units in production</span>
        {expectedDate && (
          <span className="text-[12px] ![margin-top:0px]">Expected: {expectedDate}</span>
        )}
        <span>{completedQuantity} units completed</span>
      </div>
    );
  }

  if (showCompletedQuantity && completedQuantity > 0 && inProduction === 0) {
    return (
      <div
        className="p-0 h-auto w-full text-center flex flex-col space-y-1 cursor-pointer"
        onClick={onClick}
      >
        <span>{completedQuantity} units completed</span>
      </div>
    );
  }

  if (inProduction > 0 && expectedDate) {
    return (
      <div
        className="p-0 h-auto w-full text-center flex flex-col space-y-1 cursor-pointer"
        onClick={onClick}
      >
        <span>{inProduction} units in production</span>
        <span className="text-[12px] ![margin-top:0px]">Expected: {expectedDate}</span>
      </div>
    );
  }

  if (showMakeButton) {
    return (
      <button
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md"
        onClick={onClick}
      >
        Make
      </button>
    );
  }

  return (
    <div
      className="p-0 h-auto w-full text-center cursor-pointer"
      onClick={onClick}
    >
      No ongoing production
    </div>
  );
}