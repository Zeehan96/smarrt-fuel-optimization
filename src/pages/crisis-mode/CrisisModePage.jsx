import { useState } from "react";
import { AlertTriangle, ShieldCheck, Lightbulb, Fuel, Car, MapPin } from "lucide-react";
import { staticData } from "../../utils/staticData";

const CrisisModePage = () => {
  const [isActive, setIsActive] = useState(false);

  const plannedTrips = staticData.trips.filter((t) => t.status === "planned");
  const totalPlannedDistance = plannedTrips.reduce((s, t) => s + t.distance, 0);
  const totalVehicles = staticData.vehicles.length;
  const conservationScore = isActive ? Math.min(85, 30 + totalVehicles * 10 + plannedTrips.length * 5) : 0;

  const tips = [
    "Combine multiple errands into a single trip to reduce mileage.",
    "Avoid peak traffic hours to minimize idling fuel consumption.",
    "Maintain proper tire pressure for better fuel efficiency.",
    "Remove unnecessary weight from your vehicle.",
    "Use air conditioning sparingly — it increases fuel use by up to 20%.",
    "Plan your routes in advance to avoid detours and backtracking.",
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Crisis Mode</h1>
          <p className="text-gray-600 dark:text-gray-400">Activate during fuel shortages to get conservation recommendations.</p>
        </div>
        <button
          onClick={() => setIsActive((v) => !v)}
          className={`relative inline-flex h-10 w-20 items-center rounded-full transition-colors ${
            isActive ? "bg-orange-500" : "bg-gray-300 dark:bg-gray-600"
          }`}
        >
          <span
            className={`inline-block h-8 w-8 transform rounded-full bg-white shadow-md transition-transform ${
              isActive ? "translate-x-11" : "translate-x-1"
            } flex items-center justify-center`}
          >
            {isActive ? <AlertTriangle size={16} className="text-orange-500" /> : <ShieldCheck size={16} className="text-gray-400" />}
          </span>
        </button>
      </div>

      {isActive && (
        <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-2 text-orange-700 dark:text-orange-300 font-semibold mb-2">
            <AlertTriangle size={18} />
            Crisis Mode is ACTIVE
          </div>
          <p className="text-sm text-orange-600 dark:text-orange-400">
            Fuel conservation measures are in effect. Review recommendations below.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Car className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Vehicles</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalVehicles}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <MapPin className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Planned Trips</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{plannedTrips.length}</p>
          <p className="text-xs text-gray-400 mt-1">{totalPlannedDistance} km total</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Fuel className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Conservation Score</span>
          </div>
          <p className={`text-2xl font-bold ${isActive ? "text-green-600" : "text-gray-400"}`}>
            {isActive ? `${conservationScore}%` : "--"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Lightbulb size={18} className="text-yellow-500" />
            Fuel Saving Tips
          </h2>
          <ul className="space-y-2">
            {tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[var(--primary-color)] flex-shrink-0" />
                {tip}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <MapPin size={18} className="text-blue-500" />
            Trip Recommendations
          </h2>
          {plannedTrips.length === 0 ? (
            <p className="text-sm text-gray-400">No planned trips to review.</p>
          ) : (
            <div className="space-y-3">
              {plannedTrips.map((trip) => (
                <div key={trip._id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-100 dark:border-gray-700">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{trip.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {trip.startLocation} → {trip.endLocation} | {trip.distance} km
                    </p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    isActive
                      ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                      : "bg-gray-100 text-gray-500 dark:bg-gray-600 dark:text-gray-400"
                  }`}>
                    {isActive ? "Non-essential" : "Pending"}
                  </span>
                </div>
              ))}
              {isActive && (
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700 text-sm text-green-700 dark:text-green-400">
                  Consider combining {plannedTrips.length > 1 ? "these trips" : "this trip"} into a single journey to save fuel.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CrisisModePage;
