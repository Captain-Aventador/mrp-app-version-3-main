import { Button } from "@/components/ui/button";
import { Download, Printer, Trash2 } from "lucide-react";

interface BOMToolbarProps {
  totalBOMs: number;
}

export function BOMToolbar({ totalBOMs }: BOMToolbarProps) {
  const handleDownload = () => {
    console.log("Download BOM list");
    // Add download functionality here
  };

  const handlePrint = () => {
    console.log("Print BOM list");
    window.print();
  };

  const handleDelete = () => {
    console.log("Delete selected BOMs");
    // Add delete functionality here
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">
          Total BOMs: {totalBOMs}
        </span>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDownload}
            title="Download"
          >
            <Download className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrint}
            title="Print"
          >
            <Printer className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDelete}
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}