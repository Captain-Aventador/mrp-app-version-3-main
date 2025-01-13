import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus } from "lucide-react";

export function ProductOperations() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Operation steps</h3>
      </div>
      
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#F6F6F7]">
              <TableHead className="w-[30%] bg-[#F6F6F7]">
                Operation
                <span className="ml-1 inline-block w-4 h-4 text-gray-400">ⓘ</span>
              </TableHead>
              <TableHead className="w-[25%] bg-[#F6F6F7]">
                Resource
                <span className="ml-1 inline-block w-4 h-4 text-gray-400">ⓘ</span>
              </TableHead>
              <TableHead className="w-[20%] bg-[#F6F6F7]">
                Cost parameter
                <span className="ml-1 inline-block w-4 h-4 text-gray-400">ⓘ</span>
              </TableHead>
              <TableHead className="w-[15%] bg-[#F6F6F7]">
                Time
                <span className="ml-1 inline-block w-4 h-4 text-gray-400">ⓘ</span>
              </TableHead>
              <TableHead className="w-[10%] bg-[#F6F6F7]">
                Cost
                <span className="ml-1 inline-block w-4 h-4 text-gray-400">ⓘ</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <Input placeholder="E.g. cutting, assembly" />
              </TableCell>
              <TableCell>
                <Input placeholder="Resource name" />
              </TableCell>
              <TableCell>
                <Input placeholder="Cost per hour" type="number" />
              </TableCell>
              <TableCell>
                <Input placeholder="Type operation duration" type="number" />
              </TableCell>
              <TableCell>
                <Input disabled value="0" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      
      <Button 
        variant="link" 
        className="p-0 h-auto font-normal hover:no-underline"
      >
        <Plus className="h-4 w-4 mr-1" />
        Add row
      </Button>

      <div className="flex flex-col gap-2 items-end mt-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Production time:</span>
          <span className="text-sm">0h 0m 0s</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Total time for cost calculation:</span>
          <span className="text-sm">0h 0m 0s</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Total cost:</span>
          <span className="text-sm">0 USD</span>
        </div>
      </div>
    </div>
  );
}