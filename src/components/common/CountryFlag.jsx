import { COUNTRY_DROPDOWN_OPTIONS } from "./CountryDropdown";
import * as Flags from "country-flag-icons/react/3x2";

/**
 * Renders a flag SVG + country name using country-flag-icons/react/3x2
 * Usage: <CountryFlag countryName="Pakistan" />
 */
const CountryFlag = ({ countryName, showName = true, className = "" }) => {
  if (!countryName) return <span className="text-gray-400">—</span>;

  const opt = COUNTRY_DROPDOWN_OPTIONS.find((o) => o.value === countryName);
  const code = opt?.code?.toUpperCase();
  const FlagComponent = code ? Flags[code] : null;

  return (
    <span className={`flex items-center gap-2 ${className}`}>
      {FlagComponent && (
        <FlagComponent className="w-5 h-3.5 flex-shrink-0 rounded-sm" />
      )}
      {showName && (
        <span className="text-sm text-gray-900 dark:text-gray-100">{countryName}</span>
      )}
    </span>
  );
};

export default CountryFlag;
