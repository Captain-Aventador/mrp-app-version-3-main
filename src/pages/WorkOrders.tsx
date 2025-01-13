import { useState } from "react";
import { WorkOrdersTable } from "@/components/work-orders/WorkOrdersTable";
import { mockWorkOrders, WorkOrder } from "@/data/mockWorkOrders";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { WorkOrdersToolbar } from "@/components/work-orders/WorkOrdersToolbar";

export function WorkOrders() {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [orders, setOrders] = useState<WorkOrder[]>(() => {
    const sortedOrders = [...mockWorkOrders].sort((a, b) => 
      new Date(a.deliveryDeadline).getTime() - new Date(b.deliveryDeadline).getTime()
    );
    return sortedOrders.map((order, index) => ({
      ...order,
      priority: index + 1
    }));
  });
  
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSelectOrder = (orderId: string) => {
    setSelectedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleSelectAll = () => {
    setSelectedOrders(prev => 
      prev.length === orders.length 
        ? [] 
        : orders.map(order => order.id)
    );
  };

  const handleReorder = (reorderedItems: WorkOrder[]) => {
    const sortedByDelivery = [...reorderedItems].sort((a, b) => 
      new Date(a.deliveryDeadline).getTime() - new Date(b.deliveryDeadline).getTime()
    );

    const updatedOrders = sortedByDelivery.map((order, index) => ({
      ...order,
      priority: index + 1
    }));

    setOrders(updatedOrders);

    toast({
      title: "Orders Prioritized",
      description: "Work orders have been prioritized based on delivery dates.",
    });
  };

  const handleDownload = () => {
    console.log('Downloading work orders...');
  };

  const handleStatusChange = (orderId: string, newStatus: WorkOrder['productionStatus']) => {
    setOrders(prevOrders => {
      return prevOrders.map(order => {
        if (order.id === orderId) {
          if (newStatus === "Completed") {
            const completionPercentage = (order.completedQuantity / order.quantity) * 100;
            
            if (completionPercentage < 100) {
              const completedOrder: WorkOrder = {
                ...order,
                productionStatus: "Completed",
                quantity: order.completedQuantity,
                productionQuantity: 0
              };
              
              const remainingOrder: WorkOrder = {
                ...order,
                completedQuantity: 0,
                quantity: order.quantity - order.completedQuantity,
                productionStatus: "In Progress"
              };
              
              return [completedOrder, remainingOrder];
            } else {
              return {
                ...order,
                productionStatus: newStatus
              };
            }
          }
          
          return {
            ...order,
            productionStatus: newStatus
          };
        }
        return order;
      }).flat();
    });

    if (newStatus === "Completed") {
      toast({
        title: "Order Status Updated",
        description: "The work order has been processed for completion.",
      });
    }
  };

  const openOrders = orders.filter(order => order.productionStatus !== "Completed");
  const completedOrders = orders.filter(order => order.productionStatus === "Completed");

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Work Orders</h1>
        <Button 
          onClick={() => navigate("/manufacturing/create")} 
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Manufacturing Order
        </Button>
      </div>
      
      <Tabs defaultValue="open" className="w-full">
        <TabsList className="w-full bg-white border-b mb-0 p-0">
          <TabsTrigger 
            value="open" 
            className="px-6 py-3 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary transition-all"
          >
            Open Orders
          </TabsTrigger>
          <TabsTrigger 
            value="completed"
            className="px-6 py-3 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary transition-all"
          >
            Completed Orders
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="open">
          <div className="mt-4">
            <WorkOrdersToolbar
              totalOrders={openOrders.length}
              selectedOrders={selectedOrders}
              onDownload={handleDownload}
            />
          </div>
          <WorkOrdersTable
            orders={openOrders}
            selectedOrders={selectedOrders}
            onSelectOrder={handleSelectOrder}
            onSelectAll={handleSelectAll}
            onReorder={handleReorder}
            onStatusChange={handleStatusChange}
            isCompletedTab={false}
          />
        </TabsContent>
        
        <TabsContent value="completed">
          {completedOrders.length > 0 ? (
            <WorkOrdersTable
              orders={completedOrders}
              selectedOrders={selectedOrders}
              onSelectOrder={handleSelectOrder}
              onSelectAll={handleSelectAll}
              onReorder={handleReorder}
              onStatusChange={handleStatusChange}
              isCompletedTab={true}
            />
          ) : (
            <div className="text-center py-8 bg-white rounded-md border">
              <p className="text-gray-500">No completed orders found</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
