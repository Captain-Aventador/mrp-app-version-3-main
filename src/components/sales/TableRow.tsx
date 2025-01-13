import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { ProductSearchDropdown } from "./ProductSearchDropdown";
import { PriceInputs } from "./PriceInputs";
import { useState } from "react";
import type { TableRow as TableRowType } from "./types";

interface TableRowProps {
  row: TableRowType;
  searchTerm: string;
  isDropdownOpen: boolean;
  onSearchChange: (value: string) => void;
  onQuantityChange: (value: string) => void;
  onTotalChange: (value: number) => void;
  onProductSelect: (productName: string) => void;
  onDeleteRow: () => void;
  onPartIdentifierChange?: (value: string) => void;
  readOnly?: boolean;
  showPriceColumns?: boolean;
}

export function TableRow({
  row,
  searchTerm,
  isDropdownOpen,
  onSearchChange,
  onQuantityChange,
  onTotalChange,
  onProductSelect,
  onDeleteRow,
  onPartIdentifierChange,
  readOnly = false,
  showPriceColumns = true
}: TableRowProps) {
  const [quantity, setQuantity] = useState(row.quantity || "0");
  const [pricePerUnit, setPricePerUnit] = useState(row.pricePerUnit || "");
  const [partIdentifier, setPartIdentifier] = useState("");

  const handleQuantityChange = (value: string) => {
    if (!readOnly) {
      setQuantity(value);
      onQuantityChange(value);
    }
  };

  const handlePricePerUnitChange = (value: string) => {
    if (!readOnly) {
      setPricePerUnit(value);
    }
  };

  const handlePartIdentifierChange = (value: string) => {
    if (!readOnly) {
      setPartIdentifier(value);
      onPartIdentifierChange?.(value);
    }
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-4 py-2 border">{row.id}.</td>
      <td className="p-1 align-middle border">
        {readOnly ? (
          <div className="px-3 py-2 text-gray-900">{searchTerm}</div>
        ) : (
          <>
            <Input 
              value={searchTerm || ""}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search or create item"
              className="border-0 rounded-none focus-visible:ring-0 text-black"
            />
            <ProductSearchDropdown
              searchTerm={searchTerm}
              isOpen={isDropdownOpen}
              onSelect={(productName, price, partId) => {
                onProductSelect(productName);
                setPricePerUnit(price.toString());
                handlePartIdentifierChange(partId);
              }}
            />
          </>
        )}
      </td>
      <td className="p-1 align-middle border">
        {readOnly ? (
          <div className="px-3 py-2 text-gray-900">{partIdentifier}</div>
        ) : (
          <Input 
            value={partIdentifier}
            onChange={(e) => handlePartIdentifierChange(e.target.value)}
            className="border-0 rounded-none focus-visible:ring-0 text-black"
            placeholder=""
          />
        )}
      </td>
      <td className="p-1 align-middle border">
        {readOnly ? (
          <div className="px-3 py-2">{quantity}</div>
        ) : (
          <Input 
            value={quantity}
            onChange={(e) => handleQuantityChange(e.target.value)}
            className="border-0 rounded-none focus-visible:ring-0 text-black"
            placeholder="Enter quantity"
          />
        )}
      </td>
      {showPriceColumns && (
        <>
          <td className="p-1 align-middle border">
            {readOnly ? (
              <div className="px-3 py-2">{pricePerUnit}</div>
            ) : (
              <Input 
                value={pricePerUnit}
                onChange={(e) => handlePricePerUnitChange(e.target.value)}
                className="border-0 rounded-none focus-visible:ring-0 text-black"
                placeholder="Price per unit"
              />
            )}
          </td>
          <PriceInputs
            quantity={quantity}
            pricePerUnit={pricePerUnit}
            onTotalChange={onTotalChange}
            readOnly={readOnly}
          />
        </>
      )}
      <td className="p-1 align-middle border">
        {!readOnly && (
          <Button 
            variant="ghost"
            size="icon"
            onClick={onDeleteRow}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </td>
    </tr>
  );
}