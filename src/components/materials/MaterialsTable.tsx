import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { mockMaterials } from "@/data/mockMaterials";

interface MaterialsTableProps {
  selectedMaterials: string[];
  setSelectedMaterials: (materials: string[]) => void;
}

export function MaterialsTable({ selectedMaterials, setSelectedMaterials }: MaterialsTableProps) {
  const handleSelectMaterial = (id: string) => {
    setSelectedMaterials(
      selectedMaterials.includes(id)
        ? selectedMaterials.filter(materialId => materialId !== id)
        : [...selectedMaterials, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedMaterials(
      selectedMaterials.length === mockMaterials.length
        ? []
        : mockMaterials.map(material => material.id)
    );
  };

  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-[#F6F6F7]">
            <TableHead className="w-[50px] bg-[#F6F6F7] py-0">
              <Checkbox 
                checked={selectedMaterials.length === mockMaterials.length && mockMaterials.length > 0}
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
            <TableHead className="bg-[#F6F6F7] py-0">Name</TableHead>
            <TableHead className="bg-[#F6F6F7] py-0">Variant code / SKU</TableHead>
            <TableHead className="bg-[#F6F6F7] py-0">Category</TableHead>
            <TableHead className="bg-[#F6F6F7] py-0">Default supplier</TableHead>
            <TableHead className="bg-[#F6F6F7] py-0">Default purchase price</TableHead>
            <TableHead className="bg-[#F6F6F7] text-right py-0">Default sales price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockMaterials.map((material) => (
            <TableRow key={material.id}>
              <TableCell className="bg-[#F6F6F7] py-0">
                <Checkbox 
                  checked={selectedMaterials.includes(material.id)}
                  onCheckedChange={() => handleSelectMaterial(material.id)}
                />
              </TableCell>
              <TableCell className="py-0">{material.name}</TableCell>
              <TableCell className="py-0">{material.sku}</TableCell>
              <TableCell className="py-0">{material.category}</TableCell>
              <TableCell className="py-0">{material.defaultSupplier}</TableCell>
              <TableCell className="py-0">{material.defaultPurchasePrice > 0 ? `${material.defaultPurchasePrice.toFixed(2)} USD` : ''}</TableCell>
              <TableCell className="text-right py-0">{material.defaultSalesPrice > 0 ? `${material.defaultSalesPrice.toFixed(2)} USD` : ''}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}