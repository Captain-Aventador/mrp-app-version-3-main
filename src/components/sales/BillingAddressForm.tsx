import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

interface BillingAddressFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (address: string, shippingAddress: string | null) => void;
}

interface AddressFields {
  firstName: string;
  lastName: string;
  company: string;
  phoneNr: string;
  streetAddress: string;
  additionalDetails: string;
  cityTown: string;
  stateRegion: string;
  zipCode: string;
  country: string;
}

export function BillingAddressForm({ isOpen, onClose, onSubmit }: BillingAddressFormProps) {
  const [formData, setFormData] = useState<AddressFields>({
    firstName: '',
    lastName: '',
    company: '',
    phoneNr: '',
    streetAddress: '',
    additionalDetails: '',
    cityTown: '',
    stateRegion: '',
    zipCode: '',
    country: ''
  });
  const [sameAsShipping, setSameAsShipping] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedAddress = `${formData.firstName} ${formData.lastName}, ${formData.company}, ${formData.phoneNr}, ${formData.streetAddress}, ${formData.additionalDetails}, ${formData.cityTown}, ${formData.stateRegion}, ${formData.zipCode}, ${formData.country}`.trim();
    
    if (sameAsShipping) {
      onSubmit(formattedAddress, formattedAddress);
    } else {
      onSubmit(formattedAddress, null);
    }
    onClose();
  };

  const handleInputChange = (field: keyof AddressFields) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Billing Address</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>First name</Label>
                <Input
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleInputChange('firstName')}
                />
              </div>
              <div className="space-y-2">
                <Label>Last name</Label>
                <Input
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleInputChange('lastName')}
                />
              </div>
              <div className="space-y-2">
                <Label>Company</Label>
                <Input
                  placeholder="Company"
                  value={formData.company}
                  onChange={handleInputChange('company')}
                />
              </div>
              <div className="space-y-2">
                <Label>Phone nr</Label>
                <Input
                  type="tel"
                  placeholder="Phone number"
                  value={formData.phoneNr}
                  onChange={handleInputChange('phoneNr')}
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Street address</Label>
                <Input
                  placeholder="Street address"
                  value={formData.streetAddress}
                  onChange={handleInputChange('streetAddress')}
                />
              </div>
              <div className="space-y-2">
                <Label>Additional details</Label>
                <Input
                  placeholder="Apartment, suite, or building number"
                  value={formData.additionalDetails}
                  onChange={handleInputChange('additionalDetails')}
                />
              </div>
              <div className="space-y-2">
                <Label>City/Town</Label>
                <Input
                  placeholder="City, town, district, suburb, or village"
                  value={formData.cityTown}
                  onChange={handleInputChange('cityTown')}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>State/Region</Label>
                  <Input
                    placeholder="State, county, province, or region"
                    value={formData.stateRegion}
                    onChange={handleInputChange('stateRegion')}
                  />
                </div>
                <div className="space-y-2">
                  <Label>ZIP/Postal code</Label>
                  <Input
                    placeholder="ZIP or postal code"
                    value={formData.zipCode}
                    onChange={handleInputChange('zipCode')}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Country</Label>
            <Input
              placeholder="Country"
              value={formData.country}
              onChange={handleInputChange('country')}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="shipping"
              checked={sameAsShipping}
              onCheckedChange={(checked) => setSameAsShipping(checked as boolean)}
            />
            <label
              htmlFor="shipping"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Will your Billing and Shipping address same?
            </label>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Ok</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}