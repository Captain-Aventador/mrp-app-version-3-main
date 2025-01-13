import { useState } from "react";
import { StockTable } from "./StockTable";
import { StockToolbar } from "./StockToolbar";
import { StockPagination } from "./StockPagination";
import { StockItem } from "@/types/stock";

interface StockContentProps {
  items: StockItem[];
  selectedItems: string[];
  onSelectItem: (sku: string) => void;
  onSelectAll: () => void;
  onDownload: () => void;
  activeTab?: string;
}

export function StockContent({ 
  items, 
  selectedItems, 
  onSelectItem, 
  onSelectAll, 
  onDownload,
  activeTab = 'products'
}: StockContentProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  return (
    <div>
      <StockToolbar 
        totalItems={items.length} 
        onDownload={onDownload} 
        items={items} // Pass all items for export
      />
      <StockTable 
        items={currentItems}
        selectedItems={selectedItems}
        onSelectItem={onSelectItem}
        onSelectAll={onSelectAll}
        activeTab={activeTab}
      />
      <StockPagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}