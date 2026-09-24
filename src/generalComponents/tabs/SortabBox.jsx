import React from "react";
import { ArrowUpDown, ArrowUp, ArrowDown, Info } from "lucide-react";

export default function SortTabBox({
  options,
  sortBy,
  handleSortClick,
  sortOrder,
}) {
  return (
    <div className="flex items-center justify-between gap-4 flex-wrap">
      <div className="flex items-center gap-2 overflow-x-auto">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap mr-2">
          Sort by:
        </span>
        <div className="flex gap-2">
          {options.map((option) => {
            const isActive = sortBy === option.value;
            return (
              <button
                key={option.value}
                onClick={() => handleSortClick(option.value)}
                className={`
                  px-3 py-1.5 rounded-lg text-sm font-medium
                  flex items-center gap-1.5 whitespace-nowrap
                  transition-all duration-200
                  ${
                    isActive
                      ? "bg-[#006eb8] text-white shadow-sm"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }
                `}
              >
                {option.label}
                {isActive ? (
                  sortOrder === "asc" ? (
                    <ArrowUp className="w-3.5 h-3.5" />
                  ) : (
                    <ArrowDown className="w-3.5 h-3.5" />
                  )
                ) : (
                  <ArrowUpDown className="w-3.5 h-3.5 opacity-50" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
