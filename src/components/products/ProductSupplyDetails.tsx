import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ProductSupplyDetailsProps {
  formData: any;
  setFormData: (data: any) => void;
}

export function ProductSupplyDetails({ formData, setFormData }: ProductSupplyDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label className="text-muted-foreground">Default supplier</Label>
          <Input 
            placeholder="Select or create supplier"
            value={formData.defaultSupplier}
            onChange={(e) => setFormData({ ...formData, defaultSupplier: e.target.value })}
            className="mt-1"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-muted-foreground">Do you buy this item in a different unit of measure?</Label>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="differentUnit"
              checked={formData.differentUnit}
              onCheckedChange={(checked) => 
                setFormData({ ...formData, differentUnit: checked as boolean })
              }
            />
            <Label htmlFor="differentUnit">Yes, I purchase in a different unit</Label>
          </div>
        </div>

        {formData.differentUnit && (
          <div className="space-y-4 border rounded-lg p-4 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label className="text-muted-foreground">Default purchase unit of measure</Label>
                <Input 
                  placeholder="Select unit"
                  className="mt-1"
                />
              </div>
              <div className="flex items-center px-4">
                <span className="text-sm text-muted-foreground">Unit conversion rate</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <Label className="text-muted-foreground">1 pcs =</Label>
                    <Input 
                      type="number" 
                      defaultValue="1"
                      className="mt-1"
                    />
                  </div>
                  <div className="flex-1 mt-auto">
                    <Input 
                      value="pcs"
                      readOnly
                      className="bg-gray-100"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4 mt-8">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Product</h3>
          </div>

          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Variant</TableHead>
                  <TableHead>Default lead time</TableHead>
                  <TableHead>MOQ</TableHead>
                  <TableHead>Default purchase price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Input 
                      type="text" 
                      placeholder="Enter variant"
                      value={formData.name}
                      readOnly
                      className="w-full bg-gray-50"
                    />
                  </TableCell>
                  <TableCell>
                    <Input type="text" className="w-full" />
                  </TableCell>
                  <TableCell>
                    <Input type="text" className="w-full" />
                  </TableCell>
                  <TableCell>
                    <Input type="text" className="w-full" defaultValue="0 USD" />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}