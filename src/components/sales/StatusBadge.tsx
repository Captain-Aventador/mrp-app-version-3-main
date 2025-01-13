import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  fullWidth?: boolean;
  className?: string;
}

export function StatusBadge({ status, fullWidth = false, className }: StatusBadgeProps) {
  const getStatusColor = (status: string) => {
    const baseColors = {
      // Purchase Requisition status colors
      'pending': 'bg-yellow-500',
      'approved': 'bg-green-500',
      'reject': 'bg-red-500',
      
      // Order status colors - only these are used in sales orders page
      'po received': 'bg-blue-500',
      'in scm': 'bg-green-500',
      'delayed': 'bg-red-500',
      
      // Inventory status colors
      'in stock': 'bg-blue-500',
      'out of stock': 'bg-blue-700',
      'reserved': 'bg-blue-400',
      'partially': 'bg-blue-300',
      
      // Production status colors
      'not started': 'bg-blue-200',
      'not required': 'bg-blue-300',
      'work in progress': 'bg-blue-500',
      'in progress': 'bg-blue-500',
      'blocked': 'bg-blue-700',
      'completed': 'bg-blue-600',
      
      // Delivery status colors
      'not shipped': 'bg-blue-200',
      'shipped': 'bg-blue-600',
      'ready for shipping': 'bg-blue-300',
      
      // BOM status colors
      'active': 'bg-blue-500',
      'draft': 'bg-blue-300',
      'archived': 'bg-blue-200',
      
      // Project status colors
      'Active': 'bg-blue-500',
      'On Hold': 'bg-blue-400',
      'Completed': 'bg-blue-600',
      'Delayed': 'bg-blue-700',
      
      // Default fallback
      'default': 'bg-blue-200'
    };

    return baseColors[status.toLowerCase()] || baseColors.default;
  };

  return (
    <div className={cn(
      "flex items-center justify-center h-full",
      fullWidth ? "w-full" : ""
    )}>
      <span className={cn(
        "text-xs font-medium text-white w-full text-center",
        getStatusColor(status),
        className
      )}>
        {status}
      </span>
    </div>
  );
}