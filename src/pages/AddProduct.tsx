import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ProductForm } from "@/components/products/ProductForm";

export function AddProduct() {
  const navigate = useNavigate();

  return (
    <div className="py-6 max-w-[100vw] space-y-6 bg-white border border-gray-200 rounded-lg" style={{ margin: '30px', paddingLeft: '2rem', paddingRight: '2rem' }}>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Add Product</h1>
        <div className="space-x-2">
          <Button variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
          <Button type="submit">Save</Button>
        </div>
      </div>
      <ProductForm />
    </div>
  );
}