import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Project } from "@/types/project";
import { mockPrograms } from "@/data/mockPrograms";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProjectDetailsFormProps {
  project: Project;
  isEditing: boolean;
  onUpdate?: (project: Project) => void;
}

export function ProjectDetailsForm({ project, isEditing, onUpdate }: ProjectDetailsFormProps) {
  const [formData, setFormData] = useState(project);

  useEffect(() => {
    setFormData(project);
  }, [project]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedData = {
      ...formData,
      [name]: value
    };
    setFormData(updatedData);
    if (onUpdate) {
      onUpdate(updatedData);
    }
  };

  const handleProgramChange = (value: string) => {
    const updatedData = {
      ...formData,
      name: value
    };
    setFormData(updatedData);
    if (onUpdate) {
      onUpdate(updatedData);
    }
  };

  if (!isEditing) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Program</label>
          <div className="p-2 border rounded-md bg-gray-50">{project.name || '-'}</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Project Title</label>
            <div className="p-2 border rounded-md bg-gray-50">{project.projectTitle}</div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Project ID</label>
            <div className="p-2 border rounded-md bg-gray-50">{project.id}</div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Project Due Date</label>
            <div className="p-2 border rounded-md bg-gray-50">{project.dueDate}</div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Project Follow Up Date</label>
            <div className="p-2 border rounded-md bg-gray-50">{project.followUpDate}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Program</label>
        <Select 
          value={formData.name || ''} 
          onValueChange={handleProgramChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a program" />
          </SelectTrigger>
          <SelectContent>
            {mockPrograms.map((program) => (
              <SelectItem key={program.id} value={program.name}>
                {program.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Project Title</label>
          <Input 
            name="projectTitle"
            value={formData.projectTitle}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Project ID</label>
          <Input value={formData.id} disabled />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Project Due Date</label>
          <Input 
            name="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Project Follow Up Date</label>
          <Input 
            name="followUpDate"
            type="date"
            value={formData.followUpDate}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
}