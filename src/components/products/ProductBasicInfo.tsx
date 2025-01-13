import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ProductBasicInfoProps {
  formData: any;
  setFormData: (data: any) => void;
}

export function ProductBasicInfo({ formData, setFormData }: ProductBasicInfoProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Product name</Label>
        <Input
          id="name"
          placeholder="Type product name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Input
          id="category"
          placeholder="Select or create category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="unitOfMeasure">Unit of measure</Label>
        <Input
          id="unitOfMeasure"
          value={formData.unitOfMeasure}
          onChange={(e) => setFormData({ ...formData, unitOfMeasure: e.target.value })}
        />
      </div>
    </div>
  );
}