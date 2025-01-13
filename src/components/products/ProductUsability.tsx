import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface ProductUsabilityProps {
  formData: any;
  setFormData: (data: any) => void;
}

export function ProductUsability({ formData, setFormData }: ProductUsabilityProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-medium">Usability</h3>
      <div className="flex gap-6">
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
        <div className="flex items-center space-x-2">
          <Checkbox
            id="buy"
            checked={formData.buy}
            onCheckedChange={(checked) => 
              setFormData({ ...formData, buy: checked as boolean })
            }
          />
          <Label htmlFor="buy">Buy</Label>
        </div>
      </div>
    </div>
  );
}