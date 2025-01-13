import { Button } from "@/components/ui/button";
import { CustomerFormHeader } from "./CustomerFormHeader";
import { CustomerFormFields } from "./CustomerFormFields";

interface CustomerFormProps {
  formData: {
    firstName: string;
    lastName: string;
    companyName: string;
    displayName: string;
    email: string;
    phone: string;
    billingAddress: string;
    shippingAddress: string;
    discount: string;
    referenceId: string;
    category: string;
    comment: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sameAsBilling: boolean;
  setSameAsBilling: (value: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
  isEditing?: boolean;
  readOnly?: boolean;
}

export function CustomerForm({
  formData,
  handleInputChange,
  sameAsBilling,
  setSameAsBilling,
  onSubmit,
  isEditing = false,
  readOnly = false
}: CustomerFormProps) {
  return (
    <div className="w-full min-h-screen bg-[#F8F8F8] p-6">
      <div className="bg-white rounded-lg shadow-sm">
        <CustomerFormHeader isEditing={isEditing} />
        <form onSubmit={onSubmit} className="p-6">
          <CustomerFormFields
            formData={formData}
            handleInputChange={handleInputChange}
            sameAsBilling={sameAsBilling}
            setSameAsBilling={setSameAsBilling}
            readOnly={readOnly}
          />
          
          {!readOnly && (
            <div className="flex justify-end pt-4">
              <Button type="submit" className="w-full md:w-auto">
                {isEditing ? 'Update Customer' : 'Save Customer'}
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}