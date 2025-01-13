import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectDetailsForm } from "../ProjectDetailsForm";
import { PartsTable } from "../PartsTable";
import { MRPCalculations } from "../MRPCalculations";
import { Project } from "@/types/project";
import { Part } from "../PartForm";
import { useLocation } from "react-router-dom";

interface ProjectContentProps {
  project: Project;
  isEditing: boolean;
  parts: Part[];
  maxParts?: number;
  onProjectUpdate?: (project: Project) => void;
  onPartsUpdate?: (parts: Part[]) => void;
}

export function ProjectContent({ 
  project, 
  isEditing, 
  parts, 
  maxParts,
  onProjectUpdate,
  onPartsUpdate 
}: ProjectContentProps) {
  const location = useLocation();
  const defaultTab = location.state?.defaultTab || 'project-detail';

  return (
    <Tabs defaultValue={defaultTab} className="w-full mt-6">
      <TabsList className="w-full bg-white border-b mb-0 p-0 mt-[0px] mb-[15px]">
        <TabsTrigger 
          value="project-detail"
          className="px-6 py-3 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary transition-all"
        >
          Project Detail
        </TabsTrigger>
        <TabsTrigger 
          value="parts"
          className="px-6 py-3 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary transition-all"
        >
          BOM
        </TabsTrigger>
        <TabsTrigger 
          value="mrp"
          className="px-6 py-3 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary transition-all"
        >
          MRP Calculations
        </TabsTrigger>
      </TabsList>

      <TabsContent value="project-detail">
        <ProjectDetailsForm 
          project={project} 
          isEditing={isEditing}
          onUpdate={onProjectUpdate}
        />
      </TabsContent>

      <TabsContent value="parts" className="overflow-x-auto">
        <div className="min-w-full">
          <PartsTable 
            parts={parts} 
            isEditing={isEditing} 
            maxParts={maxParts}
            onPartsUpdate={onPartsUpdate}
          />
        </div>
      </TabsContent>

      <TabsContent value="mrp">
        <MRPCalculations parts={parts} isEditing={isEditing} />
      </TabsContent>
    </Tabs>
  );
}