import React, { useMemo, useState, useRef, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";
import countryList from "country-list";
import {
  hasFlag,
  countries as supportedFlagCountries,
} from "country-flag-icons";
import Flag from "react-world-flags";

const rawCountries = (() => {
  try {
    const list = countryList?.getData?.() || [];
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
})();

export const COUNTRY_DROPDOWN_OPTIONS = rawCountries
  .map((item) => ({
    value: item?.name || "",
    label: item?.name || "",
    code: item?.code || "",
  }))
  .filter((item) => item.value && supportedFlagCountries.includes((item.code || "").toUpperCase()))
  .sort((a, b) => a.label.localeCompare(b.label));

// Helper to get flag component for a country name
export const getFlagComponent = (countryName, props = {}) => {
  const opt = COUNTRY_DROPDOWN_OPTIONS.find((o) => o.value === countryName);
  if (!opt?.code) return null;
  const code = opt.code.toUpperCase();
  if (!hasFlag(code)) return null;
  try {
    // Dynamic import not possible here, use img with CDN or inline SVG path
    return null;
  } catch {
    return null;
  }
};

/**
 * Reusable country selector for non-crud forms.
 * For react-admin-crud-manager use `COUNTRY_DROPDOWN_OPTIONS` in field options.
 */
const CountryDropdown = ({
  value = "",
  onChange,
  name = "country",
  id = "country",
  label = "Country",
  required = false,
  disabled = false,
  className = "",
  placeholder = "Select Country",
}) => {
  const options = useMemo(() => COUNTRY_DROPDOWN_OPTIONS, []);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = useMemo(() => {
    return options.filter((opt) => opt.label.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [options, searchTerm]);

  const selectedOption = options.find((o) => o.value === value);

  return (
    <div className="w-full relative" ref={dropdownRef}>
      <label
        htmlFor={id}
        className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
        {required ? <span className="ml-1 text-red-500">*</span> : null}
      </label>
      
      <div 
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-3 py-2.5 text-sm flex justify-between items-center cursor-pointer ${disabled ? 'opacity-60 cursor-not-allowed' : 'focus:border-[var(--primary-color)] dark:focus:border-[var(--primary-color)] transition-colors'} ${className}`.trim()}
      >
        <span className={`flex items-center gap-2 ${!selectedOption ? "text-gray-400" : "truncate"}`}>
          {selectedOption ? (
            <>
              {selectedOption.code && <Flag code={selectedOption.code} className="w-5 h-3.5 object-cover rounded-sm" />}
              <span>{selectedOption.label}</span>
            </>
          ) : placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 flex-shrink-0 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden">
          <div className="p-2 border-b border-gray-100 dark:border-gray-700">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                autoFocus
                placeholder="Search country..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    if (filteredOptions.length > 0) {
                      onChange?.(filteredOptions[0].value);
                      setIsOpen(false);
                      setSearchTerm("");
                    }
                  }
                }}
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md outline-none bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:border-[var(--primary-color)] dark:focus:border-[var(--primary-color)] transition-colors"
              />
            </div>
          </div>
          <ul className="max-h-60 overflow-y-auto py-1">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option.code || option.value}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    onChange?.(option.value);
                    setIsOpen(false);
                    setSearchTerm("");
                  }}
                  className={`px-3 py-2 text-sm cursor-pointer transition-colors ${value === option.value ? "bg-[var(--primary-light)] text-[var(--primary-color)] dark:bg-gray-700 dark:text-white font-medium" : "text-gray-700 dark:text-gray-300 hover:bg-[var(--primary-light)] hover:text-[var(--primary-color)] dark:hover:bg-gray-700 dark:hover:text-white"}`}
                >
                  <div className="flex items-center gap-2">
                    {option.code && <Flag code={option.code} className="w-5 h-3.5 object-cover rounded-sm" />}
                    <span>{option.label}</span>
                  </div>
                </li>
              ))
            ) : (
              <li className="px-3 py-4 text-sm text-center text-gray-500">No countries found</li>
            )}
          </ul>
        </div>
      )}
      
      <input type="hidden" name={name} id={id} value={value} required={required} />
    </div>
  );
};

export default CountryDropdown;
