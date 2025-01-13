import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { stockData } from "@/pages/CurrentStock";
import { useToast } from "@/hooks/use-toast";

interface BasicInfoProps {
  formData: {
    partIdentifier: string;
    description: string;
    requiredDescription: string;
    revision: string;
    name: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export function BasicInfo({ formData, handleInputChange }: BasicInfoProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<typeof stockData>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e);
    const searchTerm = e.target.value.toLowerCase();
    
    if (searchTerm) {
      const filtered = stockData.filter(product => 
        product.name.toLowerCase().includes(searchTerm)
      );
      setFilteredProducts(filtered);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const handleProductSelect = (productName: string) => {
    const nameEvent = {
      target: {
        id: 'name',
        value: productName
      }
    } as React.ChangeEvent<HTMLInputElement>;
    handleInputChange(nameEvent);

    const mockId = `PART-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
    const partIdEvent = {
      target: {
        id: 'partIdentifier',
        value: mockId
      }
    } as React.ChangeEvent<HTMLInputElement>;
    handleInputChange(partIdEvent);

    setShowDropdown(false);
  };

  const handleCreateNewPart = () => {
    // Add the new part to stock data
    const newPart = {
      name: formData.name,
      category: "Finished Goods",
      sku: `FG-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      stockLevel: "0 units",
      reservedStock: "0 units",
      availableStock: "0 units",
      status: "Not Available",
      action: "Procure"
    };

    stockData.push(newPart);
    handleProductSelect(formData.name);

    toast({
      title: "Success",
      description: `New part "${formData.name}" has been added to stock`,
    });
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2 relative">
          <Label htmlFor="name">Part Name*</Label>
          <Input 
            id="name" 
            placeholder="Enter Part Name..." 
            value={formData.name}
            onChange={handleNameChange}
          />
          {showDropdown && (
            <div 
              ref={dropdownRef}
              className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto"
            >
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm bg-white"
                    onClick={() => handleProductSelect(product.name)}
                  >
                    {product.name}
                  </div>
                ))
              ) : formData.name && (
                <div className="p-2 border-t">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-sm font-normal"
                    onClick={handleCreateNewPart}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create "{formData.name}"
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="partIdentifier">Part Identifier*</Label>
          <Input 
            id="partIdentifier" 
            placeholder="Enter Part Identifier..." 
            value={formData.partIdentifier}
            onChange={handleInputChange}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description*</Label>
        <Textarea 
          id="description" 
          className="min-h-[100px]"
          value={formData.description}
          onChange={handleInputChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="revision">Revision</Label>
        <Input 
          id="revision"
          value={formData.revision}
          onChange={handleInputChange}
        />
      </div>
    </>
  );
}