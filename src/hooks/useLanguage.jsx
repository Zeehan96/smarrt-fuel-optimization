/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import { getLanguageContent } from "../config/languageContent";

// Default value to prevent errors during initialization
const defaultLanguage = "en";
const defaultContent = getLanguageContent(defaultLanguage);
const defaultContextValue = {
  currentLanguage: defaultLanguage,
  changeLanguage: () => {},
  content: defaultContent,
  t: defaultContent,
};

const LanguageContext = createContext(defaultContextValue);

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem("appLanguage");
    return savedLanguage || "en";
  });

  useEffect(() => {
    localStorage.setItem("appLanguage", currentLanguage);
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  const changeLanguage = (languageCode) => {
    setCurrentLanguage(languageCode);
  };

  const content = getLanguageContent(currentLanguage);

  const value = {
    currentLanguage,
    changeLanguage,
    content,
    t: content,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  
  // With default value, context should always be available
  // But if for some reason it's not, return default to prevent crashes
  if (!context) {
    // During development, log a warning but don't crash
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "useLanguage hook called outside LanguageProvider. Using default language."
      );
    }
    // Return default context to prevent crashes
    return defaultContextValue;
  }
  
  return context;
};
