import React from "react";
import { Search, ArrowLeft } from "lucide-react";
import Button from "./Button";
import { Breadcrumbs } from "../../generalComponents/breadcrumbs";
import { renderHtmlContent } from "../../utils/helperFunctions";

const PageHeadingWithActions = ({
  title,
  description,
  ticketDescription,
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search...",
  showSearch = true,
  actions = [],
  className = "",
  isBack = false,
  onBack,
  backButtonText,
  firmOrClientName,
  loading,
  type = "",
  transactionCards = [],
  breadcrumbs = [],
  showBreadcrumbs = false,
}) => {
  return (
    <>
      {(title || description || ticketDescription) && (
        <div
          className={`bg-white dark:bg-gray-800 rounded-lg shadow p-6 ${className}`}
        >
          {showBreadcrumbs && breadcrumbs.length > 0 && (
            <div className="mb-4 pb-3 border-b border-gray-200 dark:border-gray-700">
              <Breadcrumbs items={breadcrumbs} showHome={false} />
            </div>
          )}
          <div className="flex items-start gap-1">
            {isBack && onBack && (
              <button
                onClick={onBack}
                className="mt-1 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 text-gray-600 dark:text-gray-300 hover:text-[#006eb8] dark:hover:text-[#006eb8]"
                aria-label="Go back"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
            )}
            <div className="flex-1">
              {title && <h1 className="page-heading">{title}</h1>}
              {description && <p className="page-description">{description}</p>}
              {ticketDescription && (
                <div className="page-description mt-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                  {renderHtmlContent(ticketDescription)}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {(showSearch ||
        actions.length > 0 ||
        (isBack && onBack && !title) ||
        (showBreadcrumbs && breadcrumbs.length > 0 && !title)) && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          {showBreadcrumbs && breadcrumbs.length > 0 && !title && (
            <div className="mb-2 pb-2 border-b border-gray-200 dark:border-gray-700">
              <Breadcrumbs items={breadcrumbs} showHome={false} />
            </div>
          )}
          <div
            className={`flex flex-col sm:flex-row gap-4 items-start sm:items-center ${
              !showSearch &&
              !(
                isBack &&
                onBack &&
                !title &&
                !(showBreadcrumbs && breadcrumbs.length > 0)
              ) &&
              actions.length > 0
                ? "justify-end"
                : "justify-between"
            }`}
          >
            {(showSearch ||
              (isBack &&
                onBack &&
                !title &&
                !(showBreadcrumbs && breadcrumbs.length > 0))) && (
              <div className="flex items-center gap-3 flex-1 max-w-md w-full sm:w-auto order-2 sm:order-1">
                {isBack &&
                  onBack &&
                  !title &&
                  !(showBreadcrumbs && breadcrumbs.length > 0) && (
                    <button
                      onClick={onBack}
                      className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors flex items-center gap-2 flex-shrink-0"
                      aria-label={backButtonText || "Go back"}
                    >
                      <ArrowLeft className="w-4 h-4" />
                      {backButtonText && <span>{backButtonText}</span>}
                    </button>
                  )}
                {showSearch && (
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder={searchPlaceholder}
                      value={searchValue}
                      onChange={(e) => onSearchChange(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#006eb8] focus:border-[#006eb8] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                )}
                {firmOrClientName && (
                  <div className="text-sm text-gray-600 dark:text-gray-400 hidden sm:block whitespace-nowrap">
                    • {firmOrClientName}
                  </div>
                )}
              </div>
            )}
            {firmOrClientName && (
              <div className="text-sm text-gray-600 dark:text-gray-400 sm:hidden w-full order-3">
                • {firmOrClientName}
              </div>
            )}
            {actions.length > 0 && (
              <div
                className={`flex ${
                  actions.length >= 3 ? "flex-col sm:flex-row" : "flex-wrap"
                } items-center gap-2 w-full sm:w-auto justify-end order-1 sm:order-2 ${
                  !showSearch &&
                  !(
                    isBack &&
                    onBack &&
                    !title &&
                    !(showBreadcrumbs && breadcrumbs.length > 0)
                  )
                    ? "ml-auto"
                    : ""
                }`}
              >
                {actions.length <= 2
                  ? // For 2 or fewer buttons, show them side by side
                    actions.map((action, index) => (
                      <div key={index} className="relative">
                        <Button
                          onClick={action.onClick}
                          icon={action.icon}
                          variant={action.variant || "primary"}
                          size={action.size || "md"}
                          disabled={action.disabled || loading}
                          loading={action.loading}
                        >
                          {action.label}
                        </Button>
                        {action.badge && (
                          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                            {action.badge}
                          </span>
                        )}
                      </div>
                    ))
                  : // For 3 or more buttons, make them full width on mobile
                    actions.map((action, index) => (
                      <div key={index} className="relative w-full sm:w-auto">
                        <Button
                          onClick={action.onClick}
                          icon={action.icon}
                          variant={action.variant || "primary"}
                          size={action.size || "md"}
                          className="w-full sm:w-auto justify-center"
                          disabled={action.disabled || loading}
                          loading={action.loading}
                        >
                          {action.label}
                        </Button>
                        {action.badge && (
                          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                            {action.badge}
                          </span>
                        )}
                      </div>
                    ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PageHeadingWithActions;
