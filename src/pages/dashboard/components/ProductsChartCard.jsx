import { ProductsChartHeader, ProductsChartSection, ProductsMonthDetail } from "./index";

const ProductsChartCard = (props) => {
  const {
    totalYear, currentYear, selectedMonth,
    monthDetail, options, series,
    radialSeries, radialColor, isDarkMode,
  } = props;

  const headerProps   = { totalYear, currentYear };
  const sectionProps  = { options, series, radialSeries, radialColor, selectedMonth, isDarkMode };
  const detailProps   = { selectedMonth, currentYear, monthDetail };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
      <ProductsChartHeader  {...headerProps}  />
      <ProductsChartSection {...sectionProps} />
      <ProductsMonthDetail  {...detailProps}  />
    </div>
  );
};

export default ProductsChartCard;
