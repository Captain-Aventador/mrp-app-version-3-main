import { Separator } from "@/components/ui/separator";

interface OrderSummaryProps {
  totalUnits?: string;
  subtotal?: string;
  shippingFee?: string;
  tax?: string;
  total?: string;
}

export function OrderSummary({
  totalUnits = "0 pcs",
  subtotal = "0.00 USD",
  tax = "0.00 USD",
  total = "0.00 USD"
}: OrderSummaryProps) {
  return (
    <div>
      <div className="flex justify-between text-sm my-2.5">
        <span>Total units:</span>
        <span>{totalUnits}</span>
      </div>
      <Separator className="my-2" />
      <div className="flex justify-between text-sm my-2.5">
        <span>Subtotal:</span>
        <span>{subtotal}</span>
      </div>
      <div className="flex justify-between text-sm my-2.5">
        <span>Tax:</span>
        <span>{tax}</span>
      </div>
      <Separator className="my-2" />
      <div className="flex justify-between font-bold text-sm my-2.5">
        <span>Total:</span>
        <span>{total}</span>
      </div>
    </div>
  );
}