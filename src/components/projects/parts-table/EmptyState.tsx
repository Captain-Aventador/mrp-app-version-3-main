import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface EmptyStateProps {
  onAddPart: () => void;
  isEditing: boolean;
}

export function EmptyState({ onAddPart, isEditing }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 h-32 bg-white border rounded-md">
      <p className="text-gray-500">No Record Found</p>
      {isEditing && (
        <Button 
          onClick={onAddPart} 
          variant="outline"
          className="mt-2"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Part
        </Button>
      )}
    </div>
  );
}