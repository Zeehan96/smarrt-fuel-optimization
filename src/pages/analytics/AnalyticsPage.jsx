import { useState } from "react";
import { BarChart3, PieChart, TrendingUp, Calendar } from "lucide-react";
import { staticData } from "../../utils/staticData";

const AnalyticsPage = () => {
  const [filter, setFilter] = useState("all");

  const vehicles = staticData.vehicles;
  const logs = staticData.fuelLogs;

  const filteredLogs = filter === "all" ? logs : logs.filter((l) => l.vehicleId === filter);

  const totalSpent = filteredLogs.reduce((s, l) => s + l.cost, 0);
  const totalLitres = filteredLogs.reduce((s, l) => s + l.quantity, 0);
  const avgCostPerLitre = totalLitres > 0 ? Math.round(totalSpent / totalLitres) : 0;

  const perVehicle = vehicles.map((v) => {
    const vLogs = filteredLogs.filter((l) => l.vehicleId === v._id);
    const spent = vLogs.reduce((s, l) => s + l.cost, 0);
    const litres = vLogs.reduce((s, l) => s + l.quantity, 0);
    return { ...v, spent, litres, tripCount: vLogs.length };
  });

  const maxSpent = Math.max(...perVehicle.map((v) => v.spent), 1);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Analytics</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Detailed analysis of fuel consumption and costs.</p>

      <div className="flex items-center gap-3 mb-6">
        <Calendar size={16} className="text-gray-400" />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-[var(--primary-color)] outline-none"
        >
          <option value="all">All Vehicles</option>
          {vehicles.map((v) => (
            <option key={v._id} value={v._id}>{v.name}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
            <TrendingUp size={16} />
            Total Spent
          </div>
          <p className="text-xl font-bold text-gray-900 dark:text-white">Rs. {totalSpent.toLocaleString()}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
            <BarChart3 size={16} />
            Total Fuel Used
          </div>
          <p className="text-xl font-bold text-gray-900 dark:text-white">{totalLitres} L</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
            <PieChart size={16} />
            Avg. Cost / Litre
          </div>
          <p className="text-xl font-bold text-gray-900 dark:text-white">Rs. {avgCostPerLitre}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <BarChart3 size={18} className="text-blue-500" />
            Cost by Vehicle
          </h2>
          <div className="space-y-3">
            {perVehicle.map((v) => (
              <div key={v._id}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{v.name}</span>
                  <span className="text-gray-500 dark:text-gray-400">Rs. {v.spent.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[var(--primary-color)] transition-all"
                    style={{ width: `${maxSpent > 0 ? (v.spent / maxSpent) * 100 : 0}%` }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-0.5">{v.litres} L · {v.tripCount} purchase{v.tripCount !== 1 ? "s" : ""}</p>
              </div>
            ))}
            {perVehicle.length === 0 && <p className="text-sm text-gray-400">No data available.</p>}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <PieChart size={18} className="text-purple-500" />
            Fuel Consumption Breakdown
          </h2>
          <div className="space-y-3">
            {perVehicle.map((v, i) => {
              const colors = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-orange-500", "bg-teal-500"];
              const pct = totalLitres > 0 ? Math.round((v.litres / totalLitres) * 100) : 0;
              return (
                <div key={v._id} className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${colors[i % colors.length]} flex-shrink-0`} />
                  <span className="flex-1 text-sm text-gray-700 dark:text-gray-300">{v.name}</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{v.litres} L</span>
                  <span className="text-xs text-gray-400 w-10 text-right">{pct}%</span>
                </div>
              );
            })}
            {perVehicle.length === 0 && <p className="text-sm text-gray-400">No data available.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
