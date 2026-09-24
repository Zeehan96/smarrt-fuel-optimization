import React from "react";
import CrudStatusPill from "./CrudStatusPill";

/** Shared shell for detail modals (user card, email template, etc.) */
export const DETAIL_MODAL_CARD_SHELL =
  "rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm overflow-hidden";

export const DETAIL_MODAL_CARD_BODY = "p-4 sm:p-5";

/**
 * @typedef {Object} DetailModalField
 * @property {string} id
 * @property {string} label
 * @property {import('react').ComponentType<{ className?: string }>} [icon]
 * @property {unknown} [value]
 * @property {'status'|'accountStatus'|'multiline'|'text'} [kind]
 * @property {'full'} [span] - sm:col-span-2
 * @property {boolean} [emphasis] - larger value text
 * @property {string} [emptyHint] - when multiline and no value
 */

const CELL =
  "rounded-lg border border-gray-100 bg-gray-50/50 px-3 py-2.5 dark:border-gray-700/80 dark:bg-gray-900/25";

const ICON_CLASS = "h-4 w-4 shrink-0 text-gray-400 dark:text-gray-500";

/**
 * Shared detail modal field grid: label + optional Lucide icon, value (text / status pill / multiline).
 * Field rows are built in `src/config/detailModalFields.jsx` per entity.
 *
 * @param {{ fields: DetailModalField[] }} props
 */
export default function DetailModalFieldGrid({ fields }) {
  if (!fields?.length) return null;

  return (
    <dl className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2 sm:gap-x-6 sm:gap-y-4">
      {fields.map((f) => {
        const Icon = f.icon;
        const spanClass = f.span === "full" ? "sm:col-span-2" : "";
        const ddEmphasis = f.emphasis
          ? "mt-1 text-base font-semibold text-gray-900 dark:text-white"
          : "mt-1 font-medium text-gray-900 dark:text-white";

        let content;
        if (f.kind === "status") {
          content = <CrudStatusPill value={f.value} />;
        } else if (f.kind === "accountStatus") {
          const v = String(f.value || "").toLowerCase();
          const isApproved = v === "approved";
          const pillClass = isApproved
            ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200"
            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-200";
          const dotClass = isApproved
            ? "bg-green-600 dark:bg-green-400"
            : "bg-yellow-600 dark:bg-yellow-400";
          content = (
            <span
              className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-medium capitalize ${pillClass}`}
            >
              <span
                className={`h-2 w-2 shrink-0 rounded-full ${dotClass}`}
                aria-hidden
              />
              {isApproved ? "Approved" : "Pending"}
            </span>
          );
        } else if (f.kind === "multiline") {
          content =
            f.value != null && String(f.value).length > 0 ? (
              <div className="max-h-72 overflow-auto rounded-lg border border-dashed border-gray-200 bg-gray-50/80 p-3 dark:border-gray-600 dark:bg-gray-900/40">
                <p className="whitespace-pre-wrap break-words font-normal text-sm text-gray-800 dark:text-gray-200">
                  {f.value}
                </p>
              </div>
            ) : (
              <p className="text-xs font-normal text-gray-400 dark:text-gray-500">
                {f.emptyHint ?? "—"}
              </p>
            );
        } else {
          content = f.value != null && f.value !== "" ? f.value : "—";
        }

        return (
          <div key={f.id} className={`${CELL} ${spanClass}`}>
            <dt className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
              {Icon ? <Icon className={ICON_CLASS} aria-hidden /> : null}
              <span>{f.label}</span>
            </dt>
            <dd className={ddEmphasis}>{content}</dd>
          </div>
        );
      })}
    </dl>
  );
}
