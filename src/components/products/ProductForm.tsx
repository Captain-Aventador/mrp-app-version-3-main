import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductBasicInfo } from "./ProductBasicInfo";
import { ProductUsability } from "./ProductUsability";
import { ProductPricing } from "./ProductPricing";
import { ProductAdditionalInfo } from "./ProductAdditionalInfo";
import { ProductSupplyDetails } from "./ProductSupplyDetails";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export function ProductForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    unitOfMeasure: "pcs",
    defaultSalesPrice: "",
    ingredientsCost: "",
    operationsCost: "",
    inStock: "",
    additionalInfo: "",
    sell: true,
    buy: true,
    make: true,
    trackSerial: true,
    defaultSupplier: "",
    differentUnit: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="w-full border-b justify-start rounded-none h-auto p-0 bg-transparent">
          <TabsTrigger 
            value="general"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent px-4 py-2"
          >
            General info
          </TabsTrigger>
          {formData.buy && (
            <TabsTrigger 
              value="supply"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent px-4 py-2"
              disabled={!formData.name}
            >
              Supply details
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="general" className="mt-6">
          <div className="grid gap-6">
            <ProductBasicInfo formData={formData} setFormData={setFormData} />
            <ProductUsability formData={formData} setFormData={setFormData} />
            <ProductPricing formData={formData} setFormData={setFormData} />
            <ProductAdditionalInfo formData={formData} setFormData={setFormData} />
          </div>
        </TabsContent>

        {formData.buy && (
          <TabsContent value="supply">
            <ProductSupplyDetails formData={formData} setFormData={setFormData} />
          </TabsContent>
        )}
      </Tabs>
    </form>
  );
}