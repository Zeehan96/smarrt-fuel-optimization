import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";
import ConfirmationModal from "../common/ConfirmationModal";
import PageMainHeading from "../common/PageMainHeading";
import { getPageHeadingConfig } from "../../utils/helperFunctions";
import {
  UserMenu,
  ThemeMenu,
} from "../../generalComponents/menus";
import { useAppContext } from "../../hooks/useAppContext";

const Header = ({
  setSidebarOpen,
  setSidebarCollapsed,
  sidebarCollapsed,
  onLogout,
  onEditProfile,
  onChangePassword,
  isLoggingOut = false,
  type = "app",
}) => {
  const { user } = useAppContext();
  const isLoginHeader = type === "login";

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const { t } = useLanguage();
  const location = useLocation();

  const pageHeading = getPageHeadingConfig(
    location.pathname,
    t,
    user,
    null,
    location.state,
  );

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="px-4 sm:px-6 py-2">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-start sm:items-center gap-3 sm:gap-4 flex-1 min-w-0 w-full sm:w-auto">
            {!isLoginHeader && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex-shrink-0 mt-0.5 sm:mt-0"
              >
                <Menu className="w-6 h-6" />
              </button>
            )}

            {!isLoginHeader && (
              <button
                onClick={() => setSidebarCollapsed((prev) => !prev)}
                className="hidden lg:flex text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex-shrink-0"
                title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                <Menu className="w-6 h-6" />
              </button>
            )}

            {!isLoginHeader && pageHeading && location.pathname !== "/dashboard" && (
              <PageMainHeading
                title={pageHeading.title}
                description={pageHeading.description}
              />
            )}

            {!isLoginHeader && location.pathname === "/dashboard" && (
              <div className="flex flex-col">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Welcome back, {user?.name || "User"}!
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Here's your dashboard overview.
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1">
            <ThemeMenu />

            {!isLoginHeader && (
              <UserMenu
                user={user}
                onEditProfile={onEditProfile}
                onChangePassword={onChangePassword}
                onLogout={onLogout}
                showLogoutConfirm={showLogoutConfirm}
                setShowLogoutConfirm={setShowLogoutConfirm}
              />
            )}
          </div>
        </div>
      </div>

      {!isLoginHeader && (
        <ConfirmationModal
          isOpen={showLogoutConfirm}
          onClose={() => setShowLogoutConfirm(false)}
          onConfirm={() => {
            setShowLogoutConfirm(false);
            onLogout();
          }}
          title={t.header?.signOut || "Sign Out"}
          message={
            t.header?.logoutConfirmMessage ||
            "Are you sure you want to sign out? You will need to log in again to access your account."
          }
          confirmLabel={t.header?.signOut || "Sign Out"}
          cancelLabel={t.header?.cancel || "Cancel"}
          isLoading={isLoggingOut}
          confirmClass="bg-red-600 hover:bg-red-700 text-white"
        />
      )}
    </header>
  );
};

export default Header;
