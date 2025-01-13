import { Bell, ArrowLeft, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useSidebar } from "./ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Textarea } from "./ui/textarea";

export function Header() {
  const navigate = useNavigate();
  const { toggleSidebar } = useSidebar();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-header backdrop-blur">
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="text-white hover:bg-header hover:text-white/80"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-white">MRP</span>
          </div>
        </div>

        {/* Center Logo */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <img 
            src="/bonedgeLogo.png" 
            alt="Bonedge Logo" 
            className="h-8"
          />
        </div>

        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <img 
                src="/lovable-uploads/7cfafe85-2339-4f45-8824-66195bda3dca.png" 
                alt="Logo" 
                className="h-8 w-8 rounded-[10px] cursor-pointer hover:opacity-80 transition-opacity"
              />
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px] bg-white text-gray-900 p-0">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <ArrowLeft className="h-5 w-5" />
                  </div>
                </div>
                
                <div className="flex-1 p-6">
                  <div className="flex gap-3 mb-6">
                    <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <img 
                        src="/lovable-uploads/7cfafe85-2339-4f45-8824-66195bda3dca.png" 
                        alt="Icon" 
                        className="h-6 w-6"
                      />
                    </div>
                    <p className="text-sm">
                      What would you like to create? Please choose an option below:
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-left cursor-pointer"
                    >
                      Create Project
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-left cursor-pointer"
                    >
                      Create Sales Orders
                    </Button>
                  </div>
                </div>

                <div className="p-6 mt-auto border-t border-gray-200">
                  <div className="relative">
                    <Textarea
                      className="min-h-[200px] bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 resize-none"
                      placeholder="Type your message..."
                      style={{ height: '200px' }}
                    />
                    <Button 
                      className="absolute bottom-4 right-4 bg-gray-100 hover:bg-gray-200 text-gray-900 cursor-pointer"
                      size="icon"
                    >
                      <ArrowLeft className="h-4 w-4 rotate-180" />
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5 text-white" />
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  3
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[300px]">
              <DropdownMenuItem>
                New order received (#10316)
              </DropdownMenuItem>
              <DropdownMenuItem>
                Low inventory alert: LM4029MC
              </DropdownMenuItem>
              <DropdownMenuItem>
                Maintenance scheduled for tomorrow
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-white">John Doe</span>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" alt="John Doe" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}