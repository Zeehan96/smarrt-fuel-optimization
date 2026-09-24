import React, { useEffect } from "react";
import { X, Filter, RotateCcw, Ticket } from "lucide-react";
import Button from "./Button";

const CustomDrawer = ({
  isOpen,
  onClose,
  onApply,
  onClear,
  title,
  children,
  applyLabel = "Apply Filter",
  clearLabel = "Clear Filters",
  applyIcon = Filter,
  clearIcon = RotateCcw,
  isSubmitting = false,
  type = "",
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-end transition-all duration-300 ${
        isOpen ? "visible" : "invisible pointer-events-none"
      }`}
    >
      <div
        className={`fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed right-0 top-0 w-full max-w-sm 
        bg-white dark:bg-gray-900 
        shadow-2xl 
        h-full 
        transform transition-transform duration-300 
        z-50 flex flex-col
        border-l border-gray-200 dark:border-gray-700
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="modal-heading">{title}</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-700 transition-all duration-200"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-4 flex-1 overflow-y-auto overflow-x-visible">
          {children}
        </div>

        <div
          className={`p-4 border-t border-gray-200 dark:border-gray-700 flex gap-2 ${onClear ? "" : "justify-end"}`}
        >
          {onClear ? (
            <>
              <div className="w-1/2">
                <Button
                  onClick={onApply}
                  icon={type === "ticket" ? Ticket : applyIcon}
                  variant="primary"
                  size="md"
                  className="w-full"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                >
                  {applyLabel}
                </Button>
              </div>
              <div className="w-1/2">
                <Button
                  onClick={onClear}
                  icon={clearIcon}
                  variant="outline"
                  size="md"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {clearLabel}
                </Button>
              </div>
            </>
          ) : (
            <div className="w-full sm:w-auto">
              <Button
                onClick={onApply}
                icon={type === "ticket" ? Ticket : applyIcon}
                variant="primary"
                size="md"
                className="w-full"
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                {applyLabel}
              </Button>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};

export default CustomDrawer;
