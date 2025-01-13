import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { mockPrograms } from "@/data/mockPrograms";
import { MoreHorizontal, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Program } from "@/data/mockPrograms";
import { useNavigate } from "react-router-dom";

const ProgramsList = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [programName, setProgramName] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [programs, setPrograms] = useState<Program[]>(mockPrograms);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleEdit = (id: string) => {
    console.log("Edit program:", id);
  };

  const handleDelete = (id: string) => {
    setPrograms(programs.filter(program => program.id !== id));
    toast({
      title: "Success",
      description: "Program deleted successfully",
    });
  };

  const handleAddProject = (programId: string) => {
    const program = programs.find(p => p.id === programId);
    navigate(`/project/add`, { 
      state: { 
        projectDetails: {
          name: program?.name || '',
          salesOrder: '',
          dueDate: '',
          followUpDate: '',
          description: '',
          projectTitle: ''
        }
      }
    });
  };

  const handleAddProgram = () => {
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!programName.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Program name is required",
      });
      return;
    }

    const newProgram: Program = {
      id: (programs.length + 1).toString(),
      name: programName,
      projects: 0,
      assignedTo: assignedTo || "Unassigned",
      creationDate: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    };

    // Update both the local state and the mockPrograms array
    const updatedPrograms = [...programs, newProgram];
    setPrograms(updatedPrograms);
    mockPrograms.push(newProgram); // Update the mockPrograms array directly

    setIsDialogOpen(false);
    setProgramName("");
    setAssignedTo("");

    toast({
      title: "Success",
      description: "Program added successfully",
    });
  };

  const handleReset = () => {
    setProgramName("");
    setAssignedTo("");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Programs List</h1>
        <Button onClick={handleAddProgram} className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Program
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Program</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="programName" className="text-right">
                <span className="text-red-500 mr-1">*</span>
                Program Name
              </Label>
              <Input
                id="programName"
                value={programName}
                onChange={(e) => setProgramName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="assignedTo">Assigned To</Label>
              <Select value={assignedTo} onValueChange={setAssignedTo}>
                <SelectTrigger>
                  <SelectValue placeholder="-- Select --" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="john">John Doe</SelectItem>
                  <SelectItem value="jane">Jane Smith</SelectItem>
                  <SelectItem value="bob">Bob Johnson</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-center gap-4 pt-4">
              <Button type="submit" className="flex items-center gap-2">
                <Plus className="h-4 w-4" /> Add
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                className="flex items-center gap-2"
              >
                Reset
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="w-[50px]">
                <Checkbox />
              </TableHead>
              <TableHead>Program Name</TableHead>
              <TableHead>Projects</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Creation Date</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="w-[70px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {programs.map((program) => (
              <TableRow key={program.id}>
                <TableCell className="bg-gray-100">
                  <Checkbox />
                </TableCell>
                <TableCell className="font-medium">{program.name}</TableCell>
                <TableCell>{program.projects}</TableCell>
                <TableCell>{program.assignedTo}</TableCell>
                <TableCell>
                  {format(new Date(program.creationDate), "MMM dd, yyyy")}
                </TableCell>
                <TableCell>
                  {format(new Date(program.lastUpdated), "MMM dd, yyyy")}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleAddProject(program.id)}>
                        Add Project
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEdit(program.id)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(program.id)}>
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProgramsList;
