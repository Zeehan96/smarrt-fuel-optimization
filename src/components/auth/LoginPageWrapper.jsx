import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import { useAppContext } from "../../hooks/useAppContext";
import { useSnackbar } from "notistack";

const LoginPageWrapper = () => {
  const { login, isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const handleLogin = async ({ email, password, role }) => {
    setIsLoading(true);
    setError("");

    if (!email || !password) {
      const msg = "Please enter both email and password";
      setError(msg);
      enqueueSnackbar(msg, { variant: "error" });
      setIsLoading(false);
      return;
    }

    const response = await login({ email, password, role });
    if (response.code === 200) {
      enqueueSnackbar(response.message || "Login successful", {
        variant: "success",
        autoHideDuration: 3000,
      });
      setTimeout(() => setIsLoading(false), 100);
    } else {
      setError(response.message);
      enqueueSnackbar(response.message, { variant: "error" });
      setIsLoading(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <LoginPage onLogin={handleLogin} isLoading={isLoading} error={error} />
  );
};

export default LoginPageWrapper;
