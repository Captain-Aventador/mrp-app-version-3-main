import { Button } from "@/components/ui/button";
import { useOrderStore } from "@/store/orderStore";
import { useToast } from "@/hooks/use-toast";
import type { TableItem } from "@/types/sales";
import { mockBOMItems } from "@/data/mockBOM";
import { useNavigate } from "react-router-dom";

interface CreateOrderHeaderProps {
  title: string;
  customer: string;
  orderTotals: {
    subtotal: string;
    tax: string;
    total: string;
    totalUnits: string;
  };
  onCreateOrder: () => void;
  billingAddress?: string;
  shippingAddress?: string;
  items?: TableItem[];
  orderId: string;
  createdDate?: string;
  deliveryDeadline?: string;
  shipFromAddress?: string;
  customerReference?: string;
  program?: string;
  project?: string;
  isViewMode?: boolean;
}

export function CreateOrderHeader({ 
  title,
  customer, 
  orderTotals,
  onCreateOrder,
  billingAddress,
  shippingAddress,
  items,
  orderId,
  createdDate,
  deliveryDeadline,
  shipFromAddress,
  customerReference,
  program,
  project,
  isViewMode = false
}: CreateOrderHeaderProps) {
  const addOrder = useOrderStore((state) => state.addOrder);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCreateOrder = () => {
    if (!orderId || orderId.trim() === '') {
      toast({
        title: "Validation Error",
        description: "Please enter a Requisition ID",
        variant: "destructive"
      });
      return;
    }

    // Create new BOM item with parts details
    const newBOMItem = {
      id: `BOM-${orderId}`,
      name: customer || "Unknown Customer",
      description: "Project BOM",
      revision: "Rev.A",
      status: "Active" as const,
      createdAt: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0],
      totalComponents: items?.length || 0,
      totalCost: parseFloat(orderTotals.total) || 0
    };

    mockBOMItems.push(newBOMItem);

    if (items && items.length > 0) {
      const partsData = items.map(item => ({
        item: item.item,
        partIdentifier: item.partIdentifier || `PART-${Math.floor(Math.random() * 10000)}`,
        quantity: item.quantity,
        pricePerUnit: item.pricePerUnit
      }));

      if (window && (window as any).mockPartsData) {
        (window as any).mockPartsData[`BOM-${orderId}`] = partsData;
      }
    }

    const processedItems = items?.map(item => ({
      ...item,
      ingredientsAvailability: item.ingredientsAvailability || "Available",
      inventoryStatus: item.inventoryStatus || "In Stock",
      productionStatus: item.productionStatus || "Not Required",
      partIdentifier: item.partIdentifier || ""
    }));

    const newOrder = {
      id: orderId,
      customer: customer || "Unknown Customer",
      product: items?.[0]?.item || "Custom Product",
      quantity: parseInt(orderTotals.totalUnits) || 0,
      totalAmount: parseFloat(orderTotals.total) || 0,
      orderDate: createdDate || new Date().toISOString().split('T')[0],
      deliveryDeadline: deliveryDeadline || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: "In SCM" as const,
      inventoryStatus: "In Stock" as const,
      productionStatus: "Not Required" as const,
      deliveryStatus: "Not Shipped" as const,
      tax: parseFloat(orderTotals.tax) || 0,
      billingAddress: billingAddress || "",
      shippingAddress: shippingAddress || "",
      items: processedItems || [],
      customerReference,
      shipFromAddress,
      createdDate: createdDate || new Date().toISOString().split('T')[0],
      program: program || "",
      project: project || ""
    };

    // Save to sessionStorage for persistence
    const existingOrders = JSON.parse(sessionStorage.getItem('purchaseRequisitions') || '[]');
    existingOrders.push(newOrder);
    sessionStorage.setItem('purchaseRequisitions', JSON.stringify(existingOrders));

    addOrder(newOrder);
    
    toast({
      title: "Success",
      description: "Requisition created successfully",
    });

    // Navigate to purchase requisitions page after successful creation
    navigate('/purchase-requisitions');
    onCreateOrder();
  };

  const handleCancel = () => {
    onCreateOrder();
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-sm text-muted-foreground">Create a new purchase requisition</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreateOrder}
            className="bg-primary text-white hover:bg-primary/90"
          >
            {isViewMode ? "Edit" : "Create Requisition"}
          </Button>
        </div>
      </div>
    </div>
  );
}