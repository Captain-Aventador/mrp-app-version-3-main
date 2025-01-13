import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/sales/StatusBadge";
import { OrderActionButton } from "@/components/sales/OrderActionButton";
import type { SalesOrder } from "@/types/sales";
import { useLocation, useNavigate } from "react-router-dom";

interface PurchaseRequisitionTableProps {
  orders: SalesOrder[];
  currentTab: string;
}

export function PurchaseRequisitionTable({ 
  orders,
  currentTab
}: PurchaseRequisitionTableProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const isPurchaseRequisitions = location.pathname === "/purchase-requisitions";
  
  const calculateProfit = (order: SalesOrder) => {
    const tax = order.tax || 0;
    const cogs = order.costOfGoodsSold || 0;
    return order.totalAmount - (tax + cogs);
  };

  const getRandomItemCount = (orderId: string) => {
    const hash = orderId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return 6 + (hash % 10);
  };

  const handleViewDetails = (order: SalesOrder) => {
    navigate(`/purchase-requisitions/${order.id}`, { state: { orderDetails: order } });
  };

  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-[#F6F6F7]">
            {isPurchaseRequisitions ? (
              <>
                <TableHead className="bg-[#F6F6F7] border py-0">Requisition ID</TableHead>
                <TableHead className="bg-[#F6F6F7] border py-0">Date Created</TableHead>
                <TableHead className="bg-[#F6F6F7] border py-0">Requester</TableHead>
                <TableHead className="bg-[#F6F6F7] border py-0">Program</TableHead>
                <TableHead className="bg-[#F6F6F7] border py-0">Project</TableHead>
                <TableHead className="bg-[#F6F6F7] border py-0">Items</TableHead>
                <TableHead className="bg-[#F6F6F7] border py-0">Total Cost</TableHead>
                <TableHead className="bg-[#F6F6F7] border py-0">Status</TableHead>
                <TableHead className="bg-[#F6F6F7] border py-0">Actions</TableHead>
              </>
            ) : (
              <>
                <TableHead className="bg-[#F6F6F7] border py-0">Order Date</TableHead>
                <TableHead className="bg-[#F6F6F7] border py-0">Order ID</TableHead>
                <TableHead className="bg-[#F6F6F7] border py-0">Customer</TableHead>
                <TableHead className="bg-[#F6F6F7] border py-0">Total Amount</TableHead>
                <TableHead className="bg-[#F6F6F7] border py-0">Delivery Deadline</TableHead>
                {currentTab === 'open' && (
                  <TableHead className="bg-[#F6F6F7] border py-0">Status</TableHead>
                )}
                {currentTab === 'delivered' && (
                  <>
                    <TableHead className="bg-[#F6F6F7] border py-0">Tax</TableHead>
                    <TableHead className="bg-[#F6F6F7] border py-0">Cost of Goods Sold</TableHead>
                    <TableHead className="bg-[#F6F6F7] border py-0">Profit</TableHead>
                  </>
                )}
                <TableHead className="bg-[#F6F6F7] border py-0">Actions</TableHead>
              </>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              {isPurchaseRequisitions ? (
                <>
                  <TableCell className="border py-0">{order.id}</TableCell>
                  <TableCell className="border py-0">{order.orderDate}</TableCell>
                  <TableCell className="border py-0">{order.customer}</TableCell>
                  <TableCell className="border py-0">{order.program || 'N/A'}</TableCell>
                  <TableCell className="border py-0">{order.project || 'N/A'}</TableCell>
                  <TableCell className="border py-0">{order.items?.length || getRandomItemCount(order.id)}</TableCell>
                  <TableCell className="border py-0">${order.totalAmount.toFixed(2)}</TableCell>
                  <TableCell className="border p-0">
                    <StatusBadge status={order.status || 'Pending'} fullWidth className="p-4" />
                  </TableCell>
                  <TableCell className="border py-0 space-x-2">
                    <OrderActionButton 
                      inventoryStatus={order.inventoryStatus}
                      productionStatus={order.productionStatus}
                      deliveryStatus={order.deliveryStatus}
                      orderId={order.id}
                    />
                    <button
                      onClick={() => handleViewDetails(order)}
                      className="px-3 py-1 text-sm bg-primary text-white rounded-md hover:bg-primary/90"
                    >
                      View Details
                    </button>
                  </TableCell>
                </>
              ) : (
                <>
                  <TableCell className="border py-0">{order.orderDate}</TableCell>
                  <TableCell className="border py-0">{order.id}</TableCell>
                  <TableCell className="border py-0">{order.customer}</TableCell>
                  <TableCell className="border py-0">${order.totalAmount.toFixed(2)}</TableCell>
                  <TableCell className="border py-0">{order.deliveryDeadline}</TableCell>
                  {currentTab === 'open' && (
                    <TableCell className="border p-0">
                      <StatusBadge status={order.status} fullWidth className="p-4" />
                    </TableCell>
                  )}
                  {currentTab === 'delivered' && (
                    <>
                      <TableCell className="border py-0">${order.tax?.toFixed(2) || '0.00'}</TableCell>
                      <TableCell className="border py-0">${order.costOfGoodsSold?.toFixed(2) || '0.00'}</TableCell>
                      <TableCell className="border py-0">${calculateProfit(order).toFixed(2)}</TableCell>
                    </>
                  )}
                  <TableCell className="border py-0">
                    <OrderActionButton 
                      inventoryStatus={order.inventoryStatus}
                      productionStatus={order.productionStatus}
                      deliveryStatus={order.deliveryStatus}
                      orderId={order.id}
                    />
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default PurchaseRequisitionTable;