import React from "react";

const ToggleSwitch = ({
  checked,
  onChange,
  disabled = false,
  size = "default",
  color = "#006eb8",
}) => {
  const thumbSizeClasses = {
    small: "h-3 w-3",
    default: "h-4 w-4",
    large: "h-6 w-6",
  };

  const translateClasses = {
    small: checked ? "translate-x-3" : "translate-x-0.5",
    default: checked ? "translate-x-6" : "translate-x-1",
    large: checked ? "translate-x-7" : "translate-x-1",
  };

  const trackStyle = {
    backgroundColor: checked ? color : undefined,
  };

  return (
    <button
      type="button"
      onClick={onChange}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none disabled:cursor-not-allowed ${
        !checked && "bg-gray-200 dark:bg-gray-600"
      }`}
      style={trackStyle}
    >
      <span
        className={`inline-block ${thumbSizeClasses[size]} transform rounded-full bg-white transition duration-200 ease-in-out ${translateClasses[size]}`}
      />
    </button>
  );
};

export default ToggleSwitch;
