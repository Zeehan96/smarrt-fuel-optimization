import { X } from "lucide-react";
import { useEffect } from "react";
import Button from "./Button";

const FormModal = ({ isOpen, onClose, title, children, className = "", hideCloseButton = false, footer = null }) => {
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

  if (!isOpen) return null;

  const defaultClasses =
    "bg-white dark:bg-gray-800 w-[96%] sm:w-full sm:max-w-2xl max-h-[85vh] sm:max-h-[90vh] rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col";
  const finalClasses = className ? className : defaultClasses;

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all duration-300 top-0 common-modal py-3 sm:py-0">
      <div
        className={`${finalClasses} min-h-0 transform transition-all duration-300 scale-100`}
      >
        <div className="flex-shrink-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-2 flex justify-between items-center rounded-t-2xl z-10">
          <h2 className="modal-heading">{title}</h2>
          {!hideCloseButton && (
            <Button
              type="button"
              variant="ghost"
              size="md"
              onClick={onClose}
              className="!p-2 min-h-0 min-w-0 rounded-full text-gray-400 hover:!text-gray-600 dark:hover:!text-gray-300 hover:!bg-gray-100 dark:hover:!bg-gray-700"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </Button>
          )}
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-6 py-5">
          {children}
        </div>
        {footer && (
          <div className="flex-shrink-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-6 py-3 flex justify-end items-center rounded-b-2xl z-10">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormModal;
