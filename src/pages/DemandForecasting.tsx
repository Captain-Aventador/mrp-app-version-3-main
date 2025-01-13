import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ForecastItem {
  item: string;
  predictedDemand: number;
  confidenceLevel: string;
  trendJustification: string;
  suggestedAction: string;
}

const forecastData: ForecastItem[] = [
  {
    item: "Steel Plate",
    predictedDemand: 150,
    confidenceLevel: "85%",
    trendJustification: "Based on a 20% increase in Project X demands last Q2.",
    suggestedAction: "Stock Up"
  },
  {
    item: "Welding Rod",
    predictedDemand: 70,
    confidenceLevel: "90%",
    trendJustification: "Increased construction activity in Q1.",
    suggestedAction: "Stock Up"
  },
  {
    item: "Paint",
    predictedDemand: 120,
    confidenceLevel: "80%",
    trendJustification: "Historical seasonal spike in Q1.",
    suggestedAction: "Stock Up"
  },
  {
    item: "Bolts",
    predictedDemand: 300,
    confidenceLevel: "75%",
    trendJustification: "Stable demand; no significant trends observed.",
    suggestedAction: "No Action"
  },
  {
    item: "Electrical Wire",
    predictedDemand: 110,
    confidenceLevel: "88%",
    trendJustification: "Increased orders from electrical contractors.",
    suggestedAction: "Stock Up"
  }
];

export const DemandForecasting = () => {
  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Demand Forecasting</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Predicted Demand (Next Month)</TableHead>
                <TableHead>Confidence Level (%)</TableHead>
                <TableHead>Trend Justification (AI)</TableHead>
                <TableHead>Suggested Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {forecastData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.item}</TableCell>
                  <TableCell>{item.predictedDemand}</TableCell>
                  <TableCell>{item.confidenceLevel}</TableCell>
                  <TableCell>{item.trendJustification}</TableCell>
                  <TableCell>{item.suggestedAction}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};