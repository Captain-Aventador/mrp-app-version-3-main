import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { mockProducts } from "@/data/mockProducts";

interface ProductsTableProps {
  selectedProducts: string[];
  setSelectedProducts: (products: string[]) => void;
}

export function ProductsTable({ selectedProducts, setSelectedProducts }: ProductsTableProps) {
  const handleSelectProduct = (sku: string) => {
    setSelectedProducts(
      selectedProducts.includes(sku)
        ? selectedProducts.filter(id => id !== sku)
        : [...selectedProducts, sku]
    );
  };

  const handleSelectAll = () => {
    setSelectedProducts(
      selectedProducts.length === mockProducts.length
        ? []
        : mockProducts.map(product => product.sku)
    );
  };

  return (
    <div className="rounded-md border bg-white mt-0">
      <Table>
        <TableHeader>
          <TableRow className="bg-[#F6F6F7]">
            <TableHead className="w-[50px] bg-[#F6F6F7]">
              <Checkbox 
                checked={selectedProducts.length === mockProducts.length && mockProducts.length > 0}
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
            <TableHead className="bg-[#F6F6F7]">Name of Product</TableHead>
            <TableHead className="bg-[#F6F6F7]">SKU</TableHead>
            <TableHead className="bg-[#F6F6F7]">Category</TableHead>
            <TableHead className="bg-[#F6F6F7]">Default Sales Price</TableHead>
            <TableHead className="bg-[#F6F6F7]">Cost</TableHead>
            <TableHead className="bg-[#F6F6F7]">Profit</TableHead>
            <TableHead className="bg-[#F6F6F7]">Margin</TableHead>
            <TableHead className="bg-[#F6F6F7]">Production Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockProducts.map((product) => (
            <TableRow key={product.sku}>
              <TableCell className="p-4">
                <Checkbox 
                  checked={selectedProducts.includes(product.sku)}
                  onCheckedChange={() => handleSelectProduct(product.sku)}
                />
              </TableCell>
              <TableCell className="p-4">{product.name}</TableCell>
              <TableCell className="p-4">{product.sku}</TableCell>
              <TableCell className="p-4">{product.category}</TableCell>
              <TableCell className="p-4">${product.defaultSalesPrice.toFixed(2)}</TableCell>
              <TableCell className="p-4">${product.cost.toFixed(2)}</TableCell>
              <TableCell className="p-4">${(product.defaultSalesPrice - product.cost).toFixed(2)}</TableCell>
              <TableCell className="p-4">
                {(((product.defaultSalesPrice - product.cost) / product.defaultSalesPrice) * 100).toFixed(2)}%
              </TableCell>
              <TableCell className="p-4">{product.productionTime} days</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}