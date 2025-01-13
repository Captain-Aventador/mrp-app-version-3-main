import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockPrograms } from "@/data/mockPrograms";

interface ProjectDetailsSectionProps {
  projectDetails: {
    name: string;
    salesOrder: string;
    dueDate: string;
    followUpDate: string;
    description: string;
    projectTitle: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onProgramSelect?: (value: string) => void;
}

export function ProjectDetailsSection({ 
  projectDetails, 
  handleInputChange,
  onProgramSelect 
}: ProjectDetailsSectionProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Program</label>
        <Select 
          defaultValue={projectDetails.name}
          onValueChange={(value) => onProgramSelect?.(value)}
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

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Project Title</label>
          <Input 
            name="projectTitle"
            placeholder="Enter project title" 
            value={projectDetails.projectTitle}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Project ID</label>
          <Input 
            name="salesOrder"
            placeholder="Project ID" 
            value={projectDetails.salesOrder}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Project Due Date</label>
          <Input 
            name="dueDate"
            type="date" 
            placeholder="dd/mm/yyyy" 
            value={projectDetails.dueDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Project Follow Up Date</label>
          <Input 
            name="followUpDate"
            type="date" 
            placeholder="dd/mm/yyyy" 
            value={projectDetails.followUpDate}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Project Description</label>
        <Textarea 
          name="description"
          placeholder="Enter project description" 
          className="min-h-[96px]"
          value={projectDetails.description}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}