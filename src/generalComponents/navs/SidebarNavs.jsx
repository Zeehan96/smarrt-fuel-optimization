import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, ChevronRight, SearchX } from "lucide-react";
import {
  isActivityLogsRelatedRoute,
  isActivityLogsRelatedSubmenu,
  ACTIVITY_LOGS_PARENT_ROUTES,
} from "../../utils/constant";
import { saveNavigationData } from "../../utils/localStorage";
import { BadgeWithTooltip } from "../tooltip/BadgeWithTooltip";
import { useAppContext } from "../../hooks/useAppContext";

const SidebarNavs = ({
  menuItems,
  expandedMenus,
  setExpandedMenus,
  setSidebarOpen,
  searchTerm,
  userPermissions,
  isSuperAdmin = false,
}) => {
  const { logout } = useAppContext();
  const location = useLocation();
  const activeItemClasses =
    "bg-[var(--primary-color)] rounded-lg text-white dark:bg-[var(--primary-color)] dark:text-white";
  if (menuItems.length === 0 && searchTerm) {
    return (
      <li className="px-3 py-8 text-center">
        <div className="flex flex-col items-center gap-3">
          <SearchX className="w-12 h-12 text-gray-400" />

          <div className="text-sm text-gray-500 dark:text-gray-400">
            <p className="font-medium">Menu not found</p>
            <p>Try a different search term</p>
          </div>
        </div>
      </li>
    );
  }

  return (
    <>
      {menuItems.map((item) => {
        const Icon = item.icon;
        let isActive =
          location.pathname === item.path ||
          location.pathname.startsWith(item.path + "/");

        if (isActivityLogsRelatedRoute(location.pathname, item.id)) {
          isActive = true;
        }

        const hasSubmenu = item.hasSubmenu;
        const childRouteOpen =
          hasSubmenu &&
          item.submenu?.some((sub) => location.pathname.startsWith(sub.path));

        let isSubmenuActive = childRouteOpen;

        if (isActivityLogsRelatedRoute(location.pathname, item.id)) {
          isSubmenuActive = true;
        }

        const activityAutoExpand =
          isActivityLogsRelatedRoute(location.pathname, item.id) &&
          ACTIVITY_LOGS_PARENT_ROUTES[item.id]?.autoExpand;

        // Default open when a child route (or activity auto-expand) needs it; user can still collapse/expand via chevron.
        const defaultExpanded = childRouteOpen || activityAutoExpand;
        const isExpanded = expandedMenus[item.id] ?? defaultExpanded;

        return (
          <li key={item.id}>
            {hasSubmenu ? (
              <div>
                <button
                  type="button"
                  onClick={() =>
                    setExpandedMenus((prev) => {
                      const current = prev[item.id] ?? defaultExpanded;
                      return { ...prev, [item.id]: !current };
                    })
                  }
                  className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-0 mb-1 relative z-10 ${
                    isSubmenuActive
                      ? activeItemClasses
                      : "text-gray-600 hover:bg-[var(--primary-color)]/10 dark:text-gray-300 dark:hover:bg-[var(--primary-color)]/15"
                  }`}
                >
                  <div className="flex items-center">
                    <Icon
                      className={`w-5 h-5 mr-3 flex-shrink-0 ${
                        isSubmenuActive ? "text-[#EDAC1A]" : ""
                      }`}
                      strokeWidth={1.75}
                    />
                    <span
                      className={
                        isSubmenuActive ? "text-white font-medium" : ""
                      }
                    >
                      {item.label}
                    </span>
                    {item.badge !== undefined && (
                      <BadgeWithTooltip
                        badge={item.badge}
                        isSubmenuActive={isSubmenuActive}
                        id={item.id}
                        type={item.badgeType}
                      />
                    )}
                  </div>
                  {isExpanded ? (
                    <ChevronDown
                      className={`w-4 h-4 ${isSubmenuActive ? "text-white" : "text-gray-400"}`}
                    />
                  ) : (
                    <ChevronRight
                      className={`w-4 h-4 ${isSubmenuActive ? "text-white" : "text-gray-400"}`}
                    />
                  )}
                </button>

                {isExpanded && item.submenu && (
                  <ul className="ml-4 mt-1 space-y-1">
                    {item.submenu.map((subItem) => {
                      if (!isSuperAdmin) {
                        const permKey = subItem.permissionKey ?? subItem.label;
                        const pv = userPermissions?.[permKey];
                        const hasPermission =
                          userPermissions && (pv === "true" || pv === true);

                        if (!hasPermission) {
                          return null;
                        }
                      }

                      let isSubActive = location.pathname.startsWith(
                        subItem.path,
                      );

                      // Keep submenu active when viewing related activity logs
                      if (
                        isActivityLogsRelatedSubmenu(
                          location.pathname,
                          subItem.id,
                        )
                      ) {
                        isSubActive = true;
                      }

                      return (
                        <li key={subItem.id}>
                          <Link
                            to={subItem.path}
                            onClick={() => {
                              setSidebarOpen(false);
                              // Track navigation for filter clearing
                              saveNavigationData(location.pathname);
                            }}
                            className={`
                              w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors duration-0 mb-1
                              ${
                                isSubActive
                                  ? activeItemClasses
                                  : "text-gray-600 hover:bg-[var(--primary-color)]/10 dark:text-gray-300 dark:hover:bg-[var(--primary-color)]/15"
                              }
                            `}
                          >
                            <div className="flex items-center">
                              <div
                                className={`w-2 h-2 rounded-full mr-3 ${
                                  isSubActive ? "bg-[#EDAC1A]" : "bg-gray-400"
                                }`}
                              ></div>
                              <span
                                className={
                                  isSubActive ? "text-white font-medium" : ""
                                }
                              >
                                {subItem.label}
                              </span>
                              {subItem.badge !== undefined && (
                                <BadgeWithTooltip
                                  badge={subItem.badge}
                                  isActive={isSubActive}
                                  id={subItem.id}
                                  type={subItem.badgeType}
                                />
                              )}
                            </div>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            ) : item.navDisabled ? (
              <button
                type="button"
                title={item.disabledTooltip}
                aria-label={`${item.label}. ${item.disabledTooltip || ""}`}
                onClick={(e) => e.preventDefault()}
                className="w-full flex cursor-help items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-0 mb-1 relative z-10 text-left opacity-75 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800/60"
              >
                <Icon
                  className="w-5 h-5 mr-3 flex-shrink-0 text-gray-400 dark:text-gray-500"
                  strokeWidth={1.75}
                />
                <span>{item.label}</span>
              </button>
            ) : item.action === "logout" ? (
              <button
                type="button"
                onClick={() => {
                  setSidebarOpen(false);
                  logout();
                }}
                className={`
                  w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-0 mb-1 relative z-10
                  text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20
                `}
              >
                <div className="flex items-center">
                  <Icon
                    className="w-5 h-5 mr-3 flex-shrink-0"
                    strokeWidth={1.75}
                  />
                  <span>{item.label}</span>
                </div>
              </button>
            ) : (
              <Link
                to={item.path}
                onClick={() => {
                  setSidebarOpen(false);
                  // Track navigation for filter clearing
                  saveNavigationData(location.pathname);
                }}
                className={`
                  w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-0 mb-1 relative z-10
                  ${
                    isActive
                      ? activeItemClasses
                      : "text-gray-600 hover:bg-[var(--primary-color)]/10 dark:text-gray-300 dark:hover:bg-[var(--primary-color)]/15"
                  }
                `}
              >
                <div className="flex items-center">
                  <Icon
                    className={`w-5 h-5 mr-3 flex-shrink-0 ${
                      isActive ? "text-[#EDAC1A]" : ""
                    }`}
                    strokeWidth={1.75}
                  />
                  <span className={isActive ? "text-white font-medium" : ""}>
                    {item.label}
                  </span>
                  {item.badge !== undefined && (
                    <BadgeWithTooltip
                      badge={item.badge}
                      isActive={isActive}
                      id={item.id}
                      type={item.badgeType}
                    />
                  )}
                </div>
              </Link>
            )}
          </li>
        );
      })}
    </>
  );
};

export default SidebarNavs;
