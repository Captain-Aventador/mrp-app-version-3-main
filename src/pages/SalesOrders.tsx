import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SalesOrdersHeader } from "@/components/sales/SalesOrdersHeader";
import { SalesOrdersToolbar } from "@/components/sales/SalesOrdersToolbar";
import { SalesOrdersTable } from "@/components/sales/SalesOrdersTable";
import { salesOrders } from "@/data/mockSalesOrders";
import { useOrderStore } from "@/store/orderStore";
import { SalesOrder } from "@/types/sales";

export function SalesOrders() {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTab, setCurrentTab] = useState("open");
  const ordersPerPage = 10;

  const storeOrders = useOrderStore((state) => state.orders);
  const allOrders = [...salesOrders, ...storeOrders] as SalesOrder[];

  const handleSelectOrder = (orderId: string) => {
    setSelectedOrders(prev => {
      if (prev.includes(orderId)) {
        return prev.filter(id => id !== orderId);
      }
      return [...prev, orderId];
    });
  };

  const handleSelectAll = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filteredOrders.map(order => order.id));
    }
  };

  const handleDownload = () => {
    console.log('Downloading selected orders:', selectedOrders);
  };

  // Filter orders based on current tab
  const filteredOrders = allOrders.filter(order => {
    if (currentTab === "open") {
      return order.deliveryStatus === "Not Shipped" || order.deliveryStatus === "Ready for Shipping";
    }
    return order.deliveryStatus === "Shipped";
  });

  // Calculate pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  return (
    <div className="w-full px-6 py-6">
      <SalesOrdersHeader title="Sales Orders" />
      <Tabs 
        defaultValue="open" 
        className="w-full"
        onValueChange={(value) => {
          setCurrentTab(value);
          setCurrentPage(1);
          setSelectedOrders([]);
        }}
      >
        <TabsList className="w-full bg-white border-b mb-0 p-0 mt-[20px] mb-[15px]">
          <TabsTrigger 
            value="open" 
            className="px-6 py-3 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary transition-all"
          >
            Open
          </TabsTrigger>
          <TabsTrigger 
            value="delivered"
            className="px-6 py-3 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary transition-all"
          >
            Delivered
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <SalesOrdersToolbar 
        totalOrders={filteredOrders.length}
        selectedOrders={selectedOrders}
        onDownload={handleDownload}
      />
      <SalesOrdersTable 
        orders={currentOrders}
        selectedOrders={selectedOrders}
        onSelectOrder={handleSelectOrder}
        onSelectAll={handleSelectAll}
        currentTab={currentTab}
      />
      <div className="mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <Button
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              </PaginationItem>
            ))}
            <PaginationItem>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
