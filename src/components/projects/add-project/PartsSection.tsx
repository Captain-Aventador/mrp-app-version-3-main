import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PartsTable } from "../PartsTable";
import { Part } from "../PartForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PartForm } from "../PartForm";
import { useState } from "react";
import { CreateNewRequisitionDialog } from "../CreateNewRequisitionDialog";

interface ProjectDetails {
  name: string;
  salesOrder: string;
  dueDate: string;
  followUpDate: string;
  description: string;
  projectTitle: string;
}

interface PartsSectionProps {
  parts: Part[];
  setParts: (parts: Part[]) => void;
  projectDetails: ProjectDetails;
  validateProjectDetails: () => boolean;
}

export function PartsSection({ parts, setParts, projectDetails, validateProjectDetails }: PartsSectionProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isRequisitionDialogOpen, setIsRequisitionDialogOpen] = useState(false);
  const [selectedPart, setSelectedPart] = useState<{ name: string; quantity: string } | null>(null);

  const handleAddPart = () => {
    setIsDialogOpen(true);
  };

  const handlePartSave = (newPart: Part) => {
    setParts([...parts, newPart]);
    setIsDialogOpen(false);
  };

  const handleCreateRequisition = (partName: string, quantity: string) => {
    setSelectedPart({ name: partName, quantity });
    setIsRequisitionDialogOpen(true);
  };

  return (
    <>
      {parts.length > 0 ? (
        <PartsTable 
          parts={parts} 
          isEditing={true} 
          projectDetails={projectDetails}
          validateProjectDetails={validateProjectDetails}
          onPartsUpdate={setParts}
          onCreateRequisition={handleCreateRequisition}
        />
      ) : null}
      <div className="flex flex-col items-center space-y-4 mb-4 mt-4">
        {parts.length === 0 && (
          <>
            <p className="text-gray-500">No Records Available</p>
            <Button onClick={handleAddPart}>
              <Plus className="mr-2 h-4 w-4" />
              Add BOM
            </Button>
          </>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="w-[80vw] max-w-[80%] h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>ADD PART</DialogTitle>
          </DialogHeader>
          <PartForm 
            onSave={handlePartSave}
            onCancel={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {selectedPart && (
        <CreateNewRequisitionDialog
          isOpen={isRequisitionDialogOpen}
          onClose={() => setIsRequisitionDialogOpen(false)}
          partName={selectedPart.name}
          quantity={selectedPart.quantity}
          program={projectDetails.name}
          projectTitle={projectDetails.projectTitle}
        />
      )}
    </>
  );
}