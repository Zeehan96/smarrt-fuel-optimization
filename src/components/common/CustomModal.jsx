import { X } from "lucide-react";
import { useEffect } from "react";

const CustomModal = ({
  isOpen,
  onClose,
  title,
  children,
  footerActions,
  maxHeight,
  widthClass,
  hideCloseButton = false,
  blurBackground = false,
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

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-[9998] flex items-center justify-center transition-all duration-300 common-modal py-3 sm:py-0 ${
        blurBackground
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md"
          : "bg-black/40 backdrop-blur-sm"
      }`}
    >
      {!hideCloseButton && (
        <div className="absolute inset-0" onClick={onClose}></div>
      )}

      <div
        className={`relative bg-white dark:bg-gray-800 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] ${
          widthClass || "w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] xl:max-w-5xl"
        } ${
          maxHeight || "max-h-[85vh] sm:max-h-[92vh]"
        } flex flex-col border-2 border-gray-100 dark:border-gray-700 transform transition-all duration-300 scale-100 mx-2 sm:mx-4`}
      >
        <div className="flex-shrink-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-2 flex justify-between items-center rounded-t-3xl">
          <h3 className="modal-heading">{title}</h3>
          {!hideCloseButton && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full p-2 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-50/30 dark:bg-gray-900/20">
          <div className="px-6 py-5">{children}</div>
        </div>

        {footerActions ? (
          <div className="flex-shrink-0 bg-white dark:bg-gray-800 px-6 py-3 border-t border-gray-200 dark:border-gray-700 rounded-b-3xl">
            {footerActions}
          </div>
        ) : (
          <div className="flex-shrink-0 bg-white dark:bg-gray-800 px-6 py-3 flex justify-end border-t border-gray-200 dark:border-gray-700 rounded-b-3xl">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 bg-[var(--primary-500)] hover:bg-[var(--primary-600)] text-white rounded-lg text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomModal;
