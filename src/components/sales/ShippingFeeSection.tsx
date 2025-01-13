import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import type { ShippingFee } from "@/types/sales";

interface ShippingFeeSectionProps {
  isEnabled: boolean;
  onShippingFeeChange?: (fee: string) => void;
  initialValues?: ShippingFee;
}

export function ShippingFeeSection({ 
  isEnabled, 
  onShippingFeeChange,
  initialValues
}: ShippingFeeSectionProps) {
  const [selectedTax, setSelectedTax] = useState(initialValues?.tax || "");
  const [isTaxDropdownOpen, setIsTaxDropdownOpen] = useState(false);
  const [cost, setCost] = useState(initialValues?.cost?.toString() || "0");
  const [description, setDescription] = useState(initialValues?.description || "");

  const handleTaxChange = (value: string) => {
    setSelectedTax(value);
    setIsTaxDropdownOpen(false);
  };

  const handleTaxInputClick = () => {
    setIsTaxDropdownOpen(true);
    setSelectedTax("");
  };

  const calculateTotalWithTax = () => {
    const costValue = parseFloat(cost) || 0;
    if (selectedTax === "20% - VAT [DEMO]") {
      return (costValue * 1.20).toFixed(2);
    }
    return costValue.toFixed(2);
  };

  useEffect(() => {
    onShippingFeeChange?.(calculateTotalWithTax());
  }, [cost, selectedTax]);

  return (
    <div>
      <h3 className="font-semibold mb-2">Shipping fee</h3>
      <div className="border rounded-lg p-4 bg-[#F6F6F7]">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label>Description</Label>
            <Input 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={!isEnabled} 
            />
          </div>
          <div>
            <Label>Cost</Label>
            <Input 
              value={`${cost}`}
              onChange={(e) => setCost(e.target.value.replace(/[^0-9.]/g, ''))}
              disabled={!isEnabled}
            />
          </div>
          <div>
            <Label>Tax</Label>
            {selectedTax && !isTaxDropdownOpen ? (
              <Input
                value={selectedTax}
                readOnly
                onClick={handleTaxInputClick}
                className="border-0 rounded-none focus-visible:ring-0 bg-gray-50 cursor-pointer hover:bg-gray-100"
              />
            ) : (
              <Select
                value={selectedTax}
                onValueChange={handleTaxChange}
                open={isTaxDropdownOpen}
                onOpenChange={setIsTaxDropdownOpen}
                disabled={!isEnabled}
              >
                <SelectTrigger className="border rounded focus-visible:ring-0">
                  <SelectValue placeholder="Select tax" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="20% - VAT [DEMO]">20% - VAT [DEMO]</SelectItem>
                  <SelectItem value="No Tax">No Tax</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}