export interface Project {
  id: string;
  name: string;
  projectTitle: string;
  dueDate: string;
  followUpDate: string;
  numBOM: number;
  status: "Active" | "On Hold" | "Completed" | "Delayed";
}