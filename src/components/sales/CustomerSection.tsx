import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CustomerSearch } from "./CustomerSearch";
import { useState, useEffect } from "react";
import { mockCustomers } from "@/data/mockCustomers";
import { mockPrograms } from "@/data/mockPrograms";
import { mockProjects } from "@/data/mockProjects";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CustomerSectionProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onCustomerSelect: (customerName: string) => void;
  onBillingAddressChange?: (address: string) => void;
  onShippingAddressChange?: (address: string) => void;
  orderId: string;
  onOrderIdChange: (value: string) => void;
  readOnly?: boolean;
  orderIdLabel?: string;
}

export function CustomerSection({ 
  searchValue, 
  onSearchChange, 
  onCustomerSelect,
  onBillingAddressChange,
  onShippingAddressChange,
  orderId,
  onOrderIdChange,
  readOnly = false,
  orderIdLabel = "Sales Order #"
}: CustomerSectionProps) {
  const [createdDate, setCreatedDate] = useState("");
  const [deliveryDeadline, setDeliveryDeadline] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [availableProjects, setAvailableProjects] = useState(mockProjects);

  const handleCustomerSelect = (customerName: string) => {
    if (readOnly) return;
    
    const today = new Date();
    const oneMonthFromNow = new Date(today);
    oneMonthFromNow.setMonth(today.getMonth() + 1);

    const formatDate = (date: Date) => {
      return date.toISOString().split('T')[0];
    };

    const selectedCustomer = mockCustomers.find(customer => customer.name === customerName);
    if (selectedCustomer) {
      const billTo = selectedCustomer.billingAddress || '';
      const shipTo = selectedCustomer.shippingAddress || '';
      
      setBillingAddress(billTo);
      setShippingAddress(shipTo);
      
      onBillingAddressChange?.(billTo);
      onShippingAddressChange?.(shipTo);
    }

    setCreatedDate(formatDate(today));
    setDeliveryDeadline(formatDate(oneMonthFromNow));
    onCustomerSelect(customerName);
  };

  const handleProgramChange = (value: string) => {
    setSelectedProgram(value);
    const filteredProjects = mockProjects.filter(project => project.name === value);
    setAvailableProjects(filteredProjects);
    setSelectedProject("");
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <Label>Program</Label>
          <Select value={selectedProgram} onValueChange={handleProgramChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select a program" />
            </SelectTrigger>
            <SelectContent>
              {mockPrograms.map((program) => (
                <SelectItem key={program.id} value={program.name}>
                  {program.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Project</Label>
          <Select 
            value={selectedProject} 
            onValueChange={setSelectedProject}
            disabled={!selectedProgram}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a project" />
            </SelectTrigger>
            <SelectContent>
              {availableProjects.map((project) => (
                <SelectItem key={project.id} value={project.projectTitle}>
                  {project.projectTitle}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="orderId">{orderIdLabel}</Label>
          <Input
            id="orderId"
            value={orderId}
            onChange={(e) => onOrderIdChange(e.target.value)}
            placeholder="Enter requisition ID"
            className="mt-1"
            readOnly={readOnly}
          />
        </div>
        <div>
          <Label>Delivery deadline</Label>
          <Input 
            type="date" 
            value={deliveryDeadline}
            onChange={(e) => setDeliveryDeadline(e.target.value)}
            readOnly={readOnly}
          />
        </div>
        <div>
          <Label>Created date</Label>
          <Input 
            type="date" 
            value={createdDate}
            onChange={(e) => setCreatedDate(e.target.value)}
            readOnly={readOnly}
          />
        </div>
      </div>
    </div>
  );
}