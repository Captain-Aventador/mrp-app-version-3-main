import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PurchaseRequisitionsHeaderProps {
  title: string;
}

export function PurchaseRequisitionsHeader({ title }: PurchaseRequisitionsHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">Purchase Requisitions</h1>
        <p className="text-sm text-muted-foreground">Manage and track purchase requisitions for your projects</p>
      </div>
      <Button onClick={() => navigate('/purchase-requisitions/create')} className="gap-2">
        <Plus className="h-4 w-4" />
        Create Requisition
      </Button>
    </div>
  );
}