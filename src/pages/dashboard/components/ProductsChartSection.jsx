import Chart from "react-apexcharts";
import moment from "moment";

const buildRadialOptions = (isDarkMode, monthName, color) => ({
  chart: { type: "radialBar", background: "transparent", sparkline: { enabled: true } },
  colors: [color],
  plotOptions: {
    radialBar: {
      startAngle: -135,
      endAngle: 135,
      hollow: { size: "60%" },
      track: { background: isDarkMode ? "#374151" : "#e5e7eb", strokeWidth: "100%" },
      dataLabels: {
        name: {
          show: true,
          fontSize: "11px",
          color: isDarkMode ? "#9ca3af" : "#92400e",
          offsetY: 20,
        },
        value: {
          show: true,
          fontSize: "24px",
          fontWeight: "bold",
          color: isDarkMode ? "#f9fafb" : "#111827",
          offsetY: -10,
          formatter: (val) => `${Math.round(val)}%`,
        },
      },
    },
  },
  labels: [monthName],
  stroke: { lineCap: "round" },
});

const ProductsChartSection = ({ options, series, radialSeries, radialColor, selectedMonth, isDarkMode }) => {
  const selectedMonthName = moment().month(selectedMonth).format("MMM");
  const radialOpts = buildRadialOptions(isDarkMode, selectedMonthName, radialColor);

  return (
    <div className="flex flex-col lg:flex-row gap-2 items-start">
      {/* Bar chart */}
      <div className="w-full lg:flex-1 min-w-0 overflow-x-auto">
        <div style={{ minWidth: "480px" }}>
          <Chart key="monthly-bar" options={options} series={series} type="bar" height={260} width="100%" />
        </div>
      </div>

      {/* Radial - desktop */}
      <div className="hidden lg:flex flex-shrink-0 w-52 pt-[5px]">
        <div className="flex flex-col items-center justify-center" style={{ height: 240 }}>
          <Chart key="radial-d" options={radialOpts} series={radialSeries} type="radialBar" height={190} width={190} />
        </div>
      </div>

      {/* Radial - mobile */}
      <div className="flex lg:hidden w-full justify-center">
        <Chart
          key="radial-m"
          options={{
            ...radialOpts,
            plotOptions: {
              radialBar: {
                ...radialOpts.plotOptions.radialBar,
                hollow: { size: "55%" },
                dataLabels: {
                  name: { show: true, fontSize: "10px", color: isDarkMode ? "#9ca3af" : "#92400e", offsetY: 16 },
                  value: { show: true, fontSize: "20px", fontWeight: "bold", color: isDarkMode ? "#f9fafb" : "#111827", offsetY: -8, formatter: (val) => `${Math.round(val)}%` },
                },
              },
            },
          }}
          series={radialSeries}
          type="radialBar"
          height={150}
          width={150}
        />
      </div>
    </div>
  );
};

export default ProductsChartSection;
