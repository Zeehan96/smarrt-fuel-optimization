import React, { useMemo } from "react";
import {
  Users,
  Package,
  Tags,
  Store,
  ShoppingBag,
  TicketCheck,
} from "lucide-react";
import { useTheme } from "../../../hooks/useTheme";

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
  Active:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Inactive: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  Pending:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  Rejected: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  Published: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Featured:
    "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  Open: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  "In Progress":
    "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Today: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
  Reported: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const DashboardCards = ({ data }) => {
  const counts = data?.counts || {};
  const { isDarkMode } = useTheme();

  const cards = useMemo(
    () => [
      // Row 1
      {
        id: "suppliers",
        label: "Suppliers",
        icon: Store,
        color: "#24a1a5",
        bg: "#f0fafa",
        value: counts?.suppliers?.total || 0,
        progressValue: counts?.suppliers?.active || 0,
        progressMax: counts?.suppliers?.total || 0,
        stats: [
          { label: "Active", value: counts?.suppliers?.active || 0 },
          { label: "Close", value: counts?.suppliers?.pending || 0 },
          { label: "Rejected", value: counts?.suppliers?.rejected || 0 },
        ],
      },
      {
        id: "buyers",
        label: "Buyers",
        icon: ShoppingBag,
        color: "#3B82F6",
        bg: "#eff6ff",
        value: counts?.buyers?.total || 0,
        progressValue: counts?.buyers?.active || 0,
        progressMax: counts?.buyers?.total || 0,
        stats: [
          { label: "Active", value: counts?.buyers?.active || 0 },
          { label: "Inactive", value: counts?.buyers?.inactive || 0 },
        ],
      },
      {
        id: "categories",
        label: "Categories",
        icon: Tags,
        color: "#ea7423",
        bg: "#fff4ed",
        value: counts?.categories?.total || 0,
        progressValue: counts?.categories?.active || 0,
        progressMax: counts?.categories?.total || 0,
        stats: [
          { label: "Active", value: counts?.categories?.active || 0 },
          { label: "Inactive", value: counts?.categories?.inactive || 0 },
        ],
      },
      // Row 2
      {
        id: "products",
        label: "Products",
        icon: Package,
        color: "#8B5CF6",
        bg: "#f5f3ff",
        value: counts?.products?.total || 0,
        progressValue: counts?.products?.published || 0,
        progressMax: counts?.products?.total || 0,
        stats: [
          { label: "Published", value: counts?.products?.published || 0 },
          { label: "Featured", value: counts?.products?.featured || 0 },
        ],
      },
      {
        id: "support",
        label: "Support Tickets",
        icon: TicketCheck,
        color: "#F59E0B",
        bg: "#fffbeb",
        value: counts?.support_tickets?.total || 0,
        progressValue: counts?.support_tickets?.open || 0,
        progressMax: counts?.support_tickets?.total || 0,
        stats: [
          { label: "Open", value: counts?.support_tickets?.open || 0 },
          { label: "Close", value: counts?.support_tickets?.closed || 0 },
          {
            label: "In Progress",
            value: counts?.support_tickets?.in_progress || 0,
          },
        ],
      },
    ],
    [counts],
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className="bg-white dark:bg-gray-800 rounded-lg px-5 py-5"
            style={{
              border: `1px solid ${card.color}60`,
              boxShadow: `0 4px 6px -1px ${card.color}20, 0 2px 4px -2px ${card.color}10`,
            }}
          >
            {/* Top row */}
            <div className="flex items-center gap-3">
              <div
                className="w-[44px] h-[44px] rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: isDarkMode ? `${card.color}25` : card.bg,
                }}
              >
                <Icon size={20} style={{ color: card.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-300 leading-none truncate">
                  {card.label}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white leading-tight mt-0.5">
                  {card.value.toLocaleString()}
                </p>
              </div>
              <CircularProgress
                value={card.progressValue}
                max={card.progressMax}
                color={card.color}
              />
            </div>
            {/* Chips */}
            <div className="flex items-center gap-1 flex-wrap mt-2.5 justify-end">
              {card.stats.map((stat) => (
                <span
                  key={stat.label}
                  className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded text-[10px] font-medium ${CHIP_COLORS[stat.label] ?? "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"}`}
                >
                  <span className="font-bold">{stat.value}</span> {stat.label}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardCards;
