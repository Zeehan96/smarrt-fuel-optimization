import React from "react";

const PageMainHeading = ({ title, description, className = "" }) => {
  return (
    <div className={`min-w-0 flex-1 ${className}`}>
      <h1 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white break-words line-clamp-2 sm:line-clamp-none">
        {title}
      </h1>
      {description && (
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5 break-words line-clamp-2 sm:line-clamp-none">
          {description}
        </p>
      )}
    </div>
  );
};

export default PageMainHeading;
