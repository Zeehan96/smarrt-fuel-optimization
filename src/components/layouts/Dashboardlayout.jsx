import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";
import { useAppContext } from "../../hooks/useAppContext.jsx";
import { useSnackbar } from "notistack";

const DashboardLayout = () => {
  const { logout, loading } = useAppContext();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      if (result.code === 200||result.status===200) {
        enqueueSnackbar(result.message || "Logged out successfully", { variant: "success" });
      }
      navigate("/");
    }
  };

  return (
    <div className="h-screen w-screen flex overflow-hidden">
      <div className="bg-gray-50 dark:bg-gray-900 transition-colors duration-200 flex-1 flex overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} sidebarCollapsed={sidebarCollapsed} />

        <div className="flex-1 flex flex-col overflow-hidden">
          <Header
            setSidebarOpen={setSidebarOpen}
            setSidebarCollapsed={setSidebarCollapsed}
            sidebarCollapsed={sidebarCollapsed}
            onLogout={handleLogout}
            onEditProfile={() => navigate("/edit-profile")}
            onChangePassword={() => navigate("/profile/change-password")}
            isLoggingOut={loading}
          />

          <main className="flex-1 p-4 sm:p-6 overflow-y-auto pb-20 sm:pb-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
