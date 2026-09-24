import { useState, useMemo, useCallback } from "react";
import {
  Car,
  Fuel,
  MapPin,
  Wallet,
  TrendingDown,
  DollarSign,
} from "lucide-react";
import Crud from "react-admin-crud-manager";
import { staticData } from "../../utils/staticData";
import { useTheme } from "../../hooks/useTheme";
import { useAppContext } from "../../hooks/useAppContext";

const CircularProgress = ({
  value,
  max,
  color,
  size = 44,
  strokeWidth = 3.5,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const percentage = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  const offset = circumference - (percentage / 100) * circumference;
  return (
    <div
      className="relative flex items-center justify-center flex-shrink-0"
      style={{ width: size, height: size }}
    >
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-gray-200 dark:text-gray-600/30"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          style={{ strokeDashoffset: offset }}
          strokeLinecap="round"
          fill="transparent"
          className="transition-all duration-1000 ease-in-out"
        />
      </svg>
      <span className="absolute text-[10px] font-bold text-gray-700 dark:text-gray-200 leading-none">
        {Math.round(percentage)}%
      </span>
    </div>
  );
};

const CHIP_COLORS = {
  Active: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Inactive: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  Monthly: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Annual: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  Lifetime: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
  Open: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  Resolved: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  "In Progress": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Cancelled: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  Free: "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300",
  
  // Custom dashboard labels mapping
  Cars: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Utility: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Total: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Avg: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  Planned: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Done: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Budget: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  Spent: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  "Avg/Log": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  "Max Fill": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Optimized: "bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400",
  Efficiency: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
};

const DashboardCard = ({ card }) => {
  const Icon = card.icon;
  const { isDarkMode } = useTheme();

  return (
    <div
      key={card.id}
      className="bg-white dark:bg-gray-800 rounded-lg px-5 py-5 relative overflow-hidden flex flex-col justify-between min-h-[140px]"
      style={{
        border: `1px solid ${card.color}55`,
        boxShadow: `0 4px 12px -2px ${card.color}35, 0 2px 4px -2px ${card.color}20`,
      }}
    >
      {/* Top: left = label + value, right = icon circle */}
      <div className="flex items-start justify-between gap-4">
        {/* Left */}
        <div className="flex flex-col gap-1 min-w-0">
          <p className="text-sm font-semibold text-gray-600 dark:text-gray-300 leading-none truncate">
            {card.label}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white leading-tight mt-0.5">
            {card.prefix || ""}{card.value.toLocaleString()}{card.suffix || ""}
          </p>
        </div>

        {/* Right: icon circle */}
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            backgroundColor: isDarkMode ? `${card.color}25` : `${card.color}18`,
          }}
        >
          <Icon size={20} style={{ color: card.color }} />
        </div>
      </div>

      {/* Bottom row: chips left, circular progress right */}
      <div className="flex items-center justify-between gap-2 mt-3">
        {/* Chips */}
        <div className="flex items-center gap-1 flex-wrap">
          {card.stats.map((stat) => (
            <span
              key={stat.label}
              className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium ${
                CHIP_COLORS[stat.label] ??
                "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
              }`}
            >
              <span className="font-bold">{stat.value}</span> {stat.label}
            </span>
          ))}
        </div>

        {/* Circular progress */}
        <CircularProgress
          value={card.progressValue}
          max={card.progressMax}
          color={card.color}
        />
      </div>
    </div>
  );
};

const DashboardPage = () => {
  const { user } = useAppContext();
  const [, setTick] = useState(0);

  // Filter staticData based on active role
  const isIndividual = user?.role === "individual";
  const isOrganizational = user?.role === "organizational";

  const filteredVehicles = useMemo(() => {
    if (isIndividual) {
      return staticData.vehicles.filter((v) => v.id === "v1");
    }
    if (isOrganizational) {
      return staticData.vehicles.filter((v) => v.id !== "v1");
    }
    return staticData.vehicles;
  }, [isIndividual, isOrganizational]);

  const filteredFuelLogs = useMemo(() => {
    if (isIndividual) {
      return staticData.fuelLogs.filter((l) => l.vehicleId === "v1");
    }
    if (isOrganizational) {
      return staticData.fuelLogs.filter((l) => l.vehicleId !== "v1");
    }
    return staticData.fuelLogs;
  }, [isIndividual, isOrganizational]);

  const filteredTrips = useMemo(() => {
    if (isIndividual) {
      return staticData.trips.filter((t) => t.vehicleId === "v1");
    }
    if (isOrganizational) {
      return staticData.trips.filter((t) => t.vehicleId !== "v1");
    }
    return staticData.trips;
  }, [isIndividual, isOrganizational]);

  const totalVehicles = filteredVehicles.length;
  const totalFuelLogs = filteredFuelLogs.length;
  const totalTrips = filteredTrips.length;
  const totalSpent = filteredFuelLogs.reduce((s, l) => s + l.cost, 0);
  const totalLitres = filteredFuelLogs.reduce((s, l) => s + l.quantity, 0);

  const budgetMax = isIndividual ? 20000 : isOrganizational ? 80000 : 150000;
  const budgetLabel = isIndividual ? "20k" : isOrganizational ? "80k" : "150k";
  const maxFillLabel = isIndividual ? "45 L" : isOrganizational ? "47 L" : "80 L";
  const efficiencyLabel = isIndividual ? "95%" : isOrganizational ? "88%" : "92%";
  const optimizedLabel = isIndividual ? "High" : isOrganizational ? "Medium" : "High";

  const cards = useMemo(() => [
    {
      id: "total-vehicles",
      label: isIndividual ? "My Vehicles" : isOrganizational ? "Fleet Vehicles" : "Total Vehicles",
      icon: Car,
      color: "#6366F1",
      value: totalVehicles,
      progressValue: filteredVehicles.filter(v => v.type === "Car").length,
      progressMax: totalVehicles || 1,
      stats: [
        { label: "Cars", value: filteredVehicles.filter(v => v.type === "Car").length },
        { label: "Utility", value: filteredVehicles.filter(v => v.type !== "Car").length },
      ],
    },
    {
      id: "fuel-logs",
      label: isIndividual ? "My Fuel Logs" : isOrganizational ? "Fleet Fuel Logs" : "Fuel Logs",
      icon: Fuel,
      color: "#10B981",
      value: totalFuelLogs,
      progressValue: totalFuelLogs ? Math.min((totalFuelLogs / 5) * 100, 100) : 0,
      progressMax: 100,
      stats: [
        { label: "Total", value: totalFuelLogs },
        { label: "Avg", value: `Rs. ${Math.round(totalSpent / (totalFuelLogs || 1)).toLocaleString()}` },
      ],
    },
    {
      id: "trips-planned",
      label: isIndividual ? "My Trips Planned" : isOrganizational ? "Fleet Trips" : "Trips Planned",
      icon: MapPin,
      color: "#8B5CF6",
      value: totalTrips,
      progressValue: filteredTrips.filter(t => t.status === "completed").length,
      progressMax: totalTrips || 1,
      stats: [
        { label: "Planned", value: filteredTrips.filter(t => t.status === "planned").length },
        { label: "Done", value: filteredTrips.filter(t => t.status === "completed").length },
      ],
    },
    {
      id: "total-spent",
      label: isIndividual ? "My Total Spent" : isOrganizational ? "Fleet Total Spent" : "Total Spent",
      icon: DollarSign,
      color: "#F59E0B",
      value: totalSpent,
      prefix: "Rs. ",
      progressValue: totalSpent,
      progressMax: budgetMax,
      stats: [
        { label: "Budget", value: budgetLabel },
        { label: "Spent", value: `${Math.round((totalSpent / budgetMax) * 100)}%` },
      ],
    },
    {
      id: "total-litres",
      label: isIndividual ? "My Total Litres" : isOrganizational ? "Fleet Total Litres" : "Total Litres",
      icon: TrendingDown,
      color: "#14B8A6",
      value: totalLitres,
      suffix: " L",
      progressValue: totalLitres ? Math.min((totalLitres / (isIndividual ? 60 : isOrganizational ? 100 : 150)) * 100, 100) : 0,
      progressMax: 100,
      stats: [
        { label: "Avg/Log", value: `${Math.round(totalLitres / (totalFuelLogs || 1))} L` },
        { label: "Max Fill", value: maxFillLabel },
      ],
    },
    {
      id: "avg-cost",
      label: isIndividual ? "My Avg Cost/Trip" : isOrganizational ? "Fleet Avg Cost/Trip" : "Avg Cost/Trip",
      icon: Wallet,
      color: "#EF4444",
      value: totalTrips ? Math.round(totalSpent / totalTrips) : 0,
      prefix: "Rs. ",
      progressValue: 88,
      progressMax: 100,
      stats: [
        { label: "Optimized", value: optimizedLabel },
        { label: "Efficiency", value: efficiencyLabel },
      ],
    },
  ], [
    isIndividual,
    isOrganizational,
    totalVehicles,
    filteredVehicles,
    totalFuelLogs,
    totalSpent,
    totalTrips,
    filteredTrips,
    totalLitres,
    budgetMax,
    budgetLabel,
    maxFillLabel,
    optimizedLabel,
    efficiencyLabel,
  ]);

  const getRecentLogs = useCallback(() => {
    return [...filteredFuelLogs].reverse();
  }, [filteredFuelLogs]);

  const crudConfig = useMemo(() => {
    const recentLogs = getRecentLogs();
    return {
      title: "",
      fetchData: () => Promise.resolve({ data: recentLogs }),
      isStaticData: true,
      tableConfig: {
        table_head: [
          { key: "index", title: "#", type: "index" },
          { key: "vehicleName", title: "Vehicle" },
          { key: "date", title: "Date", type: "date", format: "DD/MM/YYYY" },
          {
            key: "quantity",
            title: "Litres",
            render: (r) => `${r.quantity} L`,
          },
          {
            key: "cost",
            title: "Cost",
            render: (r) => `Rs. ${(r.cost || 0).toLocaleString()}`,
          },
          { key: "station", title: "Station" },
        ],
        search: { enabled: false },
        pagination: { enabled: false },
        exportCSV: { enabled: false },
      },
      modalConfig: {},
    };
  }, [getRecentLogs]);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
        {cards.map((card) => (
          <DashboardCard key={card.id} card={card} />
        ))}
      </div>

      <h2 className="text-lg font-semibold text-gray-900 dark:text-white ">
        Recent Fuel Purchases
      </h2>
      <Crud config={crudConfig} />
    </div>
  );
};

export default DashboardPage;
