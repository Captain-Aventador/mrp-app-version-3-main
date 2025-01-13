import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { mockCustomers } from "@/data/mockCustomers";
import { CustomerForm } from "@/components/customers/CustomerForm";

export function ViewCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const customer = mockCustomers.find(c => c.id === id);

  useEffect(() => {
    if (!customer) {
      navigate("/sales/customers");
    }
  }, [customer, navigate]);

  if (!customer) {
    return null;
  }

  const formData = {
    firstName: customer.firstName,
    lastName: customer.lastName,
    companyName: customer.companyName || "",
    displayName: customer.displayName || "",
    email: customer.email,
    phone: customer.phone || "",
    billingAddress: customer.billingAddress || "",
    shippingAddress: customer.shippingAddress || "",
    discount: customer.discount?.toString() || "0",
    referenceId: customer.referenceId || "",
    category: customer.category || "",
    comment: customer.comment || ""
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/sales/customers/${id}/edit`);
  };

  return (
    <div className="relative">
      <CustomerForm
        formData={formData}
        handleInputChange={() => {}}
        sameAsBilling={false}
        setSameAsBilling={() => {}}
        onSubmit={handleSubmit}
        isEditing={true}
        readOnly={true}
      />
      <div className="absolute bottom-8 right-8">
        <Button onClick={() => navigate(`/sales/customers/${id}/edit`)}>
          Edit Customer
        </Button>
      </div>
    </div>
  );
}