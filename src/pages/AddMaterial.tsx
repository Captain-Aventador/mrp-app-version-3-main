import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MaterialGeneralInfo } from "@/components/materials/MaterialGeneralInfo";
import { MaterialSupplyDetails } from "@/components/materials/MaterialSupplyDetails";
import { useState } from "react";

export function AddMaterial() {
  const navigate = useNavigate();
  const [materialName, setMaterialName] = useState("");

  return (
    <div className="py-6 max-w-[100vw] space-y-6 bg-white border border-gray-200 rounded-lg" style={{ margin: '30px', paddingLeft: '2rem', paddingRight: '2rem' }}>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Add Material</h1>
        <div className="space-x-2">
          <Button variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
          <Button type="submit">Save</Button>
        </div>
      </div>

      <Tabs defaultValue="general-info" className="w-full">
        <TabsList className="w-full border-b justify-start rounded-none h-auto p-0 bg-transparent">
          <TabsTrigger 
            value="general-info" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-2"
          >
            General info
          </TabsTrigger>
          <TabsTrigger 
            value="supply-details"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-2"
            disabled={!materialName.trim()}
          >
            Supply details
          </TabsTrigger>
        </TabsList>
        <TabsContent value="general-info">
          <MaterialGeneralInfo onNameChange={setMaterialName} />
        </TabsContent>
        <TabsContent value="supply-details">
          <MaterialSupplyDetails materialName={materialName} />
        </TabsContent>
      </Tabs>
    </div>
  );
}