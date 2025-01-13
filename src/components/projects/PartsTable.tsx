import { Table, TableBody } from "@/components/ui/table";
import { Part } from "./PartForm";
import { useState, useEffect } from "react";
import { ProjectToolbar } from "./ProjectToolbar";
import { useNavigate } from "react-router-dom";
import { TableHeaderComponent } from "./parts-table/TableHeader";
import { TableRowComponent } from "./parts-table/TableRow";
import { getAvailableStock, getRequirementQuantity } from "./parts-table/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PartForm } from "./PartForm";
import { useToast } from "@/components/ui/use-toast";
import { TableToolbar } from "./parts-table/TableToolbar";
import { EmptyState } from "./parts-table/EmptyState";
import { CreateSalesOrderDialog } from "@/components/sales/CreateSalesOrderDialog";
import { mockProducts } from "@/data/mockProducts";

interface ProjectDetails {
  name: string;
  salesOrder: string;
  dueDate: string;
  followUpDate: string;
  description: string;
}

interface PartsTableProps {
  parts: Part[];
  isEditing?: boolean;
  maxParts?: number;
  onPartsUpdate?: (parts: Part[]) => void;
  projectDetails?: ProjectDetails;
  validateProjectDetails?: () => boolean;
}

export function PartsTable({ 
  parts: initialParts, 
  isEditing = false, 
  maxParts = Infinity,
  onPartsUpdate,
  projectDetails,
  validateProjectDetails
}: PartsTableProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedParts, setSelectedParts] = useState<Part[]>([]);
  const [isAddPartOpen, setIsAddPartOpen] = useState(false);
  const [isCreateSalesOrderOpen, setIsCreateSalesOrderOpen] = useState(false);
  const [parts, setParts] = useState<Part[]>(initialParts.slice(0, maxParts));

  useEffect(() => {
    if (onPartsUpdate) {
      onPartsUpdate(parts);
    }
  }, [parts, onPartsUpdate]);

  const togglePartSelection = (part: Part) => {
    setSelectedParts(prev => 
      prev.find(p => p.id === part.id)
        ? prev.filter(p => p.id !== part.id)
        : [...prev, part]
    );
  };

  const handleCreateSalesOrder = () => {
    if (selectedParts.length === 0) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select at least one part to create a sales order"
      });
      return;
    }
    setIsCreateSalesOrderOpen(true);
  };

  const handleDownload = () => {
    console.log("Download clicked");
  };

  const handlePrint = () => {
    console.log("Print clicked");
  };

  const handleDelete = () => {
    console.log("Delete clicked");
  };

  const handleViewDetails = (partId: string) => {
    navigate(`/parts/${partId}`);
  };

  const handleCreateOrder = (partId: string) => {
    navigate(`/sales/orders/create?partId=${partId}`);
  };

  const handleAddPart = () => {
    setIsAddPartOpen(true);
  };

  const handleDeletePart = (partId: string) => {
    const updatedParts = parts.filter(p => p.id !== partId);
    setParts(updatedParts);
  };

  const handleSavePart = (newPart: Part) => {
    const updatedParts = [...parts, newPart];
    setParts(updatedParts);
    setIsAddPartOpen(false);
  };

  return (
    <div className="w-[clamp(1024px,80vw,1500px)] mx-auto space-y-4">
      {!isEditing && (
        <ProjectToolbar 
          totalProjects={parts.length} 
          onDownload={handleDownload}
          onPrint={handlePrint}
          onDelete={handleDelete}
          disabled={selectedParts.length === 0}
          showCreateSales={true}
        />
      )}
      {isEditing && parts.length > 0 && (
        <TableToolbar 
          onAddPart={handleAddPart}
          onCreateSalesOrder={handleCreateSalesOrder}
          hasSelectedParts={selectedParts.length > 0}
        />
      )}
      {parts.length === 0 ? (
        <EmptyState 
          onAddPart={handleAddPart}
          isEditing={isEditing}
        />
      ) : (
        <div className="rounded-md border bg-white">
          <Table>
            <TableHeaderComponent isEditing={isEditing} />
            <TableBody>
              {parts.map((part) => {
                const stockQuantity = getAvailableStock(part);
                const requirementQty = getRequirementQuantity(part.quantity, stockQuantity);
                return (
                  <TableRowComponent
                    key={part.id}
                    part={part}
                    isEditing={isEditing}
                    isSelected={selectedParts.some(p => p.id === part.id)}
                    onSelect={() => togglePartSelection(part)}
                    onDelete={handleDeletePart}
                    onViewDetails={handleViewDetails}
                    onCreateOrder={handleCreateOrder}
                    stockQuantity={stockQuantity}
                    requirementQuantity={requirementQty}
                  />
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={isAddPartOpen} onOpenChange={setIsAddPartOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Part</DialogTitle>
          </DialogHeader>
          <PartForm 
            onSave={handleSavePart}
            onCancel={() => setIsAddPartOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <CreateSalesOrderDialog
        isOpen={isCreateSalesOrderOpen}
        onClose={() => setIsCreateSalesOrderOpen(false)}
        initialItems={selectedParts.map(part => {
          const mockProduct = mockProducts.find(p => p.name === part.name);
          const pricePerUnit = mockProduct ? mockProduct.defaultSalesPrice.toString() : "300";
          const stockQuantity = getAvailableStock(part);
          return {
            name: part.name,
            quantity: getRequirementQuantity(part.quantity, stockQuantity),
            pricePerUnit,
            partIdentifier: part.partIdentifier
          };
        })}
      />
    </div>
  );
}