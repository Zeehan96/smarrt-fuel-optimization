import { useState, useMemo } from "react";
import moment from "moment";
import { useTheme } from "../../../hooks/useTheme";
import { ProductsChartCard } from "./index";

// Fallback empty 12-month array
const EMPTY_MONTHLY = Array.from({ length: 12 }, (_, i) => ({
  month: i + 1,
  month_name: moment().month(i).format("MMMM"),
  total_products: 0,
  published_products: 0,
  featured_products: 0,
}));

const buildChartData = (graphData = []) => {
  const data = graphData.length === 12 ? graphData : EMPTY_MONTHLY;
  return {
    categories: data.map((d) => moment().month(d.month - 1).format("MMM")),
    monthly:    data.map((d) => d.total_products    ?? 0),
    published:  data.map((d) => d.published_products ?? 0),
    featured:   data.map((d) => d.featured_products  ?? 0),
  };
};

const DashboardProductsChart = ({ graphData }) => {
  const [currentYear]    = useState(moment().year());
  const [selectedMonth, setSelectedMonth] = useState(moment().month());
  const { isDarkMode }   = useTheme();

  const { categories, monthly, published, featured } = useMemo(
    () => buildChartData(graphData),
    [graphData]
  );

  const totalYear   = monthly.reduce((sum, v) => sum + (v || 0), 0);
  const monthDetail = useMemo(() => ({
    total:     monthly[selectedMonth]   ?? 0,
    published: published[selectedMonth] ?? 0,
    featured:  featured[selectedMonth]  ?? 0,
  }), [selectedMonth, monthly, published, featured]);

  const radialSeries = [
    totalYear > 0
      ? Math.min(Math.round((monthDetail.total / totalYear) * 100), 100)
      : 0,
  ];

  // Bar colors: max = green, min = red, rest = amber
  const barColors = useMemo(() => {
    const nonZero = monthly.filter((v) => v > 0);
    const maxVal  = nonZero.length ? Math.max(...nonZero) : 0;
    const minVal  = nonZero.length ? Math.min(...nonZero) : 0;
    return monthly.map((v) => {
      if (v === 0)      return "#d1d5db";
      if (v === maxVal) return "#22c55e"; // green
      if (v === minVal) return "#ef4444"; // red
      return "#F59E0B";                   // amber
    });
  }, [monthly]);

  const radialColor = barColors[selectedMonth] ?? "#F59E0B";
  const textColor   = isDarkMode ? "#9ca3af" : "#6b7280";
  const gridColor   = isDarkMode ? "#374151" : "#f3f4f6";

  const options = {
    chart: {
      id: "products-chart",
      type: "bar",
      toolbar:    { show: false },
      zoom:       { enabled: false },
      background: "transparent",
      animations: { enabled: true, easing: "easeinout", speed: 500 },
      events: {
        dataPointSelection: (_e, _ctx, config) => {
          setSelectedMonth(config.dataPointIndex);
        },
      },
    },
    colors: barColors,
    plotOptions: {
      bar: { borderRadius: 6, columnWidth: "55%", distributed: true },
    },
    fill: {
      type: "gradient",
      gradient: { shade: "dark", type: "vertical", shadeIntensity: 0.3, opacityFrom: 1, opacityTo: 0.8 },
    },
    annotations: {
      xaxis: [{
        x:           categories[selectedMonth],
        borderColor: "#D97706",
        borderWidth: 2,
        fillColor:   "#D97706",
        opacity:     0.15,
        label:       { text: "" },
      }],
    },
    stroke:     { width: 0, curve: "smooth" },
    dataLabels: { enabled: false },
    markers:    { size: 0, hover: { size: 0 } },
    states:     { hover: { filter: { type: "none" } }, active: { filter: { type: "none" } } },
    xaxis: {
      categories,
      labels:     { style: { colors: textColor, fontSize: "11px" }, rotate: 0, hideOverlappingLabels: true },
      axisBorder: { show: false },
      axisTicks:  { show: false },
    },
    yaxis: {
      labels: { style: { colors: textColor, fontSize: "11px" }, formatter: (val) => val !== null ? Math.round(val) : "" },
      min: 0,
    },
    grid: {
      borderColor:     gridColor,
      strokeDashArray: 4,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
      padding: { left: 0, right: 10 },
    },
    tooltip: {
      theme: isDarkMode ? "dark" : "light",
      style: { fontSize: "12px" },
      y: { formatter: (val) => val !== null ? `${val} products` : "No data" },
    },
    legend: { show: false },
  };

  const series = [{ name: "Products", data: monthly }];

  const chartData = {
    totalYear, currentYear, selectedMonth,
    monthDetail, options, series,
    radialSeries, radialColor, isDarkMode,
  };

  return <ProductsChartCard {...chartData} />;
};

export default DashboardProductsChart;
