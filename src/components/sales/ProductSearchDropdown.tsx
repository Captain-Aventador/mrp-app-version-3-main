import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { stockData } from "@/pages/CurrentStock";

interface ProductSearchDropdownProps {
  searchTerm: string;
  isOpen: boolean;
  onSelect: (productName: string, price: number, partIdentifier: string) => void;
}

const productPrices: Record<string, number> = {
  "Custom Propeller": 2500,
  "Anchor Chain": 900,
  "Rudder Assembly": 1900,
  "Navigation Lights": 300,
  "Hydraulic Cylinders": 1600,
  "Propeller Blade": 900,
};

// Mock part identifiers for each product
const mockPartIdentifiers: Record<string, string> = {
  "Custom Propeller": "PRO-2024-001",
  "Anchor Chain": "ANC-2024-002",
  "Rudder Assembly": "RUD-2024-003",
  "Navigation Lights": "NAV-2024-004",
  "Hydraulic Cylinders": "HYD-2024-005",
  "Propeller Blade": "PRB-2024-006",
};

export function ProductSearchDropdown({ searchTerm, isOpen, onSelect }: ProductSearchDropdownProps) {
  const filteredProducts = () => {
    const finishedGoodsProducts = stockData.filter(product => 
      product.category === "Finished Goods"
    );

    if (!searchTerm) {
      return finishedGoodsProducts;
    }
    return finishedGoodsProducts.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  if (!isOpen) return null;

  return (
    <div className="absolute z-50 mt-1">
      <div className="bg-white border rounded-md shadow-lg">
        <div className="max-h-[200px] overflow-y-auto">
          {filteredProducts().map((product) => (
            <div
              key={product.sku}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer whitespace-nowrap flex justify-between items-center"
              onClick={() => onSelect(
                product.name, 
                productPrices[product.name] || 0,
                mockPartIdentifiers[product.name] || `PART-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
              )}
            >
              <span>{product.name}</span>
              <span className="text-sm text-gray-500 ml-4">
                Available: {product.availableStock}
              </span>
            </div>
          ))}
          {searchTerm && filteredProducts().length === 0 && (
            <div className="p-2 border-t whitespace-nowrap">
              <Button
                variant="ghost"
                className="w-full justify-start text-sm font-normal"
                onClick={() => {
                  console.log(`Create new product: ${searchTerm}`);
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create "{searchTerm}"
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}