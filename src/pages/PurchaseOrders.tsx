import { useState } from "react";
import { PurchaseOrdersTable } from "@/components/procurement/PurchaseOrdersTable";
import { mockPurchaseOrders } from "@/data/mockPurchaseOrders";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function PurchaseOrders() {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

  const handleSelectOrder = (orderId: string) => {
    setSelectedOrders(prev => {
      if (prev.includes(orderId)) {
        return prev.filter(id => id !== orderId);
      }
      return [...prev, orderId];
    });
  };

  const handleSelectAll = () => {
    if (selectedOrders.length === mockPurchaseOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(mockPurchaseOrders.map(order => order.id));
    }
  };

  return (
    <div className="w-full px-6 py-6">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Purchase Orders</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Purchase Order
        </Button>
      </div>
      <PurchaseOrdersTable
        orders={mockPurchaseOrders}
        selectedOrders={selectedOrders}
        onSelectOrder={handleSelectOrder}
        onSelectAll={handleSelectAll}
      />
    </div>
  );
}