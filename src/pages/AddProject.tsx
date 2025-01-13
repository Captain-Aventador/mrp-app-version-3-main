import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { mockProjects } from "@/data/mockProjects";
import { mockPrograms } from "@/data/mockPrograms";
import { useToast } from "@/hooks/use-toast";
import { ProjectDetailsSection } from "@/components/projects/add-project/ProjectDetailsSection";
import { PartsSection } from "@/components/projects/add-project/PartsSection";
import { Part } from "@/components/projects/PartForm";
import { MRPCalculations } from "@/components/projects/MRPCalculations";

interface ProjectDetails {
  name: string;
  salesOrder: string;
  dueDate: string;
  followUpDate: string;
  description: string;
  projectTitle: string;
}

export function AddProject() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [parts, setParts] = useState<Part[]>([]);
  const [activeTab, setActiveTab] = useState("project-detail");
  
  const initialProjectDetails = location.state?.projectDetails || {
    name: '',
    salesOrder: '',
    dueDate: '',
    followUpDate: '',
    description: '',
    projectTitle: ''
  };
  
  const [projectDetails, setProjectDetails] = useState<ProjectDetails>(initialProjectDetails);

  const handleCancel = () => {
    navigate("/project/list");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProjectDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProgramSelect = (value: string) => {
    setProjectDetails(prev => ({
      ...prev,
      name: value
    }));
  };

  const validateProjectDetails = () => {
    if (!projectDetails.salesOrder) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Project ID is required"
      });
      return false;
    }

    if (!projectDetails.dueDate) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Project due date is required"
      });
      return false;
    }

    if (!projectDetails.followUpDate) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Project follow up date is required"
      });
      return false;
    }

    if (!projectDetails.projectTitle) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Project title is required"
      });
      return false;
    }

    return true;
  };

  const isProjectDetailsValid = () => {
    return projectDetails.salesOrder !== '' && 
           projectDetails.dueDate !== '' && 
           projectDetails.followUpDate !== '' &&
           projectDetails.projectTitle !== '';
  };

  const handleSave = () => {
    if (!validateProjectDetails()) {
      return;
    }

    const newProject = {
      id: projectDetails.salesOrder,
      name: projectDetails.name || '-',
      projectTitle: projectDetails.projectTitle,
      dueDate: projectDetails.dueDate,
      followUpDate: projectDetails.followUpDate,
      numBOM: parts.length,
      status: "Active" as const
    };

    const selectedProgram = mockPrograms.find(program => program.name === projectDetails.name);
    if (selectedProgram) {
      selectedProgram.projects += 1;
    }

    const projectData = {
      ...projectDetails,
      parts: parts
    };
    
    sessionStorage.setItem(`project_${newProject.id}`, JSON.stringify(projectData));
    mockProjects.push(newProject);
    
    toast({
      title: "Success",
      description: "Project has been created successfully"
    });
    
    navigate("/project/list");
  };

  const handleTabChange = (value: string) => {
    if (value === "parts" && !isProjectDetailsValid()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all required Project Details first"
      });
      return;
    }
    setActiveTab(value);
  };

  return (
    <div className="py-6 max-w-[100vw] space-y-6 bg-white border border-gray-200 rounded-lg" style={{ margin: '30px', paddingLeft: '2rem', paddingRight: '2rem' }}>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Add Project</h1>
        <div className="space-x-2">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            disabled={!isProjectDetailsValid()}
          >
            Add
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
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
            disabled={!isProjectDetailsValid()}
          >
            BOM
          </TabsTrigger>
          <TabsTrigger 
            value="mrp"
            className="px-6 py-3 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary transition-all"
            disabled={!isProjectDetailsValid()}
          >
            MRP Calculations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="project-detail">
          <ProjectDetailsSection 
            projectDetails={projectDetails}
            handleInputChange={handleInputChange}
            onProgramSelect={handleProgramSelect}
          />
        </TabsContent>

        <TabsContent value="parts" className="overflow-x-auto">
          <div className="min-w-full">
            <PartsSection 
              parts={parts} 
              setParts={setParts} 
              projectDetails={projectDetails}
              validateProjectDetails={validateProjectDetails}
            />
          </div>
        </TabsContent>

        <TabsContent value="mrp">
          <MRPCalculations parts={parts} />
        </TabsContent>
      </Tabs>
    </div>
  );
}