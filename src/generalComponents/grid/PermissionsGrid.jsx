import React, { useState } from "react";
import { Search, ChevronDown, ChevronUp } from "lucide-react";

const PermissionsGrid = ({
  permissions = [],
  selectedPermissions = [],
  onPermissionChange,
  getChildren,
  searchTerm = "",
  emptyMessage = {
    title: "No permissions found",
    description: "Try a different search term",
  },
  gridCols = "grid-cols-1 md:grid-cols-2",
  filterParentPermissions = true,
}) => {
  const [expandedGroups, setExpandedGroups] = useState({});

  const defaultGetChildren = (parentId) =>
    permissions.filter((p) => p.isSubmenu && p.parentId === parentId);

  const getChildrenFn = getChildren || defaultGetChildren;

  const toggleGroup = (permissionId) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [permissionId]: !prev[permissionId],
    }));
  };

  const handlePermissionClick = (permissionId) => {
    if (onPermissionChange) onPermissionChange(permissionId);
  };

  const parentPermissions = filterParentPermissions
    ? permissions.filter((p) => !p.isSubmenu)
    : permissions;

  const filteredPermissions = parentPermissions.filter((permission) => {
    if (!searchTerm.trim()) return true;
    const searchLower = searchTerm.toLowerCase();
    const parentMatches = permission.label.toLowerCase().includes(searchLower);
    const children = getChildrenFn(permission.id);
    const childMatches = children.some((child) =>
      child.label.toLowerCase().includes(searchLower),
    );
    return parentMatches || childMatches;
  });

  return (
    <div className={`grid ${gridCols} gap-3`}>
      {filteredPermissions.length === 0 && searchTerm.trim() ? (
        <div className="col-span-full text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mx-auto mb-3">
            <Search className="w-6 h-6 text-gray-400 dark:text-gray-500" />
          </div>
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            {emptyMessage.title}
          </h4>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {emptyMessage.description}
          </p>
        </div>
      ) : (
        filteredPermissions.map((permission) => {
          const Icon = permission.icon;
          const isSelected = selectedPermissions.includes(permission.id);
          const children = getChildrenFn(permission.id);
          const hasChildren = children.length > 0;
          const isExpanded = expandedGroups[permission.id] ?? true;

          return (
            <div key={permission.id} className="space-y-2">
              <div
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  isSelected
                    ? "border-[#113071] bg-[#113071]/10 dark:bg-[#113071]/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    onClick={() => handlePermissionClick(permission.id)}
                    className="cursor-pointer flex items-start gap-3 flex-1"
                  >
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                        isSelected
                          ? "bg-[#113071] text-white"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      {Icon && <Icon className="w-5 h-5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4
                          className={`text-sm font-semibold ${
                            isSelected
                              ? "text-[#113071] dark:text-[#8db2ff]"
                              : "text-gray-900 dark:text-white"
                          }`}
                        >
                          {permission.label}
                        </h4>
                        <div
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                            isSelected
                              ? "bg-[#113071] border-[#113071]"
                              : "border-gray-300 dark:border-gray-600"
                          }`}
                        >
                          {isSelected && (
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>
                      {permission.description && (
                        <p className="text-xs text-gray-600 dark:text-gray-500">
                          {permission.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {hasChildren && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleGroup(permission.id);
                      }}
                      className="flex-shrink-0 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      )}
                    </button>
                  )}
                </div>

                {hasChildren && isExpanded && (
                  <div className="mt-3 ml-13 space-y-1.5 border-l-2 border-gray-200 dark:border-gray-700 pl-4">
                    {children.map((child) => {
                      const isChildSelected = selectedPermissions.includes(
                        child.id,
                      );
                      return (
                        <div
                          key={child.id}
                          onClick={() => handlePermissionClick(child.id)}
                          className="flex items-center gap-2 cursor-pointer group py-1"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500 group-hover:bg-[#113071] transition-colors" />
                          <span
                            className={`text-sm ${
                              isChildSelected
                                ? "text-[#113071] dark:text-[#8db2ff] font-medium"
                                : "text-gray-700 dark:text-gray-300 group-hover:text-[#113071] dark:group-hover:text-[#8db2ff]"
                            } transition-colors`}
                          >
                            {child.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default PermissionsGrid;
