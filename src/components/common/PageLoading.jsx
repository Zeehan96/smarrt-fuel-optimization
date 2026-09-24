import React from "react";

const PageLoading = ({
  message = "Loading...",
  size = "large",
  className = "",
  showMessage = true,
}) => {
  const getSizeConfig = () => {
    switch (size) {
      case "small":
        return {
          spinnerSize: "w-6 h-6",
          borderWidth: "border-2",
          textSize: "text-sm",
          containerPadding: "py-8",
          gap: "gap-2",
        };
      case "medium":
        return {
          spinnerSize: "w-8 h-8",
          borderWidth: "border-2",
          textSize: "text-base",
          containerPadding: "py-12",
          gap: "gap-3",
        };
      case "large":
      default:
        return {
          spinnerSize: "w-12 h-12",
          borderWidth: "border-4",
          textSize: "text-lg",
          containerPadding: "py-16",
          gap: "gap-4",
        };
    }
  };

  const config = getSizeConfig();

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-[200px] ${config.containerPadding} ${className}`}
    >
      <div className={`flex flex-col items-center ${config.gap}`}>
        <div className="relative">
          <div
            className={`${config.spinnerSize} ${config.borderWidth} border-gray-200 border-t-[#113071] rounded-full animate-spin`}
          ></div>
          <div className="absolute inset-0 rounded-full bg-[#113071]/10 animate-ping"></div>
        </div>

        {showMessage && (
          <div className="text-center">
            <p
              className={`${config.textSize} text-gray-600 dark:text-gray-300 font-medium animate-pulse`}
            >
              {message}
            </p>
            {/* Optional dots animation */}
            <div className="flex justify-center mt-2 space-x-1">
              <div className="w-1 h-1 bg-[#113071] rounded-full animate-bounce"></div>
              <div className="w-1 h-1 bg-[#113071] rounded-full animate-bounce"></div>
              <div className="w-1 h-1 bg-[#113071] rounded-full animate-bounce"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PageLoading;
