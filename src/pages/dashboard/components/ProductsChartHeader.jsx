import { Package } from "lucide-react";

const ProductsChartHeader = ({ totalYear, currentYear }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
    <div className="flex items-center gap-2.5">
      <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
        <Package size={18} className="text-amber-500 dark:text-amber-400" />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Products Added</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          <span className="font-bold text-gray-900 dark:text-white">{totalYear}</span>
          {" products in "}
          <span className="font-bold text-gray-900 dark:text-white text-sm">{currentYear}</span>
        </p>
      </div>
    </div>
  </div>
);

export default ProductsChartHeader;
