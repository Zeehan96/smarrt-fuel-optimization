import React from "react";
import Button from "./Button";

const Tabs = ({
  tabs = [],
  activeTab,
  onTabChange,
  className = "",
  tabClassName = "",
  activeTabClassName = "",
  inactiveTabClassName = "",
  badgeClassName = "",
  activeBadgeClassName = "",
  inactiveBadgeClassName = "",
  standalone = true,
}) => {
  const containerClasses = standalone
    ? `bg-transparent ${className}`
    : className;

  const wrapperClasses = standalone ? "px-2 sm:px-4 py-2" : "";

  const navContainerClasses = standalone
    ? "rounded-xl border border-[#113071]/10 bg-white/90 dark:bg-slate-900/60 shadow-[0_6px_18px_-12px_rgba(0,0,0,0.35)] backdrop-blur-sm"
    : "";

  const navClasses =
    "flex gap-1 sm:gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700 [-ms-overflow-style:none] [scrollbar-width:thin]";

  const innerNavClasses = "flex flex-nowrap items-stretch gap-1 sm:gap-2";

  return (
    <div className={containerClasses}>
      <div className={wrapperClasses}>
        <div className={navContainerClasses}>
          <nav
            className={`${navClasses} p-1 sm:p-2`}
            role="tablist"
            aria-label="Tabs"
          >
            <div className={innerNavClasses}>
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                const tabClasses = isActive
                  ? `!bg-[#113071] !text-white shadow-sm shadow-[#113071]/20 ring-1 ring-[#113071]/20 !border-0 ${activeTabClassName}`
                  : `text-slate-600 dark:text-slate-300 hover:text-[#113071] dark:hover:text-white hover:bg-[#113071]/10 dark:hover:bg-[#113071]/20 focus-visible:ring-[#113071]/40 !border !border-gray-300 dark:!border-gray-600 ${inactiveTabClassName}`;

                const badgeClasses = isActive
                  ? `bg-white/20 text-white dark:text-white ${activeBadgeClassName}`
                  : `bg-[#113071]/10 text-[#113071] dark:bg-[#113071]/20 dark:text-[#80c4eb] ${inactiveBadgeClassName}`;

                return (
                  <Button
                    key={tab.id}
                    onClick={() => {
                      if (!isActive) {
                        onTabChange(tab.id);
                      }
                    }}
                    className={`group relative flex items-center gap-1.5 rounded-md px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-[11px] sm:text-sm font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#113071] disabled:opacity-60 disabled:pointer-events-none ${tabClasses} ${tabClassName}`}
                    disabled={tab.disabled}
                    variant="ghost"
                    role="tab"
                    aria-selected={isActive}
                    type="button"
                  >
                    <div className="flex items-center gap-1.5">
                      {tab.icon && (
                        <span className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 text-inherit">
                          {tab.icon}
                        </span>
                      )}
                      <span className="truncate text-xs sm:text-sm font-medium">
                        {tab.label}
                      </span>
                      {tab.count !== undefined && (
                        <span
                          className={`ml-auto rounded-full px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs font-medium tracking-wide transition-colors ${badgeClasses} ${badgeClassName}`}
                        >
                          {tab.count}
                        </span>
                      )}
                    </div>
                  </Button>
                );
              })}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
