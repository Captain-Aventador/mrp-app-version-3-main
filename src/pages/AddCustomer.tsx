import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { mockCustomers } from "@/data/mockCustomers";
import { CustomerForm } from "@/components/customers/CustomerForm";

export function AddCustomer() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { id } = useParams();
  const isEditing = !!id;
  
  const existingCustomer = isEditing 
    ? mockCustomers.find(c => c.id === id) 
    : null;

  const [formData, setFormData] = useState({
    firstName: existingCustomer?.firstName || "",
    lastName: existingCustomer?.lastName || "",
    companyName: existingCustomer?.companyName || "",
    displayName: existingCustomer?.displayName || "",
    email: existingCustomer?.email || "",
    phone: existingCustomer?.phone || "",
    billingAddress: existingCustomer?.billingAddress || "",
    shippingAddress: existingCustomer?.shippingAddress || "",
    discount: existingCustomer?.discount?.toString() || "",
    referenceId: existingCustomer?.referenceId || "",
    category: existingCustomer?.category || "",
    comment: existingCustomer?.comment || ""
  });

  const [sameAsBilling, setSameAsBilling] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const validateForm = () => {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'billingAddress'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Validation Error",
        description: `Please fill in all required fields: ${missingFields.join(', ')}`,
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const newCustomer = {
      id: isEditing ? id : String(mockCustomers.length + 1),
      name: `${formData.firstName} ${formData.lastName}`,
      ...formData,
      discount: parseFloat(formData.discount) || 0
    };

    if (isEditing) {
      const customerIndex = mockCustomers.findIndex(c => c.id === id);
      if (customerIndex !== -1) {
        mockCustomers[customerIndex] = newCustomer;
      }
    } else {
      mockCustomers.push(newCustomer);
    }

    toast({
      title: "Success",
      description: isEditing ? "Customer updated successfully" : "Customer added successfully",
    });
    navigate("/sales/customers");
  };

  return (
    <CustomerForm
      formData={formData}
      handleInputChange={handleInputChange}
      sameAsBilling={sameAsBilling}
      setSameAsBilling={setSameAsBilling}
      onSubmit={handleSubmit}
      isEditing={isEditing}
    />
  );
}