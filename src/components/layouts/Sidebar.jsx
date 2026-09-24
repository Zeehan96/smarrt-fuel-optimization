import React, { useState } from "react";
import { X, Search } from "lucide-react";
import { getFilteredMenuItems } from "../../config/sidebarConfig";
import SidebarNavs from "../../generalComponents/navs/SidebarNavs";
import { IMAGES } from "../../assets";
import { useLanguage } from "../../hooks/useLanguage";
import { useAppContext } from "../../hooks/useAppContext";

const Sidebar = ({ sidebarOpen, setSidebarOpen, sidebarCollapsed }) => {
  const { t } = useLanguage();
  const { user } = useAppContext();
  const [expandedMenus, setExpandedMenus] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const menuItems = getFilteredMenuItems(t, user);

  const filteredMenuItems = searchTerm.trim()
    ? menuItems
        .map((item) => {
          const searchLower = searchTerm.toLowerCase();
          const matchesLabel = item.label.toLowerCase().includes(searchLower);
          if (item.submenu) {
            const matchesSubmenu = item.submenu.some((sub) =>
              sub.label.toLowerCase().includes(searchLower),
            );
            if (matchesLabel) {
              return { ...item, submenu: item.submenu, hasSubmenu: true };
            }
            if (matchesSubmenu) {
              const filteredSubmenu = item.submenu.filter((sub) =>
                sub.label.toLowerCase().includes(searchLower),
              );
              return { ...item, submenu: filteredSubmenu, hasSubmenu: true };
            }
            return null;
          }
          return matchesLabel ? item : null;
        })
        .filter((item) => item !== null)
    : menuItems;

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity lg:hidden z-20"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`
         fixed inset-y-0 left-0 z-30 bg-white dark:bg-gray-800 shadow-xl transform transition-all duration-300 ease-in-out flex flex-col h-screen max-h-screen border-r border-gray-200 dark:border-gray-700 overflow-hidden
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        ${sidebarCollapsed ? "lg:w-0 lg:opacity-0 lg:overflow-hidden" : "lg:w-64 lg:opacity-100"}
        lg:translate-x-0 lg:static lg:inset-0
      `}
      >
        {/* Logo Header */}
        <div className="flex-shrink-0 flex flex-col items-center justify-center pt-6 px-6 relative">
          <div className="relative w-40 h-28 flex items-center justify-center">
            <div className="relative z-10 flex items-center justify-center">
              <img
                src="/smart-fuel-without-bg.svg"
                alt="Fuel Logo"
                className="h-24 w-auto object-contain max-w-[95%]"
              />
            </div>
          </div>
          <div className="mt-1 text-center">
            <h2 className="text-sm font-extrabold tracking-wider text-gray-800 dark:text-white uppercase">
              Smart <span className="text-[var(--primary-color)]">Fuel</span>
            </h2>
            <p className="text-[9px] font-bold text-gray-400 dark:text-gray-500 tracking-widest uppercase">
              Optimization
            </p>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="absolute right-4 top-4 lg:hidden text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search Field */}
        <div className="flex-shrink-0 px-3 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder={t?.sidebar?.searchMenu || "Search menu..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-1 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] dark:bg-gray-700 dark:text-white placeholder-gray-400"
            />
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden scrollbar-thin px-2 py-3">
          <ul className="space-y-1 pb-20 sm:pb-6">
            <SidebarNavs
              menuItems={filteredMenuItems}
              expandedMenus={expandedMenus}
              setExpandedMenus={setExpandedMenus}
              setSidebarOpen={setSidebarOpen}
              searchTerm={searchTerm}
              userPermissions={user?.permissions}
              isSuperAdmin={user?.role === "super_admin"}
            />
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
