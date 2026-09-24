import { useState, useCallback, useEffect } from "react";
import { Eye, MapPin, AlertCircle, CheckCircle2 } from "lucide-react";
import Crud from "react-admin-crud-manager";
import moment from "moment";
import { useAppContext } from "../../hooks/useAppContext";
import {
  _plan_trip_api,
  _save_trip_api,
  _get_user_trips_api,
} from "../../api/trips";
import { enqueueSnackbar } from "notistack";
import { show_proper_words } from "../../utils/constant";
import { useLocation } from "react-router-dom";

const TripDetailFieldBlock = ({ label, value, className = "" }) => {
  const display =
    value != null && String(value).trim() ? String(value).trim() : "—";
  return (
    <div
      className={`p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 min-w-0 ${className}`.trim()}
    >
      <label className="text-[10px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1">
        {label}
      </label>
      <p className="text-sm font-medium text-gray-900 dark:text-gray-100 whitespace-pre-wrap break-words">
        {display}
      </p>
    </div>
  );
};

const pakistaniCities = [
  { label: "Karachi", value: "karachi" },
  { label: "Lahore", value: "lahore" },
  { label: "Islamabad", value: "islamabad" },
  { label: "Rawalpindi", value: "rawalpindi" },
  { label: "Faisalabad", value: "faisalabad" },
  { label: "Multan", value: "multan" },
  { label: "Sahiwal", value: "sahiwal" },
  { label: "Gujranwala", value: "gujranwala" },
  { label: "Peshawar", value: "peshawar" },
  { label: "Quetta", value: "quetta" },
  { label: "Sialkot", value: "sialkot" },
  { label: "Bahawalpur", value: "bahawalpur" },
  { label: "Sargodha", value: "sargodha" },
  { label: "Sukkur", value: "sukkur" },
  { label: "Larkana", value: "larkana" },
  { label: "Sheikhupura", value: "sheikhupura" },
  { label: "Jhang", value: "jhang" },
  { label: "Gujrat", value: "gujrat" },
  { label: "Mardan", value: "mardan" },
  { label: "Kasur", value: "kasur" },
  { label: "Rahim Yar Khan", value: "rahim_yar_khan" },
  { label: "Nawabshah", value: "nawabshah" },
  { label: "Okara", value: "okara" },
  { label: "Mandi Bahauddin", value: "mandi_bahauddin" },
  { label: "Chiniot", value: "chiniot" },
];

const CustomTripView = ({ data }) => {
  const dateRaw = data?.createdAt;
  const dateLabel =
    dateRaw != null && dateRaw !== "" && moment(dateRaw).isValid()
      ? moment(dateRaw).format("DD/MM/YYYY hh:mm A")
      : dateRaw || "—";

  return (
    <div className="space-y-5">
      {/* Header Info Block */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-14 h-14 rounded-full bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center flex-shrink-0 border border-purple-100 dark:border-purple-800">
            <MapPin
              className="text-purple-600 dark:text-purple-400"
              size={28}
            />
          </div>
          <div className="min-w-0">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white truncate">
              {show_proper_words(data?.origin)} to{" "}
              {show_proper_words(data?.destination)}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate flex items-center gap-1.5 mt-0.5">
              {dateLabel}
            </p>
          </div>
        </div>
        <span
          className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-semibold flex-shrink-0 ${
            data?.crisisModeActive
              ? "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400"
              : "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
          }`}
        >
          {data?.crisisModeActive ? "Crisis Mode Active" : "Normal Trip"}
        </span>
      </div>

      {/* Grid Fields Block */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <TripDetailFieldBlock
          label="Origin"
          value={show_proper_words(data?.origin)}
        />
        <TripDetailFieldBlock
          label="Destination"
          value={show_proper_words(data?.destination)}
        />
        <TripDetailFieldBlock
          label="Distance"
          value={
            data?.distanceKm != null ? `${data?.distanceKm} km` : undefined
          }
        />
        <TripDetailFieldBlock
          label="Estimated Fuel"
          value={
            data?.estimatedFuelLiters != null
              ? `${data?.estimatedFuelLiters} Liters`
              : undefined
          }
        />
        <TripDetailFieldBlock
          label="Price Per Liter"
          value={
            data?.pricePerLiter != null
              ? `Rs. ${data?.pricePerLiter}`
              : undefined
          }
        />
        <TripDetailFieldBlock
          label="Estimated Cost"
          value={
            data?.estimatedCost != null
              ? `Rs. ${data?.estimatedCost}`
              : undefined
          }
        />
      </div>

      {data?.crisisModeActive && data?.crisisRecommendations?.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-3">
            <AlertCircle className="w-4 h-4 text-amber-500" />
            Crisis Recommendations
          </h3>
          <ul className="space-y-2">
            {data.crisisRecommendations.map((rec, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300 bg-amber-50 dark:bg-amber-900/10 p-3 rounded-lg border border-amber-100 dark:border-amber-900/30"
              >
                <CheckCircle2 className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const TripPlanningPage = () => {
  const { user } = useAppContext();
  const [, setTick] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [selectedOrigin, setSelectedOrigin] = useState("sahiwal");
  const [selectedDestination, setSelectedDestination] = useState("lahore");
  const rerender = () => setTick((t) => t + 1);

  const fetchData = useCallback(
    async ({ current_page, rows_per_page }) => {
      try {
        const response = await _get_user_trips_api(
          user?._id || user?.id,
          current_page,
          rows_per_page,
        );
        if (response && response.success) {
          return {
            data: response.data,
            pagination: {
              current_page: response.pagination.page,
              rows_per_page: response.pagination.limit,
              total_pages: response.pagination.totalPages,
              total_records: response.pagination.totalTrips,
            },
          };
        }
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
      return {
        data: [],
        pagination: {
          current_page,
          rows_per_page,
          total_pages: 1,
          total_records: 0,
        },
      };
    },
    [user],
  );

  const handleSubmitAdd = async (formData) => {
    setSubmitting(true);
    try {
      if (formData.origin === formData.destination) {
        enqueueSnackbar("Origin and Destination cannot be the same city.", {
          variant: "warning",
        });
        setSubmitting(false);
        return;
      }

      // Step 1: Call Plan Trip API to estimate
      const planPayload = {
        origin: formData.origin,
        destination: formData.destination,
        fuelEfficiency: Number(formData.fuelEfficiency) || 12,
        pricePerLiter: Number(formData.pricePerLiter) || 280,
        crisisMode:
          formData.crisisMode === "true" || formData.crisisMode === true,
      };

      const planRes = await _plan_trip_api(planPayload);

      if (!planRes || !planRes.success) {
        enqueueSnackbar(planRes?.message || "Failed to plan trip", {
          variant: "error",
        });
        return;
      }

      const estimatedData = planRes.data;

      // Step 2: Call Save Trip API to save in DB
      const savePayload = {
        userId: user?._id || user?.id,
        origin: estimatedData.origin,
        destination: estimatedData.destination,
        distanceKm: estimatedData.distanceKm,
        estimatedFuelLiters: estimatedData.estimatedFuelLiters,
        pricePerLiter: estimatedData.pricePerLiter,
        estimatedCost: estimatedData.estimatedCost,
        crisisModeActive: estimatedData.crisisModeActive,
        crisisRecommendations: estimatedData.crisisRecommendations || [],
      };

      const saveRes = await _save_trip_api(savePayload);

      if (saveRes && saveRes.success) {
        rerender();
        return { newObject: saveRes.data, message: "Trip saved successfully!" };
      } else {
        enqueueSnackbar(saveRes?.message || "Failed to save trip", {
          variant: "error",
        });
      }
    } catch (err) {
      console.error(err);
      enqueueSnackbar("An error occurred while planning the trip.", {
        variant: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const config = {
    title: "Trip Planning & Route Optimization",
    description:
      "Plan trips, calculate distance, estimate fuel consumption, and view crisis tips.",
    buttonText: "Plan New Trip",
    fetchData,
    isStaticData: false,
    tableConfig: {
      table_head: [
        {
          key: "actions",
          title: "Actions",
          type: "menu_actions",
          menuList: [
            { title: "View Details", type: "view", icon: <Eye size={16} /> },
          ],
        },
        { key: "index", title: "#", type: "index" },
        {
          key: "origin",
          title: "Route",
          render: (row) =>
            `${show_proper_words(row.origin)} → ${show_proper_words(row.destination)}`,
          onClickDetails: true,
        },
        {
          key: "distanceKm",
          title: "Distance",
          render: (row) => `${row.distanceKm} km`,
        },
        {
          key: "estimatedFuelLiters",
          title: "Est. Fuel",
          render: (row) => `${row.estimatedFuelLiters} L`,
        },
        {
          key: "estimatedCost",
          title: "Est. Cost",
          render: (row) =>
            row.estimatedCost ? `Rs. ${row.estimatedCost}` : "—",
        },
        {
          key: "createdAt",
          title: "Date",
          type: "date",
          format: "DD/MM/YYYY hh:mm A",
        },
        {
          key: "crisisModeActive",
          title: "Crisis Mode",
          type: "chip",
          chipOptions: [
            { value: true, label: "Active", color: "orange" },
            { value: false, label: "Inactive", color: "gray" },
          ],
        },
        {
          key: "status",
          title: "Status",
          type: "chip",
          chipOptions: [
            { value: true, label: "Active", color: "green" },
            { value: false, label: "Inactive", color: "gray" },
          ],
        },
      ],
      search: { enabled: false }, // DB API does not implement search query params
      pagination: {
        enabled: true,
        useServerSidePagination: true,
        defaultItemsPerPage: 10,
      },
      sort: { enabled: false },
      exportCSV: { enabled: true, fileName: "my_trips" },
    },
    modalConfig: {
      addModal: {
        title: "Plan & Estimate New Trip",
        size: "md",
        formClass: "grid grid-cols-12 gap-4",
        icon: <MapPin size={20} />,
        formFields: [
          {
            key: "origin",
            label: "Origin",
            type: "select",
            options: pakistaniCities.filter(
              (c) => c.value !== selectedDestination,
            ),
            required: true,
            defaultValue: "sahiwal",
            parentClass: "col-span-12",
            onChange: (e) => {
              const val = e?.target?.value || e?.value || e;
              setSelectedOrigin(val);
            },
          },
          {
            key: "destination",
            label: "Destination",
            type: "select",
            options: pakistaniCities.filter((c) => c.value !== selectedOrigin),
            required: true,
            defaultValue: "lahore",
            parentClass: "col-span-12",
            onChange: (e) => {
              const val = e?.target?.value || e?.value || e;
              setSelectedDestination(val);
            },
          },
          {
            key: "fuelEfficiency",
            label: "Fuel Efficiency (km/L)",
            type: "number",
            required: true,
            defaultValue: 12,
            parentClass: "col-span-6",
          },
          {
            key: "pricePerLiter",
            label: "Price Per Liter (Rs)",
            type: "number",
            required: true,
            defaultValue: 280,
            parentClass: "col-span-6",
          },
          {
            key: "crisisMode",
            label: "Crisis Mode",
            type: "select",
            options: [
              { label: "Enabled (Get Fuel Tips)", value: true },
              { label: "Disabled", value: false },
            ],
            required: true,
            defaultValue: false,
            parentClass: "col-span-6",
          },
        ],
        handleSubmit: handleSubmitAdd,
        actionButtons: [
          {
            type: "submit",
            label: submitting ? "Planning Trip…" : "Plan & Save",
            variant: "contained",
            color: "primary",
            disabled: submitting,
          },
        ],
      },
      viewModal: {
        title: "Trip Details",
        variant: "default",
        component: CustomTripView,
        footer: { cancelButton: true, cancelText: "Close" },
      },
    },
  };

  return <Crud config={config} />;
};

export default TripPlanningPage;
