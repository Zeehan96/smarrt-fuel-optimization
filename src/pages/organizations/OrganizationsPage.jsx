import { useState, useCallback } from "react";
import { Eye, Pencil, Trash2, Shield, Building2 } from "lucide-react";
import Crud from "react-admin-crud-manager";
import { useAppContext } from "../../hooks/useAppContext";
import { _get_organizations_api, _add_organization, _update_organization, _delete_organization } from "../../api/organizations";
import { COUNTRY_DROPDOWN_OPTIONS } from "../../components/common/CountryDropdown";
import { enqueueSnackbar } from "notistack";

const OrgDetailFieldBlock = ({ label, value, className = "" }) => {
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

const CustomOrgView = ({ data }) => {
  const statusColor = data?.status === true
    ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
    : "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400";

  return (
    <div className="space-y-5">
      {/* Header Info Block */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border border-gray-200 dark:border-gray-700 bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
            {data?.profile_image ? (
              <img
                src={data.profile_image}
                alt=""
                className="w-full h-full object-cover"
              />
            ) : (
              <Building2 className="text-blue-600 dark:text-blue-400" size={28} />
            )}
          </div>
          <div className="min-w-0">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white truncate">
              {data?.name || "—"}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate flex items-center gap-1.5 mt-0.5">
              {data?.email || "—"}
            </p>
          </div>
        </div>
        <span
          className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-semibold flex-shrink-0 ${statusColor}`}
        >
          {data?.status === true ? "Active" : "Inactive"}
        </span>
      </div>

      {/* Grid Fields Block */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <OrgDetailFieldBlock label="Organization Name" value={data?.name} />
        <OrgDetailFieldBlock label="Email Address" value={data?.email} />
        <OrgDetailFieldBlock label="Phone Number" value={data?.phoneNumber} />
        <OrgDetailFieldBlock label="Country" value={data?.country} />
        <OrgDetailFieldBlock label="Role / Type" value={data?.accountType || data?.role} className="capitalize col-span-2" />
      </div>
    </div>
  );
};

const STATUS_OPTIONS = [
  { value: true, label: "Active" },
  { value: false, label: "Inactive" },
];

const OrganizationsPage = () => {
  const { user } = useAppContext();
  const [, setTick] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const rerender = () => setTick((t) => t + 1);

  const fetchData = useCallback(async ({ current_page, rows_per_page, search }) => {
    try {
      const response = await _get_organizations_api(current_page, rows_per_page, search);
      if (response && response.success) {
        const mappedData = response.data.map(u => ({ 
          ...u, 
          name: u.first_name && u.last_name ? `${u.first_name} ${u.last_name}` : (u.fullName || u.name), 
          _id: u.id || u._id,
          status: u.status === "true" || u.status === true
        }));
        return {
          data: mappedData,
          pagination: {
            current_page: response.pagination.page,
            rows_per_page: response.pagination.limit,
            total_pages: response.pagination.totalPages,
            total_records: response.pagination.totalUsers,
          },
        };
      }
    } catch (error) {
      console.error("Error fetching organizations:", error);
    }
    return { data: [], pagination: { current_page, rows_per_page, total_pages: 1, total_records: 0 } };
  }, []);

  const handleSubmitAdd = async (formData) => {
    setSubmitting(true);
    try {
      const apiBody = new FormData();
      apiBody.append("first_name", formData.first_name || "");
      apiBody.append("last_name", formData.last_name || "");
      apiBody.append("email", formData.email || "");
      if (formData.password) apiBody.append("password", formData.password);
      apiBody.append("country", formData.country || "");
      apiBody.append("phoneNumber", formData.phoneNumber || "");
      apiBody.append("accountType", "Organizational User");
      if (formData.profile_image) {
        let file = formData.profile_image;
        if (file instanceof FileList || Array.isArray(file)) {
          file = file[0];
        }
        apiBody.append("profile_image", file);
      }
      
      const res = await _add_organization(apiBody);
      
      if (res && res.success) {
        rerender();
        return { newObject: res.data, message: "Organization added successfully!" };
      } else {
        alert(res.message || "Failed to add organization");
      }
    } catch (err) {
      console.log(err.message || "Error adding organization");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitEdit = async (formData, item) => {
    setSubmitting(true);
    try {
      const apiBody = new FormData();
      apiBody.append("first_name", formData.first_name || "");
      apiBody.append("last_name", formData.last_name || "");
      apiBody.append("email", formData.email || "");
      apiBody.append("country", formData.country || "");
      apiBody.append("phoneNumber", formData.phoneNumber || "");
      apiBody.append("accountType", "Organizational User");
      if (formData.status !== undefined) apiBody.append("status", formData.status);
      if (formData.password) apiBody.append("password", formData.password);
      if (formData.profile_image) {
        let file = formData.profile_image;
        if (file instanceof FileList || Array.isArray(file)) {
          file = file[0];
        }
        apiBody.append("profile_image", file);
      }
      
      const res = await _update_organization(item.id || item._id, apiBody);
      
      if (res && res.success) {
        rerender();
        return { newObject: res.data, targetObject: item, message: "Organization updated!" };
      } else {
        alert(res.message || "Failed to update organization");
      }
    } catch (err) {
      alert(err.message || "Error updating organization");
    } finally {
      setSubmitting(false);
    }
  };

  const config = {
    title: "Organizations",
    description: "Manage registered organizations – view, add, edit, and delete organizational accounts.",
    buttonText: "Add Organization",
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
        {
          key: "name",
          title: "Organization",
          type: "group",
          imageKey: "profile_image",
          titleKey: "name",
          subtitleKey: "email",
          onClickDetails: true,
          className: "font-medium text-gray-900 dark:text-gray-100 min-w-[220px]",
        },
        { key: "country", title: "Country" },
        { key: "phoneNumber", title: "Phone" },
        {
          key: "status",
          title: "Status",
          type: "chip",
          chipOptions: [
            { value: true, label: "Active", color: "green" },
            { value: false, label: "Inactive", color: "red" },
          ],
        },
      ],
      search: { enabled: true, useServerSideSearch: true, searchKeys: ["name", "email", "status"] },
      pagination: { enabled: true, useServerSidePagination: true, defaultItemsPerPage: 10 },
      sort: { enabled: false },
      exportCSV: { enabled: true, fileName: "organizations" },
    },
    modalConfig: {
      addModal: {
        title: "Add Organization",
        size: "lg",
        formClass: "grid grid-cols-12 gap-4",
        icon: <Building2 size={20} />,
        formFields: [
          { key: "profile_image", label: "Profile Image", type: "image", accept: "image/png, image/jpeg, image/jpg", dragDrop: true, aspectRatio: 1, required: false, parentClass: "col-span-12" },
          { key: "first_name", label: "Organization/First Name", type: "text", required: true, parentClass: "col-span-6" },
          { key: "last_name", label: "Last Name (Optional)", type: "text", required: false, parentClass: "col-span-6" },
          { key: "email", label: "Email", type: "email", required: true, parentClass: "col-span-6" },
          { key: "password", label: "Password", type: "password", required: true, parentClass: "col-span-6" },
          { key: "status", label: "Status", type: "select", options: STATUS_OPTIONS, required: false, parentClass: "col-span-6" },
          { key: "country", label: "Country", type: "select", options: COUNTRY_DROPDOWN_OPTIONS, search: true, required: true, parentClass: "col-span-6" },
          { key: "phoneNumber", label: "Phone Number", type: "phone", countriesList: true, defaultCountry: "PK", required: true, parentClass: "col-span-6" },
        ],
        actionButtons: [
          { type: "submit", label: submitting ? "Saving…" : "Save", variant: "contained", color: "primary", disabled: submitting },
        ],
        handleSubmit: handleSubmitAdd,
      },
      editModal: {
        title: "Edit Organization",
        size: "lg",
        formClass: "grid grid-cols-12 gap-4",
        icon: <Shield size={20} />,
        formFields: [
          { key: "profile_image", label: "Profile Image", type: "image", accept: "image/png, image/jpeg, image/jpg", dragDrop: true, aspectRatio: 1, required: false, parentClass: "col-span-12" },
          { key: "first_name", label: "Organization/First Name", type: "text", required: true, parentClass: "col-span-6" },
          { key: "last_name", label: "Last Name (Optional)", type: "text", required: false, parentClass: "col-span-6" },
          { key: "email", label: "Email", type: "email", required: true, parentClass: "col-span-6" },
          { key: "status", label: "Status", type: "select", options: STATUS_OPTIONS, required: false, parentClass: "col-span-6" },
          { key: "country", label: "Country", type: "select", options: COUNTRY_DROPDOWN_OPTIONS, search: true, required: true, parentClass: "col-span-6" },
          { key: "phoneNumber", label: "Phone Number", type: "phone", countriesList: true, defaultCountry: "PK", required: true, parentClass: "col-span-6" },
        ],
        actionButtons: [
          { type: "submit", label: submitting ? "Saving…" : "Save", variant: "contained", color: "primary", disabled: submitting },
        ],
        handleSubmit: handleSubmitEdit,
      },
      deleteModal: {
        title: "Delete Organization",
        confirmText: "Are you sure you want to delete this organization? This cannot be undone.",
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
                const res = await _delete_organization(item.id || item._id);
                if (res && res.success) {
                  enqueueSnackbar(res.message, { variant: "success" });
                  rerender();
                  return { targetObject: item };
                } else {
                  enqueueSnackbar(res.message, { variant: "error" });
                }
              } catch (err) {
                enqueueSnackbar("Error deleting organization", { variant: "error" });
              } finally {
                setDeleting(false);
              }
            },
          },
        ],
      },
      viewModal: {
        title: "Organization Details",
        variant: "default",
        component: CustomOrgView,
        footer: { cancelButton: true, cancelText: "Close" },
      },
    },
  };

  if (user?.role !== "admin") {
    return (
      <div className="text-center py-20 text-gray-500">
        Access restricted. Admin only.
      </div>
    );
  }

  return <Crud config={config} />;
};

export default OrganizationsPage;
