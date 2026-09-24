import React, { useCallback, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import {
  Button,
  CrudFormAvatarUpload,
  CrudFormFieldLabel,
  CRUD_FORM_INPUT_CLASS,
} from "../../components";

const FIELD_HALF = "col-span-12 sm:col-span-6 flex flex-col gap-1.5";
const INPUT_CLASS = CRUD_FORM_INPUT_CLASS;
const PASSWORD_TOGGLE_CLASS =
  "!p-1.5 absolute right-2 top-1/2 -translate-y-1/2 min-h-0 min-w-0 rounded-md";

function FormHalfTextInput({
  label,
  required,
  type = "text",
  value,
  onChange,
  placeholder,
  disabled = false,
}) {
  return (
    <label className={FIELD_HALF}>
      <CrudFormFieldLabel required={required && !disabled}>
        {label}
      </CrudFormFieldLabel>
      <input
        required={required && !disabled}
        type={type}
        disabled={disabled}
        className={`${INPUT_CLASS} ${
          disabled
            ? "cursor-not-allowed opacity-80 bg-gray-50 dark:bg-gray-900/50"
            : ""
        }`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </label>
  );
}

function FormHalfPasswordInput({
  label,
  required,
  value,
  onChange,
  placeholder,
  visible,
  onToggleVisible,
}) {
  return (
    <div className={FIELD_HALF}>
      <CrudFormFieldLabel required={required}>{label}</CrudFormFieldLabel>
      <div className="relative">
        <input
          required={required}
          type={visible ? "text" : "password"}
          className={`${INPUT_CLASS} pr-10`}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete="new-password"
        />
        <Button
          type="button"
          variant="ghost"
          size="md"
          tabIndex={-1}
          className={PASSWORD_TOGGLE_CLASS}
          onClick={onToggleVisible}
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
        </Button>
      </div>
    </div>
  );
}

/**
 * Add / edit user (or supplier) modal fields.
 * Edit: email read-only; password fields hidden (unchanged on save).
 */
export function UserFormFields({ form, setForm, statusOptions, isEdit }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const setField = useCallback(
    (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value })),
    [setForm],
  );

  const onAvatarFile = useCallback(
    (file) => {
      const url = URL.createObjectURL(file);
      setForm((prev) => ({
        ...prev,
        avatarFile: file,
        avatarPreview: url,
      }));
    },
    [setForm],
  );

  return (
    <div className="grid grid-cols-12 gap-x-4 gap-y-5">
      <div className="col-span-12">
        <CrudFormAvatarUpload
          previewUrl={form.avatarPreview}
          onFileSelected={onAvatarFile}
        />
      </div>

      <FormHalfTextInput
        label="First name"
        required
        value={form.firstName}
        onChange={setField("firstName")}
        placeholder="First name"
      />
      <FormHalfTextInput
        label="Last name"
        required
        value={form.lastName}
        onChange={setField("lastName")}
        placeholder="Last name"
      />
      <FormHalfTextInput
        label="Email"
        required={!isEdit}
        type="email"
        value={form.email}
        onChange={setField("email")}
        placeholder="name@example.com"
        disabled={isEdit}
      />

      {!isEdit && (
        <>
          <FormHalfPasswordInput
            label="Password"
            required
            value={form.password}
            onChange={setField("password")}
            placeholder="Password"
            visible={showPassword}
            onToggleVisible={() => setShowPassword((v) => !v)}
          />
          <FormHalfPasswordInput
            label="Confirm password"
            required
            value={form.confirmPassword}
            onChange={setField("confirmPassword")}
            placeholder="Confirm password"
            visible={showConfirmPassword}
            onToggleVisible={() => setShowConfirmPassword((v) => !v)}
          />
        </>
      )}

      <FormHalfTextInput
        label="Phone"
        required
        value={form.phone}
        onChange={setField("phone")}
        placeholder="Enter 11-digit phone number"
      />
      <FormHalfTextInput
        label="Company"
        required
        value={form.company}
        onChange={setField("company")}
        placeholder="Company name"
      />
      <FormHalfTextInput
        label="Country"
        required
        value={form.country}
        onChange={setField("country")}
        placeholder="Country"
      />

      <label className={FIELD_HALF}>
        <CrudFormFieldLabel required>Status</CrudFormFieldLabel>
        <select
          required
          className={INPUT_CLASS}
          value={form.status}
          onChange={setField("status")}
        >
          {statusOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default UserFormFields;
