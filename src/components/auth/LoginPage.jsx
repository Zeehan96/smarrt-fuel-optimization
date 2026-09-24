import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AlertCircle, Eye, EyeOff, Lock, Mail } from "lucide-react";
import Button from "../../components/common/Button";

const LoginPage = ({ onLogin, isLoading = false, error }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [role, setRole] = useState("individual");

  const roles = [
    { label: "Admin", value: "admin" },
    { label: "User", value: "individual" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password, role });
  };

  return (
    <div className="w-full h-screen overflow-y-auto bg-gray-50 dark:bg-gray-900 flex justify-center items-start p-4">
      <div className="w-full max-w-4xl my-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col md:flex-row md:min-h-[520px]">

        {/* Left panel — hidden on mobile only, full on md+ */}
        <div className="hidden md:flex md:w-[45%] bg-[var(--primary-color)] flex-col items-center justify-center px-10 py-12 relative overflow-hidden">
          {/* subtle bg circles */}
          <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-white/10" />
          <div className="absolute -bottom-20 -right-10 w-72 h-72 rounded-full bg-white/10" />

          <div className="relative z-10 flex flex-col items-center text-center gap-5">
            <img
              src="/smart-fuel-without-bg.svg"
              alt="Smart Fuel"
              className="h-28 w-auto object-contain drop-shadow-md"
            />
            <div>
              <h1 className="text-2xl font-extrabold text-white leading-tight">
                Welcome Back,
              </h1>
              <p className="text-white/90 text-sm mt-1 font-medium">
                Smart Fuel Optimization Admin
              </p>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="flex-1 flex flex-col justify-center px-6 py-10 md:px-12">
          <div className="w-full max-w-sm mx-auto">

            {/* Logo — only on mobile (left panel hidden on mobile) */}
            <div className="flex md:hidden flex-col items-center mb-7">
              <div className="w-20 h-20 rounded-2xl bg-[var(--primary-color)] flex items-center justify-center mb-3 shadow-md">
                <img
                  src="/smart-fuel-without-bg.svg"
                  alt="Smart Fuel"
                  className="h-12 w-auto object-contain"
                />
              </div>
              <p className="text-xs font-semibold text-gray-400 tracking-wide uppercase">
                Smart Fuel Optimization Admin
              </p>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Welcome back
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Sign in to your account
              </p>
            </div>

            {/* Quick Login Chips */}
            <div className="mb-6">
              <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                Login As:
              </p>
              <div className="flex gap-2">
                {roles.map((r) => {
                  const active = role === r.value;
                  return (
                    <button
                      key={r.value}
                      type="button"
                      onClick={() => setRole(r.value)}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm font-bold border transition-all text-center ${
                        active
                          ? "border-[var(--primary-color)] bg-[var(--primary-light)] text-[var(--primary-color)] dark:bg-[var(--primary-color)]/20"
                          : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600"
                      }`}
                    >
                      {r.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm mb-5 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg px-3 py-2.5">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    autoComplete="email"
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg outline-none bg-white dark:bg-gray-700 dark:text-white placeholder-gray-400 focus:border-[var(--primary-color)] dark:focus:border-[var(--primary-color)] transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="w-full pl-10 pr-10 py-2.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg outline-none bg-white dark:bg-gray-700 dark:text-white placeholder-gray-400 focus:border-[var(--primary-color)] dark:focus:border-[var(--primary-color)] transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading || !email || !password}
                className="w-full py-2.5 mt-2"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-[var(--primary-color)] hover:underline font-medium"
              >
                Create Account
              </Link>
            </p>

            <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-8 text-center font-medium">
              &copy; Smart Fuel Optimization {new Date().getFullYear()}. All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
