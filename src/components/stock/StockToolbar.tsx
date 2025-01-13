import { Download, Import, Printer } from "lucide-react";
import * as XLSX from 'xlsx';

interface StockToolbarProps {
  totalItems: number;
  onDownload: () => void;
  items?: any[]; // Add items prop
}

export function StockToolbar({ totalItems, onDownload, items = [] }: StockToolbarProps) {
  const handleExport = () => {
    if (!items.length) return;

    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(items);

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, "Stock Items");

    // Save file
    XLSX.writeFile(wb, "stock-items.xlsx");
  };

  return (
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm text-muted-foreground">{totalItems} items</span>
      <div className="flex items-center gap-2">
        <button 
          className="p-2 rounded-md hover:bg-accent text-foreground"
          onClick={handleExport}
        >
          <Download className="h-4 w-4" />
        </button>
        <button 
          className="p-2 rounded-md hover:bg-accent text-foreground"
        >
          <Import className="h-4 w-4" />
        </button>
        <button 
          className="p-2 rounded-md hover:bg-accent text-foreground"
        >
          <Printer className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}