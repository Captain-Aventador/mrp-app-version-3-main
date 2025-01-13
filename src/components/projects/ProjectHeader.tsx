import { Button } from "@/components/ui/button";

interface ProjectHeaderProps {
  isEditing: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onUpdate?: () => void;
}

export function ProjectHeader({ isEditing, onEdit, onCancel, onUpdate }: ProjectHeaderProps) {
  const handleAction = () => {
    if (isEditing && onUpdate) {
      onUpdate();
    } else {
      onEdit();
    }
  };

  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-semibold">{isEditing ? 'Edit Project' : 'View Project'}</h1>
      <div className="space-x-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleAction}>
          {isEditing ? 'Update' : 'Edit'}
        </Button>
      </div>
    </div>
  );
}