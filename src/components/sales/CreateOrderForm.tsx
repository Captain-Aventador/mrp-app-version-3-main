import { useNavigate } from "react-router-dom";
import { useOrderStore } from "@/store/orderStore";
import { useToast } from "@/components/ui/use-toast";
import type { SalesOrder } from "@/types/sales";

interface CreateOrderFormProps {
  customer: string;
  orderTotals: {
    subtotal: string;
    tax: string;
    total: string;
    totalUnits: string;
  };
  onCreateOrder: () => void;
}

export function CreateOrderForm({ customer, orderTotals, onCreateOrder }: CreateOrderFormProps) {
  const { toast } = useToast();
  const addOrder = useOrderStore((state) => state.addOrder);
  const navigate = useNavigate();

  return null; // Component no longer renders anything since button was moved to header
}