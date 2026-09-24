import React, { useMemo } from "react";

const CustomPopover = ({
  isOpen,
  options = [],
  onOptionClick,
  style,
  onRef,
}) => {
  // Merge dynamic style prop with static overflow styles using useMemo
  const mergedStyle = useMemo(() => {
    if (!style) return null;
    return {
      ...style,
      overflowY: "auto",
      WebkitOverflowScrolling: "touch",
    };
  }, [style]);

  if (!isOpen || !mergedStyle) return null;

  return (
    <div
      ref={onRef}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 overflow-y-auto overscroll-contain"
      style={mergedStyle}
    >
      {options.map((option, idx) => (
        <React.Fragment key={idx}>
          {option.divider ? (
            <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
          ) : (
            <button
              onClick={(e) => onOptionClick(option.action, e)}
              className={
                option.className ||
                "w-full text-left px-4 py-3 sm:py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 active:bg-gray-200 dark:active:bg-gray-600 flex items-center transition-colors touch-manipulation"
              }
            >
              {option.icon && (
                <span className="mr-3 flex-shrink-0">
                  {React.cloneElement(option.icon, {
                    className: "w-4 h-4 sm:w-4 sm:h-4",
                  })}
                </span>
              )}
              <span className="whitespace-normal break-words">
                {option.label}
              </span>
            </button> 
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default CustomPopover;
