import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CustomerSection } from "@/components/sales/CustomerSection";
import { CreateOrderHeader } from "@/components/sales/CreateOrderHeader";
import { BillingAddressForm } from "@/components/sales/BillingAddressForm";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShippingFeeSection } from "@/components/sales/ShippingFeeSection";
import { OrderSummary } from "@/components/sales/OrderSummary";
import { ShippingFeeTotal } from "@/components/sales/ShippingFeeTotal";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ItemsNotShippedTable } from "@/components/sales/ItemsNotShippedTable";
import { useState } from "react";
import type { TableRow } from "@/components/sales/types";
import { mockPrograms } from "@/data/mockPrograms";

interface CreateNewRequisitionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  partName: string;
  quantity: string;
  program?: string;
  projectTitle?: string;
}

export function CreateNewRequisitionDialog({ 
  isOpen, 
  onClose, 
  partName,
  quantity,
  program,
  projectTitle
}: CreateNewRequisitionDialogProps) {
  const [searchValue, setSearchValue] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [shipFromAddress, setShipFromAddress] = useState("Main Warehouse, 123 Industrial St.");
  const [isBillingFormOpen, setIsBillingFormOpen] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [selectedProgram, setSelectedProgram] = useState(program || "");

  const [rows] = useState<TableRow[]>([{
    id: 1,
    item: partName,
    quantity: quantity,
    partIdentifier: `PART-${Math.floor(Math.random() * 1000)}`,
    pricePerUnit: "300",
    discount: "0",
    totalPrice: "0",
    tax: "-",
    location: "Main location",
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
  const [shippingFeeWithTax, setShippingFeeWithTax] = useState("0.00");

  const handleBillingAddressSubmit = (address: string, shippingAddr: string | null) => {
    setBillingAddress(address);
    setShippingAddress(shippingAddr || '');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[90vw] max-w-[90%] h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Purchase Requisition</DialogTitle>
        </DialogHeader>
        <div className="py-6 space-y-6">
          <CreateOrderHeader 
            title="Create New Purchase Requisition"
            customer={searchValue}
            orderTotals={orderTotals}
            onCreateOrder={onClose}
            billingAddress={billingAddress}
            shippingAddress={shippingAddress}
            items={rows}
            orderId={orderId}
            program={selectedProgram}
            project={projectTitle}
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

          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label>Program</Label>
              <Select
                value={selectedProgram}
                onValueChange={setSelectedProgram}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select program" />
                </SelectTrigger>
                <SelectContent>
                  {mockPrograms.map((prog) => (
                    <SelectItem key={prog.id} value={prog.name}>
                      {prog.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <ItemsNotShippedTable 
              rows={rows} 
              onDeleteRow={() => {}}
              onAddRow={() => {}}
              onTotalChange={setOrderTotals}
              touchedRows={new Set()}
            />
          </div>

          <ShippingFeeSection 
            isEnabled={searchValue !== ""} 
            onShippingFeeChange={setShippingFeeWithTax}
          />

          <ShippingFeeTotal shippingFeeWithTax={`${shippingFeeWithTax} USD`} />
          
          <OrderSummary
            totalUnits={`${orderTotals.totalUnits} pcs`}
            subtotal={`${orderTotals.subtotal} USD`}
            shippingFee={`${shippingFeeWithTax} USD`}
            tax={`${orderTotals.tax} USD`}
            total={`${orderTotals.total} USD`}
          />
        </div>

        <BillingAddressForm
          isOpen={isBillingFormOpen}
          onClose={() => setIsBillingFormOpen(false)}
          onSubmit={handleBillingAddressSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}