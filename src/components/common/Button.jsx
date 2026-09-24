import React from "react";
import { Loader2 } from "lucide-react";

const Button = ({
  children,
  icon: Icon,
  onClick,
  variant = "primary", // primary, secondary, danger, outline, ghost
  size = "lg",
  disabled = false,
  loading = false,
  className = "",
  type = "button",
  fullWidth = false,
  ...props
}) => {
  const baseClasses =
    "rounded-md flex items-center justify-center gap-1.5 font-medium transition-all duration-200 outline-none";

  const sizeClasses = {
    sm: "px-2.5 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-sm h-9",
  };

  const finalSize = sizeClasses[size] ?? sizeClasses.lg;

  const variantClasses = {
    primary:
      "bg-[var(--primary-color)] hover:bg-[var(--primary-hover)] text-white shadow-sm hover:shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed",
    secondary:
      "bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed",
    danger:
      "bg-red-600 hover:bg-red-700 text-white shadow-sm hover:shadow-md disabled:bg-red-400 disabled:cursor-not-allowed",
    outline:
      "border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed",
    ghost:
      "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 border-0 shadow-none disabled:opacity-50 disabled:cursor-not-allowed",
  };

  const variantClass = variantClasses[variant] ?? variantClasses.primary;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${finalSize} ${variantClass} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 flex-shrink-0 animate-spin" />
      ) : (
        Icon && <Icon className="w-4 h-4 flex-shrink-0" />
      )}
      {children}
    </button>
  );
};

export default Button;
