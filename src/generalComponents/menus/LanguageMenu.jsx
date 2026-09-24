import React, { useState, useRef, useLayoutEffect } from "react";
import { Languages } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";
import { supportedLanguages } from "../../utils/languageUtils";

const LanguageMenu = () => {
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [languageMenuStyle, setLanguageMenuStyle] = useState({});
  const [isMobileMenu, setIsMobileMenu] = useState(false);
  const languageMenuButtonRef = useRef(null);
  const languageMenuRef = useRef(null);
  const { currentLanguage, changeLanguage } = useLanguage();

  useLayoutEffect(() => {
    if (
      showLanguageMenu &&
      languageMenuButtonRef.current &&
      languageMenuRef.current
    ) {
      const viewportWidth = window.innerWidth;
      const isMobile = viewportWidth < 640; // sm breakpoint

      setIsMobileMenu(isMobile);
      if (isMobile) {
        const buttonRect =
          languageMenuButtonRef.current.getBoundingClientRect();
        const menuWidth = 192; // w-48 = 192px
        const spacing = 16;
        let left = buttonRect.right - menuWidth;
        if (left < spacing) {
          left = spacing;
        }
        if (buttonRect.right > viewportWidth - spacing) {
          left = viewportWidth - menuWidth - spacing;
        }

        setLanguageMenuStyle({
          position: "fixed",
          top: `${buttonRect.bottom + 8}px`,
          left: `${left}px`,
          right: "auto",
        });
      } else {
        setLanguageMenuStyle({
          position: "absolute",
          top: "auto",
          right: "0px",
          left: "auto",
        });
      }
    }
  }, [showLanguageMenu]);

  return (
    <>
      <div className="relative">
        <button
          ref={languageMenuButtonRef}
          onClick={() => setShowLanguageMenu(!showLanguageMenu)}
          className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100 transition-all duration-200 hover:scale-110 flex items-center gap-2"
        >
          <Languages className="w-5 h-5" />
          <span className="text-sm font-medium hidden sm:inline">
            {
              supportedLanguages.find((lang) => lang.code === currentLanguage)
                ?.flag
            }
          </span>
        </button>

        {/* Dropdown Menu */}
        {showLanguageMenu && (
          <div
            ref={languageMenuRef}
            className={`${
              isMobileMenu ? "fixed" : "absolute"
            } right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50`}
            style={languageMenuStyle}
          >
            {supportedLanguages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  changeLanguage(lang.code);
                  setShowLanguageMenu(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3 ${
                  currentLanguage === lang.code
                    ? "bg-blue-50 dark:bg-blue-900/20 text-[#006eb8] font-medium"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Click outside to close menu */}
      {showLanguageMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowLanguageMenu(false)}
        />
      )}
    </>
  );
};

export default LanguageMenu;
