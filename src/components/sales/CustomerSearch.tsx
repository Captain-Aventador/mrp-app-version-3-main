import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { mockCustomers } from "@/data/mockCustomers";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface CustomerSearchProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onCustomerSelect: (customerName: string) => void;
  billingAddress?: string;
  shippingAddress?: string;
}

export function CustomerSearch({ 
  searchValue, 
  onSearchChange, 
  onCustomerSelect,
  billingAddress = "",
  shippingAddress = ""
}: CustomerSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const filteredCustomers = mockCustomers.filter(customer =>
    customer.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleCreateCustomer = () => {
    // Add the new customer to mockCustomers with addresses
    const newCustomer = {
      id: (mockCustomers.length + 1).toString(),
      name: searchValue,
      firstName: searchValue.split(' ')[0] || '',
      lastName: searchValue.split(' ')[1] || '',
      displayName: searchValue,
      email: "",
      phone: "",
      comment: "",
      companyName: searchValue,
      billingAddress: billingAddress,
      shippingAddress: shippingAddress
    };
    
    mockCustomers.push(newCustomer);
    
    // Show success toast
    toast({
      title: "Success",
      description: `Customer "${searchValue}" has been created`,
    });
    
    // Select the newly created customer
    onCustomerSelect(newCustomer.name);
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
    if (e.target.value.length > 0) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleClearSearch = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSearchChange("");
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleCustomerSelect = (customerName: string) => {
    onCustomerSelect(customerName);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Label>Customer</Label>
      <div className="relative">
        <Input
          ref={inputRef}
          placeholder="Search or create customer"
          value={searchValue}
          onChange={handleInputChange}
          className="pr-8"
        />
        {searchValue && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
            onClick={handleClearSearch}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg">
          <div className="max-h-[200px] overflow-y-auto">
            {filteredCustomers.map((customer) => (
              <div
                key={customer.id}
                className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                onClick={() => handleCustomerSelect(customer.name)}
              >
                <div className="font-medium">{customer.name}</div>
                <div className="text-gray-500">{customer.email}</div>
              </div>
            ))}
            {searchValue && filteredCustomers.length === 0 && (
              <div className="p-2 border-t">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sm font-normal"
                  onClick={handleCreateCustomer}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create "{searchValue}"
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}