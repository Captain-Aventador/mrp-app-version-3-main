import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SalesOrdersHeaderProps {
  title: string;
}

export function SalesOrdersHeader({ title }: SalesOrdersHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-sm text-muted-foreground">Create and manage your sales orders efficiently</p>
      </div>
      <Button onClick={() => navigate('/sales/orders/create')} className="gap-2">
        <Plus className="h-4 w-4" />
        Sales Order
      </Button>
    </div>
  );
}