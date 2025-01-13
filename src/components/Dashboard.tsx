import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
} from "@/components/ui/select";
import { useState } from "react";
import { StatCards } from "./dashboard/StatCards";
import { SalesTrendChart } from "./dashboard/SalesTrendChart";
import { SupplyDemandChart } from "./dashboard/SupplyDemandChart";
import { BOMChart } from "./dashboard/BOMChart";
import { ItemDetailsTable } from "./dashboard/ItemDetailsTable";

export function Dashboard() {
  const [selectedYear, setSelectedYear] = useState("all");

  const handleYearChange = (value: string) => {
    setSelectedYear(value);
  };

  return (
    <div className="animate-fade-in space-y-6 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex gap-4">
          <Select value={selectedYear} onValueChange={handleYearChange}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Year of Production" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Year of Production</SelectLabel>
                <SelectItem value="all">(All)</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="2021">2021</SelectItem>
                <SelectItem value="2020">2020</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <StatCards selectedYear={selectedYear} />
      <div className="grid gap-6 lg:grid-cols-2">
        <SalesTrendChart selectedYear={selectedYear} />
        <SupplyDemandChart selectedYear={selectedYear} />
      </div>
      <BOMChart selectedYear={selectedYear} />
      <ItemDetailsTable selectedYear={selectedYear} />
    </div>
  );
}