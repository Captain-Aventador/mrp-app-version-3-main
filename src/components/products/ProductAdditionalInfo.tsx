import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ProductAdditionalInfoProps {
  formData: any;
  setFormData: (data: any) => void;
}

export function ProductAdditionalInfo({ formData, setFormData }: ProductAdditionalInfoProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="additionalInfo">Additional info</Label>
      <Textarea
        id="additionalInfo"
        placeholder="Type comment here"
        value={formData.additionalInfo}
        onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
        className="min-h-[100px]"
      />
    </div>
  );
}