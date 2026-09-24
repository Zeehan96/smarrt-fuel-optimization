export const languageContent = {
  en: {
    // Login Page
    login: {
      welcomeBack: "Welcome back",
      signInDescription: "Sign in to your admin account",
      emailLabel: "Email Address",
      emailPlaceholder: "admin@smartfuel.com",
      passwordLabel: "Password",
      passwordPlaceholder: "Enter your password",
      forgotPassword: "Forgot Password?",
      signInButton: "Sign In",
      signingIn: "Signing in...",
      copyright: `© ${new Date().getFullYear()} Smart Fuel Optimization. All rights reserved.`,
    },
    // Forgot Password / OTP
    forgotPassword: {
      backToLogin: "Back to Login",
      back: "Back",
      title: "Forgot Password?",
      description: "Enter your email to receive a verification code",
      emailLabel: "Email Address",
      emailPlaceholder: "Enter your email address",
      sendCode: "Send Verification Code",
      sending: "Sending...",
      otpTitle: "Verify OTP",
      otpDescription: "Enter the 6-digit code sent to",
      verificationCode: "Verification Code",
      didntReceive: "Didn't receive code? Resend",
      verifyCode: "Verify Code",
      verifying: "Verifying...",
      resetTitle: "Reset Password",
      resetDescription: "Enter your new password",
      newPassword: "New Password",
      newPasswordPlaceholder: "Enter new password",
      confirmPassword: "Confirm Password",
      confirmPasswordPlaceholder: "Confirm new password",
      minCharacters: "Minimum 6 characters",
      passwordsNotMatch: "Passwords do not match",
      resetButton: "Reset Password",
      resetting: "Resetting...",
      successMessage: "Password reset successfully! Redirecting to login...",
    },
    // Sidebar
    sidebar: {
      dashboard: "Dashboard",
      users: "Users",
      suppliers: "Suppliers",
      suppliersMenu: "Suppliers",
      pendingSuppliers: "Pending suppliers",
      activeSuppliers: "Active suppliers",
      rejectedSuppliers: "Rejected suppliers",
      products: "Products",
      productsDisabledTooltip:
        "Development in progress. This section is not available yet.",
      buyers: "Buyers",
      categories: "Categories",
      subAdmins: "Sub admins",
      emailTemplates: "Email Templates",
      settings: "Settings",
      emailSettings: "Email settings",
      searchMenu: "Search menu...",
    },
    // Header
    header: {
      editProfile: "Edit Profile",
      changePassword: "Change Password",
      signOut: "Sign Out",
      darkMode: "Switch to Dark Mode",
      lightMode: "Switch to Light Mode",
      logoutConfirmMessage:
        "Are you sure you want to sign out? You will need to log in again to access your account.",
      cancel: "Cancel",
    },
    // Dashboard
    dashboard: {
      welcome: "Welcome back",
      overview: "Here's your dashboard overview",
      totalClients: " Clients",
      individualClients: "Individual Clients",
      nonIndividualClients: "Non-Individual Clients",
      clientsWithFirm: "Clients with Firm",
      totalAccountants: " Accountants",
      totalBookkeeping: " Bookkeeping",
      totalAdminUsers: " Admin Users",
      totalFirms: " Firms",
      activeSubscriptions: "Active Subscriptions",
    },

    // Client Free Plan Configuration
    clientFreePlanConfiguration: {
      title: "Client Free Plan Configuration",
      description: "Configure the free plan settings for clients",
      loading: "Loading configuration...",
      fields: {
        title: "Title",
        allowedInvoicesCount: "Allowed Invoices Count",
        description: "Description",
      },
      placeholders: {
        title: "Enter title",
        allowedInvoicesCount: "Enter allowed invoices count",
        description: "Enter description",
      },
      validation: {
        titleRequired: "Title is required",
        invoicesCountRequired: "Allowed Invoices Count must be greater than 0",
        descriptionRequired: "Description is required",
      },
      messages: {
        loadError: "Failed to load configuration",
        updateSuccess: "Configuration updated successfully",
        updateError: "Failed to update configuration",
      },
      saveButton: "Save Configuration",
      saving: "Saving...",
    },

    // Assign Client Drawer
    assignClientDrawer: {
      title: "Manage Clients for",
      description: "Select or deselect clients to assign or remove from this",
      descriptionBadgeNote: "Already assigned clients are marked with a badge.",
      searchPlaceholder: "Search clients...",
      selectAll: "Select All",
      assignedBadge: "Assigned",
      noClientsFound: "No clients found",
      noActiveClients: "No active clients available",
      clientsSelected: "client(s) selected",
      client: "client",
      clients: "clients",
    },
    // Common
    common: {
      filter: "Filter",
      save: "Save Settings",
      saving: "Saving...",
      cancel: "Cancel",
      delete: "Delete",
      edit: "Edit",
      view: "View Detail",
      search: "Search",
      noResultsDescription: "Try adjusting your search or filter criteria.",
    },
  },
};

export const getLanguageContent = (language) => {
  if (!language) {
    language = "en";
  }

  const base = languageContent[language] || languageContent.en;

  const trimmed = {
    ...base,
    sidebar: { ...(base.sidebar || {}) },
    dashboard: { ...(base.dashboard || {}) },
  };

  // Remove unwanted sidebar labels
  const deleteKeys = ["adminUsers"];

  deleteKeys.forEach((k) => {
    if (
      trimmed.sidebar &&
      Object.prototype.hasOwnProperty.call(trimmed.sidebar, k)
    ) {
      delete trimmed.sidebar[k];
    }
  });

  // Remove unwanted dashboard labels
  const deleteDashboardKeys = [
    "totalClients",
    "individualClients",
    "nonIndividualClients",
    "clientsWithFirm",
    "totalAccountants",
    "totalBookkeeping",
    "totalAdminUsers",
    "totalFirms",
    "activeSubscriptions",
  ];
  deleteDashboardKeys.forEach((k) => {
    if (
      trimmed.dashboard &&
      Object.prototype.hasOwnProperty.call(trimmed.dashboard, k)
    ) {
      delete trimmed.dashboard[k];
    }
  });

  // Remove whole sections
  const deleteTopLevelKeys = ["clients"];
  deleteTopLevelKeys.forEach((k) => {
    if (Object.prototype.hasOwnProperty.call(trimmed, k)) {
      delete trimmed[k];
    }
  });

  return trimmed;
};
