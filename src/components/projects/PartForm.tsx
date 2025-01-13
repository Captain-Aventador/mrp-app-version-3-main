import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { BasicInfo } from "./part-form/BasicInfo";
import { DetailsInfo } from "./part-form/DetailsInfo";
import { BOMDetails } from "./part-form/BOMDetails";
import { Label } from "@/components/ui/label";

export interface Part {
  id: string;
  bomLevel: string;
  fscg: string;
  niin: string;
  name: string;  // Added this line
  approvedPartNumbers: string;
  partIdentifier: string;
  revision: string;
  classification: string;
  description: string;
  requiredDescription: string;
  quantity: string;
  supplierNote: string;
  unitOfMeasure: string;
  files: File[];
}

interface PartFormProps {
  onSave: (part: Part) => void;
  onCancel: () => void;
}

export function PartForm({ onSave, onCancel }: PartFormProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<Omit<Part, 'id' | 'files'>>({
    partIdentifier: '',
    description: '',
    requiredDescription: '',
    revision: '',
    unitOfMeasure: '',
    bomLevel: '',
    classification: '',
    fscg: '',
    niin: '',
    name: '',  // Added this line
    approvedPartNumbers: '',
    quantity: '',
    supplierNote: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedFiles(Array.from(files));
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files) {
      setSelectedFiles(Array.from(files));
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleSave = () => {
    const newPart: Part = {
      id: crypto.randomUUID(),
      ...formData,
      files: selectedFiles
    };
    onSave(newPart);
  };

  const isFormValid = formData.partIdentifier && formData.description && formData.unitOfMeasure && formData.bomLevel;

  return (
    <div className="grid gap-4 pt-0 pb-4">
      <BasicInfo formData={formData} handleInputChange={handleInputChange} />
      <DetailsInfo formData={formData} handleInputChange={handleInputChange} />
      <BOMDetails formData={formData} handleInputChange={handleInputChange} />

      <div className="space-y-2">
        <Label>Drawings</Label>
        <div
          className="border-2 border-dashed rounded-lg p-4 text-center text-gray-500 cursor-pointer"
          onClick={handleBrowseClick}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileUpload}
            multiple
          />
          Drop files here to upload or click to browse
          {selectedFiles.length > 0 && (
            <div className="mt-2">
              <p className="font-medium text-sm">Selected files:</p>
              <ul className="text-sm">
                {selectedFiles.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={!isFormValid}>
          Save
        </Button>
      </div>
    </div>
  );
}