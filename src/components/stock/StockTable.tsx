import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { StockItem } from "@/types/stock";
import { Eye, Pencil, Trash2, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface StockTableProps {
  items: StockItem[];
  selectedItems: string[];
  onSelectItem: (sku: string) => void;
  onSelectAll: () => void;
  activeTab?: string;
}

export function StockTable({ 
  items, 
  selectedItems, 
  onSelectItem, 
  onSelectAll,
  activeTab = 'products'
}: StockTableProps) {
  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-[#F6F6F7]">
            <TableHead className="w-[50px] bg-[#F6F6F7]">
              <Checkbox 
                checked={selectedItems.length === items.length && items.length > 0}
                onCheckedChange={onSelectAll}
              />
            </TableHead>
            <TableHead className="bg-[#F6F6F7]">Name</TableHead>
            <TableHead className="bg-[#F6F6F7]">Stock Level</TableHead>
            <TableHead className="bg-[#F6F6F7]">Reserved Stock</TableHead>
            <TableHead className="bg-[#F6F6F7]">Available Stock</TableHead>
            <TableHead className="bg-[#F6F6F7]">Status</TableHead>
            <TableHead className="bg-[#F6F6F7]">Reorder Recommendation (AI)</TableHead>
            <TableHead className="bg-[#F6F6F7]">Predicted Lead Time (AI)</TableHead>
            <TableHead className="bg-[#F6F6F7]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.sku}>
              <TableCell>
                <Checkbox 
                  checked={selectedItems.includes(item.sku)}
                  onCheckedChange={() => onSelectItem(item.sku)}
                />
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.stockLevel}</TableCell>
              <TableCell>{item.reservedStock}</TableCell>
              <TableCell>{item.availableStock}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell>
                {Number(item.stockLevel.split(' ')[0]) < 50 ? "Reorder Recommended" : "Stock Level Optimal"}
              </TableCell>
              <TableCell>
                {`${Math.floor(Math.random() * 10 + 5)} days`}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2">
                      <Pencil className="h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}