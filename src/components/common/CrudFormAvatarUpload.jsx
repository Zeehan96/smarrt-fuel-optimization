import React, { useRef } from "react";
import { Upload, User } from "lucide-react";
import Button from "./Button";

const MAX_BYTES = 5 * 1024 * 1024;

/**
 * Circular dashed avatar (neutral bg) + primary upload button.
 */
export function CrudFormAvatarUpload({
  previewUrl,
  onFileSelected,
  disabled = false,
}) {
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_BYTES) {
      e.target.value = "";
      return;
    }
    onFileSelected?.(file);
  };

  return (
    <div className="flex flex-col items-center gap-3 pb-4 border-b border-gray-100 dark:border-gray-700/80 mb-2">
      {/* Native <button>: shared Button uses rounded-lg which can override rounded-full in CSS order */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
        className="flex items-center justify-center shrink-0 w-[7.25rem] h-[7.25rem] rounded-full border-2 border-dashed border-gray-300 dark:border-gray-500 bg-gray-50 dark:bg-gray-800/80 hover:border-[#113071]/50 dark:hover:border-[#113071]/45 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-[#113071] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900 overflow-hidden p-0 transition-colors"
        aria-label="Choose profile image"
      >
        {previewUrl ? (
          <img src={previewUrl} alt="" className="w-full h-full object-cover" />
        ) : (
          <User
            className="w-14 h-14 text-gray-400 dark:text-gray-500"
            strokeWidth={1.25}
          />
        )}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png"
        className="sr-only"
        onChange={handleChange}
        disabled={disabled}
      />
      <Button
        type="button"
        variant="primary"
        size="md"
        icon={Upload}
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
        className="font-semibold shadow-sm"
      >
        Upload Image
      </Button>
      <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
        JPG, PNG or JPEG (max. 5MB)
      </p>
    </div>
  );
}

/** Same focus as Sidebar search: ring-1 + border #113071 */
const CRUD_FOCUS =
  "outline-none focus:ring-1 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] dark:focus:ring-[var(--primary-color)] dark:focus:border-[var(--primary-color)]";

/** Modal form fields + filter selects */
export const CRUD_FORM_INPUT_CLASS = `crud-form-input w-full rounded-lg px-3 py-2.5 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 ${CRUD_FOCUS}`;

/** Table toolbar search (matches Sidebar.jsx search input) */
export const CRUD_SEARCH_INPUT_CLASS = `crud-search-input w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 border border-gray-300 dark:border-gray-600 ${CRUD_FOCUS}`;

export function CrudFormFieldLabel({ children, required }) {
  return (
    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
      {children}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </span>
  );
}
