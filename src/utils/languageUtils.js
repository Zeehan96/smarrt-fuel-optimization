// Supported Languages
export const supportedLanguages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "ur", name: "اردو", flag: "🇵🇰" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "es", name: "Español", flag: "🇪🇸" },
];

// Get language name by code
export const getLanguageName = (code) => {
  const language = supportedLanguages.find((lang) => lang.code === code);
  return language ? language.name : "English";
};

// Get language flag by code
export const getLanguageFlag = (code) => {
  const language = supportedLanguages.find((lang) => lang.code === code);
  return language ? language.flag : "🇬🇧";
};
