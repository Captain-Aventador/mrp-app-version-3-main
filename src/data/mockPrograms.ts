export interface Program {
  id: string;
  name: string;
  projects: number;
  assignedTo: string;
  creationDate: string;
  lastUpdated: string;
}

export const mockPrograms: Program[] = [
  {
    id: "1",
    name: "Independence-Variant Littoral Combat Ships (LCS)",
    projects: 5,
    assignedTo: "John Smith",
    creationDate: "2024-01-15",
    lastUpdated: "2024-03-10"
  },
  {
    id: "2",
    name: "Evolved Cape Class Patrol Boat",
    projects: 3,
    assignedTo: "Sarah Johnson",
    creationDate: "2024-02-01",
    lastUpdated: "2024-03-12"
  },
  {
    id: "3",
    name: "High Speed Support Vessel (HSSV)",
    projects: 4,
    assignedTo: "Michael Brown",
    creationDate: "2024-02-15",
    lastUpdated: "2024-03-08"
  },
  {
    id: "4",
    name: "Expeditionary Fast Transport (T-EPF)",
    projects: 6,
    assignedTo: "Emma Wilson",
    creationDate: "2024-02-20",
    lastUpdated: "2024-03-15"
  },
  {
    id: "5",
    name: "Guardian Class Patrol Boat (Austal Patrol 40)",
    projects: 4,
    assignedTo: "David Lee",
    creationDate: "2024-01-25",
    lastUpdated: "2024-03-05"
  },
  {
    id: "6",
    name: "Cape Class Patrol Boat (Prime Patrol 58)",
    projects: 5,
    assignedTo: "Lisa Chen",
    creationDate: "2024-02-10",
    lastUpdated: "2024-03-18"
  },
  {
    id: "7",
    name: "Armed Forces of Malta 21.2m",
    projects: 3,
    assignedTo: "James Wilson",
    creationDate: "2024-01-30",
    lastUpdated: "2024-03-14"
  },
  {
    id: "8",
    name: "Queensland Police Service 24m",
    projects: 4,
    assignedTo: "Anna Martinez",
    creationDate: "2024-02-05",
    lastUpdated: "2024-03-16"
  }
];