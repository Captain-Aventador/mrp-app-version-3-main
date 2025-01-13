import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getPartsData, formatCurrency } from './utils/bomCalculations';

interface PartsListProps {
  bomId: string;
}

export function PartsList({ bomId }: PartsListProps) {
  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2">Parts List</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="bg-[#F6F6F7]">Part Name</TableHead>
            <TableHead className="bg-[#F6F6F7]">Part Identifier</TableHead>
            <TableHead className="bg-[#F6F6F7]">Quantity</TableHead>
            <TableHead className="bg-[#F6F6F7]">Unit Cost</TableHead>
            <TableHead className="bg-[#F6F6F7]">Total Cost</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {getPartsData(bomId).map((part, index) => (
            <TableRow key={index}>
              <TableCell className="px-4 align-middle border">{part.item}</TableCell>
              <TableCell className="px-4 align-middle border">{part.partIdentifier}</TableCell>
              <TableCell className="px-4 align-middle border">{part.quantity}</TableCell>
              <TableCell className="px-4 align-middle border">
                {formatCurrency(parseFloat(part.pricePerUnit))}
              </TableCell>
              <TableCell className="px-4 align-middle border">
                {formatCurrency(parseFloat(part.pricePerUnit) * parseInt(part.quantity))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}