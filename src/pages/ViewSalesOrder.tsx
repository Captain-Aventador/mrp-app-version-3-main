import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { salesOrders } from "@/data/mockSalesOrders";
import { useOrderStore } from "@/store/orderStore";
import { ItemsNotShippedTable } from "@/components/sales/ItemsNotShippedTable";
import { OrderSummary } from "@/components/sales/OrderSummary";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import type { TableRow } from "@/components/sales/types";
import { useToast } from "@/hooks/use-toast";
import { ShippingFeeSection } from "@/components/sales/ShippingFeeSection";
import { ShippingFeeTotal } from "@/components/sales/ShippingFeeTotal";

export function ViewSalesOrder() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isEditMode = searchParams.get('mode') === 'edit';
  const [touchedRows] = useState(new Set<number>());
  const { toast } = useToast();
  
  const mockOrder = salesOrders.find(order => order.id === orderId);
  const getOrderById = useOrderStore((state) => state.getOrderById);
  const updateOrder = useOrderStore((state) => state.updateOrder);
  const createdOrder = getOrderById(orderId || '');
  
  const order = createdOrder || mockOrder;
  
  if (!order) {
    return <div>Order not found</div>;
  }

  const [customerName, setCustomerName] = useState(order.customer);
  const [billingAddress, setBillingAddress] = useState(order.billingAddress || "123 Naval Base, Military District");
  const [shippingAddress, setShippingAddress] = useState(order.shippingAddress || "456 Naval Port, Maritime Zone");

  const orderItems: TableRow[] = order.items?.map((item, index) => ({
    id: index + 1,
    item: item.item,
    quantity: item.quantity,
    pricePerUnit: item.pricePerUnit || "",
    partIdentifier: item.partIdentifier || "",
    discount: item.discount || "0",
    totalPrice: item.totalPrice || "0",
    tax: item.tax || "-",
    location: item.location || "Main location",
    inventoryStatus: item.inventoryStatus || "",
    ingredientsAvailability: item.ingredientsAvailability || "",
    productionStatus: item.productionStatus || ""
  })) || [];

  const [totals, setTotals] = useState({
    subtotal: order.totalAmount.toFixed(2),
    tax: (order.tax || 0).toFixed(2),
    total: (order.totalAmount + (order.tax || 0)).toFixed(2),
    totalUnits: order.quantity.toString()
  });

  const defaultShippingFee = {
    description: "Standard Shipping",
    cost: 50,
    tax: "20% - VAT [DEMO]"
  };

  const [shippingFee, setShippingFee] = useState(
    order.shippingFee ? order.shippingFee.cost.toString() : defaultShippingFee.cost.toString()
  );

  const handleCancel = () => {
    navigate('/sales/orders');
  };

  const handleUpdate = () => {
    if (!order) return;

    const updatedOrder = {
      ...order,
      customer: customerName,
      billingAddress,
      shippingAddress,
      totalAmount: parseFloat(totals.subtotal),
      tax: parseFloat(totals.tax),
      quantity: parseInt(totals.totalUnits),
      items: orderItems,
      shippingFee: {
        ...defaultShippingFee,
        cost: parseFloat(shippingFee)
      }
    };

    updateOrder(updatedOrder);
    
    toast({
      title: "Order Updated",
      description: `Order ${orderId} has been successfully updated.`,
    });

    navigate('/sales/orders');
  };

  const handleEdit = () => {
    navigate(`/sales/orders/${orderId}?mode=edit`);
  };

  return (
    <div className="py-6 max-w-[100vw] space-y-6 bg-white border border-gray-200 rounded-lg" style={{ margin: '30px', paddingLeft: '2rem', paddingRight: '2rem' }}>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Sales Order #{orderId}</h1>
        <div className="flex space-x-4">
          <Button
            variant="outline"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          {!isEditMode && (
            <Button
              onClick={handleEdit}
            >
              Edit
            </Button>
          )}
          {isEditMode && (
            <Button
              onClick={handleUpdate}
            >
              Update Order
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-medium mb-2">Customer</h3>
          <Input 
            value={customerName} 
            onChange={(e) => setCustomerName(e.target.value)}
            readOnly={!isEditMode} 
            className={!isEditMode ? "bg-gray-50" : ""} 
          />
        </div>
        <div>
          <h3 className="text-sm font-medium mb-2">Customer reference #</h3>
          <Input value={order.customerReference || ""} readOnly={!isEditMode} className={!isEditMode ? "bg-gray-50" : ""} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div>
          <h3 className="text-sm font-medium mb-2">Sales order #</h3>
          <Input value={order.id} readOnly className="bg-gray-50" />
        </div>
        <div>
          <h3 className="text-sm font-medium mb-2">Delivery deadline</h3>
          <Input value={order.deliveryDeadline} type="date" readOnly={!isEditMode} className={!isEditMode ? "bg-gray-50" : ""} />
        </div>
        <div>
          <h3 className="text-sm font-medium mb-2">Created date</h3>
          <Input value={order.createdDate || order.orderDate} type="date" readOnly className="bg-gray-50" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div>
          <h3 className="text-sm font-medium mb-2">Bill to</h3>
          <Input 
            value={billingAddress}
            onChange={(e) => setBillingAddress(e.target.value)}
            readOnly={!isEditMode} 
            className={!isEditMode ? "bg-gray-50" : ""} 
          />
        </div>
        <div>
          <h3 className="text-sm font-medium mb-2">Ship to</h3>
          <Input 
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            readOnly={!isEditMode} 
            className={!isEditMode ? "bg-gray-50" : ""} 
          />
        </div>
        <div>
          <h3 className="text-sm font-medium mb-2">Ship from</h3>
          <Input value={order.shipFromAddress || "Main Warehouse, 123 Industrial St."} readOnly className="bg-gray-50" />
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-medium mb-4">Items not shipped</h3>
        <div className="border rounded-lg overflow-hidden">
          <ItemsNotShippedTable
            rows={orderItems}
            onDeleteRow={() => {}}
            onAddRow={() => {}}
            touchedRows={touchedRows}
            onTotalChange={setTotals}
            readOnly={!isEditMode}
          />
        </div>
      </div>

      <ShippingFeeSection 
        isEnabled={isEditMode}
        onShippingFeeChange={setShippingFee}
        initialValues={order.shippingFee || defaultShippingFee}
      />
      <ShippingFeeTotal shippingFeeWithTax={`${shippingFee} USD`} />

      <div className="bg-white p-0 rounded-lg">
        <OrderSummary
          totalUnits={`${totals.totalUnits} pcs`}
          subtotal={`${Math.round(parseFloat(totals.subtotal))} USD`}
          shippingFee={`${Math.round(parseFloat(shippingFee))} USD`}
          tax={`${Math.round(parseFloat(totals.tax))} USD`}
          total={`${Math.round(parseFloat(totals.total) + parseFloat(shippingFee))} USD`}
        />
      </div>
    </div>
  );
}