import { Download, Printer, Trash } from "lucide-react";

interface ProjectToolbarProps {
  totalProjects: number;
  onDownload?: () => void;
  onPrint?: () => void;
  onDelete?: () => void;
  onCreateSales?: () => void;
  showCreateSales?: boolean;
  disabled?: boolean;
  label?: string;
}

export function ProjectToolbar({ 
  totalProjects, 
  onDownload, 
  onPrint, 
  onDelete,
  onCreateSales,
  showCreateSales = true,
  disabled = false,
  label = "Parts"
}: ProjectToolbarProps) {
  return (
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm text-muted-foreground">{totalProjects} {label}</span>
      <div className="flex items-center gap-2">
        {showCreateSales && (
          <button 
            className={`px-4 py-2 bg-primary text-white rounded-md transition-colors ${
              disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary/90'
            }`}
            onClick={onCreateSales}
            disabled={disabled}
          >
            <span>Create Sales Order</span>
          </button>
        )}
        <button 
          className={`p-2 rounded-md transition-colors ${
            disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-accent text-foreground'
          }`}
          onClick={onDownload}
          disabled={disabled}
        >
          <Download className="h-4 w-4" />
        </button>
        <button 
          className={`p-2 rounded-md transition-colors ${
            disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-accent text-foreground'
          }`}
          onClick={onPrint}
          disabled={disabled}
        >
          <Printer className="h-4 w-4" />
        </button>
        <button 
          className={`p-2 rounded-md transition-colors ${
            disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-accent text-foreground'
          }`}
          onClick={onDelete}
          disabled={disabled}
        >
          <Trash className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}