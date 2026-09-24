import { useState, useCallback } from "react";
import { Eye, Pencil, Trash2, Fuel } from "lucide-react";
import Crud from "react-admin-crud-manager";
import moment from "moment";
import { staticData, helpers } from "../../utils/staticData";

const FuelLogDetailFieldBlock = ({ label, value, className = "" }) => {
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

const CustomFuelLogView = ({ data }) => {
  const dateRaw = data?.date;
  const dateLabel =
    dateRaw != null && dateRaw !== "" && moment(dateRaw).isValid()
      ? moment(dateRaw).format("DD/MM/YYYY")
      : dateRaw || "—";

  const createdRaw = data?.createdAt;
  const createdLabel =
    createdRaw != null && createdRaw !== "" && moment(createdRaw).isValid()
      ? moment(createdRaw).format("DD/MM/YYYY")
      : createdRaw || "—";

  return (
    <div className="space-y-5">
      {/* Header Info Block */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-14 h-14 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center flex-shrink-0 border border-green-100 dark:border-green-800">
            <Fuel className="text-green-600 dark:text-green-400" size={28} />
          </div>
          <div className="min-w-0">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white truncate">
              {data?.vehicleName || "—"}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate flex items-center gap-1.5 mt-0.5">
              {data?.station || "—"}
            </p>
          </div>
        </div>
        <span
          className="inline-flex items-center px-3 py-1 rounded-md text-sm font-semibold flex-shrink-0 bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
        >
          {dateLabel}
        </span>
      </div>

      {/* Grid Fields Block */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <FuelLogDetailFieldBlock label="Vehicle Name" value={data?.vehicleName} />
        <FuelLogDetailFieldBlock label="Fuel Station" value={data?.station} />
        <FuelLogDetailFieldBlock label="Quantity Purchased" value={data?.quantity != null ? `${data.quantity} Litres` : undefined} />
        <FuelLogDetailFieldBlock label="Total Cost" value={data?.cost != null ? `Rs. ${(data.cost || 0).toLocaleString()}` : undefined} />
        <FuelLogDetailFieldBlock label="Purchase Date" value={dateLabel} />
        <FuelLogDetailFieldBlock label="Logged On" value={createdLabel} />
      </div>
    </div>
  );
};

const FuelLogsPage = () => {
  const [, setTick] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const rerender = () => setTick((t) => t + 1);

  const vehicleOptions = staticData.vehicles.map((v) => ({
    value: v._id,
    label: `${v.name} (${v.plateNumber})`,
  }));

  const fetchData = useCallback(async ({ current_page, rows_per_page }) => {
    const start = (current_page - 1) * rows_per_page;
    const data = staticData.fuelLogs.slice(start, start + rows_per_page);
    return {
      data,
      pagination: {
        current_page,
        rows_per_page,
        total_pages: Math.ceil(staticData.fuelLogs.length / rows_per_page) || 1,
        total_records: staticData.fuelLogs.length,
      },
    };
  }, []);

  const config = {
    title: "Fuel Purchase Logs",
    description: "Log and track all your fuel purchases.",
    buttonText: "Add Purchase",
    fetchData,
    isStaticData: true,
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
        { key: "vehicleName", title: "Vehicle", onClickDetails: true },
        { key: "date", title: "Date", type: "date", format: "DD/MM/YYYY" },
        { key: "quantity", title: "Quantity", render: (r) => `${r.quantity} L` },
        { key: "cost", title: "Cost", render: (r) => `Rs. ${(r.cost || 0).toLocaleString()}` },
        { key: "station", title: "Station" },
      ],
      search: { enabled: true, useServerSideSearch: false, searchKeys: ["vehicleName", "station"] },
      pagination: { enabled: true, defaultItemsPerPage: 10 },
      sort: { enabled: false },
      exportCSV: { enabled: true, fileName: "fuel-logs" },
    },
    modalConfig: {
      addModal: {
        title: "Log Fuel Purchase",
        size: "md",
        formClass: "grid grid-cols-12 gap-4",
        icon: <Fuel size={20} />,
        formFields: [
          { key: "vehicleId", label: "Vehicle", type: "select", options: vehicleOptions, required: true, parentClass: "col-span-12" },
          { key: "date", label: "Date", type: "date", required: true, parentClass: "col-span-6" },
          { key: "quantity", label: "Quantity (Litres)", type: "number", required: true, parentClass: "col-span-6" },
          { key: "cost", label: "Cost (PKR)", type: "number", required: true, parentClass: "col-span-6" },
          { key: "station", label: "Fuel Station", type: "text", parentClass: "col-span-6" },
        ],
        handleSubmit: async (formData) => {
          setSubmitting(true);
          try {
            const id = helpers.nextFuelLogId();
            const newLog = {
              _id: id,
              id,
              vehicleId: formData.vehicleId,
              vehicleName: helpers.getVehicleName(formData.vehicleId),
              date: formData.date,
              quantity: Number(formData.quantity),
              cost: Number(formData.cost),
              station: formData.station || "N/A",
              createdAt: new Date().toISOString().split("T")[0],
            };
            staticData.fuelLogs.push(newLog);
            rerender();
            return { newObject: newLog, message: "Fuel purchase logged!" };
          } finally {
            setSubmitting(false);
          }
        },
        actionButtons: [
          { type: "submit", label: submitting ? "Saving…" : "Save", variant: "contained", color: "primary", disabled: submitting },
        ],
      },
      editModal: {
        title: "Edit Fuel Purchase",
        size: "md",
        formClass: "grid grid-cols-12 gap-4",
        icon: <Pencil size={20} />,
        formFields: [
          { key: "vehicleId", label: "Vehicle", type: "select", options: vehicleOptions, required: true, parentClass: "col-span-12" },
          { key: "date", label: "Date", type: "date", required: true, parentClass: "col-span-6" },
          { key: "quantity", label: "Quantity (Litres)", type: "number", required: true, parentClass: "col-span-6" },
          { key: "cost", label: "Cost (PKR)", type: "number", required: true, parentClass: "col-span-6" },
          { key: "station", label: "Fuel Station", type: "text", parentClass: "col-span-6" },
        ],
        handleSubmit: async (formData, item) => {
          setSubmitting(true);
          try {
            const log = staticData.fuelLogs.find((x) => x._id === item._id);
            if (log) {
              log.vehicleId = formData.vehicleId;
              log.vehicleName = helpers.getVehicleName(formData.vehicleId);
              log.date = formData.date;
              log.quantity = Number(formData.quantity);
              log.cost = Number(formData.cost);
              log.station = formData.station || "N/A";
            }
            rerender();
            return { newObject: log, targetObject: log, message: "Fuel purchase updated!" };
          } finally {
            setSubmitting(false);
          }
        },
        actionButtons: [
          { type: "submit", label: submitting ? "Saving…" : "Save", variant: "contained", color: "primary", disabled: submitting },
        ],
      },
      deleteModal: {
        title: "Delete Fuel Log",
        confirmText: "Are you sure you want to delete this fuel purchase record?",
        referenceKey: "vehicleName",
        actionButtons: [
          { label: "Cancel", variant: "outlined", color: "default", onClick: () => {} },
          {
            label: deleting ? "Deleting…" : "Delete",
            variant: "contained",
            disabled: deleting,
            onClick: async (_e, item) => {
              setDeleting(true);
              const idx = staticData.fuelLogs.findIndex((x) => x._id === item._id);
              if (idx !== -1) staticData.fuelLogs.splice(idx, 1);
              rerender();
              setDeleting(false);
              return { targetObject: item };
            },
          },
        ],
      },
      viewModal: {
        title: "Fuel Purchase Details",
        variant: "default",
        component: CustomFuelLogView,
        footer: { cancelButton: true, cancelText: "Close" },
      },
    },
  };

  return <Crud config={config} />;
};

export default FuelLogsPage;
