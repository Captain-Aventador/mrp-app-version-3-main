import { Download, Printer, Edit, Trash } from "lucide-react";

interface MaterialsToolbarProps {
  totalItems: number;
  selectedMaterials: string[];
  onDownload: () => void;
}

export function MaterialsToolbar({ totalItems, selectedMaterials, onDownload }: MaterialsToolbarProps) {
  return (
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm text-muted-foreground">{totalItems} items</span>
      <div className="flex items-center gap-2">
        <button 
          className="p-2 rounded-md hover:bg-accent text-foreground"
          onClick={onDownload}
        >
          <Download className="h-4 w-4" />
        </button>
        <button 
          className={`p-2 rounded-md ${selectedMaterials.length > 0 ? 'hover:bg-accent text-foreground' : 'text-muted-foreground cursor-not-allowed'}`}
          disabled={selectedMaterials.length === 0}
        >
          <Printer className="h-4 w-4" />
        </button>
        <button 
          className={`p-2 rounded-md ${selectedMaterials.length === 1 ? 'hover:bg-accent text-foreground' : 'text-muted-foreground cursor-not-allowed'}`}
          disabled={selectedMaterials.length !== 1}
        >
          <Edit className="h-4 w-4" />
        </button>
        <button 
          className={`p-2 rounded-md ${selectedMaterials.length > 0 ? 'hover:bg-accent text-foreground' : 'text-muted-foreground cursor-not-allowed'}`}
          disabled={selectedMaterials.length === 0}
        >
          <Trash className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}