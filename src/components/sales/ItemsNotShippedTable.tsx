import { useState, useEffect } from "react";
import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";
import type { TableRow as TableRowType } from "./types";

interface ItemsNotShippedTableProps {
  rows: TableRowType[];
  onDeleteRow: (id: number) => void;
  onAddRow: () => void;
  onTotalChange?: (totals: {
    subtotal: string;
    tax: string;
    total: string;
    totalUnits: string;
  }) => void;
  touchedRows: Set<number>;
  readOnly?: boolean;
  showPriceColumns?: boolean;
}

export function ItemsNotShippedTable({ 
  rows, 
  onDeleteRow, 
  onAddRow,
  onTotalChange,
  touchedRows,
  readOnly = false,
  showPriceColumns = true,
}: ItemsNotShippedTableProps) {
  const [searchTerms, setSearchTerms] = useState<{ [key: number]: string }>({});
  const [openDropdowns, setOpenDropdowns] = useState<{ [key: number]: boolean }>({});
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [totals, setTotals] = useState<{ [key: number]: number }>({});
  const [taxes, setTaxes] = useState<{ [key: number]: string }>({});
  const [partIdentifiers, setPartIdentifiers] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    if (readOnly) {
      const initialSearchTerms: { [key: number]: string } = {};
      const initialQuantities: { [key: number]: number } = {};
      const initialTotals: { [key: number]: number } = {};
      const initialTaxes: { [key: number]: string } = {};
      const initialPartIdentifiers: { [key: number]: string } = {};

      rows.forEach(row => {
        initialSearchTerms[row.id] = row.item;
        initialQuantities[row.id] = parseInt(row.quantity) || 0;
        initialTotals[row.id] = parseFloat(row.totalPrice) || 0;
        initialTaxes[row.id] = row.tax || "";
        initialPartIdentifiers[row.id] = row.partIdentifier;
      });

      setSearchTerms(initialSearchTerms);
      setQuantities(initialQuantities);
      setTotals(initialTotals);
      setTaxes(initialTaxes);
      setPartIdentifiers(initialPartIdentifiers);
    }
  }, [readOnly, rows]);

  const calculateTotalWithTax = () => {
    let total = 0;
    let totalTax = 0;
    
    Object.keys(totals).forEach((key) => {
      const numKey = parseInt(key);
      total += totals[numKey] || 0;
      if (taxes[numKey] === "20% - VAT [DEMO]") {
        totalTax += (totals[numKey] || 0) * 0.2;
      }
    });
    
    return {
      subtotal: total.toFixed(2),
      tax: totalTax.toFixed(2),
      total: (total + totalTax).toFixed(2),
      totalUnits: Object.values(quantities).reduce((sum, qty) => sum + (qty || 0), 0).toString()
    };
  };

  useEffect(() => {
    const totalsData = calculateTotalWithTax();
    onTotalChange?.(totalsData);
  }, [totals, taxes, quantities]);

  const handleSearchChange = (id: number, value: string) => {
    touchedRows.add(id);
    setSearchTerms(prev => ({ ...prev, [id]: value }));
    setOpenDropdowns(prev => ({ ...prev, [id]: value.length > 0 }));
  };

  const handleQuantityChange = (id: number, value: string) => {
    touchedRows.add(id);
    const quantity = parseInt(value) || 0;
    setQuantities(prev => ({ ...prev, [id]: quantity }));
  };

  const handleTotalChange = (id: number, value: number) => {
    setTotals(prev => ({ ...prev, [id]: value }));
  };

  const handleTaxChange = (id: number, value: string) => {
    setTaxes(prev => ({ ...prev, [id]: value }));
  };

  const handlePartIdentifierChange = (id: number, value: string) => {
    touchedRows.add(id);
    setPartIdentifiers(prev => ({ ...prev, [id]: value }));
  };

  const handleProductSelect = (id: number, productName: string) => {
    setSearchTerms(prev => ({ ...prev, [id]: productName }));
    setOpenDropdowns(prev => ({ ...prev, [id]: false }));
  };

  const handleDeleteRow = (id: number) => {
    setSearchTerms(prev => {
      const newState = { ...prev };
      delete newState[id];
      return newState;
    });
    setOpenDropdowns(prev => {
      const newState = { ...prev };
      delete newState[id];
      return newState;
    });
    setQuantities(prev => {
      const newState = { ...prev };
      delete newState[id];
      return newState;
    });
    setTotals(prev => {
      const newState = { ...prev };
      delete newState[id];
      return newState;
    });
    setTaxes(prev => {
      const newState = { ...prev };
      delete newState[id];
      return newState;
    });
    setPartIdentifiers(prev => {
      const newState = { ...prev };
      delete newState[id];
      return newState;
    });

    onDeleteRow(id);
  };

  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm divide-y divide-gray-200">
          <TableHeader showPriceColumns={showPriceColumns} />
          <tbody className="bg-white divide-y divide-gray-200">
            {rows.map((row) => (
              <TableRow
                key={row.id}
                row={row}
                searchTerm={searchTerms[row.id] || ""}
                isDropdownOpen={openDropdowns[row.id] || false}
                onSearchChange={(value) => handleSearchChange(row.id, value)}
                onQuantityChange={(value) => handleQuantityChange(row.id, value)}
                onTotalChange={(value) => handleTotalChange(row.id, value)}
                onProductSelect={(productName) => handleProductSelect(row.id, productName)}
                onDeleteRow={() => handleDeleteRow(row.id)}
                onPartIdentifierChange={(value) => handlePartIdentifierChange(row.id, value)}
                readOnly={readOnly}
                showPriceColumns={showPriceColumns}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}