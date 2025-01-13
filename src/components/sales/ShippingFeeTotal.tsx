interface ShippingFeeTotalProps {
  shippingFeeWithTax?: string;
}

export function ShippingFeeTotal({
  shippingFeeWithTax = "0.00 USD"
}: ShippingFeeTotalProps) {
  return (
    <div className="flex justify-end mb-2 [margin-top:0!important]">
      <span className="text-sm text-muted-foreground">
        Total shipping fee (with tax): {shippingFeeWithTax}
      </span>
    </div>
  );
}