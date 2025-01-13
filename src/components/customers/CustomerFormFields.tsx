import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface CustomerFormFieldsProps {
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
  readOnly?: boolean;
}

export function CustomerFormFields({
  formData,
  handleInputChange,
  sameAsBilling,
  setSameAsBilling,
  readOnly = false
}: CustomerFormFieldsProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="firstName">First name *</Label>
          <Input 
            id="firstName" 
            className="mt-1" 
            value={formData.firstName}
            onChange={handleInputChange}
            readOnly={readOnly}
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last name *</Label>
          <Input 
            id="lastName" 
            className="mt-1" 
            value={formData.lastName}
            onChange={handleInputChange}
            readOnly={readOnly}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="companyName">Company name</Label>
          <Input 
            id="companyName" 
            className="mt-1" 
            value={formData.companyName}
            onChange={handleInputChange}
            readOnly={readOnly}
          />
        </div>
        <div>
          <Label htmlFor="displayName">Display name</Label>
          <Input 
            id="displayName" 
            className="mt-1 border-b-2 border-primary" 
            value={formData.displayName}
            onChange={handleInputChange}
            readOnly={readOnly}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input 
            id="email" 
            type="email" 
            className="mt-1" 
            value={formData.email}
            onChange={handleInputChange}
            readOnly={readOnly}
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone *</Label>
          <Input 
            id="phone" 
            type="tel" 
            className="mt-1" 
            value={formData.phone}
            onChange={handleInputChange}
            readOnly={readOnly}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="billingAddress">Billing address *</Label>
          <Input 
            id="billingAddress" 
            placeholder="Enter address..." 
            className="mt-1" 
            value={formData.billingAddress}
            onChange={handleInputChange}
            readOnly={readOnly}
          />
        </div>
        <div>
          <Label htmlFor="shippingAddress">Default shipping address</Label>
          <div className="space-y-2">
            <Input 
              id="shippingAddress" 
              placeholder="Enter address..." 
              className="mt-1"
              disabled={sameAsBilling}
              value={sameAsBilling ? formData.billingAddress : formData.shippingAddress}
              onChange={handleInputChange}
              readOnly={readOnly}
            />
            {!readOnly && (
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="sameAsBilling" 
                  checked={sameAsBilling}
                  onCheckedChange={(checked) => setSameAsBilling(checked as boolean)}
                />
                <label 
                  htmlFor="sameAsBilling" 
                  className="text-sm text-gray-600 italic"
                >
                  Same as billing address
                </label>
              </div>
            )}
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="discount">Discount</Label>
        <div className="relative">
          <Input 
            id="discount" 
            className="mt-1 pr-8" 
            value={formData.discount}
            onChange={handleInputChange}
            readOnly={readOnly}
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            %
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="referenceId">Reference ID</Label>
          <Input 
            id="referenceId" 
            className="mt-1" 
            value={formData.referenceId}
            onChange={handleInputChange}
            readOnly={readOnly}
          />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Input 
            id="category" 
            className="mt-1" 
            value={formData.category}
            onChange={handleInputChange}
            readOnly={readOnly}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="comment">Comment</Label>
        <Input 
          id="comment" 
          className="mt-1" 
          value={formData.comment}
          onChange={handleInputChange}
          readOnly={readOnly}
        />
      </div>
    </div>
  );
}