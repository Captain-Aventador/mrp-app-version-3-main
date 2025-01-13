import { ProjectTable } from "@/components/projects/ProjectTable";
import { ProjectToolbar } from "@/components/projects/ProjectToolbar";
import { mockProjects } from "@/data/mockProjects";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ProjectList() {
  const navigate = useNavigate();

  const handleDownload = () => {
    console.log("Download clicked");
  };

  const handlePrint = () => {
    console.log("Print clicked");
  };

  const handleDelete = () => {
    console.log("Delete clicked");
  };

  const handleAddProject = () => {
    navigate("/project/add");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Projects</h1>
        <Button onClick={handleAddProject} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Project
        </Button>
      </div>
      <ProjectToolbar 
        totalProjects={mockProjects.length}
        onDownload={handleDownload}
        onPrint={handlePrint}
        onDelete={handleDelete}
        showCreateSales={false}
        label="Projects"
      />
      <ProjectTable projects={mockProjects} />
    </div>
  );
}