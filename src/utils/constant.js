import moment from "moment/moment";
import { s3BaseUrl } from "../config/config";
import { Contrast } from "lucide-react";

//convert htmlto text
export function htmlDecode(input) {
  var doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent;
}

//show Proper Words with Format
export const show_proper_words = (text) => {
  let replace_string = "";
  if (text) {
    replace_string = text.replace(/[-_]/g, " ");
    replace_string = replace_string
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  return replace_string;
};
//formdat currency
export const formatCurrency = (amount) => {
  if (!amount) {
    return "_";
  }
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(amount);
};

//validate Email
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
//date time
export const getCurrentDate = () => {
  const now = new Date();
  const day = now.getDate().toString().padStart(2, "0");
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = months[now.getMonth()];
  const year = now.getFullYear();
  return `${day}-${month}-${year}`;
};
//card colors dashboard
export const colorMap = {
  blue: {
    bg: "bg-blue-500",
    border: "border-l-4 border-blue-500",
    text: "text-blue-500",
  },
  green: {
    bg: "bg-green-500",
    border: "border-l-4 border-green-500",
    text: "text-green-500",
  },
  purple: {
    bg: "bg-purple-500",
    border: "border-l-4 border-purple-500",
    text: "text-purple-500",
  },
  yellow: {
    bg: "bg-yellow-500",
    border: "border-l-4 border-yellow-500",
    text: "text-yellow-500",
  },
  orange: {
    bg: "bg-orange-500",
    border: "border-l-4 border-orange-500",
    text: "text-orange-500",
  },
  red: {
    bg: "bg-red-500",
    border: "border-l-4 border-red-500",
    text: "text-red-500",
  },
  indigo: {
    bg: "bg-indigo-500",
    border: "border-l-4 border-indigo-500",
    text: "text-indigo-500",
  },
  pink: {
    bg: "bg-pink-500",
    border: "border-l-4 border-pink-500",
    text: "text-pink-500",
  },
  teal: {
    bg: "bg-teal-500",
    border: "border-l-4 border-teal-500",
    text: "text-teal-500",
  },
  gray: {
    bg: "bg-gray-500",
    border: "border-l-4 border-gray-500",
    text: "text-gray-500",
  },
};

//dashboard  borderClasses
export const borderClasses = {
  blue: "border-r-4 border-blue-600 dark:border-blue-400",
  green: "border-r-4 border-green-600 dark:border-green-400",
  purple: "border-r-4 border-purple-600 dark:border-purple-400",
  yellow: "border-r-4 border-yellow-600 dark:border-yellow-400",
  orange: "border-r-4 border-orange-600 dark:border-orange-400",
};

//dashboard color classes
export const colorClasses = {
  blue: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
  green: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400",
  purple:
    "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
  yellow:
    "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400",
  orange:
    "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400",
  red: "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400",
  indigo:
    "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400",
  pink: "bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400",
  teal: "bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400",
  gray: "bg-gray-50 dark:bg-gray-900/20 text-gray-600 dark:text-gray-400",
};

//text dashboard classes
export const changeTextClasses = {
  blue: "text-blue-600 dark:text-blue-400",
  green: "text-green-600 dark:text-green-400",
  purple: "text-purple-600 dark:text-purple-400",
  yellow: "text-yellow-600 dark:text-yellow-400",
  orange: "text-orange-600 dark:text-orange-400",
  red: "text-red-600 dark:text-red-400",
  indigo: "text-indigo-600 dark:text-indigo-400",
  pink: "text-pink-600 dark:text-pink-400",
  teal: "text-teal-600 dark:text-teal-400",
  gray: "text-gray-600 dark:text-gray-400",
};

// Priority badge colors
export const getPriorityColor = (priority) => {
  switch (priority) {
    case "urgent":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    case "high":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
    case "medium":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    case "low":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
  }
};

// Category badge colors
export const getCategoryColor = (category) => {
  switch (category) {
    case "client":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    case "accountant":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
    case "firm":
      return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200";
    case "general":
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
  }
};

// Status badge colors
export const getStatusColor = (status) => {
  switch (status) {
    case "open":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    case "inProgress":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    case "resolved":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    case "closed":
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
  }
};

//countries list with flags
export const COUNTRIES = [
  {
    value: "UK",
    label: "United Kingdom",
    flagCode: "GB", // ISO code for react-world-flags
  },
  {
    value: "Ireland",
    label: "Ireland",
    flagCode: "IE", // ISO code for react-world-flags
  },
  {
    value: "Northern Ireland",
    label: "Northern Ireland",
    flagCode: "GB", // ISO code for react-world-flags (uses GB flag)
  },
];
//nested value function
export const getNestedValue = (obj, path) => {
  return path.split(".").reduce((current, key) => current?.[key], obj);
};
//country flag
export const getCountryCode = (countryName) => {
  if (!countryName) return null;

  const countryCodeMap = {
    Pakistan: "PK",
    "United States": "US",
    "United Kingdom": "GB",
    "Northern Ireland": "GB",
    Canada: "CA",
    Australia: "AU",
    Germany: "DE",
    France: "FR",
    Italy: "IT",
    Spain: "ES",
    Netherlands: "NL",
    Sweden: "SE",
    Norway: "NO",
    Denmark: "DK",
    Finland: "FI",
    Switzerland: "CH",
    Austria: "AT",
    Belgium: "BE",
    Ireland: "IE",
    Portugal: "PT",
    Greece: "GR",
    Turkey: "TR",
    Russia: "RU",
    China: "CN",
    Japan: "JP",
    "South Korea": "KR",
    India: "IN",
    Bangladesh: "BD",
    "Sri Lanka": "LK",
    Nepal: "NP",
    Afghanistan: "AF",
    Iran: "IR",
    Iraq: "IQ",
    "Saudi Arabia": "SA",
    UAE: "AE",
    "United Arab Emirates": "AE",
    Qatar: "QA",
    Kuwait: "KW",
    Bahrain: "BH",
    Oman: "OM",
    Jordan: "JO",
    Lebanon: "LB",
    Syria: "SY",
    Egypt: "EG",
    Morocco: "MA",
    Tunisia: "TN",
    Algeria: "DZ",
    Libya: "LY",
    Sudan: "SD",
    Ethiopia: "ET",
    Kenya: "KE",
    Nigeria: "NG",
    "South Africa": "ZA",
    Brazil: "BR",
    Argentina: "AR",
    Chile: "CL",
    Mexico: "MX",
    Peru: "PE",
    Colombia: "CO",
    Venezuela: "VE",
    Ecuador: "EC",
    Bolivia: "BO",
    Uruguay: "UY",
    Paraguay: "PY",
    Guyana: "GY",
    Suriname: "SR",
    "French Guiana": "GF",
    "New Zealand": "NZ",
    Fiji: "FJ",
    "Papua New Guinea": "PG",
    Indonesia: "ID",
    Malaysia: "MY",
    Singapore: "SG",
    Thailand: "TH",
    Vietnam: "VN",
    Philippines: "PH",
    Cambodia: "KH",
    Laos: "LA",
    Myanmar: "MM",
    Brunei: "BN",
    Mongolia: "MN",
    Kazakhstan: "KZ",
    Uzbekistan: "UZ",
    Kyrgyzstan: "KG",
    Tajikistan: "TJ",
    Turkmenistan: "TM",
    Azerbaijan: "AZ",
    Armenia: "AM",
    Georgia: "GE",
    Ukraine: "UA",
    Belarus: "BY",
    Moldova: "MD",
    Romania: "RO",
    Bulgaria: "BG",
    Hungary: "HU",
    Slovakia: "SK",
    "Czech Republic": "CZ",
    Poland: "PL",
    Lithuania: "LT",
    Latvia: "LV",
    Estonia: "EE",
    Slovenia: "SI",
    Croatia: "HR",
    "Bosnia and Herzegovina": "BA",
    Serbia: "RS",
    Montenegro: "ME",
    "North Macedonia": "MK",
    Albania: "AL",
    Kosovo: "XK",
    Cyprus: "CY",
    Malta: "MT",
    Iceland: "IS",
    Luxembourg: "LU",
    Monaco: "MC",
    Liechtenstein: "LI",
    "San Marino": "SM",
    "Vatican City": "VA",
    Andorra: "AD",
  };

  return countryCodeMap[countryName] || null;
};
export const ALL_COUNTRIES = [
  { name: "Ireland", code: "+353" },
  { name: "Northern Ireland", code: "+44" },
  { name: "United States", code: "+1" },
  { name: "United Kingdom", code: "+44" },
  { name: "Canada", code: "+1" },
  { name: "Australia", code: "+61" },
  { name: "New Zealand", code: "+64" },
  { name: "Germany", code: "+49" },
  { name: "France", code: "+33" },
  { name: "Spain", code: "+34" },
  { name: "Italy", code: "+39" },
  { name: "Netherlands", code: "+31" },
  { name: "Pakistan", code: "+92" },
  { name: "Tanzania", code: "+255" },
];
// Form validation function
//
export const getCountryFlag = (countryName) => {
  const flagMap = {
    Afghanistan: "🇦🇫",
    Algeria: "🇩🇿",
    Argentina: "🇦🇷",
    Australia: "🇦🇺",
    Austria: "🇦🇹",
    Bahrain: "🇧🇭",
    Bangladesh: "🇧🇩",
    Belgium: "🇧🇪",
    Brazil: "🇧🇷",
    Canada: "🇨🇦",
    China: "🇨🇳",
    "Czech Republic": "🇨🇿",
    Denmark: "🇩🇰",
    Egypt: "🇪🇬",
    Finland: "🇫🇮",
    France: "🇫🇷",
    Germany: "🇩🇪",
    Greece: "🇬🇷",
    Hungary: "🇭🇺",
    India: "🇮🇳",
    Indonesia: "🇮🇩",
    Iran: "🇮🇷",
    Iraq: "🇮🇶",
    Ireland: "🇮🇪",
    Israel: "🇮🇱",
    Italy: "🇮🇹",
    Japan: "🇯🇵",
    Jordan: "🇯🇴",
    Kenya: "🇰🇪",
    Kuwait: "🇰🇼",
    Lebanon: "🇱🇧",
    Malaysia: "🇲🇾",
    Mexico: "🇲🇽",
    Morocco: "🇲🇦",
    Nepal: "🇳🇵",
    Netherlands: "🇳🇱",
    Nigeria: "🇳🇬",
    "Northern Ireland": "🇬🇧",
    Norway: "🇳🇴",
    Oman: "🇴🇲",
    Pakistan: "🇵🇰",
    Philippines: "🇵🇭",
    Poland: "🇵🇱",
    Portugal: "🇵🇹",
    Qatar: "🇶🇦",
    Russia: "🇷🇺",
    "Saudi Arabia": "🇸🇦",
    Singapore: "🇸🇬",
    "South Africa": "🇿🇦",
    "South Korea": "🇰🇷",
    Spain: "🇪🇸",
    "Sri Lanka": "🇱🇰",
    Sweden: "🇸🇪",
    Switzerland: "🇨🇭",
    Tanzania: "🇹🇿",
    Thailand: "🇹🇭",
    Tunisia: "🇹🇳",
    Turkey: "🇹🇷",
    UAE: "🇦🇪",
    "United Kingdom": "🇬🇧",
    "United States": "🇺🇸",
    Vietnam: "🇻🇳",
  };
  return flagMap[countryName];
};
// Process permissions for API submission
export const processPermissionsForAPI = (permissions, availablePermissions) => {
  if (!permissions?.length) return null;

  const permissionsObj = {};

  permissions.forEach((permissionId) => {
    const permission = availablePermissions.find((p) => p.id === permissionId);
    if (!permission) return;

    if (permission.isSubmenu) {
      // Handle submenu permissions
      const arrowIndex = permission.label.indexOf("→");
      const label =
        arrowIndex !== -1
          ? permission.label.substring(arrowIndex + 1).trim()
          : permission.label;
      permissionsObj[label] = "true";
    } else {
      // Handle parent permissions - always send them
      permissionsObj[permission.label] = "true";
    }
  });

  return Object.keys(permissionsObj).length > 0 ? permissionsObj : null;
};
// Selected countries to show in dropdown
export const SELECTED_COUNTRIES = [
  "Ireland",
  "Northern Ireland",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "New Zealand",
  "Germany",
  "France",
  "Spain",
  "Italy",
  "Netherlands",
  "Pakistan",
];
//html decode
export const html_decode = (input) => {
  if (!input) return "";
  const txt = document.createElement("textarea");
  txt.innerHTML = input;
  return txt.value;
};

// Phone number validation
export const validatePhoneNumber = (phone) => {
  // Check if phone is empty
  const phoneValue = phone?.trim() || "";
  if (!phoneValue || phoneValue.length === 0) {
    return {
      isValid: false,
      errorMessage: "Please enter a valid phone number",
    };
  }

  // Check if phone is just country code without actual number
  const normalizedPhone = phoneValue.replace(/\s+/g, "");
  if (
    normalizedPhone === "+44" ||
    normalizedPhone === "+353" ||
    normalizedPhone === "+255" ||
    normalizedPhone.length <= 4
  ) {
    return {
      isValid: false,
      errorMessage: "Please enter a complete phone number",
    };
  }

  return {
    isValid: true,
    errorMessage: "",
  };
};
//data check
export const safeValue = (val) =>
  val === undefined || val === null || val === "" || val === "undefined"
    ? "_"
    : val;

// ========================================
// SUPPORT TICKET FORM OPTIONS
// ========================================

// Support Ticket Categories
export const TICKET_CATEGORIES = [
  { value: "bug_report", label: "Bug Report" },
  { value: "feature_request", label: "Feature Request" },
  { value: "technical_issue", label: "Technical Issue" },
  { value: "general_inquiry", label: "General Inquiry" },
];

// Support Ticket Priorities
export const TICKET_PRIORITIES = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "urgent", label: "Urgent" },
];

// Get ticket category label from value
export const getTicketCategoryLabel = (value) => {
  const category = TICKET_CATEGORIES.find((cat) => cat.value === value);
  return category ? category.label : show_proper_words(value);
};

// Get ticket priority label from value
export const getTicketPriorityLabel = (value) => {
  const priority = TICKET_PRIORITIES.find((pri) => pri.value === value);
  return priority ? priority.label : show_proper_words(value);
};

// Support Ticket Statuses
export const TICKET_STATUSES = [
  { value: "open", label: "Open" },
  { value: "inProgress", label: "In Progress" },
  { value: "resolved", label: "Resolved" },
  { value: "closed", label: "Closed" },
];

// Get ticket status label from value
export const getTicketStatusLabel = (value) => {
  const status = TICKET_STATUSES.find((st) => st.value === value);
  return status ? status.label : show_proper_words(value);
};

// ========================================
// SIDEBAR ACTIVE STATE CONFIGURATION
// ========================================

// Parent menu routes that should stay active when viewing related activity logs
export const ACTIVITY_LOGS_PARENT_ROUTES = {
  suppliers: {
    menuId: "suppliers",
    activityLogPaths: ["/activity-logs/client/", "/activity-logs/accountant/"],
    autoExpand: true,
  },
};

export const ACTIVITY_LOGS_SUBMENU_ROUTES = {
  clients: {
    submenuId: "clients",
    activityLogPath: "/activity-logs/client/",
  },
  accountants: {
    submenuId: "accountants",
    activityLogPath: "/activity-logs/accountant/",
  },
};

// Helper function to check if a menu should be active based on activity logs route
export const isActivityLogsRelatedRoute = (pathname, menuId) => {
  const config = ACTIVITY_LOGS_PARENT_ROUTES[menuId];
  if (!config) return false;

  if (config.activityLogPath) {
    return pathname.includes(config.activityLogPath);
  }

  if (config.activityLogPaths) {
    return config.activityLogPaths.some((path) => pathname.includes(path));
  }

  return false;
};

export const isActivityLogsRelatedSubmenu = (pathname, submenuId) => {
  const config = ACTIVITY_LOGS_SUBMENU_ROUTES[submenuId];
  if (!config) return false;

  return pathname.includes(config.activityLogPath);
};

export const shouldAutoExpandForActivityLogs = (pathname, menuId) => {
  const config = ACTIVITY_LOGS_PARENT_ROUTES[menuId];
  if (!config || !config.autoExpand) return false;

  return isActivityLogsRelatedRoute(pathname, menuId);
};
//activity action options
export const actionTypeOptions = [
  { value: "", label: "All Action Types" },

  // Admin Actions
  { value: "admin_signup", label: "Admin Signup" },
  { value: "admin_team_created", label: "Admin Team Created" },
  { value: "admin_updated", label: "Admin Updated" },
  { value: "admin_deleted", label: "Admin Deleted" },

  // User General Actions
  { value: "user_login", label: "User Login" },
  { value: "logout", label: "Logout" },
  { value: "user_signup", label: "User Signup" },
  { value: "user_created", label: "User Created" },
  { value: "user_updated", label: "User Updated" },
  { value: "user_deleted", label: "User Deleted" },
  { value: "password_changed", label: "Password Changed" },
  { value: "user_password_change", label: "User Password Change" },
  { value: "email_changed", label: "Email Changed" },
  { value: "profile_updated", label: "Profile Updated" },
  { value: "file_uploaded", label: "File Uploaded" },

  // Accountant Actions
  { value: "accountant_signup", label: "Accountant Signup" },
  { value: "accountant_edit", label: "Accountant Edit" },
  { value: "accountant_delete", label: "Accountant Delete" },
  { value: "accountant_restore", label: "Accountant Restore" },
  { value: "accountant_client_assign", label: "Accountant Client Assign" },
  { value: "accountant_client_remove", label: "Accountant Client Remove" },
  { value: "accountant_remove", label: "Accountant Remove" },
  {
    value: "accountant_permission_update",
    label: "Accountant Permission Update",
  },

  // Client Actions
  { value: "client_signup", label: "Client Signup" },
  { value: "client_edit", label: "Client Edit" },
  { value: "client_delete", label: "Client Delete" },
  { value: "client_restore", label: "Client Restore" },
  { value: "client_firm_assign", label: "Client Firm Assign" },
  { value: "client_firm_remove", label: "Client Firm Remove" },
  { value: "client_remove", label: "Client Remove" },
  { value: "client_permission_update", label: "Client Permission Update" },

  // Company Actions
  { value: "company_creation", label: "Company Creation" },
  { value: "company_update", label: "Company Update" },

  // Firm Actions
  { value: "add_firm", label: "Add Firm" },
  { value: "update_firm", label: "Update Firm" },
  { value: "soft_delete_firm", label: "Soft Delete Firm" },
  { value: "restore_firm", label: "Restore Firm" },
  { value: "delete_firm_permanently", label: "Delete Firm Permanently" },
  { value: "update_firm_meta_data", label: "Update Firm Meta Data" },

  // Payment Actions
  { value: "payment_processed", label: "Payment Processed" },
  { value: "subscription_created", label: "Subscription Created" },
  {
    value: "upsert_payment_configuration",
    label: "Upsert Payment Configuration",
  },
  { value: "create_payment_plan", label: "Create Payment Plan" },
  { value: "update_payment_plan", label: "Update Payment Plan" },
  { value: "delete_payment_plan", label: "Delete Payment Plan" },

  // Support Ticket Actions
  { value: "create_support_ticket", label: "Create Support Ticket" },
  { value: "update_support_ticket", label: "Update Support Ticket" },
  { value: "delete_support_ticket", label: "Delete Support Ticket" },
  {
    value: "delete_permanent_support_ticket_comment",
    label: "Delete Permanent Support Ticket Comment",
  },
  {
    value: "delete_support_ticket_comment",
    label: "Delete Support Ticket Comment",
  },
  {
    value: "update_support_ticket_comment",
    label: "Update Support Ticket Comment",
  },
  {
    value: "create_support_ticket_comment",
    label: "Create Support Ticket Comment",
  },

  // Configuration Actions
  {
    value: "update_email_configuration",
    label: "Update Email Configuration",
  },
  { value: "update_email_template", label: "Update Email Template" },
  { value: "update_website_setting", label: "Update Website Setting" },

  // Other Actions
  { value: "send_invitation", label: "Send Invitation" },
  { value: "api_call", label: "API Call" },
  { value: "other", label: "Other" },
];
//get image
export const getProfileUrl = (value) =>
  value?.profile_image?.thumbnail_large?.url
    ? s3BaseUrl + value.profile_image.thumbnail_large.url
    : null;
//remove image
export const handleRemoveImage = (field, setFormData, setPreviewImages) => {
  setFormData((prev) => ({ ...prev, [field]: null }));
  setPreviewImages((prev) => ({ ...prev, [field]: null }));
  const fileInput = document.getElementById(`${field}-input`);
  if (fileInput) {
    fileInput.value = "";
  }
};
//==================//
export const dateFormatter = (date) => {
  if (!date) return "_";
  // Tab se separate values
  return `\t${moment(date).format("DD-MMM-YYYY hh:mm A")}`;
};
//==================//

// ========================================
// CSV EXPORT HELPER FUNCTION
// ========================================

export const exportDataToCSV = async ({
  data = null,
  apiFunction = null,
  headers = [],
  rowMapper = null,
  filenamePrefix = "export",
  currentPage = 1,
  enqueueSnackbar = null,
  apiParams = {},
  dataExtractor = null,
}) => {
  // Validate inputs
  if (!headers || headers.length === 0) {
    if (enqueueSnackbar) {
      enqueueSnackbar("CSV headers are required", { variant: "error" });
    }
    return;
  }

  if (!rowMapper || typeof rowMapper !== "function") {
    if (enqueueSnackbar) {
      enqueueSnackbar("Row mapper function is required", { variant: "error" });
    }
    return;
  }

  let dataToExport = data;

  // If API function is provided and we need full list, fetch it
  if (apiFunction && currentPage === "all") {
    try {
      const response = await apiFunction(apiParams);

      // Extract data from response
      if (dataExtractor && typeof dataExtractor === "function") {
        dataToExport = dataExtractor(response);
      } else if (response?.code === 200 || response?.data?.code === 200) {
        // Default extraction - try common response structures
        dataToExport =
          response.data?.admins ||
          response.data?.users ||
          response.data?.clients ||
          response.data?.accountants ||
          response.data?.firms ||
          response.data?.templates ||
          response.data?.data ||
          response.data ||
          response.companies ||
          response.templates ||
          [];
      } else {
        if (enqueueSnackbar) {
          enqueueSnackbar(
            response?.message ||
              response?.data?.message ||
              "Failed to fetch data for export",
            { variant: "error" },
          );
        }
        return;
      }
    } catch (error) {
      if (enqueueSnackbar) {
        enqueueSnackbar(error?.message || "Error fetching data for export", {
          variant: "error",
        });
      }
      return;
    }
  }

  // Check if we have data to export
  if (!dataToExport || dataToExport.length === 0) {
    if (enqueueSnackbar) {
      enqueueSnackbar("No data to export", { variant: "warning" });
    }
    return;
  }

  // Convert data to CSV rows
  const csvRows = dataToExport.map(rowMapper);

  // Combine headers and rows
  const csvContent = [
    headers.join(","),
    ...csvRows.map((row) =>
      row
        .map((cell) => {
          // Escape commas and quotes in cell values
          const cellValue = cell?.toString() || "";
          if (
            cellValue.includes(",") ||
            cellValue.includes('"') ||
            cellValue.includes("\n")
          ) {
            return `"${cellValue.replace(/"/g, '""')}"`;
          }
          return cellValue;
        })
        .join(","),
    ),
  ].join("\n");

  // Create blob and download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);

  // Generate filename with current date and page info
  const date = new Date().toISOString().split("T")[0];
  const pageSuffix =
    currentPage === "all" ? "full_list" : `page_${currentPage}`;
  const filename = `${filenamePrefix}_${pageSuffix}_${date}.csv`;
  link.setAttribute("download", filename);

  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  if (enqueueSnackbar) {
    enqueueSnackbar(`CSV exported successfully`, {
      variant: "success",
    });
  }
};
// =========================================================//
//default page limit for dropdown Selections
// =========================================================//

export const DEFAULT_PAGE_LIMIT = "100";
// =========================================================//
//default sort options
// =========================================================//
export const defaultSortOptions = [
  { value: "createdAt", label: "Created At" },
  { value: "updatedAt", label: "Updated At" },
  { value: "action_type", label: "Action Type" },
  { value: "status", label: "Status" },
];
// =========================================================//
//copy email
export const handleCopyEmail = (email, setEmailCopied) => {
  if (email) {
    navigator.clipboard.writeText(email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  }
};
// =========================================================//

//count map
export const steps = [1, 2, 3];
// =========================================================//

//get profile_image
export const show_proper_image = (val) => {
  if (!val || val === undefined || val === null) {
    return;
  } else {
    return s3BaseUrl + val?.profile_image?.thumbnail_large?.url;
  }
};
// =========================================================//
export const authHeaders = () => ({
  "x-sh-auth": localStorage.getItem("token"),
});
// =========================================================//

export const modal_style = { marginTop: "0px" };
// =========================================================//

export const getCurrencySymbol = (code) => {
  try {
    return new Intl.NumberFormat("en", {
      style: "currency",
      currency: code,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
      .format(0)
      .replace(/\d/g, "")
      .trim();
  } catch (e) {
    return code; // agar invalid ho to code hi return
  }
};
// =========================================================//

//embed url
export const getEmbedUrl = (url) => {
  if (!url) return null;

  // YouTube
  const ytMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  );
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1`;

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch)
    return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`;

  // Direct MP4 or S3 — not iframe, use <video>
  return null;
};
// =========================================================//
