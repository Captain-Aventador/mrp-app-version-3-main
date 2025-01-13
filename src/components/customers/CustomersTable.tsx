import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Customer } from "@/data/mockCustomers";

interface CustomersTableProps {
  customers: Customer[];
  selectedCustomers: string[];
  setSelectedCustomers: (customers: string[]) => void;
}

export function CustomersTable({ customers, selectedCustomers, setSelectedCustomers }: CustomersTableProps) {
  const handleSelectCustomer = (customerId: string) => {
    if (selectedCustomers.includes(customerId)) {
      setSelectedCustomers(selectedCustomers.filter(id => id !== customerId));
    } else {
      setSelectedCustomers([...selectedCustomers, customerId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedCustomers.length === customers.length) {
      setSelectedCustomers([]);
    } else {
      setSelectedCustomers(customers.map(customer => customer.id));
    }
  };

  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-[#F6F6F7]">
            <TableHead className="w-[50px] bg-[#F6F6F7] py-0">
              <Checkbox 
                checked={selectedCustomers.length === customers.length}
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
            <TableHead className="bg-[#F6F6F7] py-0">Customer Name</TableHead>
            <TableHead className="bg-[#F6F6F7] py-0">Email</TableHead>
            <TableHead className="bg-[#F6F6F7] py-0">Phone</TableHead>
            <TableHead className="bg-[#F6F6F7] py-0">Billing Address</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell className="px-4 py-0">
                <Checkbox 
                  checked={selectedCustomers.includes(customer.id)}
                  onCheckedChange={() => handleSelectCustomer(customer.id)}
                />
              </TableCell>
              <TableCell className="px-4 py-0">{customer.name}</TableCell>
              <TableCell className="px-4 py-0">{customer.email}</TableCell>
              <TableCell className="px-4 py-0">{customer.phone}</TableCell>
              <TableCell className="px-4 py-0">{customer.billingAddress}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
