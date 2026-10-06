import { invokeApi } from "./invokeApi";

/**
 * GET /api/dashboard/stats
 *
 * Role-based dashboard stats — backend returns different data based on JWT role:
 *
 * Admin response example:
 * {
 *   totalUsers:      number,
 *   totalVehicles:   number,
 *   totalFuelLogs:   number,
 *   totalTrips:      number,
 *   totalSpent:      number,   // sum of all fuel costs (Rs.)
 *   totalLitres:     number,   // sum of all litres
 *   avgCostPerTrip:  number,
 *   recentFuelLogs:  Array,    // last 10 fuel logs
 * }
 *
 * Individual / Organizational response example:
 * {
 *   totalVehicles:   number,   // only their own vehicles
 *   totalFuelLogs:   number,
 *   totalTrips:      number,
 *   totalSpent:      number,
 *   totalLitres:     number,
 *   avgCostPerTrip:  number,
 *   recentFuelLogs:  Array,
 * }
 */
export const getDashboardStatsApi = async () => {
  return await invokeApi({
    path: "/api/dashboard/stats",
    method: "GET",
  });
};
