import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SuppliersTable } from "@/components/suppliers/SuppliersTable";
import { mockSuppliers } from "@/data/mockSuppliers";
import { Download, Plus, Printer, Pencil, Trash2 } from "lucide-react";

export function SupplierManagement() {
  const [selectedSuppliers, setSelectedSuppliers] = useState<string[]>([]);

  const handleSelectSupplier = (supplierId: string) => {
    setSelectedSuppliers(prev => {
      if (prev.includes(supplierId)) {
        return prev.filter(id => id !== supplierId);
      }
      return [...prev, supplierId];
    });
  };

  const handleSelectAll = () => {
    if (selectedSuppliers.length === mockSuppliers.length) {
      setSelectedSuppliers([]);
    } else {
      setSelectedSuppliers(mockSuppliers.map(supplier => supplier.id));
    }
  };

  return (
    <div className="w-full px-6 py-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            Supplier Management
          </h2>
          <p className="text-sm text-muted-foreground">
            Manage your supplier relationships and information.
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Supplier
        </Button>
      </div>

      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-muted-foreground">
          {mockSuppliers.length} suppliers
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
            className={`hover:bg-accent ${selectedSuppliers.length === 0 ? 'text-muted-foreground cursor-not-allowed' : ''}`}
            disabled={selectedSuppliers.length === 0}
          >
            <Printer className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className={`hover:bg-accent ${selectedSuppliers.length !== 1 ? 'text-muted-foreground cursor-not-allowed' : ''}`}
            disabled={selectedSuppliers.length !== 1}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className={`hover:bg-accent ${selectedSuppliers.length === 0 ? 'text-muted-foreground cursor-not-allowed' : ''}`}
            disabled={selectedSuppliers.length === 0}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <SuppliersTable 
        suppliers={mockSuppliers}
        selectedSuppliers={selectedSuppliers}
        onSelectSupplier={handleSelectSupplier}
        onSelectAll={handleSelectAll}
      />
    </div>
  );
}