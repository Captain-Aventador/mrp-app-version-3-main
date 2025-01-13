import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface ProductVariantsProps {
  formData: any;
  setFormData: (data: any) => void;
}

export function ProductVariants({ formData, setFormData }: ProductVariantsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="hasVariants"
          checked={formData.hasVariants}
          onCheckedChange={(checked) => 
            setFormData({ ...formData, hasVariants: checked as boolean })
          }
        />
        <Label htmlFor="hasVariants">Does this product come in different colors, sizes or similar?</Label>
      </div>
      
      {formData.hasVariants && (
        <div className="space-y-2">
          <Label htmlFor="variantCode">Variant code/SKU</Label>
          <Input
            id="variantCode"
            placeholder="E.g. P-1-M-1"
            value={formData.variantCode}
            onChange={(e) => setFormData({ ...formData, variantCode: e.target.value })}
          />
        </div>
      )}
    </div>
  );
}