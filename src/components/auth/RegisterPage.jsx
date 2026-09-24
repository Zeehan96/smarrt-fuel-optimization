import React, { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  Shield,
  UserCircle,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import Button from "../common/Button";
import CountryDropdown, { COUNTRY_DROPDOWN_OPTIONS } from "../common/CountryDropdown";
import InputPhone from "../common/InputPhone";
import { useAppContext } from "../../hooks/useAppContext";
import { useSnackbar } from "notistack";
import { getCountryCallingCode } from "libphonenumber-js";

const RegisterPage = () => {
  const { register, isAuthenticated, ROLES } = useAppContext();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    phoneNumber: "",
    role: ROLES.INDIVIDUAL,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleCountryChange = (val) => {
    const opt = COUNTRY_DROPDOWN_OPTIONS.find((o) => o.value === val);
    let dialCode = "";
    if (opt?.code) {
      try {
        const callingCode = getCountryCallingCode(opt.code.toUpperCase());
        if (callingCode) {
          dialCode = `+${callingCode}`;
        }
      } catch (err) {
        console.warn("Could not get calling code for:", opt.code);
      }
    }

    setForm((prev) => {
      let newPhone = dialCode || prev.phoneNumber;
      if (dialCode && prev.phoneNumber) {
        const digits = prev.phoneNumber.replace(/^\+\d+\s*/, "");
        newPhone = digits ? `${dialCode} ${digits}` : dialCode;
      }
      return {
        ...prev,
        country: val,
        phoneNumber: newPhone,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match. Please confirm your password.");
      return;
    }

    setIsLoading(true);
    const res = await register(form);
    if (res.code === 200 || res.code === 201) {
      enqueueSnackbar(res.message, { variant: "success" });
      navigate("/");
    } else {
      setError(res.message);
    }
    setIsLoading(false);
  };

  const roleOptions = [
    { value: ROLES.INDIVIDUAL, label: "Individual User", icon: UserCircle },
    {
      value: ROLES.ADMIN,
      label: "Admin User",
      icon: Shield,
    },
  ];

  return (
    <div className="w-full h-screen overflow-y-auto bg-gray-50 dark:bg-gray-900 flex justify-center items-start p-4">
      <div className="w-full max-w-5xl my-auto transition-all duration-500 ease-in-out bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col md:flex-row md:min-h-[520px]">
        {/* Left panel — hidden on mobile only, full on md+ */}
        <div className="hidden md:flex md:w-[40%] bg-[var(--primary-color)] flex-col items-center justify-center px-10 py-12 relative overflow-hidden">
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
                Join Us,
              </h1>
              <p className="text-white/90 text-sm mt-1 font-medium">
                Smart Fuel Optimization
              </p>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="flex-1 flex flex-col justify-center px-6 py-10 md:px-12 transition-all duration-500">
          <div className="w-full max-w-lg mx-auto transition-all duration-500">
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
                Smart Fuel Optimization
              </p>
            </div>

            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-[var(--primary-color)] transition-colors mb-5 group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
              <span>Back to Sign In</span>
            </Link>

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Create Account
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Start optimizing your fuel consumption
              </p>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm mb-5 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg px-3 py-2.5">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                {/* First Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={form.first_name}
                      onChange={handleChange("first_name")}
                      placeholder="First name"
                      className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg outline-none bg-white dark:bg-gray-700 dark:text-white placeholder-gray-400 focus:border-[var(--primary-color)] dark:focus:border-[var(--primary-color)] transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Last Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={form.last_name}
                      onChange={handleChange("last_name")}
                      placeholder="Last name"
                      className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg outline-none bg-white dark:bg-gray-700 dark:text-white placeholder-gray-400 focus:border-[var(--primary-color)] dark:focus:border-[var(--primary-color)] transition-colors"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={handleChange("email")}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg outline-none bg-white dark:bg-gray-700 dark:text-white placeholder-gray-400 focus:border-[var(--primary-color)] dark:focus:border-[var(--primary-color)] transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Password & Confirm Password */}
              <div className="grid grid-cols-2 gap-4">
                {/* Password */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={handleChange("password")}
                      placeholder="Create a password"
                      className="w-full pl-10 pr-10 py-2.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg outline-none bg-white dark:bg-gray-700 dark:text-white placeholder-gray-400 focus:border-[var(--primary-color)] dark:focus:border-[var(--primary-color)] transition-colors"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                      {showPassword ? (
                        <Eye className="w-4 h-4" />
                      ) : (
                        <EyeOff className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={form.confirmPassword}
                      onChange={handleChange("confirmPassword")}
                      placeholder="Confirm password"
                      className="w-full pl-10 pr-10 py-2.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg outline-none bg-white dark:bg-gray-700 dark:text-white placeholder-gray-400 focus:border-[var(--primary-color)] dark:focus:border-[var(--primary-color)] transition-colors"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                      {showConfirmPassword ? (
                        <Eye className="w-4 h-4" />
                      ) : (
                        <EyeOff className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Country */}
                <div className="flex flex-col">
                  <CountryDropdown
                    value={form.country}
                    onChange={handleCountryChange}
                    required={true}
                  />
                </div>

                {/* Phone Number */}
                <div className="flex flex-col">
                  <InputPhone
                    label="Phone Number"
                    value={form.phoneNumber}
                    onChange={(val) =>
                      setForm((prev) => ({ ...prev, phoneNumber: val }))
                    }
                    required={true}
                    fullWidth={true}
                  />
                </div>
              </div>

              {/* Account Type */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Account Type <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {roleOptions.map((opt) => {
                    const Icon = opt.icon;
                    const selected = form.role === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() =>
                          setForm((prev) => ({ ...prev, role: opt.value }))
                        }
                        className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all text-sm font-medium ${
                          selected
                            ? "border-[var(--primary-color)] bg-[var(--primary-light)] text-[var(--primary-color)] dark:bg-[var(--primary-color)]/10"
                            : "border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:border-gray-300"
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 mt-2"
              >
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </form>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
              Already have an account?{" "}
              <Link
                to="/"
                className="text-[var(--primary-color)] hover:underline font-medium"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
