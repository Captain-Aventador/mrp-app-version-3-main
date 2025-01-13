import { Download } from "lucide-react";

interface PurchaseRequisitionToolbarProps {
  totalOrders: number;
  selectedOrders: string[];
  onDownload: () => void;
  onSearch?: (term: string) => void;
  searchValue?: string;
  currentTab?: string;
  onTabChange?: (tab: string) => void;
}

export function PurchaseRequisitionToolbar({ 
  totalOrders,
  selectedOrders = [],
  onDownload = () => {},
  onSearch,
  searchValue,
  currentTab,
  onTabChange 
}: PurchaseRequisitionToolbarProps) {
  return (
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm text-muted-foreground">{totalOrders} orders</span>
      <div className="flex items-center gap-2">
        <button 
          className="p-2 rounded-md hover:bg-accent text-foreground"
          onClick={onDownload}
        >
          <Download className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default PurchaseRequisitionToolbar;