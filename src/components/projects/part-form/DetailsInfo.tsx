import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DetailsInfoProps {
  formData: {
    unitOfMeasure: string;
    bomLevel: string;
    classification: string;
    fscg: string;
    niin: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export function DetailsInfo({ formData, handleInputChange }: DetailsInfoProps) {
  const units = ["EA", "cm", "g", "kg", "l", "m", "ml", "mm", "pcs"];

  const handleUnitChange = (value: string) => {
    // Create a synthetic event to match the handleInputChange interface
    const syntheticEvent = {
      target: {
        id: "unitOfMeasure",
        value
      }
    } as React.ChangeEvent<HTMLInputElement>;
    
    handleInputChange(syntheticEvent);
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="unitOfMeasure">Unit of Measure*</Label>
          <Select
            value={formData.unitOfMeasure}
            onValueChange={handleUnitChange}
          >
            <SelectTrigger id="unitOfMeasure" className="bg-white">
              <SelectValue placeholder="Select unit" />
            </SelectTrigger>
            <SelectContent>
              {units.map((unit) => (
                <SelectItem key={unit} value={unit} className="text-sm">
                  {unit}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="bomLevel">BOM Level*</Label>
          <Input 
            id="bomLevel"
            value={formData.bomLevel}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="classification">Classification</Label>
        <Input 
          id="classification"
          value={formData.classification}
          onChange={handleInputChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="federalClassification">Federal Classification</Label>
        <div className="flex gap-2">
          <Input 
            id="fscg" 
            placeholder="FSCG" 
            className="flex-1"
            value={formData.fscg}
            onChange={handleInputChange}
          />
          <Input 
            id="niin" 
            placeholder="NIIN" 
            className="flex-1"
            value={formData.niin}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </>
  );
}