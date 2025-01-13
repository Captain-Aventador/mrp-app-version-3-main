import { TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { WorkOrder } from "@/data/mockWorkOrders";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, MoreVertical } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { stockData } from "@/pages/CurrentStock";

interface SortableTableRowProps {
  order: WorkOrder;
  selected: boolean;
  onSelect: () => void;
  onStatusChange: (orderId: string, newStatus: WorkOrder['productionStatus']) => void;
  isCompletedTab?: boolean;
}

export function SortableTableRow({ 
  order, 
  selected, 
  onSelect,
  onStatusChange,
  isCompletedTab = false
}: SortableTableRowProps) {
  const {
    attributes,
    listeners,
    transform,
    transition,
    setNodeRef,
  } = useSortable({ id: order.id });

  const { toast } = useToast();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getBadgeVariant = (status: string) => {
    if (status === "Available") return "success";
    if (status === "Out of Stock") return "secondary";
    return "destructive";
  };

  const handleStatusChange = (newStatus: WorkOrder['productionStatus']) => {
    if (newStatus === "Completed") {
      // Find the corresponding stock item
      const stockItem = stockData.find(item => item.name === order.product);
      if (stockItem) {
        // Parse current available stock
        const currentAvailable = parseInt(stockItem.availableStock) || 0;
        // Add completed quantity to available stock
        stockItem.availableStock = `${currentAvailable + order.completedQuantity} units`;
        
        toast({
          title: "Stock Updated",
          description: `Added ${order.completedQuantity} units to available stock for ${order.product}`,
        });
      }
    }
    onStatusChange(order.id, newStatus);
  };

  const getActionItems = () => {
    const items = [];
    
    if (!isCompletedTab && order.productionStatus !== "Ready to Ship") {
      if (order.productionStatus !== "Not Started") {
        items.push(
          <DropdownMenuItem key="not-started" onClick={() => handleStatusChange("Not Started")}>
            Not Started
          </DropdownMenuItem>
        );
      }

      if (order.productionStatus !== "In Progress") {
        items.push(
          <DropdownMenuItem key="in-progress" onClick={() => handleStatusChange("In Progress")}>
            In Progress
          </DropdownMenuItem>
        );
      }

      items.push(
        <DropdownMenuItem key="on-hold" onClick={() => handleStatusChange("On Hold")}>
          On Hold
        </DropdownMenuItem>
      );
    }

    // Show Add to Stock option when there's any completed quantity
    if (order.completedQuantity > 0) {
      items.push(
        <DropdownMenuItem key="completed" onClick={() => handleStatusChange("Completed")}>
          Add to Stock
        </DropdownMenuItem>
      );
    }

    return items;
  };

  return (
    <TableRow ref={setNodeRef} style={style}>
      <TableCell>
        <div className="flex items-center gap-4">
          {!isCompletedTab && (
            <span {...attributes} {...listeners}>
              <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
            </span>
          )}
          <Checkbox 
            checked={selected}
            onCheckedChange={onSelect}
          />
        </div>
      </TableCell>
      {!isCompletedTab && <TableCell>{order.priority}</TableCell>}
      <TableCell>{order.orderNumber}</TableCell>
      <TableCell>{order.customer}</TableCell>
      <TableCell>{order.product}</TableCell>
      <TableCell>{order.category}</TableCell>
      {!isCompletedTab && (
        <>
          <TableCell>{order.quantity}</TableCell>
          <TableCell>{order.productionQuantity || 0}</TableCell>
        </>
      )}
      <TableCell>{order.completedQuantity}</TableCell>
      <TableCell>{order.plannedTime}</TableCell>
      <TableCell>{order.productionDeadline}</TableCell>
      <TableCell>{order.deliveryDeadline}</TableCell>
      {!isCompletedTab && (
        <TableCell className="align-middle">
          <Badge 
            variant={getBadgeVariant(order.materialStatus)}
            className="w-full"
          >
            {order.materialStatus}
          </Badge>
        </TableCell>
      )}
      <TableCell className="align-middle">
        <Badge 
          variant={order.productionStatus === "Completed" ? "success" : "secondary"}
          className="w-full"
        >
          {order.productionStatus}
        </Badge>
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {getActionItems()}
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}