import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CustomerFormHeaderProps {
  isEditing?: boolean;
}

export function CustomerFormHeader({ isEditing }: CustomerFormHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <h1 className="text-xl font-semibold">Customer</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-red-500">Not saved</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/sales/customers")}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}