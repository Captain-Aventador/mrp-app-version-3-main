import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

interface MaterialSupplyDetailsProps {
  materialName: string;
}

export function MaterialSupplyDetails({ materialName }: MaterialSupplyDetailsProps) {
  const [showUnitConversion, setShowUnitConversion] = useState(false);

  return (
    <div className="space-y-6 py-4">
      <div>
        <Label htmlFor="supplier">Default supplier</Label>
        <Input 
          id="supplier"
          placeholder="Select or create supplier"
          className="mt-1.5"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-muted-foreground">Do you buy this item in a different unit of measure?</Label>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="different-unit" 
            checked={showUnitConversion}
            onCheckedChange={(checked) => setShowUnitConversion(checked as boolean)}
          />
          <label
            htmlFor="different-unit"
            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Yes, I purchase in a different unit
          </label>
        </div>
      </div>

      {showUnitConversion && (
        <div className="space-y-4 border rounded-lg p-4 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <Label className="text-muted-foreground">Default purchase unit of measure</Label>
              <Input 
                placeholder="Select unit"
                className="mt-1"
              />
            </div>
            <div className="flex-1 ml-4">
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <Label className="text-muted-foreground">Unit conversion rate</Label>
                  <div className="relative">
                    <span className="absolute left-[60px] top-1/2 -translate-x-[calc(100%+8px)] -translate-y-1/2 text-muted-foreground whitespace-nowrap text-xs">
                      1 pcs =
                    </span>
                    <Input 
                      type="number" 
                      defaultValue="1"
                      className="mt-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none pr-8 pl-16"
                    />
                    <span className="absolute right-3 top-[12%] translate-y-[2px] text-muted-foreground">
                      pcs
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Product</h3>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#F6F6F7]">
                <TableHead className="bg-[#F6F6F7]">
                  Variant
                </TableHead>
                <TableHead className="bg-[#F6F6F7]">
                  Default lead time
                  <span className="ml-1 inline-block w-4 h-4 text-gray-400">ⓘ</span>
                </TableHead>
                <TableHead className="bg-[#F6F6F7]">
                  MOQ
                  <span className="ml-1 inline-block w-4 h-4 text-gray-400">ⓘ</span>
                </TableHead>
                <TableHead className="bg-[#F6F6F7]">
                  Default purchase price
                  <span className="ml-1 inline-block w-4 h-4 text-gray-400">ⓘ</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Input 
                    value={materialName}
                    readOnly
                    className="bg-gray-50"
                  />
                </TableCell>
                <TableCell>
                  <Input 
                    type="number"
                    placeholder="Enter lead time"
                    className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </TableCell>
                <TableCell>
                  <Input 
                    type="number"
                    placeholder="Enter MOQ"
                    className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </TableCell>
                <TableCell className="text-right">
                  <Input 
                    type="number"
                    placeholder="Enter price"
                    className="text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}