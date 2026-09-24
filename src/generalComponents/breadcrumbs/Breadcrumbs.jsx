import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

const Breadcrumbs = ({ items = [], showHome = true }) => {
  const location = useLocation();

  // Default breadcrumb items based on current route
  const getDefaultBreadcrumbs = () => {
    const path = location.pathname;
    const pathSegments = path.split("/").filter(Boolean);
    const breadcrumbs = [];

    if (showHome) {
      breadcrumbs.push({
        label: "Home",
        path: "/dashboard",
        icon: Home,
      });
    }

    // Handle activity logs route
    if (path.startsWith("/activity-logs")) {
      const type = pathSegments[1]; // admin, firm, client, accountant
      const typeLabels = {
        admin: "Admin Users",
        firm: "Firms",
        client: "Clients",
        accountant: "Accountants",
      };

      breadcrumbs.push({
        label: typeLabels[type] || "Activity Logs",
        path: `/${
          type === "admin"
            ? "admin-users"
            : type === "firm"
              ? "firms"
              : type === "client"
                ? "clients"
                : "accountants"
        }`,
      });

      breadcrumbs.push({
        label: "Activity Logs",
        path: path,
        isActive: true,
      });
    }

    return breadcrumbs;
  };

  const breadcrumbItems = items.length > 0 ? items : getDefaultBreadcrumbs();

  if (breadcrumbItems.length === 0) {
    return null;
  }

  return (
    <nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb">
      {breadcrumbItems.map((item, index) => {
        const isLast = index === breadcrumbItems.length - 1;
        const Icon = item.icon;

        return (
          <React.Fragment key={index}>
            {isLast ? (
              <div className="flex items-center gap-1.5">
                {Icon && (
                  <Icon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                )}
                <span className="font-medium text-gray-900 dark:text-white">
                  {item.label}
                </span>
              </div>
            ) : (
              <Link
                to={item.path}
                className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400 hover:text-[#113071] dark:hover:text-[#113071] transition-colors duration-150"
              >
                {Icon && <Icon className="w-4 h-4" />}
                <span>{item.label}</span>
              </Link>
            )}
            {!isLast && (
              <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
