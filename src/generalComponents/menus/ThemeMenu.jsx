import React from "react";
import { Sun, Moon } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";
import { useTheme } from "../../hooks/useTheme";

const ThemeMenu = () => {
  const { t } = useLanguage();
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white transition-all duration-200 hover:scale-110"
      title={
        isDarkMode
          ? t.header?.lightMode || "Switch to Light Mode"
          : t.header?.darkMode || "Switch to Dark Mode"
      }
    >
      {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
};

export default ThemeMenu;
