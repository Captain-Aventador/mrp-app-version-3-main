import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";

interface ItemDetailsTableProps {
  selectedYear: string;
}

export function ItemDetailsTable({ selectedYear }: ItemDetailsTableProps) {
  const defaultData = [
    { 
      item: "PC - P4 2.4G, DDR 512M, 400G HD",
      status: "R",
      quarter: "2022 Q3",
      productionOrder: "161",
      procureMethod: "M"
    },
    { 
      item: "PC - P4 2.4G, DDR 1024M, 400G HD",
      status: "R",
      quarter: "2022 Q3",
      productionOrder: "162",
      procureMethod: "M"
    },
    {
      item: "Semi finished",
      status: "R",
      quarter: "2023 Q3",
      productionOrder: "163",
      procureMethod: "M"
    },
  ];

  const yearlyData = {
    "2024": [
      { 
        item: "PC - P5 3.0G, DDR 2048M, 1TB HD",
        status: "A",
        quarter: "2024 Q1",
        productionOrder: "201",
        procureMethod: "M"
      },
      { 
        item: "PC - P5 3.0G, DDR 4096M, 2TB HD",
        status: "P",
        quarter: "2024 Q2",
        productionOrder: "202",
        procureMethod: "M"
      }
    ],
    "2023": [
      { 
        item: "PC - P4 3.0G, DDR 1024M, 500G HD",
        status: "C",
        quarter: "2023 Q4",
        productionOrder: "181",
        procureMethod: "M"
      },
      { 
        item: "PC - P4 3.0G, DDR 2048M, 1TB HD",
        status: "R",
        quarter: "2023 Q3",
        productionOrder: "182",
        procureMethod: "M"
      }
    ],
    // Add more years as needed
  };

  const getData = () => {
    if (selectedYear === "all") return defaultData;
    return yearlyData[selectedYear as keyof typeof yearlyData] || defaultData;
  };

  return (
    <Card className="p-6">
      <h2 className="mb-4 text-lg font-semibold">Item Details {selectedYear !== "all" ? `(${selectedYear})` : ""}</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Item</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Quarter of Date of Update - Sent</TableHead>
            <TableHead>Production Order</TableHead>
            <TableHead>Procure Method</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {getData().map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.item}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell>{item.quarter}</TableCell>
              <TableCell>{item.productionOrder}</TableCell>
              <TableCell>{item.procureMethod}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}