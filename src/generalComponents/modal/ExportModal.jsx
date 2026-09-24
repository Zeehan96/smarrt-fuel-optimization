import React from "react";
import { X, Download, FileText } from "lucide-react";
import { Button } from "../../components";

const ExportModal = ({
  isOpen,
  onClose,
  onExportCurrentPage,
  onExportFullList,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 common-modal p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md mx-2 sm:mx-auto my-2 sm:my-4 max-h-[calc(100vh-1rem)] sm:max-h-[calc(100vh-2rem)] flex flex-col">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 rounded-t-xl px-4 sm:px-6 py-3 sm:py-2 flex justify-between items-center">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
            Export CSV
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full p-2 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-4 sm:px-6 py-4 sm:py-6 flex-1 overflow-y-auto">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 sm:mb-6">
            Choose an export option:
          </p>

          <div className="space-y-3">
            {/* Export Current Page Button */}
            <button
              onClick={() => {
                onExportCurrentPage();
                onClose();
              }}
              className="w-full flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 border-2 border-blue-200 dark:border-blue-800 rounded-lg transition-colors group"
            >
              <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                  Export Current Page
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  Export only the data visible on this page
                </p>
              </div>
            </button>

            {/* Export Full List Button */}
            <button
              onClick={() => {
                onExportFullList();
                onClose();
              }}
              className="w-full flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 border-2 border-green-200 dark:border-green-800 rounded-lg transition-colors group"
            >
              <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-green-600 dark:bg-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Download className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                  Export Full List
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  Export all data from all pages
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 dark:bg-gray-900/50 px-4 sm:px-6 py-3 rounded-b-xl border-t border-gray-200 dark:border-gray-700 flex justify-end flex-shrink-0">
          <Button
            variant="primary"
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;
