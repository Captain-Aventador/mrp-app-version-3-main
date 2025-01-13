import { useEffect } from "react";

interface PriceInputsProps {
  quantity: string;
  pricePerUnit: string;
  onTotalChange: (total: number) => void;
  readOnly?: boolean;
}

export function PriceInputs({ quantity, pricePerUnit, onTotalChange, readOnly = false }: PriceInputsProps) {
  useEffect(() => {
    const qty = parseFloat(quantity) || 0;
    const price = parseFloat(pricePerUnit) || 0;
    const totalPrice = Math.round(qty * price);
    
    onTotalChange(totalPrice);
  }, [quantity, pricePerUnit, onTotalChange]);

  return (
    <td className="p-1 align-middle border">
      <div className="px-3 py-2">{Math.round(parseFloat(quantity || "0") * parseFloat(pricePerUnit || "0"))}</div>
    </td>
  );
}