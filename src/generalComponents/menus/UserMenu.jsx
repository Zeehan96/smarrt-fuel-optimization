import React, { useState, useRef, useLayoutEffect } from "react";
import { User, Key, LogOut } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";
import { show_proper_words } from "../../utils/constant";
import { s3BaseUrl } from "../../config/config";

const UserMenu = ({
  user,
  onEditProfile,
  onChangePassword,
  onLogout,
  showLogoutConfirm,
  setShowLogoutConfirm,
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [userMenuStyle, setUserMenuStyle] = useState({});
  const [isMobileMenu, setIsMobileMenu] = useState(false);
  const userMenuButtonRef = useRef(null);
  const userMenuRef = useRef(null);
  const { t } = useLanguage();

  useLayoutEffect(() => {
    if (showUserMenu && userMenuButtonRef.current && userMenuRef.current) {
      const viewportWidth = window.innerWidth;
      const isMobile = viewportWidth < 640; // sm breakpoint

      setIsMobileMenu(isMobile);
      if (isMobile) {
        const buttonRect = userMenuButtonRef.current.getBoundingClientRect();
        const menuWidth = 192; // w-48 = 192px
        const spacing = 16;
        let left = buttonRect.right - menuWidth;
        if (left < spacing) {
          left = spacing;
        }
        if (buttonRect.right > viewportWidth - spacing) {
          left = viewportWidth - menuWidth - spacing;
        }

        setUserMenuStyle({
          position: "fixed",
          top: `${buttonRect.bottom + 8}px`,
          left: `${left}px`,
          right: "auto",
        });
      } else {
        setUserMenuStyle({
          position: "absolute",
          top: "auto",
          right: "0px",
          left: "auto",
        });
      }
    }
  }, [showUserMenu]);

  const getUserInitial = (name) => {
    if (!name) return "A";
    return name.charAt(0).toUpperCase();
  };

  const displayName = user?.name || `${user?.first_name || ""} ${user?.last_name || ""}`.trim() || "Admin User";

  return (
    <>
      <div className="relative">
        <button
          ref={userMenuButtonRef}
          onClick={() => setShowUserMenu(!showUserMenu)}
          className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          {user?.profile_image ? (
            <img
              className="w-[36px] h-[36px] rounded-full cursor-pointer"
              alt={displayName}
              src={s3BaseUrl + user?.profile_image}
            />
          ) : (
            <div className="w-[36px] h-[36px] rounded-full bg-gray-400 flex items-center justify-center">
              <span className="text-white font-medium">
                {getUserInitial(user?.first_name || user?.name)}
              </span>
            </div>
          )}
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              {displayName}
            </span>
            <p className="text-xs text-blue-600 dark:text-blue-400">
              {show_proper_words(user?.role)}
            </p>
          </div>
        </button>

        {/* Dropdown Menu */}
        {showUserMenu && (
          <div
            ref={userMenuRef}
            className={`${
              isMobileMenu ? "fixed" : "absolute"
            } mt-2 w-48 max-w-[calc(100vw-2rem)] sm:w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50`}
            style={userMenuStyle}
          >
            <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {displayName}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {user?.email || user?.user_id?.email || "-"}
              </p>
            </div>

            <button
              onClick={() => {
                setShowUserMenu(false);
                onEditProfile();
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
            >
              <User className="w-4 h-4 mr-3" />
              {t.header?.editProfile || "Edit Profile"}
            </button>

            <button
              onClick={() => {
                setShowUserMenu(false);
                onChangePassword();
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
            >
              <Key className="w-4 h-4 mr-3" />
              {t.header?.changePassword || "Change Password"}
            </button>

            <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>

            <button
              onClick={() => {
                setShowUserMenu(false);
                setShowLogoutConfirm(true);
              }}
              className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center"
            >
              <LogOut className="w-4 h-4 mr-3" />
              {t.header?.signOut || "Sign Out"}
            </button>
          </div>
        )}
      </div>

      {/* Click outside to close menu */}
      {showUserMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </>
  );
};

export default UserMenu;
