import { Navigate } from "react-router-dom";
import { useAppContext } from "../../hooks/useAppContext";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // For this trimmed/local setup, we primarily rely on token existence.
  // `isAuthenticated` can briefly lag right after login causing a redirect back
  // to `/` (login page). Token is set immediately on successful login.
  if (!token) {
    localStorage.removeItem("userAdmin");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
