import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { PurchaseOrder } from "@/data/mockPurchaseOrders";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { mockSuppliers } from "@/data/mockSuppliers";
import { useNavigate } from "react-router-dom";

interface PurchaseOrdersTableProps {
  orders: PurchaseOrder[];
  selectedOrders: string[];
  onSelectOrder: (orderId: string) => void;
  onSelectAll: () => void;
}

export function PurchaseOrdersTable({
  orders,
  selectedOrders,
  onSelectOrder,
  onSelectAll,
}: PurchaseOrdersTableProps) {
  const navigate = useNavigate();
  const totalValue = orders.reduce((sum, order) => sum + order.totalValue, 0);

  const getSupplierName = (supplierId: string) => {
    const supplier = mockSuppliers.find(s => s.id === supplierId);
    return supplier ? supplier.name : supplierId;
  };

  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-[#F6F6F7]">
            <TableHead className="w-[50px] bg-[#F6F6F7]">
              <Checkbox
                checked={selectedOrders.length === orders.length}
                onCheckedChange={onSelectAll}
              />
            </TableHead>
            <TableHead className="bg-[#F6F6F7]">Order Date</TableHead>
            <TableHead className="bg-[#F6F6F7]">PO #</TableHead>
            <TableHead className="bg-[#F6F6F7]">Supplier</TableHead>
            <TableHead className="bg-[#F6F6F7] text-right">Total order value</TableHead>
            <TableHead className="bg-[#F6F6F7]">PO Accepted</TableHead>
            <TableHead className="bg-[#F6F6F7]">Expected arrival</TableHead>
            <TableHead className="bg-[#F6F6F7] w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={4} className="font-medium p-4 px-4 align-middle border">Total:</TableCell>
            <TableCell className="text-right font-medium p-4 px-4 align-middle border">{totalValue.toFixed(2)} USD</TableCell>
            <TableCell colSpan={3} className="p-4 px-4 align-middle border"></TableCell>
          </TableRow>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="bg-[#F6F6F7] p-4 align-middle border">
                <Checkbox
                  checked={selectedOrders.includes(order.id)}
                  onCheckedChange={() => onSelectOrder(order.id)}
                />
              </TableCell>
              <TableCell className="p-4 align-middle border">{order.createdDate}</TableCell>
              <TableCell className="p-4 align-middle border">{order.orderNumber}</TableCell>
              <TableCell className="p-4 align-middle border">{getSupplierName(order.supplier)}</TableCell>
              <TableCell className="text-right p-4 align-middle border">{order.totalValue.toFixed(2)} USD</TableCell>
              <TableCell className="align-middle border">{order.poAccepted || "-"}</TableCell>
              <TableCell className="p-4 align-middle border">{order.expectedArrival}</TableCell>
              <TableCell className="p-4 align-middle border">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-4">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => navigate(`/procurement/orders/${order.id}`)}>
                      View details
                    </DropdownMenuItem>
                    <DropdownMenuItem>Edit order</DropdownMenuItem>
                    <DropdownMenuItem>Cancel order</DropdownMenuItem>
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