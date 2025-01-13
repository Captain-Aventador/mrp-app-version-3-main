import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

interface ProductPricingProps {
  formData: any;
  setFormData: (data: any) => void;
}

export function ProductPricing({ formData, setFormData }: ProductPricingProps) {
  return (
    <div className="w-full">
      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#F6F6F7]">
                <TableHead className="bg-[#F6F6F7] border-r">
                  Variant code / SKU
                  <span className="ml-1 inline-block w-4 h-4 text-gray-400">ⓘ</span>
                </TableHead>
                {formData.sell && (
                  <TableHead className="bg-[#F6F6F7] border-r">
                    Default sales price
                    <span className="ml-1 inline-block w-4 h-4 text-gray-400">ⓘ</span>
                  </TableHead>
                )}
                {formData.make && (
                  <>
                    <TableHead className="bg-[#F6F6F7] border-r">
                      Ingredients cost
                      <span className="ml-1 inline-block w-4 h-4 text-gray-400">ⓘ</span>
                    </TableHead>
                    <TableHead className="bg-[#F6F6F7] border-r">
                      Operations cost
                      <span className="ml-1 inline-block w-4 h-4 text-gray-400">ⓘ</span>
                    </TableHead>
                  </>
                )}
                <TableHead className="bg-[#F6F6F7]">
                  In stock
                  <span className="ml-1 inline-block w-4 h-4 text-gray-400">ⓘ</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="border-r">
                  <Input
                    id="variantCode"
                    placeholder="E.g. P-1, M-1"
                    value={formData.variantCode}
                    onChange={(e) => setFormData({ ...formData, variantCode: e.target.value })}
                  />
                </TableCell>
                {formData.sell && (
                  <TableCell className="border-r">
                    <div className="relative">
                      <Input
                        id="defaultSalesPrice"
                        type="number"
                        className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        value={formData.defaultSalesPrice}
                        onChange={(e) => setFormData({ ...formData, defaultSalesPrice: e.target.value })}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">USD</span>
                    </div>
                  </TableCell>
                )}
                {formData.make && (
                  <>
                    <TableCell className="border-r">
                      <div className="relative">
                        <Input
                          id="ingredientsCost"
                          type="number"
                          className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          value={formData.ingredientsCost}
                          onChange={(e) => setFormData({ ...formData, ingredientsCost: e.target.value })}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">USD</span>
                      </div>
                    </TableCell>
                    <TableCell className="border-r">
                      <div className="relative">
                        <Input
                          id="operationsCost"
                          type="number"
                          className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          value={formData.operationsCost}
                          onChange={(e) => setFormData({ ...formData, operationsCost: e.target.value })}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">USD</span>
                      </div>
                    </TableCell>
                  </>
                )}
                <TableCell>
                  <div className="relative">
                    <Input
                      id="inStock"
                      type="number"
                      className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      value={formData.inStock}
                      onChange={(e) => setFormData({ ...formData, inStock: e.target.value })}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">pcs</span>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}