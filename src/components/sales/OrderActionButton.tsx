import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface OrderActionButtonProps {
  inventoryStatus: string;
  productionStatus: string;
  deliveryStatus: string;
  orderId: string;
}

export function OrderActionButton({ 
  inventoryStatus, 
  productionStatus, 
  deliveryStatus,
  orderId 
}: OrderActionButtonProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isPurchaseRequisitions = location.pathname === "/purchase-requisitions";

  const handleStartProduction = () => {
    console.log(`Starting production for order ${orderId}`);
  };

  const handleViewDetails = () => {
    if (isPurchaseRequisitions) {
      // Extract the numeric part of the PR-XXXXXX format for purchase requisitions
      const numericId = orderId.replace('PR-', '');
      navigate(`/purchase-requisitions/${numericId}`);
    } else {
      // For sales orders, navigate to the sales order details page
      navigate(`/sales/orders/${orderId}`);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="hover:bg-gray-100"
        >
          <MoreVertical className="h-4 w-4 text-gray-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleViewDetails}>
          View Details
        </DropdownMenuItem>
        {!(inventoryStatus === "In Stock" || inventoryStatus === "Reserved") && (
          <DropdownMenuItem onClick={handleStartProduction}>
            Start Production
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}