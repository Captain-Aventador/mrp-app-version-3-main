import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const inventoryData = [
  {
    item: "Anchor Chain",
    currentLevel: 50,
    suggestedLevel: 70,
    costImpact: "+8% (holding cost)",
    reason: "High demand trend in Q1"
  },
  {
    item: "Custom Propeller",
    currentLevel: 140,
    suggestedLevel: 160,
    costImpact: "+5% (order cost)",
    reason: "Supplier lead time increased"
  },
  {
    item: "Propeller Blade",
    currentLevel: 100,
    suggestedLevel: 120,
    costImpact: "+6% (holding cost)",
    reason: "Historical peak usage expected"
  },
  {
    item: "Hydraulic Cylinders",
    currentLevel: 0,
    suggestedLevel: 50,
    costImpact: "+15% (order cost)",
    reason: "Stock out risk mitigation"
  },
  {
    item: "Navigation Lights",
    currentLevel: 151,
    suggestedLevel: 170,
    costImpact: "+4% (holding cost)",
    reason: "Seasonal demand increase"
  }
];

export function InventoryOptimization() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Inventory Optimization (AI Suggested)</h1>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Current Level</TableHead>
              <TableHead>Suggested Level (AI)</TableHead>
              <TableHead>Expected Cost Impact</TableHead>
              <TableHead>Reason for Suggestion (AI)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventoryData.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.item}</TableCell>
                <TableCell>{item.currentLevel}</TableCell>
                <TableCell>{item.suggestedLevel}</TableCell>
                <TableCell>{item.costImpact}</TableCell>
                <TableCell>{item.reason}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}