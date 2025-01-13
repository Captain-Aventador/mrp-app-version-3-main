import { CustomerSection } from "@/components/sales/CustomerSection";
import { CreateOrderHeader } from "@/components/sales/CreateOrderHeader";
import { OrderSummary } from "@/components/sales/OrderSummary";
import { ItemsNotShippedTable } from "@/components/sales/ItemsNotShippedTable";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { TableItem } from "@/types/sales";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function CreatePurchaseRequisition() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [orderId, setOrderId] = useState(""); // Initialize as empty string
  const [showCost, setShowCost] = useState(false);

  const [rows, setRows] = useState<TableItem[]>([{
    id: 1,
    item: "",
    quantity: "",
    partIdentifier: "",
    pricePerUnit: "",
    discount: "0",
    totalPrice: "0",
    tax: "-",
    location: "Main Warehouse",
    inventoryStatus: "",
    ingredientsAvailability: "",
    productionStatus: ""
  }]);

  const [orderTotals, setOrderTotals] = useState({
    subtotal: "0.00",
    tax: "0.00",
    total: "0.00",
    totalUnits: "0"
  });

  const handleBillingAddressChange = (address: string) => {
    setBillingAddress(address);
  };

  const handleShippingAddressChange = (address: string) => {
    setShippingAddress(address);
  };

  const handleClose = () => {
    navigate('/purchase-requisitions');
  };

  const handleAddRow = () => {
    const newRow: TableItem = {
      id: rows.length + 1,
      item: "",
      quantity: "",
      partIdentifier: "",
      pricePerUnit: "",
      discount: "0",
      totalPrice: "0",
      tax: "-",
      location: "Main Warehouse",
      inventoryStatus: "",
      ingredientsAvailability: "",
      productionStatus: ""
    };
    setRows([...rows, newRow]);
  };

  const handleDeleteRow = (id: number) => {
    setRows(rows.filter(row => row.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="p-6 space-y-6 bg-white rounded-lg">
        <CreateOrderHeader 
          title="Create New Purchase Requisition"
          customer={searchValue}
          orderTotals={orderTotals}
          onCreateOrder={handleClose}
          billingAddress={billingAddress}
          shippingAddress={shippingAddress}
          items={rows}
          orderId={orderId}
        />
        
        <CustomerSection 
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          onCustomerSelect={setSearchValue}
          onBillingAddressChange={handleBillingAddressChange}
          onShippingAddressChange={handleShippingAddressChange}
          orderId={orderId}
          onOrderIdChange={setOrderId}
          orderIdLabel="Requisition ID"
        />

        <div>
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-semibold">Items</h3>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="addCost" 
                checked={showCost}
                onCheckedChange={(checked) => setShowCost(checked as boolean)}
              />
              <Label htmlFor="addCost">Would you like to add the cost?</Label>
            </div>
          </div>
          <ItemsNotShippedTable 
            rows={rows} 
            onDeleteRow={handleDeleteRow}
            onAddRow={handleAddRow}
            onTotalChange={setOrderTotals}
            touchedRows={new Set()}
            showPriceColumns={showCost}
          />
          <Button 
            variant="link" 
            className="p-0 h-auto font-normal hover:no-underline mt-2"
            onClick={handleAddRow}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add row
          </Button>
        </div>
        
        {showCost && (
          <OrderSummary
            totalUnits={`${orderTotals.totalUnits} pcs`}
            subtotal={`${orderTotals.subtotal} USD`}
            total={`${orderTotals.total} USD`}
          />
        )}
      </div>
    </div>
  );
}