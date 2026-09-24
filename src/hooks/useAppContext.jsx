import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { _register_user_api } from "../api/register";
import { _login_user_api } from "../api/login";
import { _logout_user_api } from "../api/logout";
import { enqueueSnackbar } from "notistack";

const AppContext = createContext();

const ROLES = {
  ADMIN: "admin",
  INDIVIDUAL: "individual",
  ORGANIZATIONAL: "organizational",
};

const MOCK_USERS = {
  admin: {
    _id: "user-admin-1",
    name: "System Admin",
    email: "admin@fuel.com",
    role: ROLES.ADMIN,
    permissions: {
      Dashboard: "true",
      Vehicles: "true",
      "Fuel Logs": "true",
      "Trip Planning": "true",
      "Crisis Mode": "true",
      Budget: "true",
      Analytics: "true",
      "User Management": "true",
    },
  },
  individual: {
    _id: "user-ind-1",
    name: "Ahmed Khan",
    email: "individual@fuel.com",
    role: ROLES.INDIVIDUAL,
    permissions: {
      Dashboard: "true",
      Vehicles: "true",
      "Fuel Logs": "true",
      "Trip Planning": "true",
      "Crisis Mode": "true",
      Budget: "true",
      Analytics: "true",
    },
  },
  organizational: {
    _id: "user-org-1",
    name: "Green Logistics Pvt Ltd",
    email: "org@fuel.com",
    role: ROLES.ORGANIZATIONAL,
    permissions: {
      Dashboard: "true",
      Vehicles: "true",
      "Fuel Logs": "true",
      "Trip Planning": "true",
      "Crisis Mode": "true",
      Budget: "true",
      Analytics: "true",
    },
  },
};

const CREDENTIALS = {
  "admin@fuel.com": { password: "admin", key: "admin" },
  "individual@fuel.com": { password: "individual", key: "individual" },
  "org@fuel.com": { password: "org", key: "organizational" },
};

export const AppProvider = ({ children }) => {
  const [adminData, setAdminData] = useState(() => {
    const token = localStorage.getItem("token");
    const savedAuth = localStorage.getItem("userAdmin");
    if (token && savedAuth) {
      try {
        return JSON.parse(savedAuth);
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("userAdmin");
      }
    }
    return {
      user: null,
      isAuthenticated: false,
      loading: false,
      ticketCount: 0,
    };
  });

  useEffect(() => {
    if (adminData.isAuthenticated) {
      localStorage.setItem("userAdmin", JSON.stringify(adminData));
    }
  }, [adminData]);

  useEffect(() => {
    document.title = "Smart Fuel Optimization";
  }, []);

  const login = async (credentials) => {
    try {
      // Map frontend fields to backend
      const apiBody = {
        email: credentials.email,
        password: credentials.password,
        accountType:
          credentials.role === ROLES.ADMIN
            ? "admin"
            : credentials.role === ROLES.ORGANIZATIONAL
              ? "organizational"
              : "individual",
      };

      const response = await _login_user_api(apiBody);

      const isSuccess =
        response.code === 200 ||
        response.code === 201 ||
        response.status === 200 ||
        response.status === 201 ||
        !response.code;

      if (
        isSuccess &&
        response.code !== 0 &&
        response.code !== 400 &&
        response.code !== 401 &&
        response.code !== 500
      ) {
        const apiData = response.data || response;

        // Map the backend user data to what the frontend expects
        const user = {
          ...apiData,
          name: apiData.name,
          email: apiData.email,
          role: credentials.role,
          token: apiData.token,
          profilePicture: apiData.profilePicture,
        };

        // Add mock permissions so frontend doesn't break
        user.permissions = {
          Dashboard: "true",
          Vehicles: "true",
          "Fuel Logs": "true",
          "Trip Planning": "true",
          "Crisis Mode": "true",
          Budget: "true",
          Analytics: "true",
          "User Management": user.role === ROLES.ADMIN ? "true" : "false",
        };

        const newData = {
          user,
          isAuthenticated: true,
          loading: false,
          ticketCount: 0,
        };
        localStorage.setItem("token", user.token);
        localStorage.setItem("userAdmin", JSON.stringify(newData));
        setAdminData(newData);
        return { code: 200, message: `Welcome ${user.name}!`, user };
      } else {
        return {
          code: response.code || 401,
          message: response.message || "Invalid email or password",
        };
      }
    } catch (error) {
      return {
        code: 401,
        message: error.message || "Invalid email or password",
      };
    }
  };

  const logout = async () => {
    let response;
    try {
      response = await _logout_user_api();
      if(response?.code===200||response?.status===200){
        enqueueSnackbar(response?.message,{variant:"success"})
      }else{
        enqueueSnackbar(response?.message,{variant:"error"})
      }
    } catch (error) {
      console.warn("Logout API call failed, but clearing local session anyway.", error);
      enqueueSnackbar("Logout failed",{variant:"error"})
    }
    
    localStorage.removeItem("token");
    localStorage.removeItem("userAdmin");
    setAdminData({
      user: null,
      isAuthenticated: false,
      loading: false,
      ticketCount: 0,
    });
    
    const isSuccess = response && (response.code === 200 || response.status === 200 || !response.code);
    return { success: true, code: isSuccess ? 200 : 400, message: isSuccess ? response?.message : response?.message };
  };

  const register = async (userData) => {
    try {
      // Map frontend fields to backend fields
      const apiBody = {
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        password: userData.password,
        accountType:
          userData.role === ROLES.INDIVIDUAL
            ? "Individual User"
            : "Admin",
        country: userData.country,
        phoneNumber: userData.phoneNumber,
      };

      const response = await _register_user_api(apiBody);

      const isSuccess =
        response.code === 200 ||
        response.code === 201 ||
        response.status === 200 ||
        response.status === 201 ||
        !response.code;

      if (
        isSuccess &&
        response.code !== 0 &&
        response.code !== 400 &&
        response.code !== 401 &&
        response.code !== 500
      ) {
        return {
          code: 200,
          message: response.message || "Account created successfully!",
        };
      } else {
        return {
          code: response.code || 400,
          message: response.message || "Registration failed",
        };
      }
    } catch (error) {
      return { code: 400, message: error.message || "Registration failed" };
    }
  };

  const value = {
    ...adminData,
    user: adminData.user,
    isAuthenticated: adminData.isAuthenticated,
    loading: adminData.loading,
    login,
    logout,
    register,
    updateUser: (userData) =>
      setAdminData((prev) => ({ ...prev, user: userData })),
    setLoading: (loading) => setAdminData((prev) => ({ ...prev, loading })),
    ROLES,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("useAppContext must be used within AppProvider");
  return context;
};
