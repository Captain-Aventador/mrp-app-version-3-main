import { NavLink, NavLinkProps } from "react-router-dom";
import { cn } from "@/lib/utils";
import { navItems } from "./navigation/nav-items";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

interface StyledNavLinkProps extends NavLinkProps {
  className?: string | ((props: { isActive: boolean }) => string);
  children: React.ReactNode;
}

const StyledNavLink = ({ className, children, ...props }: StyledNavLinkProps) => (
  <NavLink
    {...props}
    className={({ isActive }) =>
      cn(
        typeof className === "function" ? className({ isActive }) : className,
        "block w-full"
      )
    }
  >
    {children}
  </NavLink>
);

export function AppSidebar() {
  return (
    <div className="border-r h-full">
      <div className="p-0">
        <nav className="divide-y divide-gray-100">
          {navItems.map((item, index) => (
            <div key={item.path}>
              {item.children ? (
                <Accordion type="single" collapsible>
                  <AccordionItem value={item.title}>
                    <AccordionTrigger className="py-3 px-3">
                      <div className="flex items-center w-full">
                        <item.icon className="h-4 w-4 mr-3" />
                        <span className="text-sm font-medium">{item.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-1">
                        {item.children.map((child) => (
                          <StyledNavLink
                            key={child.path}
                            to={child.path}
                            className={({ isActive }) =>
                              cn(
                                "flex items-center py-3 px-3 text-sm transition-colors hover:text-primary",
                                isActive && "text-primary bg-blue-50 font-medium"
                              )
                            }
                          >
                            {child.title}
                          </StyledNavLink>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ) : (
                <StyledNavLink
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center py-3 px-3 text-sm font-medium transition-colors hover:bg-blue-50 hover:text-primary",
                      isActive && "bg-blue-50 text-primary"
                    )
                  }
                >
                  <div className="flex items-center w-full">
                    <item.icon className="h-4 w-4 mr-3" />
                    <span className="text-sm font-medium">{item.title}</span>
                  </div>
                </StyledNavLink>
              )}
              {index < navItems.length - 1 && <Separator />}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}