import { TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MoreVertical, Trash2, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Part } from "../PartForm";
import { useState } from "react";
import { CreateSalesOrderDialog } from "@/components/sales/CreateSalesOrderDialog";

interface TableRowProps {
  part: Part;
  isEditing: boolean;
  isSelected: boolean;
  onSelect: (partId: string) => void;
  onDelete: (partId: string) => void;
  onViewDetails: (partId: string) => void;
  onCreateOrder: (partId: string) => void;
  stockQuantity: number;
  requirementQuantity: string;
}

export function TableRowComponent({
  part,
  isEditing,
  isSelected,
  onSelect,
  onDelete,
  onViewDetails,
  onCreateOrder,
  stockQuantity,
  requirementQuantity,
}: TableRowProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isExceedingStock = parseInt(part.quantity) > stockQuantity;
  const mockPrice = 300;

  const handleCreateOrder = () => {
    if (isEditing) {
      setIsDialogOpen(true);
    } else {
      onCreateOrder(part.id);
    }
  };

  return (
    <TableRow className={isExceedingStock ? "bg-[#FFF6F7]" : ""}>
      {isEditing && (
        <TableCell className="p-4 sticky left-0 bg-[#F6F6F7] border">
          <Checkbox 
            checked={isSelected}
            onCheckedChange={() => onSelect(part.id)}
          />
        </TableCell>
      )}
      <TableCell className="p-4 border">{part.bomLevel}</TableCell>
      <TableCell className="p-4 border">{`${part.fscg}${part.niin}` || '-'}</TableCell>
      <TableCell className="p-4 border">{part.name || '-'}</TableCell>
      <TableCell className="p-4 border">{part.approvedPartNumbers || '-'}</TableCell>
      <TableCell className="p-4 border">{part.partIdentifier}</TableCell>
      <TableCell className="p-4 border">{part.revision || '-'}</TableCell>
      <TableCell className="p-4 border">{part.classification || '-'}</TableCell>
      <TableCell className="p-4 border">{part.description}</TableCell>
      <TableCell className="p-4 border">{part.supplierNote || '-'}</TableCell>
      <TableCell className="p-4 border">{isEditing ? `${mockPrice} USD` : '-'}</TableCell>
      <TableCell className="p-4 border">{part.unitOfMeasure}</TableCell>
      <TableCell className="p-4 border">
        {isEditing ? (
          <Input 
            value={part.quantity}
            onChange={(e) => console.log('Update quantity:', e.target.value)}
            className="w-20"
          />
        ) : (
          part.quantity
        )}
      </TableCell>
      <TableCell className="p-4 sticky right-0 bg-white border">
        {isEditing ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5 text-gray-500 cursor-pointer hover:text-gray-700" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white">
              <DropdownMenuItem onClick={() => onDelete(part.id)} className="text-red-500">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
              {isExceedingStock && (
                <DropdownMenuItem onClick={handleCreateOrder}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Sales Order
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5 text-gray-500 cursor-pointer hover:text-gray-700" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white">
              <DropdownMenuItem onClick={() => onViewDetails(part.id)}>
                View Details
              </DropdownMenuItem>
              {isExceedingStock && (
                <DropdownMenuItem onClick={handleCreateOrder}>
                  Create Sales Order
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </TableCell>

      <CreateSalesOrderDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        initialItems={[{
          name: part.name,
          quantity: requirementQuantity,
          pricePerUnit: mockPrice.toString(),
          partIdentifier: part.partIdentifier
        }]}
      />
    </TableRow>
  );
}