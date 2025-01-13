import {
  LayoutDashboard,
  ClipboardList,
  Package,
  Wrench,
  ShoppingCart,
  Factory,
  LineChart,
  UserCog,
  FolderKanban,
  BookOpen,
  TrendingUp,
  BarChart3,
} from "lucide-react";

export interface NavSubItem {
  title: string;
  path: string;
}

export interface NavItem {
  title: string;
  icon: React.ComponentType;
  path: string;
  children?: NavSubItem[];
}

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    title: "Purchase Requisitions",
    icon: ClipboardList,
    path: "/purchase-requisitions",
  },
  {
    title: "Programs",
    icon: BookOpen,
    path: "/program/list",
  },
  {
    title: "Project",
    icon: FolderKanban,
    path: "/project/list",
  },
  {
    title: "Inventory",
    icon: Package,
    path: "/inventory",
    children: [
      { title: "Current Stock", path: "/inventory/stock" },
      { title: "BOM List", path: "/bom/list" },
      { title: "Optimization", path: "/inventory/optimization" },
      { title: "Demand Forecasting", path: "/inventory/forecasting" },
    ],
  },
  {
    title: "Procurement",
    icon: ShoppingCart,
    path: "/procurement",
    children: [
      { title: "Purchase Orders", path: "/procurement/orders" },
    ],
  },
  {
    title: "Reports",
    icon: LineChart,
    path: "/reports",
  },
  {
    title: "User Management",
    icon: UserCog,
    path: "/users",
    children: [
      { title: "User List", path: "/users/list" },
      { title: "Roles & Permissions", path: "/users/roles" },
      { title: "Access Control", path: "/users/access" },
      { title: "User Activity", path: "/users/activity" },
    ],
  },
];