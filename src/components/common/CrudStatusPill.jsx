import React from "react";

/** Soft pill + dot — keep in sync with table status column */
const STATUS_PILL = {
  active: {
    label: "Active",
    pill: "border border-emerald-200/90 bg-emerald-50 text-emerald-800 dark:border-emerald-800/50 dark:bg-emerald-950/35 dark:text-emerald-200",
    dot: "bg-emerald-500 dark:bg-emerald-400",
  },
  inactive: {
    label: "Inactive",
    pill: "border border-rose-200/90 bg-rose-50 text-rose-900 dark:border-rose-800/55 dark:bg-rose-950/40 dark:text-rose-200",
    dot: "bg-red-500 dark:bg-red-400",
  },
  deleted: {
    label: "Deleted",
    pill: "border border-gray-200 bg-gray-100 text-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300",
    dot: "bg-gray-400 dark:bg-gray-500",
  },
  pending: {
    label: "Pending",
    pill: "border border-amber-200/90 bg-amber-50 text-amber-900 dark:border-amber-800/50 dark:bg-amber-950/35 dark:text-amber-200",
    dot: "bg-amber-500 dark:bg-amber-400",
  },
};

/** Status pill + dot — same styling as CRUD table `type: "status"` column. */
export default function CrudStatusPill({ value }) {
  const raw =
    typeof value === "string"
      ? value.toLowerCase().trim()
      : value === true
        ? "active"
        : value === false
          ? "inactive"
          : "";
  const key =
    raw === "active" || value === true
      ? "active"
      : raw === "inactive" || value === false
        ? "inactive"
        : raw === "deleted"
          ? "deleted"
          : raw === "pending"
            ? "pending"
            : null;

  const cfg = key ? STATUS_PILL[key] : null;
  const fallbackLabel =
    typeof value === "string" && value.trim()
      ? value.trim().charAt(0).toUpperCase() +
        value.trim().slice(1).toLowerCase()
      : value != null && value !== ""
        ? String(value)
        : "-";

  const pill = cfg?.pill ?? STATUS_PILL.deleted.pill;
  const dot = cfg?.dot ?? STATUS_PILL.deleted.dot;
  const label = cfg?.label ?? fallbackLabel;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-medium ${pill}`}
    >
      <span className={`h-2 w-2 shrink-0 rounded-full ${dot}`} aria-hidden />
      {label}
    </span>
  );
}
