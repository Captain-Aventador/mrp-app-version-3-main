import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface BOMDetailsProps {
  formData: {
    approvedPartNumbers: string;
    quantity: string;
    supplierNote: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export function BOMDetails({ formData, handleInputChange }: BOMDetailsProps) {
  const [quantityError, setQuantityError] = useState<string>("");

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Clear error if field is empty
    if (!value) {
      setQuantityError("");
      handleInputChange(e);
      return;
    }

    // Check if value is a positive number
    const numValue = Number(value);
    if (isNaN(numValue) || numValue <= 0 || !Number.isInteger(numValue)) {
      setQuantityError("Please enter a valid positive whole number");
    } else {
      setQuantityError("");
    }
    
    handleInputChange(e);
  };

  return (
    <>
      <div className="space-y-2">
        <Label>BOM Details</Label>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="approvedPartNumbers">Approved Part Numbers</Label>
          <Input 
            id="approvedPartNumbers" 
            placeholder="Select Part Number"
            value={formData.approvedPartNumbers}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="quantity">Quantity*</Label>
          <Input 
            id="quantity" 
            type="number"
            placeholder="Enter quantity"
            value={formData.quantity}
            onChange={handleQuantityChange}
            className={quantityError ? "border-red-500" : ""}
          />
          {quantityError && (
            <p className="text-sm text-red-500">{quantityError}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Notes</Label>
        <Textarea 
          id="supplierNote"
          placeholder="Supplier Note"
          className="min-h-[100px]"
          value={formData.supplierNote}
          onChange={handleInputChange}
        />
        <p className="text-xs text-gray-500">
          Supplier receiving RFQs with this part will have visibility of this note. Not editable post RFQ Send.
        </p>
      </div>
    </>
  );
}