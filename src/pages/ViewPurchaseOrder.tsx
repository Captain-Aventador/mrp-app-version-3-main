import { useParams } from "react-router-dom";
import { mockPurchaseOrders } from "@/data/mockPurchaseOrders";
import { mockSuppliers } from "@/data/mockSuppliers";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Printer, FileText, ArrowLeft } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function ViewPurchaseOrder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const order = mockPurchaseOrders.find((order) => order.id === id);
  const supplier = order ? mockSuppliers.find((s) => s.id === order.supplier) : null;
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  if (!order) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Purchase Order Not Found</h1>
      </div>
    );
  }

  const items = [
    { id: "1", salesOrderId: "SO-001", name: "Anchor Chain", quantity: 25, pending: 25, uom: "EA", price: 450.00, document: "DOC-001", status: "Pending" },
    { id: "2", salesOrderId: "SO-002", name: "Custom Propeller", quantity: 22, pending: 22, uom: "EA", price: 2400.00, document: "DOC-002", status: "In Progress" },
    { id: "3", salesOrderId: "SO-001", name: "Propeller Blade", quantity: 24, pending: 24, uom: "EA", price: 1800.00, document: "DOC-003", status: "Pending" },
    { id: "4", salesOrderId: "SO-003", name: "Hydraulic Cylinders", quantity: 23, pending: 23, uom: "EA", price: 2400.00, document: "DOC-004", status: "In Progress" },
    { id: "5", salesOrderId: "SO-002", name: "Navigation Lights", quantity: 26, pending: 26, uom: "EA", price: 900.00, document: "DOC-005", status: "Pending" },
    { id: "6", salesOrderId: "SO-003", name: "Rudder Assembly", quantity: 21, pending: 21, uom: "EA", price: 1900.00, document: "DOC-006", status: "In Progress" },
    { id: "7", salesOrderId: "SO-001", name: "Steel Sheets", quantity: 30, pending: 30, uom: "EA", price: 500.00, document: "DOC-007", status: "Pending" },
    { id: "8", salesOrderId: "SO-002", name: "Bearings", quantity: 40, pending: 40, uom: "EA", price: 400.00, document: "DOC-008", status: "In Progress" }
  ];

  const totalItems = items.length;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(items.map(item => item.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedRows(prev => [...prev, id]);
    } else {
      setSelectedRows(prev => prev.filter(rowId => rowId !== id));
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="hover:bg-accent"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-semibold">Purchase Order Details</h1>
          <p className="text-sm text-muted-foreground">PO-{order.id}</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-4 mt-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">{totalItems} parts</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-md hover:bg-accent text-foreground">
            <Download className="h-4 w-4" />
          </button>
          <button className="p-2 rounded-md hover:bg-accent text-foreground">
            <Printer className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#F6F6F7]">
              <TableHead className="bg-[#F6F6F7] border w-[50px]">
                <Checkbox 
                  checked={selectedRows.length === items.length}
                  onCheckedChange={(checked) => handleSelectAll(checked as boolean)}
                />
              </TableHead>
              <TableHead className="bg-[#F6F6F7] border">Sales Order ID</TableHead>
              <TableHead className="bg-[#F6F6F7] border">Part Name</TableHead>
              <TableHead className="bg-[#F6F6F7] border">Part Number</TableHead>
              <TableHead className="bg-[#F6F6F7] border">Due Date</TableHead>
              <TableHead className="bg-[#F6F6F7] border">Quantity Ordered</TableHead>
              <TableHead className="bg-[#F6F6F7] border">Quantity Pending</TableHead>
              <TableHead className="bg-[#F6F6F7] border">UOM</TableHead>
              <TableHead className="bg-[#F6F6F7] border">Unit Cost</TableHead>
              <TableHead className="bg-[#F6F6F7] border">Total Cost</TableHead>
              <TableHead className="bg-[#F6F6F7] border">Document</TableHead>
              <TableHead className="bg-[#F6F6F7] border">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="border w-[50px] bg-[#F6F6F7]">
                  <Checkbox 
                    checked={selectedRows.includes(item.id)}
                    onCheckedChange={(checked) => handleSelectRow(item.id, checked as boolean)}
                  />
                </TableCell>
                <TableCell className="border">{item.salesOrderId}</TableCell>
                <TableCell className="border">{item.name}</TableCell>
                <TableCell className="border">{`PN-${String(index + 1).padStart(3, '0')}`}</TableCell>
                <TableCell className="border">01-Apr-2024</TableCell>
                <TableCell className="border">{item.quantity}</TableCell>
                <TableCell className="border">{item.pending}</TableCell>
                <TableCell className="border">{item.uom}</TableCell>
                <TableCell className="border">{item.price.toFixed(2)}</TableCell>
                <TableCell className="border">{(item.price * item.quantity).toFixed(2)}</TableCell>
                <TableCell className="border">
                  <FileText className="h-5 w-5 text-gray-500" />
                </TableCell>
                <TableCell className="border">{item.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}