import {
  Bell,
  UserPlus,
  CreditCard,
  AlertCircle,
  CheckCircle,
  XCircle,
  Calendar,
  DollarSign,
  Headphones,
  Reply,
  Clock,
  FileText,
  Eye,
  Store,
} from "lucide-react";

// ── Icon Config Map ──────────────────────────────────────────
const NOTIFICATION_ICON_CONFIG = {
  bank_connection: {
    connection_end_date: { icon: AlertCircle, bgColor: "bg-indigo-100", iconColor: "text-indigo-700" },
    default:            { icon: XCircle,      bgColor: "bg-indigo-100", iconColor: "text-indigo-700" },
  },
  support_ticket: {
    reply:                      { icon: Reply,        bgColor: "bg-orange-100", iconColor: "text-orange-700" },
    invoice_viewed:             { icon: Eye,          bgColor: "bg-blue-100",   iconColor: "text-blue-700"   },
    invoice_payment_authorized: { icon: CheckCircle,  bgColor: "bg-green-100",  iconColor: "text-green-700"  },
    resolved:                   { icon: CheckCircle,  bgColor: "bg-green-100",  iconColor: "text-green-700"  },
    closed:                     { icon: XCircle,      bgColor: "bg-gray-100",   iconColor: "text-gray-700"   },
    status_updated:             { icon: Headphones,   bgColor: "bg-amber-100",  iconColor: "text-amber-700"  },
    in_progress:                { icon: Headphones,   bgColor: "bg-amber-100",  iconColor: "text-amber-700"  },
    new_ticket_created:         { icon: Headphones,   bgColor: "bg-orange-100", iconColor: "text-orange-700" },
    default:                    { icon: Headphones,   bgColor: "bg-orange-100", iconColor: "text-orange-700" },
  },
  invoice: {
    invoice_paid:               { icon: CheckCircle,  bgColor: "bg-green-100",  iconColor: "text-green-700"  },
    invoice_under_processing:   { icon: Clock,        bgColor: "bg-blue-100",   iconColor: "text-blue-700"   },
    invoice_failed:             { icon: XCircle,      bgColor: "bg-red-100",    iconColor: "text-red-700"    },
    invoice_viewed:             { icon: Eye,          bgColor: "bg-blue-100",   iconColor: "text-blue-700"   },
    invoice_payment_authorized: { icon: CheckCircle,  bgColor: "bg-green-100",  iconColor: "text-green-700"  },
    default:                    { icon: DollarSign,   bgColor: "bg-green-100",  iconColor: "text-green-700"  },
  },
  add_client: {
    new_registered:                { icon: UserPlus, bgColor: "bg-teal-100", iconColor: "text-teal-700" },
    new_registered_via_invitation: { icon: UserPlus, bgColor: "bg-teal-100", iconColor: "text-teal-700" },
    new_registered_via_website:    { icon: UserPlus, bgColor: "bg-teal-100", iconColor: "text-teal-700" },
    default:                       { icon: UserPlus, bgColor: "bg-teal-100", iconColor: "text-teal-700" },
  },
  new_supplier:          { icon: Store,   bgColor: "bg-[#113071]/10", iconColor: "text-[#113071]" },
  supplier_needs_approval: { icon: Store, bgColor: "bg-orange-100",    iconColor: "text-orange-600" },
  new_buyer:             { icon: UserPlus, bgColor: "bg-blue-100",     iconColor: "text-blue-700"  },
  new_report:            { icon: Headphones, bgColor: "bg-orange-100", iconColor: "text-orange-700" },
  client_verification: {
    document_uploaded: { icon: FileText,    bgColor: "bg-yellow-100", iconColor: "text-yellow-700" },
    document_approved: { icon: CheckCircle, bgColor: "bg-green-100",  iconColor: "text-green-700"  },
    document_rejected: { icon: XCircle,     bgColor: "bg-red-100",    iconColor: "text-red-700"    },
    default:           { icon: FileText,    bgColor: "bg-yellow-100", iconColor: "text-yellow-700" },
  },
  default: { icon: Bell, bgColor: "bg-blue-100", iconColor: "text-blue-700" },
};

// Fallback: derive icon from notification message text
const getIconFromMessage = (message) => {
  const msg = message.toLowerCase();

  if (msg.includes("support ticket") || msg.includes("ticket")) {
    return msg.includes("reply")
      ? { icon: Reply,     bgColor: "bg-orange-100", iconColor: "text-orange-700" }
      : { icon: Headphones,bgColor: "bg-orange-100", iconColor: "text-orange-700" };
  }
  if (msg.includes("invoice") || msg.includes("paid")) {
    if (msg.includes("failed") || msg.includes("failure"))
      return { icon: XCircle, bgColor: "bg-red-100",  iconColor: "text-red-700"  };
    if (msg.includes("processing"))
      return { icon: Clock,   bgColor: "bg-blue-100", iconColor: "text-blue-700" };
    return { icon: DollarSign, bgColor: "bg-green-100", iconColor: "text-green-700" };
  }
  if (
    msg.includes("verification") || msg.includes("document") ||
    msg.includes("identity proof") || msg.includes("approve") || msg.includes("reject")
  ) {
    if (msg.includes("approve") || msg.includes("approved"))
      return { icon: CheckCircle, bgColor: "bg-green-100",  iconColor: "text-green-700"  };
    if (msg.includes("reject") || msg.includes("rejected"))
      return { icon: XCircle,     bgColor: "bg-red-100",    iconColor: "text-red-700"    };
    return { icon: FileText, bgColor: "bg-yellow-100", iconColor: "text-yellow-700" };
  }
  if (msg.includes("signed up") || msg.includes("new user") || msg.includes("client") || msg.includes("registered"))
    return { icon: UserPlus, bgColor: "bg-teal-100", iconColor: "text-teal-700" };

  if (msg.includes("subscription")) {
    if (msg.includes("failed") || msg.includes("cancelled"))
      return { icon: XCircle,     bgColor: "bg-purple-100", iconColor: "text-purple-700" };
    if (msg.includes("activated") || msg.includes("processing"))
      return { icon: CheckCircle, bgColor: "bg-purple-100", iconColor: "text-purple-700" };
    if (msg.includes("due date") || msg.includes("grace period"))
      return { icon: Calendar,    bgColor: "bg-violet-100", iconColor: "text-violet-700" };
    return { icon: CreditCard, bgColor: "bg-purple-100", iconColor: "text-purple-700" };
  }
  if (msg.includes("bank") || msg.includes("connection")) {
    if (msg.includes("end date") || msg.includes("expired"))
      return { icon: AlertCircle, bgColor: "bg-indigo-100", iconColor: "text-indigo-700" };
    return { icon: CreditCard, bgColor: "bg-indigo-100", iconColor: "text-indigo-700" };
  }

  return null;
};

export const getNotificationIconConfig = (notification) => {
  const type    = (notification.notification_type || notification.type || "").toLowerCase();
  const subtype = (notification.subtype || "").toLowerCase();
  const message = (notification.description || notification.message || notification.title || "").toLowerCase();

  const typeConfig = NOTIFICATION_ICON_CONFIG[type];
  if (typeConfig) {
    // Direct icon config (e.g. new_supplier, new_buyer)
    if (typeConfig.icon) return typeConfig;
    // Nested subtype config
    return (subtype ? typeConfig[subtype] : null) || typeConfig.default || NOTIFICATION_ICON_CONFIG.default;
  }

  const messageConfig = getIconFromMessage(message);
  if (messageConfig) return messageConfig;

  if (["document_upload", "client_document_uploaded", "client_verification", "verification"].includes(type))
    return NOTIFICATION_ICON_CONFIG.client_verification?.default || NOTIFICATION_ICON_CONFIG.default;

  if (type === "signup" || type === "client" || type === "add_client")
    return { icon: UserPlus, bgColor: "bg-teal-100", iconColor: "text-teal-700" };

  if (type === "new_supplier" || type.includes("supplier"))
    return { icon: Store, bgColor: "bg-[#113071]/10", iconColor: "text-[#113071]" };

  if (type.includes("subscription"))
    return { icon: CreditCard, bgColor: "bg-purple-100", iconColor: "text-purple-700" };

  return NOTIFICATION_ICON_CONFIG.default;
};

// ── Format time ago ──────────────────────────────────────────
export const formatTimeAgo = (dateString) => {
  if (!dateString) return "";
  const diff = Math.floor((Date.now() - new Date(dateString)) / 1000);
  if (diff < 60)       return "Just now";
  if (diff < 3600)     { const m = Math.floor(diff / 60);       return `${m} ${m === 1 ? "minute" : "minutes"} ago`; }
  if (diff < 86400)    { const h = Math.floor(diff / 3600);     return `${h} ${h === 1 ? "hour" : "hours"} ago`; }
  if (diff < 2592000)  { const d = Math.floor(diff / 86400);    return `${d} ${d === 1 ? "day" : "days"} ago`; }
  if (diff < 31536000) { const mo = Math.floor(diff / 2592000); return `${mo} ${mo === 1 ? "month" : "months"} ago`; }
  const y = Math.floor(diff / 31536000);
  return `${y} ${y === 1 ? "year" : "years"} ago`;
};

// ── Notification navigation route ───────────────────────────
export const getNotificationRoute = (notification) => {
  const type    = (notification.notification_type || notification.type || "").toLowerCase();
  const moduleId = notification.module_id || "";

  switch (type) {
    // Supplier related
    case "new_supplier":
    case "supplier_approved":
    case "supplier_rejected":
    case "supplier_pending":
      return "/suppliers/pending_approval";

    case "supplier_needs_approval":
      return "/suppliers/need_approval";

    case "supplier_active":
      return "/suppliers/active";

    case "supplier_blocked":
      return "/suppliers/blocked";

    // Buyer related
    case "new_buyer":
    case "buyer_registered":
      return "/buyers";

    // Product related
    case "new_product":
    case "product_approved":
    case "product_rejected":
    case "product_pending":
      return "/products";

    // Support ticket related
    case "new_support_ticket":
    case "new_report":
    case "support_ticket":
    case "support_ticket_reply":
    case "support_ticket_updated":
    case "support_ticket_resolved":
    case "support_ticket_closed":
    case "support_ticket_status_updated": {
      if (!moduleId) return "/support-tickets";
      // Try to derive user type from notification fields
      const rawType = (
        notification.ticket_type ||
        notification.user_type ||
        notification.type_of_user ||
        notification.role ||
        ""
      ).toLowerCase();
      // supplier_id present → supplier ticket, else buyer
      const ticketType = rawType ||
        (notification.supplier_id ? "supplier" : "buyer");
      return `/support-tickets/${ticketType}/detail/${moduleId}`;
    }

    // Explore / video related
    case "new_explore_video":
    case "explore_video":
      return "/explore";

    // Category related
    case "new_category":
      return "/categories";

    // Order / payment related
    case "new_order":
    case "order_placed":
    case "order_cancelled":
    case "payment_received":
      return "/dashboard";

    default:
      return "/dashboard";
  }
};
