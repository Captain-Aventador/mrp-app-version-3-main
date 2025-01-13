import { BOMTable } from "@/components/bom/BOMTable";
import { BOMToolbar } from "@/components/bom/BOMToolbar";
import { mockBOMItems } from "@/data/mockBOM";

export function BOMList() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Bill of Materials</h1>
      </div>
      <BOMToolbar totalBOMs={mockBOMItems.length} />
      <BOMTable items={mockBOMItems} />
    </div>
  );
}