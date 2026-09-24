import moment from "moment";

const STATS = [
  { label: "Total",     key: "total",     color: "text-amber-600 dark:text-amber-400", border: "border-l-amber-500" },
  { label: "Published", key: "published", color: "text-green-600 dark:text-green-400", border: "border-l-green-500" },
  { label: "Featured",  key: "featured",  color: "text-blue-600 dark:text-blue-400",   border: "border-l-blue-500" },
];

const ProductsMonthDetail = ({ selectedMonth, currentYear, monthDetail }) => (
  <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3">
      {moment().month(selectedMonth).format("MMMM")} {currentYear}
      <span className="ml-1 text-[10px] text-gray-400">(click bar to change)</span>
    </p>
    <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
      {STATS.map((item) => (
        <div key={item.label} className={`flex items-center gap-2 border-l-2 pl-2 ${item.border}`}>
          <span className="text-xs text-gray-500 dark:text-gray-400">{item.label}:</span>
          <span className={`text-sm font-bold ${item.color}`}>{monthDetail[item.key]}</span>
        </div>
      ))}
    </div>
  </div>
);

export default ProductsMonthDetail;
