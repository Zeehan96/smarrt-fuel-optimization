import { useState, useCallback } from "react";
import { Eye, Pencil, Trash2, Car } from "lucide-react";
import Crud from "react-admin-crud-manager";
import moment from "moment";
import { getVehiclesApi, createVehicleApi, updateVehicleApi, deleteVehicleApi } from "../../api/vehicles";
import { useSnackbar } from "notistack";
import { useAppContext } from "../../hooks/useAppContext";

const FUEL_TYPES = [
  { value: "Petrol", label: "Petrol" },
  { value: "Diesel", label: "Diesel" },
  { value: "Electric", label: "Electric" },
];

const VEHICLE_FORM_FIELDS = [
  { key: "name", label: "Vehicle Name", type: "text", required: true, parentClass: "col-span-12" },
  { key: "registration_number", label: "Registration Number", type: "text", required: true, parentClass: "col-span-6" },
  { key: "manufacturer", label: "Manufacturer", type: "text", required: true, parentClass: "col-span-6" },
  { key: "model_year", label: "Model Year", type: "text", required: true, parentClass: "col-span-6" },
  { key: "fuel_type", label: "Fuel Type", type: "select", options: FUEL_TYPES, required: true, parentClass: "col-span-6" },
  
  // Petrol / Diesel Fields
  {
    key: "fuel_efficiency",
    label: "Fuel Efficiency (km/L)",
    placeholder: "Enter Fuel Efficiency (km/L)",
    type: "number",
    required: true,
    parentClass: "col-span-6",
    dependencyKey: "fuel_type",
    renderCondition: (formData) => formData?.fuel_type !== "Electric",
  },
  {
    key: "fuel_tank_capacity",
    label: "Tank Capacity (Litres)",
    placeholder: "Enter Tank Capacity (Litres)",
    type: "number",
    required: true,
    parentClass: "col-span-6",
    dependencyKey: "fuel_type",
    renderCondition: (formData) => formData?.fuel_type !== "Electric",
  },

  // Electric Fields
  {
    key: "fuel_efficiency",
    label: "Energy Efficiency (km/kWh)",
    placeholder: "Enter Energy Efficiency (km/kWh)",
    type: "number",
    required: true,
    parentClass: "col-span-6",
    dependencyKey: "fuel_type",
    renderCondition: (formData) => formData?.fuel_type === "Electric",
  },
  {
    key: "fuel_tank_capacity",
    label: "Battery Capacity (kWh)",
    placeholder: "Enter Battery Capacity (kWh)",
    type: "number",
    required: true,
    parentClass: "col-span-6",
    dependencyKey: "fuel_type",
    renderCondition: (formData) => formData?.fuel_type === "Electric",
  },
];

const VehicleDetailFieldBlock = ({ label, value, className = "" }) => {
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

const CustomVehicleView = ({ data }) => {
  const createdRaw = data?.createdAt;
  const createdLabel =
    createdRaw != null && createdRaw !== "" && moment(createdRaw).isValid()
      ? moment(createdRaw).format("DD-MMM-YYYY hh:mm A")
      : createdRaw || "—";

  const isElectric = data?.fuel_type === "Electric";

  return (
    <div className="space-y-5">
      {/* Header Info Block */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-14 h-14 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0 border border-blue-100 dark:border-blue-800">
            <Car className="text-blue-600 dark:text-blue-400" size={28} />
          </div>
          <div className="min-w-0">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white truncate">
              {data?.name || "—"}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate flex items-center gap-1.5 mt-0.5 font-mono">
              {data?.registration_number || "—"}
            </p>
          </div>
        </div>
        <span
          className="inline-flex items-center px-3 py-1 rounded-md text-sm font-semibold flex-shrink-0 bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
        >
          {data?.fuel_type || "Vehicle"}
        </span>
      </div>

      {/* Grid Fields Block */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <VehicleDetailFieldBlock label="Vehicle Name" value={data?.name} />
        <VehicleDetailFieldBlock label="Registration Number" value={data?.registration_number} />
        <VehicleDetailFieldBlock label="Manufacturer" value={data?.manufacturer} />
        <VehicleDetailFieldBlock label="Model Year" value={data?.model_year} />
        <VehicleDetailFieldBlock label="Fuel / Energy Type" value={data?.fuel_type} />
        <VehicleDetailFieldBlock
          label={isElectric ? "Energy Efficiency" : "Fuel Efficiency"}
          value={data?.fuel_efficiency != null ? `${data.fuel_efficiency} ${isElectric ? "km/kWh" : "km/L"}` : undefined}
        />
        <VehicleDetailFieldBlock
          label={isElectric ? "Battery Capacity" : "Tank Capacity"}
          value={data?.fuel_tank_capacity != null ? `${data.fuel_tank_capacity} ${isElectric ? "kWh" : "Litres"}` : undefined}
        />
        <VehicleDetailFieldBlock
          label="Created At"
          value={createdLabel}
        />
      </div>
    </div>
  );
};

const VehiclesPage = () => {
  const { user } = useAppContext();
  const isAdmin = (user?.role || user?.accountType || "").toLowerCase().includes("admin");
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [tick, setTick] = useState(0);
  const rerender = () => setTick((t) => t + 1);
  const { enqueueSnackbar } = useSnackbar();

  const fetchData = useCallback(async ({ current_page, rows_per_page }) => {
    try {
      const response = await getVehiclesApi();
      const isSuccess =
        response &&
        (response.success ||
          response.code === 200 ||
          Array.isArray(response.data) ||
          Array.isArray(response));

      if (isSuccess) {
        const rawList = Array.isArray(response) ? response : response.data || [];
        const mappedData = rawList.map((v) => ({
          ...v,
          _id: v._id || v.id,
          userName:
            v.userId && (v.userId.first_name || v.userId.name)
              ? `${v.userId.first_name || ""} ${v.userId.last_name || ""}`.trim() ||
                v.userId.name
              : typeof v.userId === "string"
              ? v.userId
              : "—",
        }));
        const start = (current_page - 1) * rows_per_page;
        const paginatedData = mappedData.slice(start, start + rows_per_page);
        return {
          data: paginatedData,
          pagination: {
            current_page,
            rows_per_page,
            total_pages: Math.ceil(mappedData.length / rows_per_page) || 1,
            total_records: mappedData.length,
          },
        };
      }
      return { data: [], pagination: { current_page, rows_per_page, total_pages: 1, total_records: 0 } };
    } catch (error) {
      console.error(error);
      return { data: [], pagination: { current_page, rows_per_page, total_pages: 1, total_records: 0 } };
    }
  }, [tick]);

  const config = {
    title: "Vehicle Management",
    description: "Add, edit, and manage your vehicles.",
    buttonText: "Add Vehicle",
    fetchData,
    isStaticData: false,
    tableConfig: {
      table_head: [
        {
          key: "actions",
          title: "Actions",
          type: "menu_actions",
          menuList: [
            { title: "View", type: "view", icon: <Eye size={16} /> },
            { title: "Edit", type: "edit", icon: <Pencil size={16} /> },
            { title: "Delete", type: "delete", icon: <Trash2 size={16} /> },
          ],
        },
        { key: "index", title: "#", type: "index" },
        { key: "name", title: "Vehicle Name", onClickDetails: true },
        ...(isAdmin ? [{ key: "userName", title: "User" }] : []),
        { key: "registration_number", title: "Registration #" },
        { key: "manufacturer", title: "Manufacturer" },
        {
          key: "fuel_type",
          title: "Fuel Type",
          render: (row) => {
            const type = row.fuel_type || "Petrol";
            let colorClass =
              "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border border-amber-200 dark:border-amber-800";
            if (type === "Diesel") {
              colorClass =
                "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-800";
            } else if (type === "Electric") {
              colorClass =
                "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800";
            }
            return (
              <span
                className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold ${colorClass}`}
              >
                {type}
              </span>
            );
          },
        },
        {
          key: "fuel_efficiency",
          title: "Efficiency",
          render: (row) =>
            row.fuel_efficiency != null
              ? `${row.fuel_efficiency} ${row.fuel_type === "Electric" ? "km/kWh" : "km/L"}`
              : "—",
        },
        {
          key: "fuel_tank_capacity",
          title: "Capacity",
          render: (row) =>
            row.fuel_tank_capacity != null
              ? `${row.fuel_tank_capacity} ${row.fuel_type === "Electric" ? "kWh" : "L"}`
              : "—",
        },
        {
          key: "createdAt",
          title: "Created At",
          render: (row) => (
            <span className="text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">
              {row.createdAt ? moment(row.createdAt).format("DD-MMM-YYYY hh:mm A") : "—"}
            </span>
          ),
        },
      ],
      search: { enabled: true, useServerSideSearch: false, searchKeys: ["name", "registration_number", "manufacturer", "userName"] },
      pagination: { enabled: true, defaultItemsPerPage: 10 },
      sort: { enabled: false },
      exportCSV: { enabled: true, fileName: "vehicles" },
    },
    modalConfig: {
      addModal: {
        title: "Add Vehicle",
        size: "md",
        formClass: "grid grid-cols-12 gap-4",
        icon: <Car size={20} />,
        formFields: VEHICLE_FORM_FIELDS,
        handleSubmit: async (formData) => {
          setSubmitting(true);
          try {
            const newVehicle = {
              name: formData.name,
              registration_number: formData.registration_number,
              manufacturer: formData.manufacturer,
              model_year: formData.model_year,
              fuel_type: formData.fuel_type,
              fuel_efficiency: Number(formData.fuel_efficiency),
              fuel_tank_capacity: Number(formData.fuel_tank_capacity),
            };
            const response = await createVehicleApi(newVehicle);
            if (response && (response.success || response.code === 200 || response.code === 201)) {
               enqueueSnackbar("Vehicle added successfully!", { variant: "success" });
               rerender();
               return { newObject: response.data || response, message: "Vehicle added successfully!" };
            } else {
               enqueueSnackbar(response?.message || "Failed to add vehicle", { variant: "error" });
               return false;
            }
          } finally {
            setSubmitting(false);
          }
        },
        actionButtons: [
          { type: "submit", label: submitting ? "Saving…" : "Save", variant: "contained", color: "primary", disabled: submitting },
        ],
      },
      editModal: {
        title: "Edit Vehicle",
        size: "md",
        formClass: "grid grid-cols-12 gap-4",
        icon: <Pencil size={20} />,
        formFields: VEHICLE_FORM_FIELDS,
        handleSubmit: async (formData, item) => {
          setSubmitting(true);
          try {
             const updateData = {
              name: formData.name,
              registration_number: formData.registration_number,
              manufacturer: formData.manufacturer,
              model_year: String(formData.model_year),
              fuel_type: formData.fuel_type,
              fuel_efficiency: Number(formData.fuel_efficiency),
              fuel_tank_capacity: Number(formData.fuel_tank_capacity),
            };
            const response = await updateVehicleApi(item._id || item.id, updateData);
            if (response && (response.success || response.code === 200)) {
               enqueueSnackbar("Vehicle updated!", { variant: "success" });
               rerender();
               return { newObject: response.data || response, targetObject: item, message: "Vehicle updated!" };
            } else {
               enqueueSnackbar(response?.message || "Failed to update vehicle", { variant: "error" });
               return false;
            }
          } finally {
            setSubmitting(false);
          }
        },
        actionButtons: [
          { type: "submit", label: submitting ? "Saving…" : "Save", variant: "contained", color: "primary", disabled: submitting },
        ],
      },
      deleteModal: {
        title: "Delete Vehicle",
        confirmText: "Are you sure you want to delete this vehicle? This cannot be undone.",
        referenceKey: "name",
        actionButtons: [
          { label: "Cancel", variant: "outlined", color: "default", onClick: () => {} },
          {
            label: deleting ? "Deleting…" : "Delete",
            variant: "contained",
            disabled: deleting,
            onClick: async (_e, item) => {
              setDeleting(true);
              try {
                const response = await deleteVehicleApi(item._id || item.id);
                if (response && (response.success || response.code === 200)) {
                   enqueueSnackbar("Vehicle deleted successfully!", { variant: "success" });
                   rerender();
                   return { targetObject: item };
                } else {
                   enqueueSnackbar(response?.message || "Failed to delete vehicle", { variant: "error" });
                   return false;
                }
              } finally {
                setDeleting(false);
              }
            },
          },
        ],
      },
      viewModal: {
        title: "Vehicle Details",
        variant: "default",
        component: CustomVehicleView,
        footer: { cancelButton: true, cancelText: "Close" },
      },
    },
  };

  return <Crud config={config} />;
};

export default VehiclesPage;
