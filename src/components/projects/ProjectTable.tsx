import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Plus, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { Project } from "@/types/project";

interface ProjectTableProps {
  projects: Project[];
}

const getStatusColor = (status: Project["status"]) => {
  switch (status) {
    case "Active":
      return "bg-green-500 hover:bg-green-600";
    case "On Hold":
      return "bg-yellow-500 hover:bg-yellow-600";
    case "Completed":
      return "bg-blue-500 hover:bg-blue-600";
    case "Delayed":
      return "bg-red-500 hover:bg-red-600";
    default:
      return "bg-gray-500 hover:bg-gray-600";
  }
};

export function ProjectTable({ projects }: ProjectTableProps) {
  const navigate = useNavigate();

  const handleAddPart = (project: Project) => {
    navigate(`/project/view/${project.id}`, {
      state: {
        projectId: project.id,
        defaultTab: 'parts',
        isEditing: true
      }
    });
  };

  const handleViewDetails = (project: Project) => {
    navigate(`/project/view/${project.id}`, {
      state: {
        projectId: project.id
      }
    });
  };

  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-[#F6F6F7]">
            <TableHead className="bg-[#F6F6F7] border w-[50px] py-0">
              <Checkbox />
            </TableHead>
            <TableHead className="bg-[#F6F6F7] border py-0">Project ID</TableHead>
            <TableHead className="bg-[#F6F6F7] border py-0">Program</TableHead>
            <TableHead className="bg-[#F6F6F7] border py-0">Project Title</TableHead>
            <TableHead className="bg-[#F6F6F7] border py-0">Due Date</TableHead>
            <TableHead className="bg-[#F6F6F7] border py-0">Follow Up Date</TableHead>
            <TableHead className="bg-[#F6F6F7] border py-0">BOM</TableHead>
            <TableHead className="bg-[#F6F6F7] border py-0">Status</TableHead>
            <TableHead className="bg-[#F6F6F7] border py-0">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell className="border w-[50px] bg-[#F6F6F7] py-0">
                <Checkbox />
              </TableCell>
              <TableCell className="border py-0">{project.id}</TableCell>
              <TableCell className="border py-0">{project.name || '-'}</TableCell>
              <TableCell className="border py-0">{project.projectTitle}</TableCell>
              <TableCell className="border py-0">{project.dueDate}</TableCell>
              <TableCell className="border py-0">{project.followUpDate}</TableCell>
              <TableCell className="border py-0">
                {project.numBOM === 0 ? (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleAddPart(project)}
                    className="flex items-center gap-1 text-[#3b81f6] hover:bg-transparent"
                  >
                    <Plus className="h-4 w-4" />
                    Add Part
                  </Button>
                ) : (
                  project.numBOM
                )}
              </TableCell>
              <TableCell className="border p-0">
                <Badge className={`rounded-none ${getStatusColor(project.status)} w-full h-full`}>
                  {project.status}
                </Badge>
              </TableCell>
              <TableCell className="border py-0">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleViewDetails(project)}>
                      View Details
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}