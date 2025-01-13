import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { mockProjects } from "@/data/mockProjects";
import { ProjectHeader } from "@/components/projects/ProjectHeader";
import { ProjectContent } from "@/components/projects/view/ProjectContent";
import { Part } from "@/components/projects/PartForm";
import { useToast } from "@/components/ui/use-toast";
import { Project } from "@/types/project";

export function ViewProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(location.state?.isEditing || false);
  
  // Get project data
  const projectIndex = mockProjects.findIndex((p) => p.id === id);
  const project = mockProjects[projectIndex];
  
  // Get stored project data
  const storedData = id ? sessionStorage.getItem(`project_${id}`) : null;
  const initialStoredData = storedData ? JSON.parse(storedData) : { parts: [] };
  const [currentProject, setCurrentProject] = useState<Project>(project);
  const [parts, setParts] = useState<Part[]>(initialStoredData.parts.length > 0 ? initialStoredData.parts : [
      {
        id: "1",
        bomLevel: "2",
        fscg: "",
        niin: "",
        name: "Anchor Chain",
        approvedPartNumbers: "",
        partIdentifier: "T-12320241217_203046",
        revision: "Rev",
        classification: "Hardware",
        description: "Terminal Block Assembly, Phantom Gray",
        requiredDescription: "Automation123",
        quantity: "10",
        supplierNote: "",
        unitOfMeasure: "PCS",
        files: []
      },
      {
        id: "2",
        bomLevel: "2",
        fscg: "",
        niin: "",
        name: "Custom Propeller",
        approvedPartNumbers: "q12444",
        partIdentifier: "T-12320241217_204140",
        revision: "rev",
        classification: "Hardware",
        description: "Automation123",
        requiredDescription: "",
        quantity: "10",
        supplierNote: "",
        unitOfMeasure: "PCS",
        files: []
      },
      {
        id: "3",
        bomLevel: "1",
        fscg: "5935",
        niin: "01-567-8901",
        name: "Propeller Blade",
        approvedPartNumbers: "CON-789",
        partIdentifier: "T-12320241217_205555",
        revision: "A",
        classification: "Electronics",
        description: "Power Connector Assembly",
        requiredDescription: "High voltage rated",
        quantity: "5",
        supplierNote: "Must meet IP67 standards",
        unitOfMeasure: "EA",
        files: []
      },
      {
        id: "4",
        bomLevel: "3",
        fscg: "5340",
        niin: "01-234-5678",
        name: "Hydraulic Cylinders",
        approvedPartNumbers: "FAS-456",
        partIdentifier: "T-12320241217_206666",
        revision: "B",
        classification: "Fasteners",
        description: "Mounting Bracket Kit",
        requiredDescription: "Stainless steel grade 316",
        quantity: "20",
        supplierNote: "Corrosion resistant coating required",
        unitOfMeasure: "SET",
        files: []
      },
      {
        id: "5",
        bomLevel: "2",
        fscg: "6150",
        niin: "01-890-1234",
        name: "Navigation Lights",
        approvedPartNumbers: "CAB-123",
        partIdentifier: "T-12320241217_207777",
        revision: "1.2",
        classification: "Electrical",
        description: "Cable Harness Assembly",
        requiredDescription: "Temperature rated -40°C to +85°C",
        quantity: "15",
        supplierNote: "UL certified required",
        unitOfMeasure: "EA",
        files: []
      },
      {
        id: "6",
        bomLevel: "1",
        fscg: "5330",
        niin: "01-345-6789",
        name: "Rudder Assembly",
        approvedPartNumbers: "SEAL-789",
        partIdentifier: "T-12320241217_208888",
        revision: "C",
        classification: "Seals",
        description: "O-Ring Kit",
        requiredDescription: "Viton material",
        quantity: "30",
        supplierNote: "FDA approved material required",
        unitOfMeasure: "KIT",
        files: []
      },
      {
        id: "7",
        bomLevel: "2",
        fscg: "5999",
        niin: "01-456-7890",
        name: "Steel Sheets",
        approvedPartNumbers: "PCB-456",
        partIdentifier: "T-12320241217_209999",
        revision: "2.0",
        classification: "Electronics",
        description: "Circuit Board Assembly",
        requiredDescription: "RoHS compliant",
        quantity: "8",
        supplierNote: "IPC-A-610 Class 3 required",
        unitOfMeasure: "EA",
        files: []
      }
  ]);

  useEffect(() => {
    if (location.state?.isEditing) {
      setIsEditing(true);
    }
  }, [location.state?.isEditing]);

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Project Not Found</h1>
        </div>
      </div>
    );
  }

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    if (isEditing) {
      setIsEditing(false);
      setParts(initialStoredData.parts.length > 0 ? initialStoredData.parts : parts);
      setCurrentProject(project);
    } else {
      navigate("/project/list");
    }
  };

  const handleUpdate = () => {
    mockProjects[projectIndex] = {
      ...currentProject,
      numBOM: parts.length
    };

    sessionStorage.setItem(`project_${id}`, JSON.stringify({
      ...currentProject,
      parts
    }));

    setIsEditing(false);
    
    toast({
      title: "Success",
      description: "Project has been updated successfully",
    });
  };

  const handleProjectUpdate = (updatedProject: Project) => {
    setCurrentProject(updatedProject);
  };

  const handlePartsUpdate = (updatedParts: Part[]) => {
    setParts(updatedParts);
  };

  return (
    <div className="mx-auto px-4 py-6 max-w-[1650px] w-full">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <ProjectHeader 
          isEditing={isEditing}
          onEdit={handleEdit}
          onCancel={handleCancel}
          onUpdate={handleUpdate}
        />
        <ProjectContent 
          project={currentProject}
          isEditing={isEditing}
          parts={parts}
          maxParts={currentProject.numBOM}
          onProjectUpdate={handleProjectUpdate}
          onPartsUpdate={handlePartsUpdate}
        />
      </div>
    </div>
  );
}