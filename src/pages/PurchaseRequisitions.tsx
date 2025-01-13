import { PurchaseRequisitionTable } from "@/components/procurement/PurchaseRequisitionTable";
import { PurchaseRequisitionsHeader } from "@/components/procurement/PurchaseRequisitionsHeader";
import PurchaseRequisitionToolbar from "@/components/procurement/PurchaseRequisitionToolbar";
import { useState, useEffect } from "react";
import type { SalesOrder } from "@/types/sales";
import { mockProjects } from "@/data/mockProjects";

export function PurchaseRequisitions() {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [currentTab, setCurrentTab] = useState("open");
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState<SalesOrder[]>([]);

  useEffect(() => {
    // Mock data with program information
    const mockRequisitions: SalesOrder[] = [
      {
        id: "PR-000001",
        orderDate: "2024-03-15",
        customer: "John Smith",
        totalAmount: 125000.00,
        status: "In SCM",
        items: [{
          id: 1,
          item: "Navigation System",
          quantity: "1",
          pricePerUnit: "125000.00",
          discount: "0",
          totalPrice: "125000.00",
          tax: "12500.00",
          location: "Main Warehouse",
          inventoryStatus: "In Stock",
          ingredientsAvailability: "Available",
          productionStatus: "Not Required",
          partIdentifier: "NAV-001"
        }],
        inventoryStatus: "In Stock",
        productionStatus: "Not Required",
        deliveryStatus: "Not Shipped",
        deliveryDeadline: "2024-06-15",
        product: "Maritime Navigation Suite",
        quantity: 2,
        tax: 12500.00,
        billingAddress: "",
        shippingAddress: "",
        program: mockProjects[0].name,
        project: mockProjects[0].projectTitle
      }
    ];

    setOrders(mockRequisitions);
  }, []);

  const handleDownload = () => {
    console.log("Downloading selected orders:", selectedOrders);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className="p-6 space-y-6">
      <PurchaseRequisitionsHeader title="Purchase Requisitions Management" />
      <PurchaseRequisitionToolbar
        totalOrders={orders.length}
        selectedOrders={selectedOrders}
        onDownload={handleDownload}
        onSearch={handleSearch}
        searchValue={searchTerm}
        currentTab={currentTab}
        onTabChange={setCurrentTab}
      />
      <PurchaseRequisitionTable
        orders={orders}
        currentTab={currentTab}
      />
    </div>
  );
}