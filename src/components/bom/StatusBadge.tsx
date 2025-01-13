import { Badge } from "@/components/ui/badge";
import { BOMItem } from "@/data/mockBOM";

interface StatusBadgeProps {
  status: BOMItem["status"];
  fullWidth?: boolean;
}

export function StatusBadge({ status, fullWidth }: StatusBadgeProps) {
  const getStatusColor = (status: BOMItem["status"]) => {
    switch (status) {
      case "Active":
        return "bg-green-500 hover:bg-green-500";
      case "Draft":
        return "bg-yellow-500 hover:bg-yellow-500";
      case "Archived":
        return "bg-gray-500 hover:bg-gray-500";
      default:
        return "bg-gray-500 hover:bg-gray-500";
    }
  };

  return (
    <Badge
      className={`${getStatusColor(status)} ${
        fullWidth ? "w-full" : ""
      } text-white border-0`}
    >
      {status}
    </Badge>
  );
}