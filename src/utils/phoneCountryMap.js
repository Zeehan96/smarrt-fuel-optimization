import { getCountries, getCountryCallingCode } from "libphonenumber-js";

const FALLBACK_PHONE_COUNTRY = [
  { code: "+255", country: "Tanzania" },
  { code: "+92", country: "Pakistan" },
  { code: "+93", country: "Afghanistan" },
  { code: "+351", country: "Portugal" },
  { code: "+993", country: "Turkmenistan" },
];

const regionNames =
  typeof Intl !== "undefined" && typeof Intl.DisplayNames === "function"
    ? new Intl.DisplayNames(["en"], { type: "region" })
    : null;

const isoToCountryName = (iso2) => {
  if (!iso2) return "";
  if (!regionNames) return String(iso2).toUpperCase();
  return regionNames.of(String(iso2).toUpperCase()) || String(iso2).toUpperCase();
};

export const PHONE_TO_COUNTRY = (() => {
  try {
    const seen = new Set();
    const rows = [];
    for (const iso of getCountries()) {
      const dial = getCountryCallingCode(iso);
      if (!dial) continue;
      const code = `+${dial}`;
      const country = isoToCountryName(iso);
      const key = `${code}|${country}`;
      if (seen.has(key)) continue;
      seen.add(key);
      rows.push({ code, country });
    }
    if (!rows.length) return FALLBACK_PHONE_COUNTRY;
    return rows.sort((a, b) => b.code.length - a.code.length);
  } catch (_err) {
    return FALLBACK_PHONE_COUNTRY;
  }
})();

export const getCountryFromPhone = (phone) => {
  if (!phone) return "";
  const normalized = String(phone).trim();
  for (const { code, country } of PHONE_TO_COUNTRY) {
    if (normalized.startsWith(code)) return country;
  }
  return "";
};
