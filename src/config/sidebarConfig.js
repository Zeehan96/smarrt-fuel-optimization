import {
  LayoutDashboard,
  Car,
  Fuel,
  MapPin,
  AlertTriangle,
  Wallet,
  BarChart3,
  Users,
  Building2,
  History,
  Settings,
  LogOut,
  GraduationCap,
} from "lucide-react";

export const getFilteredMenuItems = (t, user) => {
  const items = getMenuItems(t);

  if (!user) return [];

  const rawRole = (user.role || user.accountType || "").toLowerCase();

  if (rawRole.includes("admin")) {
    return items.filter((item) =>
      [
        "dashboard",
        "user-management",
        "vehicles",
        "organizations",
        "prototype-guidelines",
        "profile",
        "logout",
      ].includes(item.id),
    );
  }

  // All individual / normal / organizational users see Fleet Management (vehicles)
  return items.filter((item) =>
    [
      "dashboard",
      "vehicles",
      "fuel-logs",
      "trip-planning",
      "my-trips",
      "prototype-guidelines",
      "profile",
      "logout",
    ].includes(item.id),
  );
};

export const getMenuItems = (t) => [
  {
    id: "dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
    permissionKey: "Dashboard",
    path: "/dashboard",
  },
  // {
  //   id: "prototype-guidelines",
  //   icon: GraduationCap,
  //   label: "CS619 Guidelines",
  //   permissionKey: "Dashboard",
  //   path: "/prototype-guidelines",
  // },
  {
    id: "user-management",
    icon: Users,
    label: "User Management",
    permissionKey: "User Management",
    path: "/user-management",
  },
  {
    id: "organizations",
    icon: Building2,
    label: "Organizations",
    permissionKey: "Organizations",
    path: "/organizations",
  },
  {
    id: "vehicles",
    icon: Car,
    label: "Vehicles",
    permissionKey: "Vehicles",
    path: "/vehicles",
  },
  {
    id: "fuel-logs",
    icon: Fuel,
    label: "Fuel Logs",
    permissionKey: "Fuel Logs",
    path: "/fuel-logs",
  },
  {
    id: "trip-planning",
    icon: MapPin,
    label: "Plan a Trip",
    permissionKey: "Trip Planning",
    path: "/trip-planning",
  },
  {
    id: "my-trips",
    icon: History,
    label: "My Trips / History",
    permissionKey: "Trip Planning",
    path: "/my-trips",
  },
  {
    id: "profile",
    icon: Settings,
    label: "Profile / Settings",
    permissionKey: "Dashboard",
    path: "/edit-profile",
  },
  {
    id: "crisis-mode",
    icon: AlertTriangle,
    label: "Crisis Mode",
    permissionKey: "Crisis Mode",
    path: "/crisis-mode",
  },
  {
    id: "budget",
    icon: Wallet,
    label: "My Budget",
    permissionKey: "Budget",
    path: "/budget",
  },
  {
    id: "analytics",
    icon: BarChart3,
    label: "Analytics & Reports",
    permissionKey: "Analytics",
    path: "/analytics",
  },
  {
    id: "logout",
    icon: LogOut,
    label: "Logout",
    permissionKey: "Dashboard",
    path: "#",
    action: "logout",
  },
];
