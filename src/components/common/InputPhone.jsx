import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import PhoneInput from "react-phone-number-validation";
import { getCountryFromPhone } from "../../utils/phoneCountryMap";

const getCountryNameFromPhone = (phoneValue) => {
  return getCountryFromPhone(phoneValue);
};

const getCountryNameFromSelectedFlag = () => {
  const flagNode = document.querySelector(".phone-input-image");
  const raw =
    flagNode?.getAttribute("title") ||
    flagNode?.getAttribute("aria-label") ||
    "";
  const text = String(raw).trim();
  if (!text) return "";

  // Common formats: "Afghanistan: +93", "Afghanistan (+93)"
  const beforeColon = text.split(":")[0]?.trim();
  if (beforeColon) return beforeColon;
  const beforeParen = text.split("(")[0]?.trim();
  return beforeParen || "";
};

const InputPhone = ({
  value = "",
  onChange,
  onCountryChange,
  label,
  name,
  required = false,
  helperText,
  fullWidth = false,
  className = "",
  error = false,
  errorMessage = "",
  ...props
}) => {
  const [phoneNumber, setPhoneNumber] = useState(value || "+92");

  const handleChangePhone = (val) => {
    const newValue = val || "";
    setPhoneNumber(newValue);
    if (onChange) onChange(newValue);
    if (onCountryChange) {
      const detectedCountry =
        getCountryNameFromPhone(newValue) || getCountryNameFromSelectedFlag();
      if (detectedCountry) onCountryChange(detectedCountry);
    }
  };

  useEffect(() => {
    if (value !== undefined) {
      setPhoneNumber(value || "+92");
    }
  }, [value]);

  useEffect(() => {
    const handleClick = () => {
      const countryList = document.querySelector(".select-div");
      const phoneContainer = document.querySelector(".phone-input-container");

      if (phoneContainer) phoneContainer.style.position = "relative";

      if (countryList) {
        const isDark = document.documentElement.classList.contains("dark");
        countryList.style.position = "absolute";
        countryList.style.zIndex = "9999";
        countryList.style.width = "100%";
        countryList.style.backgroundColor = isDark ? "#1f2937" : "white";
        countryList.style.border = isDark ? "1px solid #4b5563" : "1px solid #d1d5db";
        countryList.style.borderRadius = "0.375rem";
        countryList.style.boxShadow = "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)";
        countryList.style.marginTop = "0.25rem";
        countryList.style.maxHeight = "200px";
        countryList.style.overflowY = "auto";

        countryList.querySelectorAll(".country-div").forEach((div) => {
          div.classList.add("dark:text-white", "dark:hover:bg-gray-700");
        });

        // Add search input if it doesn't exist
        if (!document.getElementById("phone-country-search")) {
          const searchContainer = document.createElement("div");
          searchContainer.style.position = "sticky";
          searchContainer.style.top = "0";
          searchContainer.style.zIndex = "10";
          searchContainer.style.backgroundColor = isDark ? "#1f2937" : "white";
          
          const searchInput = document.createElement("input");
          searchInput.id = "phone-country-search";
          searchInput.type = "text";
          searchInput.placeholder = "Search country...";
          searchInput.className = "w-full px-3 py-2 text-sm outline-none border-b border-gray-200 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white";
          
          searchInput.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevent closing dropdown
          });
          
          searchInput.addEventListener("input", (e) => {
            const query = e.target.value.toLowerCase();
            countryList.querySelectorAll(".country-div").forEach((div) => {
              const text = div.textContent.toLowerCase();
              if (text.includes(query)) {
                div.style.display = "flex";
              } else {
                div.style.display = "none";
              }
            });
          });

          searchContainer.appendChild(searchInput);
          countryList.insertBefore(searchContainer, countryList.firstChild);
          
          // Focus the input when dropdown opens
          setTimeout(() => searchInput.focus(), 50);
        }
      }
    };

    const handleClickOutside = (event) => {
      const countryList = document.querySelector(".select-div");
      const phoneContainer = document.querySelector(".phone-input-container");
      const flagButton = document.querySelector(".phone-input-image");

      if (countryList && countryList.offsetParent !== null) {
        const isClickInsideDropdown = countryList.contains(event.target);
        const isClickInsidePhone = phoneContainer && phoneContainer.contains(event.target);
        if (!isClickInsideDropdown && !isClickInsidePhone) {
          if (flagButton) flagButton.click();
        }
      }
    };

    const checkDarkMode = () => {
      const countryList = document.querySelector(".select-div");
      if (countryList) {
        const isDark = document.documentElement.classList.contains("dark");
        countryList.style.backgroundColor = isDark ? "#1f2937" : "white";
        countryList.style.borderColor = isDark ? "#4b5563" : "#d1d5db";
      }
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("mousedown", handleClickOutside);
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("mousedown", handleClickOutside);
      observer.disconnect();
    };
  }, []);

  return (
    <div className={fullWidth ? "w-full" : ""}>
      {label && (
        <label
          htmlFor={name}
          className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      <div className="w-full relative [&_.phone-input-container]:w-full [&_.phone-input-container]:flex [&_.phone-input-container_input]:flex-1 [&_.phone-input-container_input]:w-full">
        <PhoneInput
          required
          value={phoneNumber || ""}
          setValue={setPhoneNumber}
          onChange={handleChangePhone}
          inputClass={`w-full rounded-lg border transition-all duration-200 ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 dark:border-gray-600 focus:border-[#113071] focus:ring-[#113071]"
          } bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-1 focus:outline-none py-2.5 px-4 text-sm ${className}`}
          countryCodeEditable={false}
          country="pk"
          {...props}
          placeholder=" "
        />
      </div>

      {error && errorMessage && (
        <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">{errorMessage}</p>
      )}
      {!error && helperText && (
        <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">{helperText}</p>
      )}
    </div>
  );
};

InputPhone.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onCountryChange: PropTypes.func,
  label: PropTypes.string,
  name: PropTypes.string,
  required: PropTypes.bool,
  helperText: PropTypes.string,
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
};

export default InputPhone;
