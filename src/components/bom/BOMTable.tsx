import React from 'react';
import { BOMItem } from "@/data/mockBOM";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { StatusBadge } from "./StatusBadge";
import { PartsList } from "./PartsList";
import { calculateTotalParts, formatCurrency } from './utils/bomCalculations';

interface BOMTableProps {
  items: BOMItem[];
}

// Initialize mockPartsData if it doesn't exist
if (typeof window !== 'undefined') {
  window.mockPartsData = window.mockPartsData || {
    "BOM-001": [
      {
        item: "Engine Control Unit",
        partIdentifier: "ECU-123",
        quantity: "1",
        pricePerUnit: "5000.00"
      },
      {
        item: "Propulsion System",
        partIdentifier: "PROP-456",
        quantity: "2",
        pricePerUnit: "8000.00"
      }
    ],
    "BOM-002": [
      {
        item: "Navigation System",
        partIdentifier: "NAV-789",
        quantity: "1",
        pricePerUnit: "6000.00"
      },
      {
        item: "Control Panel",
        partIdentifier: "CP-101",
        quantity: "3",
        pricePerUnit: "2500.00"
      }
    ],
    "BOM-003": [
      {
        item: "Hull Assembly",
        partIdentifier: "HULL-202",
        quantity: "1",
        pricePerUnit: "15000.00"
      }
    ],
    "BOM-004": [
      {
        item: "Electrical System",
        partIdentifier: "ELEC-303",
        quantity: "1",
        pricePerUnit: "12000.00"
      },
      {
        item: "Power Distribution Unit",
        partIdentifier: "PDU-404",
        quantity: "2",
        pricePerUnit: "4500.00"
      }
    ]
  };
}

export function BOMTable({ items }: BOMTableProps) {
  const [expandedRows, setExpandedRows] = useState<string[]>([]);

  const toggleRow = (itemId: string) => {
    setExpandedRows(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-[#F6F6F7]">
            <TableHead className="w-[50px] bg-[#F6F6F7] border py-0">
              <Button 
                variant="ghost" 
                size="icon" 
                className="invisible"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="bg-[#F6F6F7] border py-0">BOM ID</TableHead>
            <TableHead className="bg-[#F6F6F7] border py-0">Project Name</TableHead>
            <TableHead className="bg-[#F6F6F7] border py-0">No. of Parts</TableHead>
            <TableHead className="bg-[#F6F6F7] border py-0">Total Cost</TableHead>
            <TableHead className="bg-[#F6F6F7] border py-0">Last Modified</TableHead>
            <TableHead className="bg-[#F6F6F7] border p-0">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <React.Fragment key={item.id}>
              <TableRow>
                <TableCell className="bg-[#F6F6F7] border py-0">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => toggleRow(item.id)}
                    className="h-4 w-4 p-0"
                  >
                    {expandedRows.includes(item.id) ? (
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </TableCell>
                <TableCell className="border py-0">{item.id}</TableCell>
                <TableCell className="border py-0">{item.name}</TableCell>
                <TableCell className="border py-0">{calculateTotalParts(item.id)}</TableCell>
                <TableCell className="border py-0">{formatCurrency(item.totalCost)}</TableCell>
                <TableCell className="border py-0">{item.lastModified}</TableCell>
                <TableCell className="border p-0">
                  <StatusBadge status={item.status} fullWidth />
                </TableCell>
              </TableRow>
              {expandedRows.includes(item.id) && (
                <TableRow>
                  <TableCell colSpan={8} className="p-4">
                    <PartsList bomId={item.id} />
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
