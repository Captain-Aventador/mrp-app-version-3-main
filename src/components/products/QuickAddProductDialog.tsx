import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";

interface QuickAddProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const unitOptions = [
  "EA",
  "cm",
  "g",
  "kg",
  "l",
  "m",
  "ml",
  "mm",
  "pcs"
];

const categoryOptions = [
  "Finished Goods",
  "Raw Material",
  "Semi-Finished Goods",
  "Packaging Material"
];

export function QuickAddProductDialog({ open, onOpenChange }: QuickAddProductDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    unitOfMeasure: "",
    variantCode: "",
    salesPrice: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.category || !formData.variantCode || !formData.salesPrice) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Create new stock item
    const newStockItem = {
      name: formData.name,
      category: formData.category,
      sku: formData.variantCode,
      stockLevel: "0 units",
      reservedStock: "0 units",
      availableStock: "0 units",
      status: "Not Available",
      action: "Procure"
    };

    // Get existing stock items from localStorage or initialize empty array
    const existingItems = JSON.parse(localStorage.getItem('stockItems') || '[]');
    
    // Add new item
    const updatedItems = [...existingItems, newStockItem];
    
    // Save to localStorage
    localStorage.setItem('stockItems', JSON.stringify(updatedItems));

    // Show success message
    toast.success("Product added successfully");
    
    // Reset form and close dialog
    setFormData({
      name: "",
      category: "",
      unitOfMeasure: "",
      variantCode: "",
      salesPrice: "",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter product name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="unitOfMeasure">Unit of measure</Label>
            <Select
              value={formData.unitOfMeasure}
              onValueChange={(value) => setFormData({ ...formData, unitOfMeasure: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select unit of measure" />
              </SelectTrigger>
              <SelectContent>
                {unitOptions.map((unit) => (
                  <SelectItem key={unit} value={unit}>
                    {unit}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="variantCode">SKU Code</Label>
            <Input
              id="variantCode"
              value={formData.variantCode}
              onChange={(e) => setFormData({ ...formData, variantCode: e.target.value })}
              placeholder="E.g. P-1, M-1"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="salesPrice">Default sales price</Label>
            <Input
              id="salesPrice"
              type="number"
              value={formData.salesPrice}
              onChange={(e) => setFormData({ ...formData, salesPrice: e.target.value })}
              placeholder="Type sales price"
            />
          </div>

          <div className="text-sm text-muted-foreground">
            More parameters available on full product card
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Done</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}