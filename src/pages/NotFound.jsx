import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, AlertCircle } from "lucide-react";
import Button from "../components/common/Button";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl w-full text-center">
        <div className="relative mb-6 sm:mb-8">
          <div className="relative">
            <h1 className="text-[120px] sm:text-[160px] md:text-[200px] lg:text-[280px] font-bold text-gray-200 dark:text-gray-700 leading-none select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 animate-bounce">
                  <AlertCircle className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 text-[#006eb8]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white px-4">
            Page Not Found
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto px-4">
            Oops! The page you're looking for doesn't exist. It might have been
            moved or deleted.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
          <Button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-[#006eb8] hover:bg-[#005a9e] text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 w-full sm:w-auto"
          >
            <Home className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
            Go Back
          </Button>
        </div>

        <p className="mt-6 sm:mt-8 text-xs sm:text-sm text-gray-500 dark:text-gray-500 px-4">
          Error Code: 404 | Page Not Found
        </p>
      </div>

      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-200 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-200 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
    </div>
  );
};

export default NotFound;
