import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

interface TableHeaderProps {
  isEditing: boolean;
}

export function TableHeaderComponent({ isEditing }: TableHeaderProps) {
  return (
    <TableHeader>
      <TableRow className="bg-[#F6F6F7]">
        {isEditing && (
          <TableHead className="p-4 w-[50px] sticky left-0 bg-[#F6F6F7] border">
            <Checkbox />
          </TableHead>
        )}
        <TableHead className="p-4 min-w-[100px] bg-[#F6F6F7] border">BOM Level</TableHead>
        <TableHead className="p-4 min-w-[120px] bg-[#F6F6F7] border">NSN</TableHead>
        <TableHead className="p-4 min-w-[150px] bg-[#F6F6F7] border">Part Name</TableHead>
        <TableHead className="p-4 min-w-[150px] bg-[#F6F6F7] border">Approved Part Numbers</TableHead>
        <TableHead className="p-4 min-w-[150px] bg-[#F6F6F7] border">Part Identifier</TableHead>
        <TableHead className="p-4 min-w-[100px] bg-[#F6F6F7] border">Revision</TableHead>
        <TableHead className="p-4 min-w-[120px] bg-[#F6F6F7] border">Classification</TableHead>
        <TableHead className="p-4 min-w-[200px] bg-[#F6F6F7] border">Part Description</TableHead>
        <TableHead className="p-4 min-w-[200px] bg-[#F6F6F7] border">Supplier Notes</TableHead>
        <TableHead className="p-4 min-w-[100px] bg-[#F6F6F7] border">Quote</TableHead>
        <TableHead className="p-4 min-w-[120px] bg-[#F6F6F7] border">Unit of Measure</TableHead>
        <TableHead className="p-4 min-w-[100px] bg-[#F6F6F7] border">Quantity</TableHead>
        <TableHead className="p-4 min-w-[80px] sticky right-0 bg-[#F6F6F7] border">
          {isEditing ? 'Delete' : 'Action'}
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}