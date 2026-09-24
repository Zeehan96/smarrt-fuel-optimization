import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, X } from "lucide-react";

const SearchableDropdown = ({
  value,
  onChange,
  options = [],
  label,
  required = false,
  placeholder = "Select option",
  disabled = false,
  loading = false,
  className = "",
  searchPlaceholder = "Search...",
  displayKey = "name",
  valueKey = "_id",
  icon: Icon = null,
  emptyMessage = "No options found",
  onSearchChange,
  filterFunction,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isDropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleSelection = (option) => {
    const selectedValue = option[valueKey];
    onChange(selectedValue, option);
    setIsDropdownOpen(false);
    setSearchTerm("");
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange(null, null);
    setIsDropdownOpen(false);
    setSearchTerm("");
  };

  const selectedOption = options.find((opt) => opt[valueKey] === value);

  // Remove duplicates based on valueKey
  const uniqueOptions = options.filter(
    (option, index, self) =>
      index === self.findIndex((opt) => opt[valueKey] === option[valueKey]),
  );

  // Filter options based on search term
  const getFilteredOptions = () => {
    if (filterFunction) {
      return uniqueOptions.filter((option) =>
        filterFunction(option, searchTerm),
      );
    }
    return uniqueOptions.filter((option) =>
      option[displayKey]?.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  };

  const filteredOptions = getFilteredOptions();

  const handleSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    if (onSearchChange) {
      onSearchChange(newSearchTerm);
    }
  };

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
          {required && <span className="asterisk-sign">*</span>}
        </label>
      )}
      <div className="relative dropdown-container" ref={dropdownRef}>
        <div
          className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#113071] focus:border-[#113071] dark:bg-gray-700 dark:border-gray-600 dark:text-white cursor-pointer flex items-center justify-between ${
            loading || disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => {
            if (loading || disabled) return;
            setIsDropdownOpen(!isDropdownOpen);
            if (isDropdownOpen) {
              setSearchTerm("");
            }
          }}
        >
          <span
            className={
              selectedOption ? "text-gray-900 dark:text-white" : "text-gray-500"
            }
          >
            {loading
              ? "Loading..."
              : selectedOption
                ? selectedOption[displayKey]
                : placeholder}
          </span>
          <div className="flex items-center gap-2">
            {selectedOption && !required && !loading && !disabled && (
              <button
                type="button"
                onClick={handleClear}
                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                title="Clear selection"
              >
                <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </button>
            )}
            <ChevronDown
              className={`w-4 h-4 text-gray-400 transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>

        {isDropdownOpen && !loading && !disabled && (
          <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-52 overflow-hidden">
            {/* Search Input */}
            <div className="p-2 border-b border-gray-200 dark:border-gray-600">
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-[#113071] focus:border-[#113071] dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            {/* Options List */}
            <div className="max-h-40 overflow-y-auto">
              {value && !required && (
                <div
                  className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-white flex items-center gap-2 border-b border-gray-200 dark:border-gray-600 text-red-600 dark:text-red-400"
                  onClick={handleClear}
                >
                  <X className="w-4 h-4" />
                  <span>Clear Selection</span>
                </div>
              )}
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <div
                    key={option[valueKey]}
                    className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-white flex items-center gap-2"
                    onClick={() => handleSelection(option)}
                  >
                    {Icon && <Icon className="w-4 h-4 text-indigo-500" />}
                    <span>{option[displayKey]}</span>
                  </div>
                ))
              ) : (
                <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400 text-center">
                  {emptyMessage}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchableDropdown;
