import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface MaterialGeneralInfoProps {
  onNameChange: (name: string) => void;
}

export function MaterialGeneralInfo({ onNameChange }: MaterialGeneralInfoProps) {
  const [formData, setFormData] = useState({
    sell: false
  });

  return (
    <div className="space-y-6 py-4">
      <div className="space-y-4">
        <div>
          <Label htmlFor="material-name">Material name</Label>
          <Input 
            id="material-name"
            placeholder="Type material name"
            className="mt-1.5"
            onChange={(e) => onNameChange(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="category">Category</Label>
          <Input 
            id="category"
            placeholder="Select or create category"
            className="mt-1.5"
          />
        </div>

        <div>
          <Label htmlFor="unit">Unit of measure</Label>
          <Input 
            id="unit"
            placeholder="pcs"
            className="mt-1.5"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Usability</h3>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="sell"
            checked={formData.sell}
            onCheckedChange={(checked) => 
              setFormData({ ...formData, sell: checked as boolean })
            }
          />
          <Label htmlFor="sell">Sell</Label>
        </div>
      </div>

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#F6F6F7]">
              <TableHead className="bg-[#F6F6F7]">
                Variant code / SKU
                <span className="ml-1 inline-block w-4 h-4 text-gray-400">ⓘ</span>
              </TableHead>
              {formData.sell && (
                <TableHead className="bg-[#F6F6F7]">
                  Default sales price
                  <span className="ml-1 inline-block w-4 h-4 text-gray-400">ⓘ</span>
                </TableHead>
              )}
              <TableHead className="bg-[#F6F6F7]">
                In stock
                <span className="ml-1 inline-block w-4 h-4 text-gray-400">ⓘ</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <Input 
                  id="variant-code"
                  placeholder="E.g. P-1, M-1"
                />
              </TableCell>
              {formData.sell && (
                <TableCell>
                  <div className="relative">
                    <Input 
                      id="default-price"
                      type="number"
                      defaultValue="0"
                      className="pl-8 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      $
                    </span>
                  </div>
                </TableCell>
              )}
              <TableCell>
                <div className="relative">
                  <Input 
                    id="in-stock"
                    type="number"
                    defaultValue="0"
                    className="pr-12 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    pcs
                  </span>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="space-y-2">
        <Label htmlFor="additionalInfo">Additional info</Label>
        <Textarea
          id="additionalInfo"
          placeholder="Type comment here"
          className="min-h-[100px]"
        />
      </div>
    </div>
  );
}