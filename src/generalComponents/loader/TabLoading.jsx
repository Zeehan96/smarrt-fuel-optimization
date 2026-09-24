import React from "react";

export default function TabLoading({ size = "md" }) {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-20 h-20",
  };
  const spinnerSizeClasses = {
    sm: "w-5 h-5",
    md: "w-6 h-6",
  };

  return (
    <div className="mt-2">
      <div
        className={`${
          sizeClasses[size] || sizeClasses.md
        } rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 flex items-center justify-center`}
      >
        <div
          className={`${
            spinnerSizeClasses[size] || spinnerSizeClasses.md
          } border-2 border-gray-400 dark:border-white border-t-transparent rounded-full animate-spin`}
        ></div>
      </div>
    </div>
  );
}
