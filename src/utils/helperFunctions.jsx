import {
  Plus,
  Edit,
  Trash2,
  Activity,
  Mail,
  Phone,
  Users,
  Calendar,
  UserCheck,
  UserX,
  Building,
  Building2,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  CreditCard,
  DollarSign,
  PoundSterling,
  Euro,
  Eye,
  FileText,
} from "lucide-react";
import {
  getCountryCode,
  getCurrencySymbol,
  show_proper_words,
} from "./constant";
import Flag from "react-world-flags";
import moment from "moment/moment";
import { s3BaseUrl, projectMode } from "../config/config";

// ========================================
// HTML HELPERS
// ========================================

// Strip HTML tags from text
export const stripHtmlTags = (html) => {
  if (!html) return "";
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

// Render HTML safely
export const renderHtmlContent = (html) => {
  if (!html) return null;
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

// ========================================
// ACTION HELPERS
// ========================================

// Get action icon based on action type
export const getActionIcon = (action) => {
  switch (action) {
    case "create":
      return <Plus className="w-4 h-4 text-green-600" />;
    case "update":
      return <Edit className="w-4 h-4 text-blue-600" />;
    case "delete":
      return <Trash2 className="w-4 h-4 text-red-600" />;
    default:
      return <Activity className="w-4 h-4 text-gray-600" />;
  }
};

// Get action badge styling based on action type
export const getActionBadge = (action) => {
  const badges = {
    create:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    update: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    delete: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  };
  return (
    badges[action] ||
    "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
  );
};

// ========================================
// BADGE HELPERS
// ========================================

// Get role badge styling
export const getRoleBadge = (role) => {
  const roleColors = {
    super_admin:
      "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
    Admin: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
    "Support Admin":
      "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/20 dark:text-cyan-400",
    Moderator:
      "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400",
  };
  return (
    roleColors[role] ||
    "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
  );
};

// ========================================
// SUPPORT TICKETS HELPERS
// ========================================

// Get priority badge styling for support tickets
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

// Get category badge styling for support tickets
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

// ========================================
// OTHER MORE HELPER FUNCTIONS
// ========================================
export const getIconBgColor = (color, light = false) => {
  if (!color) return light ? "bg-amber-400" : "bg-amber-500";
  const iconBgColors = light
    ? {
        purple: "bg-purple-400",
        orange: "bg-orange-400",
        teal: "bg-teal-400",
        blue: "bg-blue-400",
        green: "bg-green-400",
        gray: "bg-gray-400",
        indigo: "bg-indigo-400",
        pink: "bg-pink-400",
        red: "bg-red-400",
        yellow: "bg-yellow-300",
        gold: "bg-amber-400",
        black: "bg-gray-400",
      }
    : {
        purple: "bg-purple-500",
        orange: "bg-orange-500",
        teal: "bg-teal-500",
        blue: "bg-blue-500",
        green: "bg-green-500",
        gray: "bg-gray-500",
        indigo: "bg-indigo-500",
        pink: "bg-pink-500",
        red: "bg-red-500",
        yellow: "bg-yellow-400",
        gold: "bg-amber-500",
        black: "bg-gray-500",
      };
  return iconBgColors[color] || (light ? "bg-amber-400" : "bg-amber-500");
};
//

// Contact information renderer
export const renderContactInfo = (user) => {
  const safeValue = (val) =>
    val === undefined || val === null || val === "undefined" || val === ""
      ? "_"
      : val;

  const email = safeValue(user.user?.email) || safeValue(user.email);
  const phone = safeValue(user.phone_number) || safeValue(user.phone);

  return (
    <div className="text-sm text-gray-900 dark:text-white">
      <div className="flex items-center gap-1 mb-1">
        <Mail className="w-4 h-4 text-gray-400" />
        {email !== "_" ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleMailto(email, e);
            }}
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            {email}
          </button>
        ) : (
          <span>{email}</span>
        )}
      </div>
      <div className="flex items-center gap-1">
        <Phone className="w-4 h-4 text-gray-400" />
        {phone}
      </div>
    </div>
  );
};

// Generic CSV export function
export const exportToCSV = (
  data,
  headers,
  rowMapper,
  filenamePrefix,
  currentPage,
  enqueueSnackbar
) => {
  if (!data || data.length === 0) {
    if (enqueueSnackbar) {
      enqueueSnackbar("No data to export", { variant: "warning" });
    }
    return;
  }

  // Convert data to CSV rows
  const csvRows = data.map(rowMapper);

  // Combine headers and rows
  const csvContent = [
    headers.join(","),
    ...csvRows.map((row) =>
      row
        .map((cell) => {
          // Escape commas and quotes in cell values
          const cellValue = cell?.toString() || "";
          if (cellValue.includes(",") || cellValue.includes('"')) {
            return `"${cellValue.replace(/"/g, '""')}"`;
          }
          return cellValue;
        })
        .join(",")
    ),
  ].join("\n");

  // Create blob and download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);

  // Generate filename with current date and page info
  const date = new Date().toISOString().split("T")[0];
  const filename = `${filenamePrefix}_page_${currentPage}_${date}.csv`;
  link.setAttribute("download", filename);

  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  if (enqueueSnackbar) {
    enqueueSnackbar(`CSV exported successfully`, {
      variant: "success",
    });
  }
};

// Country with flag renderer
export const renderCountryWithFlag = (user) => {
  const countryCode = getCountryCode(user.country);

  return (
    <div className="flex items-center">
      {countryCode ? (
        <div className="w-6 h-4 mr-2 rounded-sm overflow-hidden">
          <Flag code={countryCode} className="w-6 h-4 object-cover" />
        </div>
      ) : (
        <div className="w-6 h-4 mr-2 bg-gray-200 rounded-sm flex items-center justify-center text-xs">
          🏳️
        </div>
      )}
      <span className="text-sm text-gray-900 dark:text-white">
        {user.country || "_"}
      </span>
    </div>
  );
};

// City renderer
export const renderCity = (value) => (
  <div className="text-sm text-gray-900 dark:text-white">
    {value?.city || "_"}
  </div>
);

// Accountants renderer - shows count only
export const renderAccountants = (value) => (
  <div className="flex items-center">
    <span className="text-sm font-medium text-gray-900 dark:text-white">
      {value.accountant_count || 0}
    </span>
  </div>
);

// Client count renderer
export const renderClientCount = (value) => (
  <div className="flex items-center">
    <span className="text-sm font-medium text-gray-900 dark:text-white">
      {value.client_count || 0}
    </span>
  </div>
);

// Licences count renderer
export const renderLicences = (value) => (
  <div className="flex items-center">
    <span className="text-sm font-medium text-gray-900 dark:text-white">
      {value.allowed_licenses || "0"}
    </span>
  </div>
);
// subscription count count renderer
export const renderSubscriptions = (value) => (
  <div className="flex items-center">
    <span className="text-sm font-medium text-gray-900 dark:text-white">
      {value.active_subscriptions_count || "0"}
    </span>
  </div>
);
// All date renderer
export const dateRenderer = (date) => (
  <div className="flex items-center gap-1 text-sm text-gray-900 dark:text-white">
    <Calendar className="w-4 h-4 text-gray-400" />
    {date ? moment(date).format("DD-MMM-YYYY hh:mm A") : "_"}
  </div>
);

// Join date renderer
export const renderJoinDate = (value) => (
  <div className="flex items-center gap-1 text-sm text-gray-900 dark:text-white">
    <Calendar className="w-4 h-4 text-gray-400" />

    {value ? moment(value.createdAt).format("DD-MMM-YYYY hh:mm A") : "_"}
  </div>
);
// Assigned clients renderer
export const renderAssignedClients = (accountant) => (
  <div className="text-sm text-gray-900 dark:text-white">
    {accountant.assignedClients && accountant.assignedClients.length > 0 ? (
      <div className="space-y-1">
        {accountant.assignedClients.slice(0, 2).map((client, index) => (
          <div key={index} className="flex items-center gap-1">
            <UserCheck className="w-3 h-3 text-blue-500" />
            <span>{client}</span>
          </div>
        ))}
        {accountant.assignedClients.length > 2 && (
          <div className="text-xs text-gray-500">
            +{accountant.assignedClients.length - 2} more
          </div>
        )}
      </div>
    ) : (
      <div className="flex items-center gap-1 text-gray-500">
        <UserX className="w-4 h-4 text-gray-400" />
        <span>No clients</span>
      </div>
    )}
  </div>
);

// Firm renderer (for accountants)
export const renderFirm = (accountant) => (
  <div className="text-sm text-gray-900 dark:text-white">
    {accountant.firm && accountant.firm.length > 0 ? (
      <div className="flex items-center gap-1">
        <Building className="w-4 h-4 text-indigo-500" />
        <span>{accountant.firm[0].name}</span>
      </div>
    ) : (
      <div className="flex items-center gap-1 text-gray-500">
        <Building className="w-4 h-4 text-gray-400" />
        <span>No firm</span>
      </div>
    )}
  </div>
);
//sandbox badge
export const getSandboxBadge = (isSandbox) => {
  return isSandbox ? (
    <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400">
      Sandbox
    </span>
  ) : (
    <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
      Live
    </span>
  );
};

// ========================================
// IMAGE VALIDATION HELPER
// ========================================

// Validate image file size and extension
export const validateImage = (file) => {
  const maxSize = 5 * 1024 * 1024; // 5MB in bytes
  const allowedExtensions = ["image/jpeg", "image/jpg", "image/png"];

  // Check file size
  if (file.size > maxSize) {
    return {
      isValid: false,
      errorMessage: "Image size must be less than 5MB",
    };
  }

  if (!allowedExtensions.includes(file.type)) {
    return {
      isValid: false,
      errorMessage: "Only JPG, JPEG, and PNG images are allowed",
    };
  }

  return {
    isValid: true,
    errorMessage: "",
  };
};

// Validate image for settings (logo and favicon) - allows more formats including ICO, WEBP, and JFIF
export const validateImageForSettings = (file, type = "logo") => {
  const maxSize = 5 * 1024 * 1024; // 5MB in bytes

  // For favicon, allow ICO, PNG, JPG, JPEG
  // For logo, allow PNG, JPG, JPEG, WEBP, JFIF
  const allowedMimeTypes =
    type === "favicon"
      ? [
          "image/x-icon",
          "image/vnd.microsoft.icon",
          "image/png",
          "image/jpeg",
          "image/jpg",
          "image/ico",
        ]
      : ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/jfif"];

  const allowedFileExtensions =
    type === "favicon"
      ? [".ico", ".png", ".jpg", ".jpeg"]
      : [".png", ".jpg", ".jpeg", ".webp", ".jfif"];

  if (file.size > maxSize) {
    return {
      isValid: false,
      errorMessage: "Image size must be less than 5MB",
    };
  }

  const fileExtension = "." + file.name.split(".").pop().toLowerCase();
  const hasValidExtension = allowedFileExtensions.includes(fileExtension);

  const hasValidMimeType = allowedMimeTypes.includes(file.type);

  if (!hasValidMimeType && !hasValidExtension) {
    const allowedFormats =
      type === "favicon"
        ? "ICO, PNG, JPG, or JPEG"
        : "PNG, JPG, JPEG, WEBP, or JFIF";
    return {
      isValid: false,
      errorMessage: `Only ${allowedFormats} images are allowed for ${type}`,
    };
  }

  return {
    isValid: true,
    errorMessage: "",
  };
};

// ========================================
// EMAIL HELPERS
// ========================================

// Open mailto link
export const handleMailto = (email) => {
  if (!email || email === "_" || email === "undefined") return;

  window.open(
    `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`,
    "_blank"
  );
};

// ========================================
// COMMENT TABLE RENDER HELPERS
// ========================================

// Render comment text with line clamp
export const renderCommentText = (comment) => {
  return (
    <div className="max-w-2xl">
      <p className="text-sm text-gray-900 dark:text-white line-clamp-2">
        {comment.comment}
      </p>
    </div>
  );
};

// Render comment type badge
export const renderCommentType = (comment) => {
  const getTypeColor = (type) => {
    const colors = {
      comment:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      note: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
      internal:
        "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
    };
    return colors[type] || colors.comment;
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
        comment.comment_type || "comment"
      )}`}
    >
      {(comment.comment_type || "comment").replace(/_/g, " ").toUpperCase()}
    </span>
  );
};

// Render created by with avatar
export const renderCommentCreatedBy = (comment) => {
  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
        {comment.created_by?.name?.charAt(0).toUpperCase() || "U"}
      </div>
      <span className="text-sm text-gray-900 dark:text-white">
        {comment.created_by?.name || "Unknown User"}
      </span>
    </div>
  );
};

// ========================================
// TRANSACTION HELPERS
// ========================================

// Get status badge for transactions
export const getTransactionStatusBadge = (status) => {
  const statusConfig = {
    success: {
      bg: "bg-green-600 text-white dark:bg-green-600 dark:text-white",
      icon: CheckCircle,
    },
    completed: {
      bg: "bg-green-600 text-white dark:bg-green-600 dark:text-white",
      icon: CheckCircle,
    },
    pending: {
      bg: "bg-yellow-600 text-white dark:bg-yellow-600 dark:text-white",
      icon: Clock,
    },
    failed: {
      bg: "bg-red-600 text-white dark:bg-red-600 dark:text-white",
      icon: XCircle,
    },
    cancelled: {
      bg: "bg-red-500 text-white dark:bg-red-600 dark:text-white", // 🔹 red tone for cancelled
      icon: XCircle,
    },
    cancel: {
      bg: "bg-rose-500 text-white dark:bg-rose-600 dark:text-white", // 🔹 softer red/pink tone for cancelled
      icon: XCircle,
    },
    requires_action: {
      bg: "bg-orange-600 text-white dark:bg-orange-600 dark:text-white",
      icon: AlertCircle,
    },
    refunded: {
      bg: "bg-blue-600 text-white dark:bg-blue-600 dark:text-white",
      icon: AlertCircle,
    },
  };

  const config = statusConfig[status] || statusConfig.pending;
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${config.bg}`}
    >
      <Icon className="w-3 h-3 mr-1" />
      {status?.charAt(0).toUpperCase() + status?.slice(1).replace(/_/g, " ")}
    </span>
  );
};

// Get transaction table columns
export const getTransactionTableColumns = (t, handleTransactionDetail) => {
  return [
    {
      id: "firm",
      label: "Firm / Client",
      render: (transaction) => {
        // Check if firm exists, otherwise use client data
        const isFirm =
          transaction.firm !== null && transaction.firm !== undefined;
        const name = isFirm
          ? transaction.firm?.firm_name
          : transaction.client?.name || transaction.member?.name || "N/A";
        const email = isFirm
          ? transaction.firm?.email
          : transaction.client?.email || transaction.member?.email || "";
        const label = isFirm ? "Firm" : "Client";

        const initials = name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .substring(0, 2);

        return (
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-[#006eb8] flex items-center justify-center">
              <span className="text-white font-medium text-sm">{initials}</span>
            </div>
            <div className="ml-4">
              <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                {label}
              </div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                {name}
              </div>
              {email && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMailto(email);
                  }}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {email}
                </button>
              )}
            </div>
          </div>
        );
      },
      onClick: handleTransactionDetail,
    },
    {
      id: "mode",
      label: "Mode",
      render: (transaction) => {
        const mode = transaction.mode;
        return (
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
              mode === "live"
                ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                : "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300"
            }`}
          >
            {mode?.toUpperCase() || "_"}
          </span>
        );
      },
      onClick: handleTransactionDetail,
    },
    {
      id: "payment_plan",
      label: "Plan",
      render: (transaction) => (
        <div className="flex items-center">
          <CreditCard className="w-4 h-4 text-gray-400 mr-2" />
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {transaction.payment_plan?.plan_name || "_"}
          </span>
        </div>
      ),
      onClick: handleTransactionDetail,
    },
    {
      id: "plan_type",
      label: "Plan Type",
      render: (transaction) => {
        const planType = transaction.payment_plan?.plan_type;
        const displayType = planType === "manual" ? "Manual" : "Auto";

        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
            {displayType}
          </span>
        );
      },
      onClick: handleTransactionDetail,
    },
    {
      id: "amount",
      label: t?.transactions?.tableHeaders?.amount || "Amount",
      render: (transaction) => {
        const amount = transaction.amount?.total || 0;
        const currency = transaction.amount?.currency || "USD";
        const currencySymbol = getCurrencySymbol(currency);
        return (
          <div className="flex items-center">
            <span className="text-base font-medium text-green-600 dark:text-green-400 mr-1">
              {currencySymbol}
            </span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {amount}
            </span>
          </div>
        );
      },
      onClick: handleTransactionDetail,
    },
    {
      id: "transaction_date",
      label: "Transaction Date",
      render: (transaction) =>
        moment(transaction.transaction_date).format("DD-MMM-YYYY hh:mm A"),
      onClick: handleTransactionDetail,
    },
    {
      id: "status",
      label: t?.transactions?.tableHeaders?.status || "Status",
      render: (transaction) => getTransactionStatusBadge(transaction.status),
      onClick: handleTransactionDetail,
    },
  ];
};
//===================//
export const formatCurrency = (amount, currency = "GBP") => {
  const locale =
    currency === "EUR" ? "de-DE" : currency === "USD" ? "en-US" : "en-GB";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(amount);
};

export const getCurrencyIcon = (currency) => {
  switch (currency) {
    case "USD":
      return DollarSign;
    case "EUR":
      return Euro;
    case "GBP":
    default:
      return PoundSterling;
  }
};

// ========================================
// DOCUMENT RENDER HELPERS
// ========================================

// Render reference name for documents
export const renderReferenceName = (document) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-900 dark:text-white">
        {document.reference_name || document.name || "Untitled Document"}
      </span>
    </div>
  );
};

// Render document file name
export const renderDocumentName = (document) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-900 dark:text-white">
        {document.file_original_name || document.name || "Untitled Document"}
      </span>
    </div>
  );
};

// ========================================
// WEBSITE CONTENT SETTINGS HELPERS
// ========================================

// Clean logo path by removing s3BaseUrl if present
export const cleanLogoPath = (logoPath, baseUrl = s3BaseUrl) => {
  if (!logoPath || typeof logoPath !== "string") return "";
  return logoPath.includes(baseUrl) ? logoPath.replace(baseUrl, "") : logoPath;
};

// Ensure s3BaseUrl is present in logo path
export const ensureS3BaseUrl = (logoPath, baseUrl = s3BaseUrl) => {
  if (!logoPath || typeof logoPath !== "string" || logoPath.trim() === "")
    return "";
  return logoPath.includes(baseUrl) ? logoPath : baseUrl + logoPath;
};

// Format feature menu from API response
export const formatFeatureMenuFromResponse = (
  featureMenu,
  baseUrl = s3BaseUrl
) => {
  if (!featureMenu || !Array.isArray(featureMenu) || featureMenu.length === 0) {
    return [];
  }
  return featureMenu.map((item, index) => ({
    id: item.id || `feature-${index}-${Date.now()}`,
    logo: item.logo || "",
    title: item.title || "",
    description: item.description || "",
  }));
};

// Prepare feature menu for sending to API
export const prepareFeatureMenuForSend = (featureMenu, baseUrl = s3BaseUrl) => {
  if (!Array.isArray(featureMenu)) return [];

  return featureMenu
    .filter((item) => {
      if (!item) return false;
      const hasTitle =
        item.title &&
        typeof item.title === "string" &&
        item.title.trim() !== "";
      const hasLogo =
        item.logo && typeof item.logo === "string" && item.logo.trim() !== "";
      return hasTitle || hasLogo;
    })
    .map((item) => {
      const logoPath = cleanLogoPath(item.logo || "", baseUrl);
      return {
        logo: logoPath || "",
        title: (item.title || "").trim(),
        description: item.description || "",
      };
    });
};

// Convert feature menu to table data format
export const convertFeatureMenuToTableData = (
  featureMenu,
  baseUrl = s3BaseUrl
) => {
  if (!Array.isArray(featureMenu)) return [];

  return featureMenu.map((item, index) => {
    const logoUrl =
      item.logo && item.logo.trim() !== ""
        ? ensureS3BaseUrl(item.logo.trim(), baseUrl)
        : "";

    return {
      id: item.id || `feature-${index}`,
      logo: logoUrl,
      title: item.title || "",
      description: item.description || "",
    };
  });
};

// Get feature menu previews (for filePreviews state)
export const getFeatureMenuPreviews = (featureMenu, baseUrl = s3BaseUrl) => {
  if (!Array.isArray(featureMenu)) return [];
  return featureMenu.map((item) =>
    item.logo ? ensureS3BaseUrl(item.logo, baseUrl) : ""
  );
};

// Validate website content form fields
export const validateWebsiteContentForm = (
  formData,
  fileObjects,
  isFeatureModalOpen,
  enqueueSnackbar
) => {
  if (isFeatureModalOpen) {
    enqueueSnackbar("Please close the feature form before saving settings", {
      variant: "error",
    });
    return false;
  }

  const validations = [
    {
      field: "meta_title",
      value: formData.meta_title,
      message: "Meta title is required",
    },
    {
      field: "meta_description",
      value: formData.meta_description,
      message: "Meta Description is required",
    },
    {
      field: "heading",
      value: formData.heading,
      message: "Heading is required",
    },
    {
      field: "banner_content",
      value: formData.banner_content,
      message: "Banner Content is required",
    },
    {
      field: "signup_button_text",
      value: formData.signup_button_text,
      message: "Signup Button Text is required",
    },
    {
      field: "signup_button_link",
      value: formData.signup_button_link,
      message: "Signup Button Link is required",
    },
    {
      field: "request_demo_button_text",
      value: formData.request_demo_button_text,
      message: "Request Demo Button Text is required",
    },
    {
      field: "request_demo_button_link",
      value: formData.request_demo_button_link,
      message: "Request Demo Button Link is required",
    },
    {
      field: "feature_title",
      value: formData.feature_title,
      message: "Feature Title is required",
    },
  ];

  for (const validation of validations) {
    if (
      !validation.value ||
      (typeof validation.value === "string" && validation.value.trim() === "")
    ) {
      enqueueSnackbar(validation.message, { variant: "error" });
      return false;
    }
  }

  const fileValidations = [
    { file: fileObjects.logo, existing: formData.logo, name: "Logo" },
    { file: fileObjects.favicon, existing: formData.favicon, name: "Favicon" },
    {
      file: fileObjects.footer_logo,
      existing: formData.footer_logo,
      name: "Footer Logo",
    },
  ];

  for (const validation of fileValidations) {
    if (!validation.file && !validation.existing) {
      enqueueSnackbar(`${validation.name} is required`, { variant: "error" });
      return false;
    }
  }

  return true;
};

// Validate feature form
export const validateFeatureForm = (featureFormData) => {
  if (!featureFormData.title || featureFormData.title.trim() === "") {
    return { isValid: false, message: "Title is required" };
  }

  if (!featureFormData.logo || featureFormData.logo.trim() === "") {
    return {
      isValid: false,
      message: "Logo is required. Please upload a logo first.",
    };
  }

  if (
    !featureFormData.description ||
    featureFormData.description.trim() === ""
  ) {
    return { isValid: false, message: "Description is required" };
  }

  return { isValid: true, message: "" };
};

// Extract logo path from API response
export const extractLogoPathFromResponse = (result) => {
  return result.data?.path || result?.data?.data?.path || result?.path || "";
};

// Render document preview (image or view link)
export const renderDocumentPreview = (document, onImageClick) => {
  const documentUrl = document.path
    ? s3BaseUrl + document.path
    : document.document_url
    ? document.document_url.startsWith("http")
      ? document.document_url
      : s3BaseUrl + document.document_url
    : null;

  if (!documentUrl) {
    return <span className="text-gray-400 text-sm">No preview</span>;
  }

  const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(documentUrl);

  if (isImage) {
    return (
      <div className="flex items-center gap-2">
        <img
          src={documentUrl}
          alt={document.document_name || "Document"}
          className="w-12 h-12 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => onImageClick && onImageClick(documentUrl)}
          title="Click to preview"
        />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <a
        href={documentUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 dark:text-blue-400 hover:underline text-sm flex items-center gap-1"
      >
        <Eye className="w-4 h-4" />
        View Document
      </a>
    </div>
  );
};

// Render file size in human-readable format
export const renderFileSize = (document) => {
  const size = document.file_size;
  if (!size) return <span className="text-gray-400 text-sm">N/A</span>;

  const formatBytes = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <span className="text-sm text-gray-600 dark:text-gray-400">
      {formatBytes(size)}
    </span>
  );
};

// Render document type
export const renderDocumentType = (document) => {
  return (
    <span className="text-sm text-gray-600 dark:text-gray-400">
      {document.file_type || document.document_type || document.type || "N/A"}
    </span>
  );
};
//get Status badge
export const getTypeBadge = (type) => {
  const typeColors = {
    one_time:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
    recurring:
      "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
    instalments:
      "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400",
  };
  return typeColors[type] || typeColors.one_time;
};
//email preview string
export const emailPreview = (handlePreview, template) => {
  return (
    <>
      <p
        className="text-[#006eb8] hover:text-[#005a9e] hover:underline flex items-center gap-1 cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          handlePreview(template);
        }}
      >
        <Eye className="w-4 h-4" />
        View Preview
      </p>
    </>
  );
};
// ========================================
// Activity Log TABLE HEAD HELPER FUNCTIONS
// ========================================
export const handleActions = (log) => {
  return (
    <>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
          <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        </div>
        <span className="font-medium text-gray-900 dark:text-white">
          {show_proper_words(log.action) || "_"}
        </span>
      </div>
    </>
  );
};
// ========================================
// Accountants TABLE HEAD HELPER FUNCTIONS
// ========================================
export const handleAccountantDesignation = (user) => {
  const isBookkeeper = user.role === "BookKeeper";

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
        isBookkeeper
          ? "bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300"
          : "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300"
      }`}
    >
      {show_proper_words(user.role) || "_"}
    </span>
  );
};

// ========================================
// SUBSCRIPTION TABLE HEAD HELPER FUNCTIONS
// ========================================

export const getSubscriptionTableHead = ({
  handleOpenDetail,
  handleMailto,
  getStatusBadge,
  show_proper_words,
  moment,
  Building2,
}) => {
  return [
    {
      id: "firm",
      label: "Firm",
      render: (sub) => {
        const firmName = sub.firm?.firm_name || sub.firm_name || "_";
        const firmEmail = sub.firm?.email || sub.email || null;

        return (
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-indigo-500" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                {firmName}
              </p>
              {firmEmail && firmEmail !== "_" && firmEmail.trim() !== "" ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMailto(firmEmail);
                  }}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {firmEmail}
                </button>
              ) : (
                <p className="text-xs text-gray-500 dark:text-gray-400">_</p>
              )}
            </div>
          </div>
        );
      },
      onClick: handleOpenDetail,
    },
    {
      id: "plan",
      label: "Plan",
      render: (sub) => (
        <div>
          <p className="font-medium text-gray-900 dark:text-white">
            {sub.payment_plan?.plan_name || "_"}
          </p>
        </div>
      ),
      onClick: handleOpenDetail,
    },
    {
      id: "plan_type",
      label: "Plan Type",
      render: (sub) => (
        <div>
          <p className="font-medium text-gray-900 dark:text-white">
            {show_proper_words(sub.payment_plan?.plan_type) || "_"}
          </p>
        </div>
      ),
      onClick: handleOpenDetail,
    },
    {
      id: "billing_cycle",
      label: "Billing Cycle",
      render: (sub) => (
        <div>
          <p className="font-medium text-gray-900 dark:text-white">
            {show_proper_words(sub?.billing_cycle) || "_"}
          </p>
        </div>
      ),
      onClick: handleOpenDetail,
    },
    {
      id: "licenses",
      label: "Licenses",
      render: (sub) => (
        <div className="text-sm">
          <span className="font-medium text-gray-900 dark:text-white">
            {sub.licenses?.total_allowed || 0}
          </span>
        </div>
      ),
      onClick: handleOpenDetail,
    },
    {
      id: "status",
      label: "Status",
      render: (sub) => getStatusBadge(sub.status),
      onClick: handleOpenDetail,
    },
    {
      id: "start_date",
      label: "Start Date",
      render: (subscription) =>
        subscription.start_date
          ? moment(subscription.start_date).format("DD-MMM-YYYY hh:mm A")
          : "_",
      onClick: handleOpenDetail,
    },
    {
      id: "end_date",
      label: "End Date",
      render: (subscription) =>
        subscription.end_date
          ? moment(subscription.end_date).format("DD-MMM-YYYY hh:mm A")
          : "_",
      onClick: handleOpenDetail,
    },
  ];
};

// ========================================
// CLIENT SUBSCRIPTION TABLE HEAD HELPER FUNCTIONS
// ========================================

export const getClientSubscriptionTableHead = ({
  handleOpenDetail,
  handleMailto,
  getStatusBadge,
  show_proper_words,
  moment,
  Building2,
  FileText,
  showClientInfo = false, // New parameter to show client info for individual clients subscriptions
  handleViewInvoices, // New parameter for handling view invoices navigation
}) => {
  const baseTableHead = getSubscriptionTableHead({
    handleOpenDetail,
    handleMailto,
    getStatusBadge,
    show_proper_words,
    moment,
    Building2,
  });

  const modifiedTableHead = baseTableHead
    .map((column) => {
      // Modify plan column to add "View Invoices" link
      if (column.id === "plan" && handleViewInvoices) {
        return {
          id: "plan",
          label: "Plan",
          render: (sub) => (
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                {sub.payment_plan?.plan_name || "_"}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleViewInvoices(sub);
                }}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline mt-1"
              >
                View Invoices
              </button>
            </div>
          ),
          onClick: handleOpenDetail,
        };
      }
      // Replace licenses column with invoices_quota
      if (column.id === "licenses") {
        return {
          id: "invoices_quota",
          label: "Allowed Invoices",
          render: (sub) => {
            const quota = sub.invoices_quota;
            if (!quota) {
              return (
                <div className="flex items-center">
                  <FileText className="w-4 h-4 text-gray-300 mr-2" />
                  <span className="text-sm text-gray-400 dark:text-gray-500">
                    _
                  </span>
                </div>
              );
            }
            const remaining = quota.total_allowed || 0;
            return (
              <div className="flex items-center">
                <FileText className="w-4 h-4 text-blue-500 mr-2" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {remaining}
                </span>
              </div>
            );
          },
          onClick: handleOpenDetail,
        };
      }
      // Remove firm column for client subscriptions
      if (column.id === "firm") {
        return null;
      }
      // Remove amount column for client subscriptions
      if (column.id === "amount") {
        return null;
      }
      return column;
    })
    .filter(Boolean); // Remove null entries

  // Add VAT and amount columns for individual client subscriptions (before dates)
  const vatColumns = [
    {
      id: "amount_before_vat",
      label: "Amount Before VAT",
      render: (sub) => {
        const amountBeforeVat = sub.amount_before_vat;
        const finalAmount = sub.total_amount_paid;
        const currency = sub.payment_plan?.currency || sub.currency || "GBP";
        const currencySymbol = getCurrencySymbol(currency);
        // If amount_before_vat is 0 or not present, show final_amount
        const displayAmount =
          amountBeforeVat !== undefined &&
          amountBeforeVat !== null &&
          amountBeforeVat !== 0 &&
          amountBeforeVat !== "" &&
          (typeof amountBeforeVat === "number" || amountBeforeVat !== "")
            ? amountBeforeVat
            : finalAmount;
        if (
          displayAmount !== undefined &&
          displayAmount !== null &&
          (typeof displayAmount === "number" || displayAmount !== "")
        ) {
          return (
            <span className="text-sm text-gray-900 dark:text-white">
              {currencySymbol}
              {parseFloat(displayAmount).toFixed(2)}
            </span>
          );
        }
        return (
          <span className="text-sm text-gray-400 dark:text-gray-500">_</span>
        );
      },
      onClick: handleOpenDetail,
    },
    {
      id: "vat_percentage",
      label: "VAT Percentage",
      render: (sub) => {
        const vatPercentage = sub.vat_percentage;
        if (
          vatPercentage !== undefined &&
          vatPercentage !== null &&
          (typeof vatPercentage === "number" || vatPercentage !== "")
        ) {
          return (
            <span className="text-sm text-gray-900 dark:text-white">
              {vatPercentage}%
            </span>
          );
        }
        return (
          <span className="text-sm text-gray-400 dark:text-gray-500">_</span>
        );
      },
      onClick: handleOpenDetail,
    },
    {
      id: "vat_amount",
      label: "VAT Amount",
      render: (sub) => {
        const vatAmount = sub.vat_amount;
        const currency = sub.payment_plan?.currency || sub.currency || "GBP";
        const currencySymbol = getCurrencySymbol(currency);
        if (
          vatAmount !== undefined &&
          vatAmount !== null &&
          (typeof vatAmount === "number" || vatAmount !== "")
        ) {
          return (
            <span className="text-sm text-gray-900 dark:text-white">
              {currencySymbol}
              {parseFloat(vatAmount).toFixed(2)}
            </span>
          );
        }
        return (
          <span className="text-sm text-gray-400 dark:text-gray-500">_</span>
        );
      },
      onClick: handleOpenDetail,
    },
    {
      id: "final_amount",
      label: "Total Amount",
      render: (sub) => {
        const finalAmount = sub.total_amount_paid;
        const currency = sub.payment_plan?.currency || sub.currency || "GBP";
        const currencySymbol = getCurrencySymbol(currency);
        if (
          finalAmount !== undefined &&
          finalAmount !== null &&
          (typeof finalAmount === "number" || finalAmount !== "")
        ) {
          return (
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {currencySymbol}
              {parseFloat(finalAmount).toFixed(2)}
            </span>
          );
        }
        return (
          <span className="text-sm text-gray-400 dark:text-gray-500">_</span>
        );
      },
      onClick: handleOpenDetail,
    },
  ];

  // Insert VAT columns after status column (before mode/start_date)
  const statusIndex = modifiedTableHead.findIndex((col) => col.id === "status");
  if (statusIndex !== -1) {
    modifiedTableHead.splice(statusIndex + 1, 0, ...vatColumns);
  } else {
    // If status column not found, add at the end before dates
    const dateIndex = modifiedTableHead.findIndex(
      (col) => col.id === "start_date"
    );
    if (dateIndex !== -1) {
      modifiedTableHead.splice(dateIndex, 0, ...vatColumns);
    } else {
      modifiedTableHead.push(...vatColumns);
    }
  }

  // Add client column at the start if showClientInfo is true
  if (showClientInfo) {
    const clientColumn = {
      id: "client",
      label: "Client",
      render: (sub) => {
        const clientName = sub.client?.name || sub.name || "_";
        const clientEmail = sub.client?.email || sub.email || null;

        return (
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-indigo-500" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                {clientName}
              </p>
              {clientEmail &&
              clientEmail !== "_" &&
              clientEmail.trim() !== "" ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMailto(clientEmail);
                  }}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {clientEmail}
                </button>
              ) : (
                <p className="text-xs text-gray-500 dark:text-gray-400">_</p>
              )}
            </div>
          </div>
        );
      },
      onClick: handleOpenDetail,
    };
    return [clientColumn, ...modifiedTableHead];
  }

  return modifiedTableHead;
};

// ========================================
// DASHBOARD SUBSCRIPTION TABLE HEAD HELPER FUNCTIONS
// ========================================

export const getDashboardFirmSubscriptionsTableHead = ({
  handleMailto,
  getStatusBadge,
  dateRenderer,
  Building2,
  FileText,
}) => {
  return [
    {
      id: "firm",
      label: "Firm",
      render: (sub) => (
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-indigo-500" />
          <div>
            <p className="font-medium text-gray-900 dark:text-white">
              {sub.firm?.firm_name || "_"}
            </p>
            {sub.firm?.email && sub.firm?.email !== "_" ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleMailto(sub.firm?.email);
                }}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
              >
                {sub.firm?.email}
              </button>
            ) : (
              <p className="text-xs text-gray-500 dark:text-gray-400">_</p>
            )}
          </div>
        </div>
      ),
    },
    {
      id: "plan",
      label: "Plan",
      render: (sub) => (
        <div>
          <p className="font-medium text-gray-900 dark:text-white">
            {sub.payment_plan?.plan_name || "_"}
          </p>
        </div>
      ),
    },
    {
      id: "status",
      label: "Status",
      render: (sub) => getStatusBadge(sub.status),
    },
    {
      id: "licenses",
      label: "Licenses",
      render: (sub) => {
        const totalAllowed = sub.licenses?.total_allowed || 0;
        return (
          <div className="flex items-center">
            <FileText className="w-4 h-4 text-blue-500 mr-2" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {totalAllowed}
            </span>
          </div>
        );
      },
    },
    {
      id: "start_date",
      label: "Start Date",
      render: (subscription) => dateRenderer(subscription.start_date),
    },
  ];
};

export const getDashboardClientSubscriptionsTableHead = ({
  handleMailto,
  getStatusBadge,
  dateRenderer,
  Users,
  FileText,
}) => {
  return [
    {
      id: "client",
      label: "Client",
      render: (sub) => (
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-indigo-500" />
          <div>
            <p className="font-medium text-gray-900 dark:text-white">
              {sub.client?.name || "_"}
            </p>
            {sub.client?.email && sub.client?.email !== "_" ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleMailto(sub.client?.email);
                }}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
              >
                {sub.client?.email}
              </button>
            ) : (
              <p className="text-xs text-gray-500 dark:text-gray-400">_</p>
            )}
          </div>
        </div>
      ),
    },
    {
      id: "plan",
      label: "Plan",
      render: (sub) => (
        <div>
          <p className="font-medium text-gray-900 dark:text-white">
            {sub.payment_plan?.plan_name || "_"}
          </p>
        </div>
      ),
    },
    {
      id: "status",
      label: "Status",
      render: (sub) => getStatusBadge(sub.status),
    },
    {
      id: "invoices_quota",
      label: "Allowed Invoices",
      render: (sub) => {
        const quota = sub.invoices_quota;
        const totalAllowed = quota?.total_allowed || 0;
        return (
          <div className="flex items-center">
            <FileText className="w-4 h-4 text-blue-500 mr-2" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {totalAllowed}
            </span>
          </div>
        );
      },
    },
    {
      id: "start_date",
      label: "Start Date",
      render: (subscription) => dateRenderer(subscription.start_date),
    },
  ];
};

// ========================================
// DASHBOARD FIRMS AND CLIENTS TABLE HEAD
// ========================================

export const getDashboardFirmsTableHead = ({
  renderContactInfo,
  renderJoinDate,
}) => {
  return [
    {
      id: "name",
      label: "Firm Name",
      type: "title_with_image",
      imageField: "profile_image_url",
    },
    {
      id: "contact",
      label: "Contact",
      render: renderContactInfo,
    },
    {
      id: "createdAt",
      label: "Created At",
      render: renderJoinDate,
    },
    {
      id: "status",
      label: "Status",
      type: "status",
    },
  ];
};

export const getDashboardClientsTableHead = ({
  renderContactInfo,
  renderJoinDate,
}) => {
  return [
    {
      id: "name",
      label: "Client Name",
      type: "title_with_image",
      imageField: "profile_image_url",
    },
    {
      id: "contact",
      label: "Contact",
      render: renderContactInfo,
    },
    {
      id: "createdAt",
      label: "Created At",
      render: renderJoinDate,
    },
    {
      id: "status",
      label: "Status",
      type: "status",
    },
  ];
};

// ========================================
// DASHBOARD TABLE CONFIGURATIONS
// ========================================

export const getDashboardTableConfigs = ({
  recentFirms,
  recentClients,
  recentFirmSubscriptions,
  recentClientSubscriptions,
  firmsTableHead,
  clientsTableHead,
  firmSubscriptionsTableHead,
  clientSubscriptionsTableHead,
  loadingFirms,
  loadingClients,
  projectMode = null,
}) => {
  const allConfigs = [
    {
      title: "Recently Firms Signups",
      tooltip: "These are firms that have signed up or are newly added",
      data: recentFirms,
      tableHead: firmsTableHead,
      loading: loadingFirms,
      emptyMessage: "No firms found",
      gridIndex: 0, // First grid (0-1)
      index: 0,
    },
    {
      title: "Recently Individual Clients Signups",
      tooltip: "These are clients that have signed up or are newly added",
      data: recentClients,
      tableHead: clientsTableHead,
      loading: loadingClients,
      emptyMessage: "No clients found",
      gridIndex: 0, // First grid (0-1)
      index: 1,
    },
    {
      title: "Recent Firm Subscriptions",
      tooltip:
        "These are subscriptions that have been newly renewed or created for firm subscriptions",
      data: recentFirmSubscriptions,
      tableHead: firmSubscriptionsTableHead,
      loading: false,
      emptyMessage: "No firm subscriptions found",
      gridIndex: 1, // Second grid (2-3)
      index: 2,
    },
    {
      title: "Recent Individual Client Subscriptions",
      tooltip:
        "These are subscriptions that have been newly renewed or created for client subscriptions",
      data: recentClientSubscriptions,
      tableHead: clientSubscriptionsTableHead,
      loading: false,
      emptyMessage: "No client subscriptions found",
      gridIndex: 1, // Second grid (2-3)
      index: 3,
    },
  ];

  // In invoice mode, filter out firm-related tables and adjust gridIndex
  if (projectMode === "invoice") {
    const filteredConfigs = allConfigs.filter(
      (config) =>
        config.title !== "Recently Firms Signups" &&
        config.title !== "Recent Firm Subscriptions"
    );
    // Set both tables to same gridIndex (0) so they appear side by side
    // Also remove "Individual" word from titles
    return filteredConfigs.map((config, index) => {
      let title = config.title;
      if (title === "Recently Individual Clients Signups") {
        title = "Recently Clients Signups";
      } else if (title === "Recent Individual Client Subscriptions") {
        title = "Recent Client Subscriptions";
      }
      return {
        ...config,
        title,
        gridIndex: 0,
        index: index,
      };
    });
  }

  return allConfigs;
};

// ========================================
// LICENCE TABLE HEAD HELPER FUNCTIONS
// ========================================

export const getLicenceTableHead = ({
  handleOpenDetail,
  renderHtmlContent,
  getTypeBadge,
  renderJoinDate,
  Clock,
  Award,
  projectMode = null,
}) => {
  const tableHead = [
    {
      id: "plan_name",
      label: "Plan Details",
      render: (licence) => {
        return (
          <div className="flex items-center">
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                {licence.plan_name}
              </div>
            </div>
          </div>
        );
      },
      onClick: handleOpenDetail,
    },
    {
      id: "type",
      label: "Plan For (Type)",
      render: (licence) => {
        const getTypeDisplay = (type) => {
          if (!type) return "N/A";
          switch (type) {
            case "portal":
              return "Portal";
            case "website":
              return "Website";
            default:
              return type.charAt(0).toUpperCase() + type.slice(1);
          }
        };
        const displayText = getTypeDisplay(licence.type);
        return (
          <span
            className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full ${
              licence.type === "portal"
                ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300"
                : "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300"
            }`}
          >
            {displayText}
          </span>
        );
      },
      onClick: handleOpenDetail,
    },
    {
      id: "plan_for",
      label: "Plan For",
      render: (licence) => {
        const getPlanForDisplay = (planFor) => {
          if (!planFor) return "N/A";
          switch (planFor) {
            case "client":
              return "Client Portal";
            case "firm":
              return "Firm Portal";
            default:
              return planFor.charAt(0).toUpperCase() + planFor.slice(1);
          }
        };
        const displayText = getPlanForDisplay(licence.plan_for);
        return (
          <span
            className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full ${
              licence.plan_for === "firm"
                ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300"
                : licence.plan_for === "client"
                ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
            }`}
          >
            {displayText}
          </span>
        );
      },
      onClick: handleOpenDetail,
    },
    {
      id: "plan_type",
      label: "Type",
      render: (licence) => {
        const displayText =
          licence.plan_type === "one_time"
            ? "One Time"
            : licence.plan_type?.charAt(0).toUpperCase() +
              licence.plan_type?.slice(1);
        return (
          <span
            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeBadge(
              licence.plan_type
            )}`}
          >
            {displayText}
          </span>
        );
      },
      onClick: handleOpenDetail,
    },
    {
      id: "amount",
      label: "Amount",
      render: (licence) => {
        const getCurrencySymbol = (currency) => {
          switch (currency) {
            case "USD":
              return "$";
            case "EUR":
              return "€";
            case "GBP":
            default:
              return "£";
          }
        };
        return (
          <div className="flex items-center">
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {getCurrencySymbol(licence.currency)} {licence.amount?.toFixed(2)}
            </span>
          </div>
        );
      },
      onClick: handleOpenDetail,
    },
    {
      id: "plan_period",
      label: "Billing Cycle",
      render: (licence) => (
        <div className="flex items-center">
          <Clock className="w-4 h-4 text-gray-400 mr-2" />
          <span className="text-sm text-gray-900 dark:text-white capitalize">
            {licence.plan_period === "one_time"
              ? "One Time"
              : licence.plan_period}
          </span>
        </div>
      ),
      onClick: handleOpenDetail,
    },
    {
      id: "allowed_invoices_count",
      label: "Invoices Count",
      render: (licence) => {
        if (licence.plan_for === "client") {
          const countValue = licence.allowed_invoices_count;
          const displayValue =
            countValue === -1 ? "Unlimited" : countValue ?? "_";

          return (
            <div className="flex items-center">
              <Award className="w-4 h-4 text-purple-500 mr-2" />
              <span className="text-sm text-gray-900 dark:text-white">
                {displayValue}
              </span>
            </div>
          );
        }
        return (
          <div className="flex items-center">
            <Award className="w-4 h-4 text-gray-300 mr-2" />
            <span className="text-sm text-gray-400 dark:text-gray-500">_</span>
          </div>
        );
      },
      onClick: handleOpenDetail,
    },
    // Hide Licence Count column in invoice mode
    ...(projectMode !== "invoice"
      ? [
          {
            id: "allowed_licenses_count",
            label: "Licence Count",
            render: (licence) => {
              // Show "_" only for client plans
              if (licence.plan_for === "client") {
                return (
                  <div className="flex items-center">
                    <Award className="w-4 h-4 text-gray-300 mr-2" />
                    <span className="text-sm text-gray-400 dark:text-gray-500">
                      _
                    </span>
                  </div>
                );
              }
              // For firm or website (existing data), show licence count
              const countValue = licence.allowed_licenses_count;
              const displayValue =
                countValue === -1 ? "Unlimited" : countValue ?? "_";

              return (
                <div className="flex items-center">
                  <Award className="w-4 h-4 text-purple-500 mr-2" />
                  <span className="text-sm text-gray-900 dark:text-white">
                    {displayValue}
                  </span>
                </div>
              );
            },
            onClick: handleOpenDetail,
          },
        ]
      : []),
    {
      id: "grace_period",
      label: "Grace Period Days",
      render: (licence) => {
        // Show if grace_period exists (including 0)
        const gracePeriod = licence.grace_period;
        if (
          gracePeriod !== undefined &&
          gracePeriod !== null &&
          (typeof gracePeriod === "number" || gracePeriod !== "")
        ) {
          return (
            <div className="flex items-center">
              <Clock className="w-4 h-4 text-green-500 mr-2" />
              <span className="text-sm text-gray-900 dark:text-white">
                {gracePeriod}
              </span>
            </div>
          );
        }
        return (
          <div className="flex items-center">
            <Clock className="w-4 h-4 text-gray-300 mr-2" />
            <span className="text-sm text-gray-400 dark:text-gray-500">_</span>
          </div>
        );
      },
      onClick: handleOpenDetail,
    },
    {
      id: "vat_percentage",
      label: "VAT Percentage",
      render: (licence) => {
        const vatValue = licence.vat_percentage;
        if (vatValue !== undefined && vatValue !== null && vatValue !== "") {
          return (
            <span className="text-sm text-gray-900 dark:text-white">
              {vatValue}%
            </span>
          );
        }
        return (
          <span className="text-sm text-gray-400 dark:text-gray-500">_</span>
        );
      },
      onClick: handleOpenDetail,
    },
    {
      id: "due_date_days",
      label: "Due Date Days",
      render: (licence) => {
        const dueDays = licence.due_date_days;
        if (dueDays !== undefined && dueDays !== null && dueDays !== "") {
          return (
            <span className="text-sm text-gray-900 dark:text-white">
              {dueDays}
            </span>
          );
        }
        return (
          <span className="text-sm text-gray-400 dark:text-gray-500">_</span>
        );
      },
      onClick: handleOpenDetail,
    },
    {
      id: "reminders_before_days",
      label: "Reminders Before Days",
      render: (licence) => {
        const remindersDays = licence.reminders_before_days;
        if (
          remindersDays !== undefined &&
          remindersDays !== null &&
          remindersDays !== ""
        ) {
          return (
            <span className="text-sm text-gray-900 dark:text-white">
              {remindersDays}
            </span>
          );
        }
        return (
          <span className="text-sm text-gray-400 dark:text-gray-500">_</span>
        );
      },
      onClick: handleOpenDetail,
    },
    {
      id: "country",
      label: "Country",
      render: (licence) => {
        const country = licence.country;
        if (country !== undefined && country !== null && country !== "") {
          return (
            <span className="text-sm text-gray-900 dark:text-white">
              {country}
            </span>
          );
        }
        return (
          <span className="text-sm text-gray-400 dark:text-gray-500">_</span>
        );
      },
      onClick: handleOpenDetail,
    },
    {
      id: "createdAt",
      label: "Created At",
      render: renderJoinDate,
    },
    {
      id: "status",
      label: "Status",
      type: "status",
    },
  ];

  // In invoice mode, filter out "Plan For (Type)" and "Plan For" columns
  if (projectMode === "invoice") {
    return tableHead.filter(
      (column) => column.id !== "type" && column.id !== "plan_for"
    );
  }

  return tableHead;
};

// Get status badge for subscriptions
export const getStatusBadgeForDashboard = (status) => {
  const statusConfig = {
    active: {
      bg: "bg-green-600 text-white dark:bg-green-600 dark:text-white",
      icon: CheckCircle,
    },
    expired: {
      bg: "bg-red-600 text-white dark:bg-red-600 dark:text-white",
      icon: XCircle,
    },
    pending: {
      bg: "bg-yellow-600 text-white dark:bg-yellow-600 dark:text-white",
      icon: Clock,
    },
    cancelled: {
      bg: "bg-red-500 text-white dark:bg-red-600 dark:text-white",
      icon: XCircle,
    },
  };

  const config = statusConfig[status?.toLowerCase()] || statusConfig.pending;
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${config.bg}`}
    >
      <Icon className="w-3 h-3 mr-1" />
      {status?.charAt(0).toUpperCase() + status?.slice(1) || "Unknown"}
    </span>
  );
};
//dashbpard and transactions colors scheme//////////////////////

export const getCardShadeColor = (color) => {
  const shadeColors = {
    purple: "from-purple-50/80 to-transparent dark:from-purple-900/20",
    orange: "from-orange-50/80 to-transparent dark:from-orange-900/20",
    teal: "from-teal-50/80 to-transparent dark:from-teal-900/20",
    blue: "from-blue-50/80 to-transparent dark:from-blue-900/20",
    green: "from-green-50/80 to-transparent dark:from-green-900/20",
    gray: "from-gray-50/80 to-transparent dark:from-gray-700/20",
    indigo: "from-indigo-50/80 to-transparent dark:from-indigo-900/20",
    pink: "from-pink-50/80 to-transparent dark:from-pink-900/20",
    red: "from-red-50/80 to-transparent dark:from-red-900/20",
    yellow: "from-yellow-50/80 to-transparent dark:from-yellow-900/20",
    gold: "from-amber-50/80 to-transparent dark:from-amber-900/20",
    black: "from-gray-50/80 to-transparent dark:from-gray-700/20",
  };
  return shadeColors[color] || shadeColors.gold;
};

// Get border color based on icon color
export const getBorderColor = (color) => {
  const borderColors = {
    purple: "border-purple-200/60 dark:border-purple-700/40",
    orange: "border-orange-200/60 dark:border-orange-700/40",
    teal: "border-teal-200/60 dark:border-teal-700/40",
    blue: "border-blue-200/60 dark:border-blue-700/40",
    green: "border-green-200/60 dark:border-green-700/40",
    gray: "border-gray-200/60 dark:border-gray-700/40",
    indigo: "border-indigo-200/60 dark:border-indigo-700/40",
    pink: "border-pink-200/60 dark:border-pink-700/40",
    red: "border-red-200/60 dark:border-red-700/40",
    yellow: "border-yellow-200/60 dark:border-yellow-700/40",
    gold: "border-amber-200/60 dark:border-amber-700/40",
    black: "border-gray-200/60 dark:border-gray-700/40",
  };
  return borderColors[color] || borderColors.gold;
};

export const getLoaderColor = (color) => {
  const loaderColors = {
    purple: "border-purple-500 border-t-transparent",
    orange: "border-orange-500 border-t-transparent",
    teal: "border-teal-500 border-t-transparent",
    blue: "border-blue-500 border-t-transparent",
    green: "border-green-500 border-t-transparent",
    gray: "border-gray-500 border-t-transparent",
    indigo: "border-indigo-500 border-t-transparent",
    pink: "border-pink-500 border-t-transparent",
    red: "border-red-500 border-t-transparent",
    darkRed: "border-red-600 border-t-transparent",
    yellow: "border-yellow-500 border-t-transparent",
    gold: "border-amber-500 border-t-transparent",
    black: "border-gray-500 border-t-transparent",
  };
  return loaderColors[color] || loaderColors.gold;
};
//dashbpard colors scheme//////////////////////
// ========================================

// Function to truncate description to 100 words
export const truncateDescription = (html, maxWords = 100) => {
  if (!html) return "";

  // Strip HTML tags to get plain text
  const textContent = html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const words = textContent.split(" ").filter((word) => word.length > 0);

  if (words.length <= maxWords) {
    return html;
  }

  // Truncate to maxWords
  const truncatedWords = words.slice(0, maxWords);
  const truncatedText = truncatedWords.join(" ");

  // Return truncated plain text with ellipsis
  return truncatedText + "...";
};

// Get page heading configuration based on pathname
export const getPageHeadingConfig = (
  pathname,
  t,
  adminUser,
  user,
  locationState = null
) => {
  let userName = "User";
  let type = null;

  if (pathname.startsWith("/activity-logs")) {
    const pathParts = pathname.split("/").filter(Boolean);
    if (pathParts.length >= 2 && pathParts[0] === "activity-logs") {
      type = pathParts[1]; // admin, firm, client, accountant
    }
    // Get userName from location state if available
    userName = locationState?.userName || "User";
  }

  const pageConfig = {
    "/": {
      title: () =>
        `${t.dashboard.welcome}, ${
          adminUser?.first_name
            ? `${adminUser.first_name} ${adminUser.last_name || ""}`.trim()
            : "Admin User"
        }!`,
      description: () => t.dashboard.overview,
    },
    "/dashboard": {
      title: () =>
        `${t.dashboard.welcome}, ${
          adminUser?.first_name
            ? `${adminUser.first_name} ${adminUser.last_name || ""}`.trim()
            : "Admin User"
        }!`,
      description: () => t.dashboard.overview,
    },
  };

  if (pathname.startsWith("/clients/") && pathname.includes("/companies")) {
    const clientName = locationState?.clientName;
    return {
      title: clientName
        ? `${t.companies?.title || "Companies"} - ${clientName}`
        : t.companies?.title || "Companies",
      description: t.companies?.description || "Manage company information",
    };
  }

  if (pathname.startsWith("/activity-logs") && type) {
    const getActivityLogTitle = () => {
      const titles = {
        admin: `Activity Logs - ${userName}`,
        firm: `Firm Activity Logs - ${userName}`,
        client: `Client Activity Logs - ${userName}`,
        accountant: `Accountant Activity Logs - ${userName}`,
      };
      return titles[type] || "Activity Logs";
    };

    return {
      title: getActivityLogTitle(),
      description: "View all activity logs and user actions",
    };
  }

  // Handle transaction routes (dynamic paths)
  if (pathname.includes("/transactions")) {
    // Check if it's from individual client subscriptions FIRST (before other subscription checks)
    if (pathname.includes("/individual-clients-subscriptions/transactions")) {
      const clientName = locationState?.clientName;
      return {
        title: clientName
          ? `Individual Client Subscription Transactions - ${clientName}`
          : "Individual Client Subscription Transactions",
        description:
          "View and manage individual client subscription-related transactions",
      };
    }
    // Check if it's a subscription-specific transaction route
    if (
      pathname.includes("/subscriptions/transactions") ||
      pathname.includes("/subscription/transactions")
    ) {
      // Default subscription transactions (from /subscriptions/transactions)
      const firmName = locationState?.firmName;
      return {
        title: firmName
          ? `Firm Subscription Transactions - ${firmName}`
          : "Firm Subscription Transactions",
        description: "View and manage subscription-related transactions",
      };
    }
    // Main transactions route
  }

  const currentPage = pageConfig[pathname];
  if (!currentPage) return null;

  return {
    title: currentPage.title(),
    description: currentPage.description(),
  };
};
// End page heading configuration based on pathname
//==================================//
