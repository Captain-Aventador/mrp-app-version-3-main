import { useState } from "react";
import { CustomersTable } from "@/components/customers/CustomersTable";
import { Button } from "@/components/ui/button";
import { Download, Plus, Printer, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { mockCustomers } from "@/data/mockCustomers";

export function CustomerDatabase() {
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const navigate = useNavigate();

  return (
    <div className="w-full px-6 py-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            Customer Database
          </h2>
          <p className="text-sm text-muted-foreground">
            Manage your customer relationships and information.
          </p>
        </div>
        <Button 
          className="flex items-center gap-2"
          onClick={() => navigate("/sales/customers/add")}
        >
          <Plus className="h-4 w-4" />
          Add Customer
        </Button>
      </div>

      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-muted-foreground">
          {selectedCustomers.length} selected
        </p>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="hover:bg-accent"
          >
            <Download className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className={`hover:bg-accent ${selectedCustomers.length === 0 ? 'text-muted-foreground cursor-not-allowed' : ''}`}
            disabled={selectedCustomers.length === 0}
          >
            <Printer className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className={`hover:bg-accent ${selectedCustomers.length !== 1 ? 'text-muted-foreground cursor-not-allowed' : ''}`}
            disabled={selectedCustomers.length !== 1}
            onClick={() => {
              if (selectedCustomers.length === 1) {
                navigate(`/sales/customers/edit/${selectedCustomers[0]}`);
              }
            }}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className={`hover:bg-accent ${selectedCustomers.length === 0 ? 'text-muted-foreground cursor-not-allowed' : ''}`}
            disabled={selectedCustomers.length === 0}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <CustomersTable 
        customers={mockCustomers}
        selectedCustomers={selectedCustomers}
        setSelectedCustomers={setSelectedCustomers}
      />
    </div>
  );
}