import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StockContent } from "@/components/stock/StockContent";
import { StockItem } from "@/types/stock";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { QuickAddProductDialog } from "@/components/products/QuickAddProductDialog";
import { QuickAddMaterialDialog } from "@/components/materials/QuickAddMaterialDialog";

export const stockData: StockItem[] = [
  {
    name: "Anchor Chain",
    category: "Finished Goods",
    sku: "CHAIN-002",
    stockLevel: "50 units",
    reservedStock: "32 units",
    availableStock: "18 units",
    status: "In Stock",
    action: "Ship / Reserve Stock"
  },
  {
    name: "Custom Propeller",
    category: "Finished Goods",
    sku: "FG-1001",
    stockLevel: "140 units",
    reservedStock: "40 units",
    availableStock: "100 units",
    status: "Ready for Shipping",
    action: "Ship / Schedule Production"
  },
  {
    name: "Propeller Blade",
    category: "Finished Goods",
    sku: "FG-1002",
    stockLevel: "100 units",
    reservedStock: "75 units",
    availableStock: "25 units",
    status: "In Stock",
    action: "Ship / Reserve Stock"
  },
  {
    name: "Hydraulic Cylinders",
    category: "Finished Goods",
    sku: "FG-1003",
    stockLevel: "0 units",
    reservedStock: "0 units",
    availableStock: "0 units",
    status: "Not Available",
    action: "Ship"
  },
  {
    name: "Navigation Lights",
    category: "Finished Goods",
    sku: "FG-1004",
    stockLevel: "151 units",
    reservedStock: "113 units",
    availableStock: "38 units",
    status: "In Stock",
    action: "Ship / Reserve Stock"
  },
  {
    name: "Rudder Assembly",
    category: "Finished Goods",
    sku: "RUD-003",
    stockLevel: "100 units",
    reservedStock: "0 units",
    availableStock: "100 units",
    status: "In Stock",
    action: "Ship / Reserve Stock"
  },
  {
    name: "Steel Sheets",
    category: "Raw Material",
    sku: "RM-2001",
    stockLevel: "300 units",
    reservedStock: "0 units",
    availableStock: "300 units",
    status: "In Stock",
    action: "Reserve / Issue to Production"
  },
  {
    name: "Bearings",
    category: "Raw Material",
    sku: "RM-2002",
    stockLevel: "0 units",
    reservedStock: "0 units",
    availableStock: "0 units",
    status: "In Stock",
    action: "Procure / Reserve"
  },
  {
    name: "Marine Paint",
    category: "Raw Material",
    sku: "RM-2003",
    stockLevel: "30 units",
    reservedStock: "0 units",
    availableStock: "30 units",
    status: "In Stock",
    action: "Procure"
  },
  {
    name: "Fasteners (Bolts/Nuts)",
    category: "Raw Material",
    sku: "RM-2004",
    stockLevel: "1000 units",
    reservedStock: "0 units",
    availableStock: "1000 units",
    status: "In Stock",
    action: "Reserve / Issue to Production"
  }
];

export const CurrentStock = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("products");
  const [quickAddProductOpen, setQuickAddProductOpen] = useState(false);
  const [quickAddMaterialOpen, setQuickAddMaterialOpen] = useState(false);

  const handleSelectItem = (sku: string) => {
    setSelectedItems(prev => {
      if (prev.includes(sku)) {
        return prev.filter(id => id !== sku);
      }
      return [...prev, sku];
    });
  };

  const handleSelectAll = () => {
    if (selectedItems.length === stockData.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(stockData.map(item => item.sku));
    }
  };

  const handleDownload = () => {
    console.log("Downloading stock data...");
  };

  const products = stockData.filter(item => item.category === "Finished Goods");
  const materials = stockData.filter(item => item.category === "Raw Material");

  return (
    <div className="w-full p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Current Stock</h1>
        <Button 
          onClick={() => activeTab === "products" ? setQuickAddProductOpen(true) : setQuickAddMaterialOpen(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          {activeTab === "products" ? "Product" : "Material"}
        </Button>
      </div>
      <Tabs 
        defaultValue="products" 
        className="w-full"
        onValueChange={(value) => setActiveTab(value)}
      >
        <TabsList className="w-full bg-white border-b mb-0 p-0">
          <TabsTrigger 
            value="products"
            className="px-6 py-3 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary transition-all"
          >
            Products
          </TabsTrigger>
          <TabsTrigger 
            value="materials"
            className="px-6 py-3 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary transition-all"
          >
            Materials
          </TabsTrigger>
        </TabsList>
        <TabsContent value="products">
          <StockContent 
            items={products}
            selectedItems={selectedItems}
            onSelectItem={handleSelectItem}
            onSelectAll={handleSelectAll}
            onDownload={handleDownload}
            activeTab="products"
          />
        </TabsContent>
        <TabsContent value="materials">
          <StockContent 
            items={materials}
            selectedItems={selectedItems}
            onSelectItem={handleSelectItem}
            onSelectAll={handleSelectAll}
            onDownload={handleDownload}
            activeTab="materials"
          />
        </TabsContent>
      </Tabs>
      <QuickAddProductDialog 
        open={quickAddProductOpen}
        onOpenChange={setQuickAddProductOpen}
      />
      <QuickAddMaterialDialog
        open={quickAddMaterialOpen}
        onOpenChange={setQuickAddMaterialOpen}
      />
    </div>
  );
};