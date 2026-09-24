import { useEffect } from "react";
import {
  AlertTriangle,
  Loader2,
  X,
  Trash2,
  Trash,
  Archive,
  RotateCcw,
  AlertCircle,
} from "lucide-react";
import Button from "./Button";

const ConfirmActionModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  isLoading = false,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  confirmClass = "bg-red-600 hover:bg-red-700 text-white",
  restoreStyle = false,
  actionType = "default", // "delete", "permanentDelete", "restore", "archive", "subscription", "default"
  subscriptionData = null, // For subscription type
  hideAlertConfig = false,
}) => {
  // Alert configurations based on action type
  const getAlertConfig = () => {
    switch (actionType) {
      case "delete":
        return {
          icon: Trash,
          bgColor: "bg-amber-50 dark:bg-amber-900/20",
          borderColor: "border-l-amber-500 dark:border-l-amber-400",
          iconColor: "text-amber-700 dark:text-amber-400",
          iconBg: "bg-amber-100 dark:bg-amber-900/50",
          title: "Soft Delete Warning",
          message:
            "This item will be moved to trash. You can restore it later if needed.",
        };
      case "permanentDelete":
        return {
          icon: AlertCircle,
          bgColor: "bg-red-50 dark:bg-red-900/20",
          borderColor: "border-l-red-600 dark:border-l-red-500",
          iconColor: "text-red-700 dark:text-red-400",
          iconBg: "bg-red-100 dark:bg-red-900/50",
          title: "Permanent Delete Warning",
          message:
            "This action is IRREVERSIBLE! The data will be permanently deleted from the system and cannot be recovered.",
        };
      case "restore":
        return {
          icon: RotateCcw,
          bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
          borderColor: "border-l-emerald-500 dark:border-l-emerald-400",
          iconColor: "text-emerald-700 dark:text-emerald-400",
          iconBg: "bg-emerald-100 dark:bg-emerald-900/50",
          title: "Restore Confirmation",
          message:
            "This item will be restored and will be available for use again.",
        };
      case "archive":
        return {
          icon: Archive,
          bgColor: "bg-blue-50 dark:bg-blue-900/20",
          borderColor: "border-l-blue-500 dark:border-l-blue-400",
          iconColor: "text-blue-700 dark:text-blue-400",
          iconBg: "bg-blue-100 dark:bg-blue-900/50",
          title: "Archive Notice",
          message: "This item will be archived and hidden from the main view.",
        };
      case "subscription":
        return {
          icon: AlertCircle,
          bgColor: "bg-amber-50 dark:bg-amber-900/20",
          borderColor: "border-l-amber-500 dark:border-l-amber-400",
          iconColor: "text-amber-700 dark:text-amber-400",
          iconBg: "bg-amber-100 dark:bg-amber-900/50",
          title: "Subscription Cancellation",
          message: "Choose how you want to cancel this subscription.",
        };
      default:
        return null;
    }
  };

  const alertConfig = getAlertConfig();
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
    <div className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm flex items-center justify-center transition-all duration-300 common-modal">
      <div
        className="absolute inset-0"
        onClick={isLoading ? undefined : onClose}
      ></div>

      <div
        className={`relative bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl w-[95%] sm:w-[448px] shadow-2xl border-2 mx-auto common-modal ${
          restoreStyle
            ? "border-green-400"
            : "border-gray-200 dark:border-gray-700"
        } transform transition-all duration-300 scale-100 max-h-[90vh] overflow-y-auto`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-2 sm:py-2 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
            <div
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                restoreStyle
                  ? "bg-green-100 dark:bg-green-900/30"
                  : "bg-red-100 dark:bg-red-900/30"
              }`}
            >
              <AlertTriangle
                className={`w-4 h-4 sm:w-5 sm:h-5 ${
                  restoreStyle
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white truncate">
              {title}
            </h2>
          </div>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full p-1.5 sm:p-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 ml-2"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-4 sm:px-6 py-4 sm:py-5">
          {/* Professional Alert Box */}
          {!hideAlertConfig && alertConfig && (
            <div
              className={`mb-4 sm:mb-5 p-3 sm:p-4 rounded-lg sm:rounded-xl border-l-4 ${alertConfig.bgColor} ${alertConfig.borderColor} shadow-sm`}
              role="alert"
            >
              <div className="flex items-start gap-2 sm:gap-3">
                <div
                  className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-lg ${alertConfig.iconBg} flex items-center justify-center shadow-sm`}
                >
                  <alertConfig.icon
                    className={`w-4 h-4 sm:w-5 sm:h-5 ${alertConfig.iconColor}`}
                    strokeWidth={2.5}
                  />
                </div>
                <div className="flex-1 pt-0.5 min-w-0">
                  <p className="text-xs sm:text-sm leading-relaxed text-gray-700 dark:text-gray-300 font-medium">
                    {alertConfig.message}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Main Message */}
          <div className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
            {message}
          </div>

          {/* Subscription Data (if actionType is subscription) */}
          {actionType === "subscription" && subscriptionData && (
            <div className="mt-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 sm:p-4 space-y-2">
              <div className="flex justify-between items-start gap-2">
                <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  Firm:
                </span>
                <span className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white text-right break-words">
                  {subscriptionData.firm?.firm_name || "N/A"}
                </span>
              </div>
              <div className="flex justify-between items-start gap-2">
                <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  Plan:
                </span>
                <span className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white text-right break-words">
                  {subscriptionData.payment_plan?.plan_name || "N/A"}
                </span>
              </div>
              <div className="flex justify-between items-center gap-2">
                <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  Status:
                </span>
                <div className="flex-shrink-0">
                  {subscriptionData.statusBadge}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 dark:bg-gray-700/50 rounded-b-xl sm:rounded-b-2xl border-t border-gray-200 dark:border-gray-700">
          {actionType === "subscription" ? (
            <>
              <Button
                onClick={onClose}
                disabled={isLoading}
                className="w-full sm:w-auto px-4 py-2 sm:px-3 sm:py-1.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                variant="secondary"
              >
                Cancel
              </Button>
              <Button
                onClick={() => onConfirm(false)}
                disabled={isLoading}
                className="w-full sm:w-auto px-4 py-2 sm:px-3 sm:py-1.5 rounded-lg text-sm font-medium transition-colors bg-orange-600 hover:bg-orange-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Cancel Subscription"
                )}
              </Button>
              <Button
                onClick={() => onConfirm(true)}
                disabled={isLoading}
                className="w-full sm:w-auto px-4 py-2 sm:px-3 sm:py-1.5 rounded-lg text-sm font-medium transition-colors bg-red-600 hover:bg-red-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Cancel Immediately"
                )}
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={onClose}
                disabled={isLoading}
                className="w-full sm:w-auto px-4 py-2 sm:px-3 sm:py-1.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                variant="secondary"
              >
                {cancelLabel}
              </Button>
              <Button
                onClick={onConfirm}
                disabled={isLoading}
                className={`w-full sm:w-auto px-4 py-2 sm:px-3 sm:py-1.5 rounded-lg text-sm font-medium transition-colors ${confirmClass} disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  confirmLabel
                )}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmActionModal;
