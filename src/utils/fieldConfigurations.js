import React from "react";
import {
  Package,
  Clock,
  Award,
  CheckCircle,
  XCircle,
  Calendar,
  Building2,
  Phone,
  Globe,
  Mail,
  DollarSign,
  Euro,
  PoundSterling,
  MapPin,
  Building,
  Briefcase,
  Hash,
  CreditCard,
} from "lucide-react";
import {
  renderJoinDate,
  getCurrencyIcon,
  dateRenderer,
} from "./helperFunctions";
import {
  formatCurrency,
  show_proper_words,
  getCurrencySymbol,
} from "./constant";
import moment from "moment";

// Common field configurations that can be reused
export const commonFieldConfigs = {
  "Plan For": {
    IconComponent: Package,
    iconClassName: "w-5 h-5 text-indigo-600 dark:text-indigo-400",
    iconBgColor: "bg-indigo-100 dark:bg-indigo-900/30",
    getValue: (data) => {
      if (!data?.plan_for) return "_";
      switch (data.plan_for) {
        case "client":
          return "Client Portal";
        case "firm":
          return "Firm Portal";
        case "website":
          return "Website";
        default:
          return data.plan_for.charAt(0).toUpperCase() + data.plan_for.slice(1);
      }
    },
  },
  Price: {
    getIconComponent: (data) => getCurrencyIcon(data?.currency || "GBP"),
    iconClassName: "w-5 h-5 text-green-600 dark:text-green-400",
    iconBgColor: "bg-green-100 dark:bg-green-900/30",
    getValue: (data) =>
      formatCurrency(data?.amount || 0, data?.currency || "GBP"),
  },
  "Plan Type": {
    IconComponent: Package,
    iconClassName: "w-5 h-5 text-blue-600 dark:text-blue-400",
    iconBgColor: "bg-blue-100 dark:bg-blue-900/30",
    getValue: (data) =>
      data?.plan_type === "one_time"
        ? "One Time"
        : data?.plan_type
        ? data.plan_type.charAt(0).toUpperCase() + data.plan_type.slice(1)
        : "_",
  },
  "Billing Cycle": {
    IconComponent: Clock,
    iconClassName: "w-5 h-5 text-blue-600 dark:text-blue-400",
    iconBgColor: "bg-blue-100 dark:bg-blue-900/30",
    getValue: (data) =>
      data?.plan_period === "one_time"
        ? "One Time"
        : data?.plan_period
        ? data.plan_period.charAt(0).toUpperCase() + data.plan_period.slice(1)
        : data?.billing_cycle
        ? data.billing_cycle.replace(/_/g, " ")
        : "_",
    valueClassName:
      "text-base font-semibold text-gray-900 dark:text-white capitalize truncate",
  },
  "Max Licences": {
    IconComponent: Award,
    iconClassName: "w-5 h-5 text-purple-600 dark:text-purple-400",
    iconBgColor: "bg-purple-100 dark:bg-purple-900/30",
    getValue: (data) => {
      if (data?.plan_for === "client") {
        return data?.allowed_invoices_count === -1
          ? "Unlimited"
          : data?.allowed_invoices_count?.toString() || "_";
      }
      return data?.allowed_licenses_count === -1
        ? "Unlimited"
        : data?.allowed_licenses_count?.toString() || "_";
    },
  },
  "Invoices Count": {
    IconComponent: Award,
    iconClassName: "w-5 h-5 text-purple-600 dark:text-purple-400",
    iconBgColor: "bg-purple-100 dark:bg-purple-900/30",
    getValue: (data) =>
      data?.allowed_invoices_count === -1
        ? "Unlimited"
        : data?.allowed_invoices_count?.toString() || "_",
  },
  Status: {
    getIconComponent: (data) =>
      data?.status === true || data?.status === "active"
        ? CheckCircle
        : XCircle,
    getIconClassName: (data) =>
      `w-5 h-5 ${
        data?.status === true || data?.status === "active"
          ? "text-green-600 dark:text-green-400"
          : "text-red-600 dark:text-red-400"
      }`,
    getIconBgColor: (data) =>
      data?.status === true || data?.status === "active"
        ? "bg-green-100 dark:bg-green-900/30"
        : "bg-red-100 dark:bg-red-900/30",
    getValue: (data) =>
      data?.status === true || data?.status === "active"
        ? "Active"
        : "Inactive",
    getValueClassName: (data) =>
      `text-base font-semibold ${
        data?.status === true || data?.status === "active"
          ? "text-green-600 dark:text-green-400"
          : "text-red-600 dark:text-red-400"
      }`,
  },
  "Created At": {
    IconComponent: Calendar,
    iconClassName: "w-5 h-5 text-gray-600 dark:text-gray-400",
    iconBgColor: "bg-gray-100 dark:bg-gray-900/30",
    getValue: (data) => renderJoinDate(data) || "_",
  },
  "Phone Number": {
    IconComponent: Phone,
    iconClassName: "w-5 h-5 text-blue-600 dark:text-blue-400",
    iconBgColor: "bg-blue-100 dark:bg-blue-900/30",
    getValue: (data) => data?.phone_number || "_",
  },
  "Account Status": {
    getIconComponent: (data) => (data?.status === true ? CheckCircle : XCircle),
    getIconClassName: (data) =>
      `w-5 h-5 ${
        data?.status === true
          ? "text-green-600 dark:text-green-400"
          : "text-red-600 dark:text-red-400"
      }`,
    getIconBgColor: (data) =>
      data?.status === true
        ? "bg-green-100 dark:bg-green-900/30"
        : "bg-red-100 dark:bg-red-900/30",
    getValue: (data) => (data?.status === true ? "Active" : "Inactive"),
    getValueClassName: (data) =>
      `text-base font-semibold ${
        data?.status === true
          ? "text-green-600 dark:text-green-400"
          : "text-red-600 dark:text-red-400"
      }`,
  },
  Country: {
    IconComponent: Globe,
    iconClassName: "w-5 h-5 text-cyan-600 dark:text-cyan-400",
    iconBgColor: "bg-cyan-100 dark:bg-cyan-900/30",
    getValue: (data) => data?.country || "_",
  },
  Address: {
    IconComponent: MapPin,
    iconClassName: "w-5 h-5 text-purple-600 dark:text-purple-400",
    iconBgColor: "bg-purple-100 dark:bg-purple-900/30",
    getValue: (data) => data?.address || "_",
    valueClassName:
      "text-base font-semibold text-gray-900 dark:text-white break-words",
  },
  "Firm Status": {
    getIconComponent: (data) =>
      data?.status === true || data?.status === "active"
        ? CheckCircle
        : XCircle,
    getIconClassName: (data) =>
      `w-5 h-5 ${
        data?.status === true || data?.status === "active"
          ? "text-green-600 dark:text-green-400"
          : "text-red-600 dark:text-red-400"
      }`,
    getIconBgColor: (data) =>
      data?.status === true || data?.status === "active"
        ? "bg-green-100 dark:bg-green-900/30"
        : "bg-red-100 dark:bg-red-900/30",
    getValue: (data) =>
      data?.status === true || data?.status === "active"
        ? "Active"
        : "Inactive",
    getValueClassName: (data) =>
      `text-base font-semibold ${
        data?.status === true || data?.status === "active"
          ? "text-green-600 dark:text-green-400"
          : "text-red-600 dark:text-red-400"
      }`,
  },
  Firm: {
    IconComponent: Building,
    iconClassName: "w-5 h-5 text-indigo-600 dark:text-indigo-400",
    iconBgColor: "bg-indigo-100 dark:bg-indigo-900/30",
    getValue: (data) =>
      data?.firm_id?.name ||
      (data?.firm && data.firm.length > 0 ? data.firm[0].name : null) ||
      data?.firm?.[0]?.name ||
      "_",
  },
  Designation: {
    getIconComponent: (data) => Briefcase,
    getIconClassName: (data) =>
      `w-5 h-5 ${
        data?.designation === "BookKeeper"
          ? "text-teal-600 dark:text-teal-400"
          : "text-purple-600 dark:text-purple-400"
      }`,
    getIconBgColor: (data) =>
      data?.designation === "BookKeeper"
        ? "bg-teal-100 dark:bg-teal-900/30"
        : "bg-purple-100 dark:bg-purple-900/30",
    getValue: (data) => show_proper_words(data?.designation) || "_",
    content: (data) =>
      React.createElement(
        "span",
        {
          className: `inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
            data?.designation === "BookKeeper"
              ? "bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300"
              : "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300"
          }`,
        },
        show_proper_words(data?.designation) || "_"
      ),
  },
  "Firm Name": {
    IconComponent: Building2,
    iconClassName: "w-5 h-5 text-blue-600 dark:text-blue-400",
    iconBgColor: "bg-blue-100 dark:bg-blue-900/30",
    getValue: (data) => data?.firm?.firm_name || "_",
  },
  "Payment Plan": {
    IconComponent: Package,
    iconClassName: "w-5 h-5 text-purple-600 dark:text-purple-400",
    iconBgColor: "bg-purple-100 dark:bg-purple-900/30",
    getValue: (data) => data?.payment_plan?.plan_name || "_",
  },
  "Transaction Date": {
    IconComponent: Calendar,
    iconClassName: "w-5 h-5 text-orange-600 dark:text-orange-400",
    iconBgColor: "bg-orange-100 dark:bg-orange-900/30",
    getValue: (data) => {
      if (!data?.transaction_date) return "_";
      return moment(data.transaction_date).format("DD-MMM-YYYY hh:mm A");
    },
  },
  Currency: {
    getIconComponent: (data) => {
      // Check multiple possible locations for currency
      const currency =
        data?.amount?.currency ||
        data?.currency ||
        data?.payment_plan?.currency ||
        "USD";
      return getCurrencyIcon(currency);
    },
    iconClassName: "w-5 h-5 text-cyan-600 dark:text-cyan-400",
    iconBgColor: "bg-cyan-100 dark:bg-cyan-900/30",
    getValue: (data) => {
      // Check multiple possible locations for currency
      const currency =
        data?.amount?.currency ||
        data?.currency ||
        data?.payment_plan?.currency ||
        "USD";
      const symbol = getCurrencySymbol(currency);
      return `${currency} (${symbol})`;
    },
  },
  Mode: {
    getIconComponent: (data) => Hash,
    getIconClassName: (data) =>
      `w-5 h-5 ${
        data?.mode === "live"
          ? "text-green-600 dark:text-green-400"
          : "text-orange-600 dark:text-orange-400"
      }`,
    getIconBgColor: (data) =>
      data?.mode === "live"
        ? "bg-green-100 dark:bg-green-900/30"
        : "bg-orange-100 dark:bg-orange-900/30",
    content: (data) =>
      React.createElement(
        "span",
        {
          className: `inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
            data?.mode === "live"
              ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
              : "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300"
          }`,
        },
        data?.mode?.toUpperCase() || "_"
      ),
  },
  "Plan Name": {
    IconComponent: Package,
    iconClassName: "w-5 h-5 text-indigo-600 dark:text-indigo-400",
    iconBgColor: "bg-indigo-100 dark:bg-indigo-900/30",
    getValue: (data) => data?.payment_plan?.plan_name || "_",
  },
  "Total Amount Paid": {
    IconComponent: CreditCard,
    iconClassName: "w-5 h-5 text-emerald-600 dark:text-emerald-400",
    iconBgColor: "bg-emerald-100 dark:bg-emerald-900/30",
    getValue: (data) => {
      // Check multiple possible locations for currency
      const currency =
        data?.payment_plan?.currency ||
        data?.amount?.currency ||
        data?.currency ||
        "USD";
      const symbol = getCurrencySymbol(currency);
      return `${symbol}${data?.total_amount_paid || 0}`;
    },
  },
  "Start Date": {
    IconComponent: Calendar,
    iconClassName: "w-5 h-5 text-cyan-600 dark:text-cyan-400",
    iconBgColor: "bg-cyan-100 dark:bg-cyan-900/30",
    getValue: (data) =>
      data?.start_date ? dateRenderer(data.start_date) : "_",
  },
  "End Date": {
    IconComponent: Calendar,
    iconClassName: "w-5 h-5 text-red-600 dark:text-red-400",
    iconBgColor: "bg-red-100 dark:bg-red-900/30",
    getValue: (data) => (data?.end_date ? dateRenderer(data.end_date) : "_"),
  },
  "Trial Period": {
    IconComponent: Clock,
    getIconClassName: (data) =>
      `w-5 h-5 ${
        data?.trial_period?.is_trial
          ? "text-yellow-600 dark:text-yellow-400"
          : "text-gray-600 dark:text-gray-400"
      }`,
    getIconBgColor: (data) =>
      data?.trial_period?.is_trial
        ? "bg-yellow-100 dark:bg-yellow-900/30"
        : "bg-gray-100 dark:bg-gray-900/30",
    getValue: (data) =>
      data?.trial_period?.is_trial
        ? `${data.trial_period.trial_days} Days`
        : "_",
    getValueClassName: (data) =>
      `text-base font-semibold ${
        data?.trial_period?.is_trial
          ? "text-yellow-600 dark:text-yellow-400"
          : "text-gray-900 dark:text-white"
      }`,
  },
  "Next Billing Date": {
    IconComponent: Calendar,
    iconClassName: "w-5 h-5 text-amber-600 dark:text-amber-400",
    iconBgColor: "bg-amber-100 dark:bg-amber-900/30",
    getValue: (data) => {
      if (!data?.next_billing_date) return "_";
      return moment(data.next_billing_date).format("DD-MMM-YYYY hh:mm A");
    },
  },
};

// Helper function to create fields config from labels
export const createFieldsConfig = (labels, customFields = {}) => {
  return labels.map((label) => {
    // Start with common field config if it exists
    const baseConfig = commonFieldConfigs[label] || {};

    // Check if custom field exists and merge it with base config
    if (customFields[label]) {
      return {
        label,
        ...baseConfig, // First spread common config (includes icon, iconBgColor, etc.)
        ...customFields[label], // Then spread custom config (overrides specific properties)
      };
    }

    // Use common field config
    if (baseConfig && Object.keys(baseConfig).length > 0) {
      return {
        label,
        ...baseConfig,
      };
    }

    // Return default if not found
    return {
      label,
      IconComponent: Package,
      iconClassName: "w-5 h-5 text-blue-600 dark:text-blue-400",
      iconBgColor: "bg-blue-100 dark:bg-blue-900/30",
      getValue: (data) => "_",
    };
  });
};
