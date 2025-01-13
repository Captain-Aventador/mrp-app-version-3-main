import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { WorkOrder } from "@/data/mockWorkOrders";
import { DndContext, DragEndEvent, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableTableRow } from "./SortableTableRow";

interface WorkOrdersTableProps {
  orders: WorkOrder[];
  selectedOrders: string[];
  onSelectOrder: (orderId: string) => void;
  onSelectAll: () => void;
  onReorder: (reorderedItems: WorkOrder[]) => void;
  onStatusChange: (orderId: string, newStatus: WorkOrder['productionStatus']) => void;
  isCompletedTab?: boolean;
}

export function WorkOrdersTable({ 
  orders, 
  selectedOrders, 
  onSelectOrder, 
  onSelectAll,
  onReorder,
  onStatusChange,
  isCompletedTab = false
}: WorkOrdersTableProps) {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 8,
    },
  });
  
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 200,
      tolerance: 8,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = orders.findIndex((order) => order.id === active.id);
      const newIndex = orders.findIndex((order) => order.id === over.id);
      
      const newOrders = [...orders];
      const [movedItem] = newOrders.splice(oldIndex, 1);
      newOrders.splice(newIndex, 0, movedItem);
      
      onReorder(newOrders);
    }
  };

  const TableContent = () => (
    <Table>
      <TableHeader>
        <TableRow className="bg-[#F6F6F7]">
          <TableHead className="w-[50px] bg-[#F6F6F7]">
            <div className="flex items-center gap-4">
              {!isCompletedTab && <span className="w-4" />}
              <Checkbox 
                checked={selectedOrders.length === orders.length}
                onCheckedChange={onSelectAll}
              />
            </div>
          </TableHead>
          {!isCompletedTab && (
            <TableHead className="bg-[#F6F6F7]">Priority</TableHead>
          )}
          <TableHead className="bg-[#F6F6F7]">Order #</TableHead>
          <TableHead className="bg-[#F6F6F7]">Customer</TableHead>
          <TableHead className="bg-[#F6F6F7]">Product</TableHead>
          <TableHead className="bg-[#F6F6F7]">Category</TableHead>
          {!isCompletedTab && (
            <>
              <TableHead className="bg-[#F6F6F7]">Order Quantity</TableHead>
              <TableHead className="bg-[#F6F6F7]">Production Quantity</TableHead>
            </>
          )}
          <TableHead className="bg-[#F6F6F7]">Completed Quantity</TableHead>
          <TableHead className="bg-[#F6F6F7]">Planned Time</TableHead>
          <TableHead className="bg-[#F6F6F7]">Prod. Deadline</TableHead>
          <TableHead className="bg-[#F6F6F7]">Delivery Deadline</TableHead>
          {!isCompletedTab && (
            <TableHead className="bg-[#F6F6F7]">Material Status</TableHead>
          )}
          <TableHead className="bg-[#F6F6F7]">Production Status</TableHead>
          <TableHead className="bg-[#F6F6F7]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <SortableContext items={orders} strategy={verticalListSortingStrategy}>
        <TableBody>
          {orders.map((order) => (
            <SortableTableRow
              key={order.id}
              order={order}
              selected={selectedOrders.includes(order.id)}
              onSelect={() => onSelectOrder(order.id)}
              onStatusChange={onStatusChange}
              isCompletedTab={isCompletedTab}
            />
          ))}
        </TableBody>
      </SortableContext>
    </Table>
  );

  return (
    <div className="rounded-md border bg-white">
      {isCompletedTab ? (
        <TableContent />
      ) : (
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <TableContent />
        </DndContext>
      )}
    </div>
  );
}