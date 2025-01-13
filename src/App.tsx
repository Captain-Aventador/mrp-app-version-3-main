import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Dashboard } from "@/components/Dashboard";
import { Header } from "@/components/Header";
import { CurrentStock } from "@/pages/CurrentStock";
import { PurchaseOrders } from "@/pages/PurchaseOrders";
import { ViewPurchaseOrder } from "@/pages/ViewPurchaseOrder";
import { SupplierManagement } from "@/pages/SupplierManagement";
import { WorkOrders } from "@/pages/WorkOrders";
import { AddProduct } from "@/pages/AddProduct";
import { AddMaterial } from "@/pages/AddMaterial";
import { ProjectList } from "@/pages/ProjectList";
import { AddProject } from "@/pages/AddProject";
import { ViewProject } from "@/pages/ViewProject";
import { BOMList } from "@/pages/BOMList";
import { Reports } from "@/pages/Reports";
import ProgramsList from "@/pages/ProgramsList";
import { PurchaseRequisitions } from "@/pages/PurchaseRequisitions";
import { ViewPurchaseRequisition } from "@/pages/ViewPurchaseRequisition";
import { CreatePurchaseRequisition } from "@/pages/CreatePurchaseRequisition";
import { InventoryOptimization } from "@/pages/InventoryOptimization";
import { DemandForecasting } from "@/pages/DemandForecasting";

const queryClient = new QueryClient();

// Add the style directly to the document head
const style = document.createElement('style');
style.textContent = `
  body {
    pointer-events: all !important;
  }
`;
document.head.appendChild(style);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SidebarProvider>
            <div className="flex flex-col min-h-screen w-full">
              <Header />
              <div className="flex flex-1">
                <AppSidebar />
                <main className="flex-1 bg-[#F8F8F8] p-0">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/purchase-requisitions" element={<PurchaseRequisitions />} />
                    <Route path="/purchase-requisitions/create" element={<CreatePurchaseRequisition />} />
                    <Route path="/purchase-requisitions/:id" element={<ViewPurchaseRequisition />} />
                    <Route path="/inventory/stock" element={<CurrentStock />} />
                    <Route path="/inventory/optimization" element={<InventoryOptimization />} />
                    <Route path="/inventory/forecasting" element={<DemandForecasting />} />
                    <Route path="/procurement/orders" element={<PurchaseOrders />} />
                    <Route path="/procurement/orders/:id" element={<ViewPurchaseOrder />} />
                    <Route path="/procurement/suppliers" element={<SupplierManagement />} />
                    <Route path="/production/orders" element={<WorkOrders />} />
                    <Route path="/inventory/stock/products/add" element={<AddProduct />} />
                    <Route path="/inventory/stock/materials/add" element={<AddMaterial />} />
                    <Route path="/project/list" element={<ProjectList />} />
                    <Route path="/project/add" element={<AddProject />} />
                    <Route path="/project/view/:id" element={<ViewProject />} />
                    <Route path="/bom/list" element={<BOMList />} />
                    <Route path="/program/list" element={<ProgramsList />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route
                      path="*"
                      element={
                        <div className="flex min-h-screen items-center justify-center">
                          <div className="text-center">
                            <h1 className="text-4xl font-bold">Coming Soon</h1>
                            <p className="mt-2 text-muted-foreground">
                              This feature is under development.
                            </p>
                          </div>
                        </div>
                      }
                    />
                  </Routes>
                </main>
              </div>
            </div>
          </SidebarProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;