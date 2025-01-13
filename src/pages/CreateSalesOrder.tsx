import { useState } from "react";
import { CustomerSection } from "@/components/sales/CustomerSection";
import { CreateOrderHeader } from "@/components/sales/CreateOrderHeader";
import { BillingAddressForm } from "@/components/sales/BillingAddressForm";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShippingFeeSection } from "@/components/sales/ShippingFeeSection";
import { OrderSummary } from "@/components/sales/OrderSummary";
import { ShippingFeeTotal } from "@/components/sales/ShippingFeeTotal";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ItemsNotShippedTable } from "@/components/sales/ItemsNotShippedTable";
import { CreateOrderForm } from "@/components/sales/CreateOrderForm";
import type { TableRow } from "@/components/sales/types";
import { useNavigate } from "react-router-dom";

export function CreateSalesOrder() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [shipFromAddress, setShipFromAddress] = useState("Main Warehouse, 123 Industrial St.");
  const [isBillingFormOpen, setIsBillingFormOpen] = useState(false);
  const [touchedRows] = useState(new Set<number>());
  const [orderId, setOrderId] = useState("");

  // Initialize rows with data from sessionStorage if available
  const [rows, setRows] = useState<TableRow[]>(() => {
    const selectedPartsData = sessionStorage.getItem('selectedPartsForOrder');
    if (selectedPartsData) {
      const parts = JSON.parse(selectedPartsData);
      sessionStorage.removeItem('selectedPartsForOrder'); // Clear the data after using it
      return parts.map((part: { name: string; quantity: string; partIdentifier: string }, index: number) => ({
        id: index + 1,
        item: part.name,
        quantity: part.quantity,
        partIdentifier: part.partIdentifier || "",
        pricePerUnit: "",
        discount: "0",
        totalPrice: "0",
        tax: "-",
        location: "Main location",
        inventoryStatus: "",
        ingredientsAvailability: "",
        productionStatus: ""
      }));
    }
    return [{
      id: 1,
      item: "",
      quantity: "0",
      partIdentifier: "",
      pricePerUnit: "",
      discount: "0",
      totalPrice: "0",
      tax: "-",
      location: "Main location",
      inventoryStatus: "",
      ingredientsAvailability: "",
      productionStatus: ""
    }];
  });

  const [orderTotals, setOrderTotals] = useState({
    subtotal: "0.00",
    tax: "0.00",
    total: "0.00",
    totalUnits: "0"
  });
  const [shippingFeeWithTax, setShippingFeeWithTax] = useState("0.00");

  const handleAddRow = () => {
    const newRow: TableRow = {
      id: rows.length + 1,
      item: "",
      quantity: "0",
      partIdentifier: "",
      pricePerUnit: "",
      discount: "0",
      totalPrice: "0",
      tax: "-",
      location: "Main location",
      inventoryStatus: "",
      ingredientsAvailability: "",
      productionStatus: ""
    };
    setRows([...rows, newRow]);
  };

  const handleDeleteRow = (id: number) => {
    setRows(rows.filter(row => row.id !== id));
    touchedRows.delete(id);
  };

  const handleBillingAddressSubmit = (address: string, shippingAddr: string | null) => {
    setBillingAddress(address);
    setShippingAddress(shippingAddr || '');
  };

  const handleTotalChange = (totals: {
    subtotal: string;
    tax: string;
    total: string;
    totalUnits: string;
  }) => {
    setOrderTotals(totals);
  };

  const handleShippingFeeChange = (fee: string) => {
    setShippingFeeWithTax(fee);
  };

  const handleCreateOrder = () => {
    navigate("/sales/orders");
  };

  return (
    <div className="py-6 max-w-[100vw] space-y-6 bg-white border border-gray-200 rounded-lg" style={{ margin: '30px', paddingLeft: '2rem', paddingRight: '2rem' }}>
      <div className="space-y-6">
        <CreateOrderHeader 
          title="Create Sales Order"
          customer={searchValue}
          orderTotals={orderTotals}
          onCreateOrder={handleCreateOrder}
          billingAddress={billingAddress}
          shippingAddress={shippingAddress}
          items={rows}
          orderId={orderId}
        />
        
        <CustomerSection 
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          onCustomerSelect={setSearchValue}
          onBillingAddressChange={setBillingAddress}
          onShippingAddressChange={setShippingAddress}
          orderId={orderId}
          onOrderIdChange={setOrderId}
        />

        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label>Bill to</Label>
            <Input 
              placeholder="Enter address..." 
              value={billingAddress}
              onClick={() => setIsBillingFormOpen(true)}
              readOnly
            />
          </div>
          <div>
            <Label>Ship to</Label>
            <Input 
              placeholder="Same as billing address" 
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
            />
          </div>
          <div>
            <Label>Ship from</Label>
            <Select
              value={shipFromAddress}
              onValueChange={setShipFromAddress}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select shipping origin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Main Warehouse, 123 Industrial St.">
                  Main Warehouse, 123 Industrial St.
                </SelectItem>
                <SelectItem value="Secondary Warehouse, 456 Commerce Ave.">
                  Secondary Warehouse, 456 Commerce Ave.
                </SelectItem>
                <SelectItem value="Distribution Center, 789 Logistics Blvd.">
                  Distribution Center, 789 Logistics Blvd.
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <div className="mb-2">
            <h3 className="font-semibold">Items not shipped</h3>
          </div>
          <ItemsNotShippedTable 
            rows={rows} 
            onDeleteRow={handleDeleteRow} 
            onAddRow={handleAddRow}
            onTotalChange={handleTotalChange}
            touchedRows={touchedRows}
          />
          <div className="flex justify-between items-center mt-2">
            <Button 
              variant="link" 
              className="p-0 h-auto font-normal hover:no-underline"
              onClick={handleAddRow}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add row
            </Button>
            <span className="text-sm text-muted-foreground">
              Total items not shipped (with tax): {orderTotals.total} USD
            </span>
          </div>
        </div>

        <ShippingFeeSection 
          isEnabled={searchValue !== ""} 
          onShippingFeeChange={handleShippingFeeChange}
        />

        <ShippingFeeTotal shippingFeeWithTax={`${shippingFeeWithTax} USD`} />
        
        <OrderSummary
          totalUnits={`${orderTotals.totalUnits} pcs`}
          subtotal={`${orderTotals.subtotal} USD`}
          shippingFee={`${shippingFeeWithTax} USD`}
          tax={`${orderTotals.tax} USD`}
          total={`${orderTotals.total} USD`}
        />

        <CreateOrderForm 
          customer={searchValue}
          orderTotals={orderTotals}
          onCreateOrder={handleCreateOrder}
        />
      </div>

      <BillingAddressForm
        isOpen={isBillingFormOpen}
        onClose={() => setIsBillingFormOpen(false)}
        onSubmit={handleBillingAddressSubmit}
      />
    </div>
  );
}
