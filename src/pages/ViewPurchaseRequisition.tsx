import { useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export function ViewPurchaseRequisition() {
  const location = useLocation();
  const orderDetails = location.state?.orderDetails;

  if (!orderDetails) {
    return <div className="p-6">No requisition details found.</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Purchase Requisition Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label>Program</Label>
                <Input 
                  value={orderDetails.program || 'N/A'} 
                  readOnly 
                  className="bg-gray-50"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label>Project</Label>
                <Input 
                  value={orderDetails.project || 'N/A'} 
                  readOnly 
                  className="bg-gray-50"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label>Requisition ID</Label>
              <Input 
                value={orderDetails.id || 'N/A'} 
                readOnly 
                className="bg-gray-50"
              />
            </div>
            <div>
              <Label>Delivery Deadline</Label>
              <Input 
                type="date"
                value={orderDetails.deliveryDeadline || ''} 
                readOnly 
                className="bg-gray-50"
              />
            </div>
            <div>
              <Label>Created Date</Label>
              <Input 
                type="date"
                value={orderDetails.orderDate || ''} 
                readOnly 
                className="bg-gray-50"
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Items</h3>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left">#</th>
                    <th className="px-4 py-3 text-left">Item</th>
                    <th className="px-4 py-3 text-left">Part ID</th>
                    <th className="px-4 py-3 text-left">Quantity</th>
                    <th className="px-4 py-3 text-left">Price Per Unit</th>
                    <th className="px-4 py-3 text-left">Total Price</th>
                    <th className="px-4 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetails.items?.map((item: any, index: number) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-3">{index + 1}</td>
                      <td className="px-4 py-3">{item.item}</td>
                      <td className="px-4 py-3">{item.partIdentifier}</td>
                      <td className="px-4 py-3">{item.quantity}</td>
                      <td className="px-4 py-3">${item.pricePerUnit}</td>
                      <td className="px-4 py-3">${item.totalPrice}</td>
                      <td className="px-4 py-3">
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Total units:</span>
              <span>{orderDetails.totalUnits || 0} pcs</span>
            </div>
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${orderDetails.subtotal || '0.00'} USD</span>
            </div>
            <div className="flex justify-between">
              <span>Tax:</span>
              <span>${orderDetails.tax || '0.00'} USD</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total:</span>
              <span>${orderDetails.totalAmount || '0.00'} USD</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}