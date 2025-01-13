import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Supplier } from "@/data/mockSuppliers";
import { Checkbox } from "@/components/ui/checkbox";

interface SuppliersTableProps {
  suppliers: Supplier[];
  selectedSuppliers: string[];
  onSelectSupplier: (supplierId: string) => void;
  onSelectAll: () => void;
}

export function SuppliersTable({ 
  suppliers, 
  selectedSuppliers, 
  onSelectSupplier, 
  onSelectAll 
}: SuppliersTableProps) {
  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-[#F6F6F7]">
            <TableHead className="w-[40px] bg-[#F6F6F7]">
              <Checkbox 
                checked={selectedSuppliers.length === suppliers.length && suppliers.length > 0}
                onCheckedChange={onSelectAll}
              />
            </TableHead>
            <TableHead className="bg-[#F6F6F7]">Name</TableHead>
            <TableHead className="bg-[#F6F6F7]">E-mail address</TableHead>
            <TableHead className="bg-[#F6F6F7]">Phone number</TableHead>
            <TableHead className="bg-[#F6F6F7]">Comment</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {suppliers.map((supplier) => (
            <TableRow key={supplier.id}>
              <TableCell className="p-4">
                <Checkbox 
                  checked={selectedSuppliers.includes(supplier.id)}
                  onCheckedChange={() => onSelectSupplier(supplier.id)}
                />
              </TableCell>
              <TableCell className="p-4">{supplier.name}</TableCell>
              <TableCell className="p-4">{supplier.email}</TableCell>
              <TableCell className="p-4">{supplier.phone || ''}</TableCell>
              <TableCell className="p-4">{supplier.comment || ''}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}