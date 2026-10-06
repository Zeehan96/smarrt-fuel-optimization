import { useState, useMemo, useEffect } from "react";
import {
  Car, Fuel, MapPin, Wallet, TrendingDown, DollarSign, Users,
} from "lucide-react";
import moment from "moment";
import { staticData } from "../../utils/staticData";
import { useTheme } from "../../hooks/useTheme";
import { useAppContext } from "../../hooks/useAppContext";
import { getDashboardStatsApi } from "../../api/dashboard";
import { _get_users_api } from "../../api/users";

// ─── Circular progress ring ────────────────────────────────────────────────────
const CircularProgress = ({ percentage = 0, color, size = 44, strokeWidth = 3.5 }) => {
  const pct = Math.min(Math.max(Number(percentage) || 0, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circ = radius * 2 * Math.PI;
  const offset = circ - (pct / 100) * circ;
  return (
    <div className="relative flex items-center justify-center flex-shrink-0" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="currentColor" strokeWidth={strokeWidth} fill="transparent" className="text-gray-200 dark:text-gray-600/30" />
        <circle cx={size / 2} cy={size / 2} r={radius} stroke={color} strokeWidth={strokeWidth} strokeDasharray={circ} style={{ strokeDashoffset: offset }} strokeLinecap="round" fill="transparent" className="transition-all duration-1000 ease-in-out" />
      </svg>
      <span className="absolute text-[10px] font-bold text-gray-700 dark:text-gray-200 leading-none">{Math.round(pct)}%</span>
    </div>
  );
};

// ─── Chip colour map ───────────────────────────────────────────────────────────
const CHIP_COLORS = {
  Users: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
  Admins: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  Total: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Active: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Avg: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  Planned: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Done: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Budget: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  Spent: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  Litres: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
  Trips: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400",
  Logs: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
};

// ─── Loading skeleton card ────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg px-5 py-5 flex flex-col justify-between min-h-[140px] border border-gray-100 dark:border-gray-700 animate-pulse">
    <div className="flex items-start justify-between gap-4">
      <div className="flex flex-col gap-2 flex-1">
        <div className="h-3 w-28 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-7 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
      <div className="w-11 h-11 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0" />
    </div>
    <div className="flex items-center justify-between mt-3">
      <div className="flex gap-1">
        <div className="h-4 w-14 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-4 w-14 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
      <div className="w-11 h-11 rounded-full bg-gray-200 dark:bg-gray-700" />
    </div>
  </div>
);

// ─── KPI Card ─────────────────────────────────────────────────────────────────
const DashboardCard = ({ card }) => {
  const Icon = card.icon;
  const { isDarkMode } = useTheme();
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg px-5 py-5 flex flex-col justify-between min-h-[140px]"
      style={{ border: `1px solid ${card.color}55`, boxShadow: `0 4px 12px -2px ${card.color}35, 0 2px 4px -2px ${card.color}20` }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1 min-w-0">
          <p className="text-sm font-semibold text-gray-600 dark:text-gray-300 leading-none truncate">{card.label}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white leading-tight mt-0.5">
            {card.prefix || ""}{Number(card.value ?? 0).toLocaleString()}{card.suffix || ""}
          </p>
        </div>
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: isDarkMode ? `${card.color}25` : `${card.color}18` }}
        >
          <Icon size={20} style={{ color: card.color }} />
        </div>
      </div>

      {/* Bottom row: chips + ring */}
      <div className="flex items-center justify-between gap-2 mt-3">
        <div className="flex items-center gap-1 flex-wrap">
          {card.chips.map((chip) => (
            <span
              key={chip.label}
              className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium ${CHIP_COLORS[chip.label] ?? "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"}`}
            >
              <span className="font-bold">{chip.value}</span> {chip.label}
            </span>
          ))}
        </div>
        <CircularProgress percentage={card.percentage} color={card.color} />
      </div>
    </div>
  );
};

// ─── Recent Users Table (Admin only) ─────────────────────────────────────────
const RecentUsersTable = ({ users, loading }) => {
  if (loading) {
    return (
      <div className="animate-pulse space-y-2 mt-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-12 bg-gray-100 dark:bg-gray-700 rounded-lg" />
        ))}
      </div>
    );
  }
  if (!users.length) {
    return (
      <p className="text-sm text-gray-400 dark:text-gray-500 mt-4 text-center py-8">
        No users found.
      </p>
    );
  }
  return (
    <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-700/60 text-left">
            {["#", "Name", "Email", "Phone", "Role", "Joined"].map((h) => (
              <th key={h} className="px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
          {users.map((u, i) => {
            const name = u.first_name && u.last_name
              ? `${u.first_name} ${u.last_name}`
              : u.fullName || u.name || "—";
            const rawRole = (u.accountType || u.role || "").toLowerCase();
            const isAdminRole = rawRole.includes("admin");
            return (
              <tr key={u._id || u.id || i} className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/40 transition-colors">
                <td className="px-4 py-3 text-gray-500 dark:text-gray-400 font-medium">{i + 1}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 text-blue-600 dark:text-blue-400 font-bold text-sm uppercase overflow-hidden">
                      {u.profile_image
                        ? <img src={u.profile_image} alt="" className="w-full h-full object-cover" />
                        : (name.charAt(0) || "U")}
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white truncate max-w-[130px]">{name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-300 truncate max-w-[160px]">{u.email || "—"}</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-300 whitespace-nowrap">{u.phoneNumber || u.phone || "—"}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold ${isAdminRole
                    ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                    : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                    }`}>
                    {isAdminRole ? "Admin" : "User"}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  {u.createdAt ? moment(u.createdAt).format("DD MMM YYYY") : "—"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

// ─── Main Dashboard Page ──────────────────────────────────────────────────────
const DashboardPage = () => {
  const { user } = useAppContext();
  const [apiStats, setApiStats] = useState(null);
  const [recentUsers, setRecentUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usersLoading, setUsersLoading] = useState(true);

  const isAdmin = (user?.role || "").toLowerCase().includes("admin");
  const isIndividual = user?.role === "individual";
  const isOrganizational = user?.role === "organizational";

  // ── Fetch dashboard stats ────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    const fetchStats = async () => {
      try {
        const res = await getDashboardStatsApi();
        console.log(res, "resres")
        if (cancelled) return;
        const ok =
          res &&
          (
            res.code === 200 || res.success === true ||
            res.totalVehicles !== undefined);
        if (ok) {
          const data = res.counts ?? res;

          setApiStats(data);
        } else {
          console.warn(
            "%c<================Dashboard Stats API — NO DATA (using static fallback)===========>",
            "color: #f59e0b; font-weight: bold;",
            res
          );
        }
      } catch (err) {
        console.warn(
          "%c<================Dashboard Stats API — FAILED (using static fallback)===========>",
          "color: #ef4444; font-weight: bold;",
          err?.message || err
        );
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchStats();
    return () => { cancelled = true; };
  }, []);

  // ── Fetch recent 5 users (admin only) ───────────────────────────────────────
  useEffect(() => {
    if (!isAdmin) { setUsersLoading(false); return; }
    let cancelled = false;
    const fetchUsers = async () => {
      try {
        const res = await _get_users_api(1, 5, "");
        if (cancelled) return;
        if (res && res.success && Array.isArray(res.data)) {
          console.log(
            "%c<================Recent Users API — SUCCESS===========>",
            "color: #22c55e; font-weight: bold; font-size: 13px;",
            res.data.slice(0, 5)
          );
          setRecentUsers(res.data.slice(0, 5));
        } else {
          console.warn(
            "%c<================Recent Users API — NO DATA===========>",
            "color: #f59e0b; font-weight: bold;",
            res
          );
        }
      } catch (err) {
        console.warn(
          "%c<================Recent Users API — FAILED===========>",
          "color: #ef4444; font-weight: bold;",
          err?.message || err
        );
      } finally {
        if (!cancelled) setUsersLoading(false);
      }
    };
    fetchUsers();
    return () => { cancelled = true; };
  }, [isAdmin]);

  // ── Static fallback ──────────────────────────────────────────────────────────
  const fallbackVehicles = useMemo(() => {
    if (isIndividual) return staticData.vehicles.filter((v) => v.id === "v1");
    if (isOrganizational) return staticData.vehicles.filter((v) => v.id !== "v1");
    return staticData.vehicles;
  }, [isIndividual, isOrganizational]);

  const fallbackFuelLogs = useMemo(() => {
    if (isIndividual) return staticData.fuelLogs.filter((l) => l.vehicleId === "v1");
    if (isOrganizational) return staticData.fuelLogs.filter((l) => l.vehicleId !== "v1");
    return staticData.fuelLogs;
  }, [isIndividual, isOrganizational]);

  const fallbackTrips = useMemo(() => {
    if (isIndividual) return staticData.trips.filter((t) => t.vehicleId === "v1");
    if (isOrganizational) return staticData.trips.filter((t) => t.vehicleId !== "v1");
    return staticData.trips;
  }, [isIndividual, isOrganizational]);

  // ── Resolved stats ───────────────────────────────────────────────────────────
  const S = useMemo(() => {
    if (apiStats) {
      return {
        totalVehicles: Number(apiStats?.vehicles),
        totalFuelLogs: Number(apiStats.fuelLogs),
        totalTrips: Number(apiStats.trips),
        totalSpent: Number(apiStats.totalSpent ?? 0),
        totalLitres: Number(apiStats.totalLitres ?? 0),
        avgCostPerTrip: Number(apiStats.avgCostPerTrip ?? 0),
        totalUsers: Number(apiStats.activeUsers ?? 0),
        totalAdmins: Number(apiStats.totalAdmins ?? 0),
        activeVehicles: Number(apiStats.activeVehicles ?? apiStats.totalVehicles ?? 0),
        plannedTrips: Number(apiStats.plannedTrips ?? 0),
        completedTrips: Number(apiStats.completedTrips ?? 0),
        totalOrganizations: Number(apiStats.organizations ?? 0),
      };
    }
    const spent = fallbackFuelLogs.reduce((s, l) => s + (l.cost || 0), 0);
    const litres = fallbackFuelLogs.reduce((s, l) => s + (l.quantity || 0), 0);
    const trips = fallbackTrips.length;
    return {
      totalVehicles: fallbackVehicles.length,
      totalFuelLogs: fallbackFuelLogs.length,
      totalTrips: trips,
      totalSpent: spent,
      totalLitres: litres,
      avgCostPerTrip: trips ? Math.round(spent / trips) : 0,
      totalUsers: 0,
      totalAdmins: 0,
      activeVehicles: fallbackVehicles.length,
      plannedTrips: fallbackTrips.filter((t) => t.status === "planned").length,
      completedTrips: fallbackTrips.filter((t) => t.status === "completed").length,
    };
  }, [apiStats, fallbackVehicles, fallbackFuelLogs, fallbackTrips]);

  // ── Build KPI cards ───────────────────────────────────────────────────────────
  const cards = useMemo(() => {
    const {
      totalOrganizations, totalVehicles, totalFuelLogs, totalTrips, totalSpent, totalLitres,
      avgCostPerTrip, totalUsers, totalAdmins, activeVehicles, plannedTrips, completedTrips,
    } = S;

    const budgetMax = isIndividual ? 20000 : isOrganizational ? 80000 : 150000;
    const budgetLabel = isIndividual ? "20k" : isOrganizational ? "80k" : "150k";

    // safe % helper — returns 0 if both are 0 (avoids 100% when nothing exists)
    const pct = (part, whole) => whole > 0 ? Math.min(Math.round((part / whole) * 100), 100) : 0;

    return [
      // ── Admin-only: Total Users ──────────────────────────────────────────────
      ...(isAdmin ? [{
        id: "total-users",
        label: "Total Users",
        icon: Users,
        color: "#7C3AED",
        value: totalUsers,
        percentage: pct(totalUsers - totalAdmins, Math.max(totalUsers, 1)),
        chips: [
          { label: "Users", value: totalUsers },
          { label: "Admins", value: totalAdmins },
        ],
      }] : []),

      // ── Vehicles ─────────────────────────────────────────────────────────────
      {
        id: "total-vehicles",
        label: isIndividual ? "My Vehicles" : isOrganizational ? "Fleet Vehicles" : "Total Vehicles",
        icon: Car,
        color: "#6366F1",
        value: totalVehicles,
        percentage: pct(activeVehicles, totalVehicles),
        chips: [
          { label: "Total", value: totalVehicles },
          { label: "Active", value: activeVehicles },
        ],
      },

      // ── Organizations ────────────────────────────────────────────────────────────
      {
        id: "total-organizations",
        label: isIndividual ? "My Organizations" : isOrganizational ? "Fleet Organizations" : "Total Organizations",
        icon: Users,
        color: "#10B981",
        value: totalOrganizations,
        percentage: pct(totalOrganizations, Math.max(totalOrganizations, 10)),
        chips: [
          { label: "Organizations", value: totalOrganizations },
          { label: "Avg", value: `Rs.${Math.round(totalSpent / (totalOrganizations || 1)).toLocaleString()}` },
        ],
      },

      // ── Trips ────────────────────────────────────────────────────────────────
      {
        id: "trips",
        label: isIndividual ? "My Trips" : isOrganizational ? "Fleet Trips" : "Total Trips",
        icon: MapPin,
        color: "#8B5CF6",
        value: totalTrips,
        percentage: pct(completedTrips, totalTrips),
        chips: [
          { label: "Planned", value: plannedTrips },
          { label: "Done", value: completedTrips },
        ],
      },

      // ── Total Spent ───────────────────────────────────────────────────────────
      {
        id: "total-spent",
        label: isIndividual ? "My Total Spent" : isOrganizational ? "Fleet Total Spent" : "Total Spent",
        icon: DollarSign,
        color: "#F59E0B",
        value: totalSpent,
        prefix: "Rs. ",
        percentage: pct(totalSpent, budgetMax),
        chips: [
          { label: "Budget", value: budgetLabel },
          { label: "Spent", value: `${pct(totalSpent, budgetMax)}%` },
        ],
      },

      // ── Total Litres ─────────────────────────────────────────────────────────
      {
        id: "total-litres",
        label: isIndividual ? "My Total Litres" : isOrganizational ? "Fleet Litres" : "Total Litres",
        icon: TrendingDown,
        color: "#14B8A6",
        value: totalLitres,
        suffix: " L",
        percentage: pct(totalLitres, Math.max(totalLitres, 100)),
        chips: [
          { label: "Litres", value: `${totalLitres} L` },
          { label: "Avg", value: `${Math.round(totalLitres / (totalFuelLogs || 1))} L` },
        ],
      },

      // ── Avg Cost/Trip ─────────────────────────────────────────────────────────
      {
        id: "avg-cost",
        label: isIndividual ? "Avg Cost/Trip" : isOrganizational ? "Fleet Avg Cost/Trip" : "Avg Cost/Trip",
        icon: Wallet,
        color: "#EF4444",
        value: avgCostPerTrip,
        prefix: "Rs. ",
        percentage: pct(avgCostPerTrip, budgetMax / Math.max(totalTrips, 1)),
        chips: [
          { label: "Trips", value: totalTrips },
          { label: "Spent", value: `Rs.${totalSpent.toLocaleString()}` },
        ],
      },
    ];
  }, [S, isAdmin, isIndividual, isOrganizational]);

  // ─── Render ──────────────────────────────────────────────────────────────────
  return (
    <div>
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : cards.map((card) => <DashboardCard key={card.id} card={card} />)
        }
      </div>

      {/* Admin-only: Recent 5 Users table */}
      {!loading && isAdmin && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">
              Recently Registered Users
            </h2>
            <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">Last 5</span>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-0">
            Latest user accounts registered in the system.
          </p>
          <RecentUsersTable users={recentUsers} loading={usersLoading} />
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
