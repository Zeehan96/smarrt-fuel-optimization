import React, { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { enqueueSnackbar } from "notistack";
import { _update_user } from "../../api/users";
import { useAppContext } from "../../hooks/useAppContext";
import {
  Button,
  CRUD_FORM_INPUT_CLASS,
  CrudFormFieldLabel,
  PageMainHeading,
} from "../../components";

const ChangePasswordPage = () => {
  const { user } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      enqueueSnackbar("Passwords do not match", { variant: "error" });
      return;
    }
    if (formData.newPassword.length < 6) {
      enqueueSnackbar("Password must be at least 6 characters", {
        variant: "error",
      });
      return;
    }

    setLoading(true);
    try {
      // Use the update user API with only the password field
      const formPayload = new FormData();
      formPayload.append("password", formData.newPassword);

      const response = await _update_user(user?.id || user?._id, formPayload);

      if (response?.success || response?.code === 200) {
        enqueueSnackbar(response?.message || "Password changed successfully", {
          variant: "success",
        });
        setFormData({ newPassword: "", confirmPassword: "" });
      } else {
        enqueueSnackbar(response?.message || "Failed to change password", {
          variant: "error",
        });
      }
    } catch (err) {
      enqueueSnackbar(err.message || "Failed to change password", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 w-full">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Change Password
        </h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Update your password to keep your account secure
        </p>
      </div>

      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <CrudFormFieldLabel required>New Password</CrudFormFieldLabel>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={formData.newPassword}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        newPassword: e.target.value,
                      }))
                    }
                    className={`${CRUD_FORM_INPUT_CLASS} !pl-9 !pr-10`}
                    placeholder="Minimum 6 characters"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#113071]"
                  >
                    {showNewPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <CrudFormFieldLabel required>
                  Confirm New Password
                </CrudFormFieldLabel>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        confirmPassword: e.target.value,
                      }))
                    }
                    className={`${CRUD_FORM_INPUT_CLASS} !pl-9 !pr-10`}
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#113071]"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {formData.confirmPassword &&
                formData.newPassword !== formData.confirmPassword && (
                  <p className="text-red-500 text-xs font-semibold ml-1">
                    Passwords do not match
                  </p>
                )}

              {formData.newPassword && formData.newPassword.length < 6 && (
                <p className="text-red-500 text-xs font-semibold ml-1">
                  Password must be at least 6 characters
                </p>
              )}
            </div>

            <div className=" flex justify-end">
              <Button
                type="submit"
                loading={loading}
                disabled={
                  !formData.newPassword ||
                  formData.newPassword !== formData.confirmPassword ||
                  formData.newPassword.length < 6
                }
                className="w-full sm:w-auto"
              >
                Update Password
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
