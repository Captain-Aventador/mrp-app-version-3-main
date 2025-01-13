import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface ShippingFormProps {
  isOpen: boolean;
  onClose: () => void;
  itemName: string;
  stockLevel: string;
}

export function ShippingForm({ isOpen, onClose, itemName, stockLevel }: ShippingFormProps) {
  const [salesOrderId, setSalesOrderId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [quantity, setQuantity] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const { toast } = useToast();

  const resetForm = () => {
    setSalesOrderId("");
    setCustomerName("");
    setShippingAddress("");
    setQuantity("");
    setDeliveryMethod("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here we would typically make an API call to update the database
    console.log("Shipping details:", {
      salesOrderId,
      customerName,
      shippingAddress,
      quantity,
      deliveryMethod,
      itemName
    });

    // Show success message
    toast({
      title: "Shipping initiated",
      description: `${quantity} units of ${itemName} will be shipped to ${customerName}`,
    });

    // Close the dialog and reset form
    handleClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ship {itemName}</DialogTitle>
          <DialogDescription>
            Enter shipping details for {itemName}. Current stock level: {stockLevel}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="salesOrderId" className="text-right">
                Sales Order ID
              </Label>
              <Input
                id="salesOrderId"
                value={salesOrderId}
                onChange={(e) => setSalesOrderId(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="customerName" className="text-right">
                Customer Name
              </Label>
              <Input
                id="customerName"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="shippingAddress" className="text-right">
                Shipping Address
              </Label>
              <Input
                id="shippingAddress"
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Quantity
              </Label>
              <Input
                id="quantity"
                type="number"
                max={parseInt(stockLevel)}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="deliveryMethod" className="text-right">
                Delivery Method
              </Label>
              <Input
                id="deliveryMethod"
                value={deliveryMethod}
                onChange={(e) => setDeliveryMethod(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">Confirm Shipping</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}