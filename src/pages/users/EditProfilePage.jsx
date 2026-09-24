import React, { useState, useEffect } from "react";
import { User, Mail, Camera } from "lucide-react";
import { useAppContext } from "../../hooks/useAppContext";
import { _update_user } from "../../api/users";

import { ALL_COUNTRIES } from "../../utils/constant";
import { s3BaseUrl } from "../../config/config";
import { validateImage } from "../../utils/helperFunctions";
import { useSnackbar } from "notistack";
import {
  Button,
  CRUD_FORM_INPUT_CLASS,
  CrudFormFieldLabel,
  InputPhone,
  PageMainHeading,
} from "../../components";

const EditProfilePage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { user, updateUser } = useAppContext();
  console.log(user, "useruseruseruseruser");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    email: user?.email || "",
    phone: user?.phone_number || "",
    country: user?.country || "",
    profile_image: user?.profile_image
      ? user.profile_image.startsWith("http")
        ? user.profile_image
        : s3BaseUrl + user.profile_image
      : null,
    profile_image_file: null,
  });
  const [phoneKey, setPhoneKey] = useState(0);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user?.email || "",
        phone: user.phone_number || "",
        country: user.country || "",
        profile_image: user.profile_image
          ? user.profile_image.startsWith("http")
            ? user.profile_image
            : s3BaseUrl + user.profile_image
          : null,
      }));
      setPhoneKey((prev) => prev + 1);
    }
  }, [user]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const validation = validateImage(file);
      if (!validation.isValid) {
        enqueueSnackbar(validation.errorMessage, { variant: "error" });
        return;
      }
      setFormData((prev) => ({
        ...prev,
        profile_image: URL.createObjectURL(file),
        profile_image_file: file,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = new FormData();
    submitData.append("first_name", formData.first_name);
    submitData.append("last_name", formData.last_name);

    if (formData.profile_image_file) {
      submitData.append("profile_image", formData.profile_image_file);
    }

    setLoading(true);
    try {
      submitData.append("phoneNumber", formData.phone);
      submitData.append("country", formData.country);

      const response = await _update_user(user.id || user._id, submitData);

      if (response?.success || response?.code === 200) {
        enqueueSnackbar(response?.message || "Profile updated successfully", {
          variant: "success",
        });

        // Update local context - preserve existing permissions and role
        const adminObj = response?.data || {};
        const updatedUser = {
          ...user,
          ...adminObj,
          first_name: formData.first_name,
          last_name: formData.last_name,
          phone_number: formData.phone,
          country: formData.country,
          profile_image: adminObj.profile_image || user.profile_image,
          // Preserve permissions and role
          permissions: user.permissions,
          role: user.role,
        };

        updateUser(updatedUser);

        // Forcefully update local storage for immediate persistence
        const currentStored = JSON.parse(
          localStorage.getItem("userAdmin") || "{}",
        );
        localStorage.setItem(
          "userAdmin",
          JSON.stringify({
            ...currentStored,
            user: updatedUser,
          }),
        );
      } else {
        enqueueSnackbar(response?.message || "Failed to update profile", {
          variant: "error",
        });
      }
    } catch (error) {
      enqueueSnackbar(error.message || "Failed to update profile", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Edit Profile
        </h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Manage your personal information and profile picture
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* TOP BLOCK: IMAGE LEFT, NAMES RIGHT */}
          <div className="flex flex-col md:flex-row gap-8 border-b border-gray-50 dark:border-gray-700 pb-8">
            {/* LEFT SIDE (IMAGE SECTION) */}
            <div className="md:w-1/3 flex flex-col items-center">
              <div className="relative group">
                {formData.profile_image ? (
                  <img
                    src={formData.profile_image}
                    alt="Profile"
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-2 border-gray-100 dark:border-gray-600 shadow-sm"
                  />
                ) : (
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gray-50 dark:bg-gray-900 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-500">
                    <User className="w-12 h-12 text-gray-400" />
                  </div>
                )}
                <label className="absolute bottom-1 right-1 bg-[var(--primary-color)] p-2 rounded-full cursor-pointer hover:scale-110 transition-transform shadow-lg border-2 border-white dark:border-gray-800">
                  <Camera className="w-5 h-5 text-white" />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
              <div className="mt-6 flex flex-col items-center text-center">
                <Button
                  type="button"
                  variant="secondary"
                  size="md"
                  className="text-gray-700 dark:text-white mb-2"
                  onClick={() =>
                    document.querySelector('input[type="file"]').click()
                  }
                >
                  Choose File
                </Button>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  At least 800x800 px recommended. JPG or PNG allowed.
                </p>
              </div>
            </div>

            {/* RIGHT SIDE (EMAIL & NAMES) */}
            <div className="md:w-2/3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* EMAIL */}
                <div className="sm:col-span-2 flex flex-col gap-1 opacity-70">
                  <CrudFormFieldLabel>Email Address</CrudFormFieldLabel>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                    <input
                      type="email"
                      value={formData.email}
                      readOnly
                      className={`${CRUD_FORM_INPUT_CLASS} !pl-9 cursor-not-allowed`}
                    />
                  </div>
                </div>

                {/* FIRST NAME */}
                <div className="flex flex-col gap-1">
                  <CrudFormFieldLabel required>First Name</CrudFormFieldLabel>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                    <input
                      type="text"
                      value={formData.first_name}
                      onChange={(e) =>
                        handleChange("first_name", e.target.value)
                      }
                      className={`${CRUD_FORM_INPUT_CLASS} !pl-9`}
                      placeholder="Enter First Name"
                      required
                    />
                  </div>
                </div>

                {/* LAST NAME */}
                <div className="flex flex-col gap-1">
                  <CrudFormFieldLabel required>Last Name</CrudFormFieldLabel>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                    <input
                      type="text"
                      value={formData.last_name}
                      onChange={(e) =>
                        handleChange("last_name", e.target.value)
                      }
                      className={`${CRUD_FORM_INPUT_CLASS} !pl-9`}
                      placeholder="Enter Last Name"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM BLOCK: PHONE & COUNTRY (CONDITIONAL) */}

          <div className="pt-6 flex justify-end">
            <Button
              type="submit"
              loading={loading}
              className="w-full sm:w-auto"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;
