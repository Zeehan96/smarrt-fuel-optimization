import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { useAppContext } from "../../hooks/useAppContext";
import {
  getRoutePermission,
  getFirstAvailableRoute,
} from "../../utils/routePermissions";

const RouteWrapper = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useAppContext();
  const token = localStorage.getItem("token");

  useEffect(() => {
    // If there's no token, go back to login.
    if (!token) {
      localStorage.removeItem("userAdmin");
      navigate("/", { replace: true });
      return;
    }

    // If token exists but auth state is still updating (right after login),
    // avoid redirect loops; just wait for `isAuthenticated` to become true.
    if (!isAuthenticated) return;

    // if user is an supr admin than no need to check route base permissions
    if (user?.role === "super_admin") {
      return;
    }

    // Get the required permission for the current route
    const requiredPermission = getRoutePermission(location.pathname);

    if (requiredPermission) {
      const userPermissions = user?.permissions || {};
      const hasPermission = userPermissions[requiredPermission] === "true";
      if (!hasPermission) {
        enqueueSnackbar("You don't have access to this permission", {
          variant: "error",
        });
        const firstAvailableRoute = getFirstAvailableRoute(userPermissions);
        navigate(firstAvailableRoute, { replace: true });
        return;
      }
    }
  }, [token, isAuthenticated, user, location.pathname, navigate]);

  if (!token) return null;
  if (!isAuthenticated) return null;
  // Render children if authenticated and has permission
  return children;
};

export default RouteWrapper;
