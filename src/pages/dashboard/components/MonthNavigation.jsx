import moment from "moment";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MonthNavigation = ({ currentMonth, isCurrentMonth, onPrevious, onNext }) => {
  return (
    <div className="flex items-center justify-between gap-3">
      {/* Previous */}
      <button
        type="button"
        onClick={onPrevious}
        className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors flex-shrink-0"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Month label */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-bold text-gray-800 dark:text-gray-200">
          {moment(currentMonth).format("MMMM YYYY")}
        </span>
        {isCurrentMonth && (
          <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-[#113071] text-white whitespace-nowrap">
            Current
          </span>
        )}
      </div>

      {/* Next */}
      <button
        type="button"
        onClick={onNext}
        disabled={isCurrentMonth}
        className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors flex-shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default MonthNavigation;
