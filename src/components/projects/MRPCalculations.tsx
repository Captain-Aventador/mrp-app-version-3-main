import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Part } from "./PartForm";
import { getAvailableStock } from "./parts-table/utils";
import { useState } from "react";
import { CreateNewRequisitionDialog } from "./CreateNewRequisitionDialog";

interface MRPCalculationsProps {
  parts: Part[];
  isEditing?: boolean;
}

export function MRPCalculations({ parts = [], isEditing = false }: MRPCalculationsProps) {
  const [selectedPart, setSelectedPart] = useState<Part | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const calculateShortageQuantity = (inventoryStock: number, quantity: string) => {
    const parsedQuantity = parseInt(quantity) || 0;
    return parsedQuantity > inventoryStock ? (parsedQuantity - inventoryStock).toString() : "-";
  };

  const renderRequisitionStatus = (shortageQuantity: string, part: Part) => {
    if (shortageQuantity === "-") return "Not Required";
    const shortage = parseInt(shortageQuantity) || 0;
    if (shortage > 0) {
      const isAddProjectPage = window.location.pathname.includes('/project/add');
      return (
        <Button 
          variant="outline" 
          size="sm"
          className="text-primary hover:text-primary"
          onClick={() => {
            setSelectedPart(part);
            setIsDialogOpen(true);
          }}
          disabled={!isAddProjectPage && !isEditing}
        >
          + New Requisition
        </Button>
      );
    }
    return "Not Required";
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">MRP Calculations</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="p-4 bg-[#F6F6F7] border">BOM Name</TableHead>
            <TableHead className="p-4 bg-[#F6F6F7] border">Quantity</TableHead>
            <TableHead className="p-4 bg-[#F6F6F7] border">Inventory Stock</TableHead>
            <TableHead className="p-4 bg-[#F6F6F7] border">Shortages Quantity</TableHead>
            <TableHead className="p-4 bg-[#F6F6F7] border">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(!parts || parts.length === 0) ? (
            <TableRow>
              <TableCell colSpan={5} className="p-4 border text-center">
                No Record Found
              </TableCell>
            </TableRow>
          ) : (
            parts.map((part) => {
              const availableStock = getAvailableStock(part);
              const shortageQuantity = calculateShortageQuantity(availableStock, part.quantity);
              return (
                <TableRow key={part.id}>
                  <TableCell className="p-4 border">{part.name}</TableCell>
                  <TableCell className="p-4 border">{part.quantity}</TableCell>
                  <TableCell className="p-4 border">{availableStock}</TableCell>
                  <TableCell className="p-4 border">{shortageQuantity}</TableCell>
                  <TableCell className="p-4 border">
                    {renderRequisitionStatus(shortageQuantity, part)}
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>

      {selectedPart && (
        <CreateNewRequisitionDialog
          isOpen={isDialogOpen}
          onClose={() => {
            setIsDialogOpen(false);
            setSelectedPart(null);
          }}
          partName={selectedPart.name}
          quantity={selectedPart.quantity}
        />
      )}
    </div>
  );
}