// ========================================
// COMMON COMPONENTS
// ========================================

// Modal Components
export { default as FormModal } from "./common/FormModal";
export { default as ChangePasswordModal } from "./common/ChangePasswordModal";
export {
  CrudFormAvatarUpload,
  CrudFormFieldLabel,
  CRUD_FORM_INPUT_CLASS,
  CRUD_SEARCH_INPUT_CLASS,
} from "./common/CrudFormAvatarUpload";
export { default as CustomModal } from "./common/CustomModal";

export { default as ConfirmationModal } from "./common/ConfirmationModal";
export { default as ConfirmActionModal } from "./common/ConfirmationModal";

// Drawer Components
export { default as CustomDrawer } from "./common/CustomDrawer";

// Table Components

// UI Components
export { default as Button } from "./common/Button";
export { default as InputPhone } from "./common/InputPhone";
export {
  default as CountryDropdown,
  COUNTRY_DROPDOWN_OPTIONS,
} from "./common/CountryDropdown";
export { default as PageHeadingWithActions } from "./common/PageHeadingWithActions";
export { default as PageMainHeading } from "./common/PageMainHeading";
export { default as PageLoading } from "./common/PageLoading";
export {
  default as DetailModalFieldGrid,
  DETAIL_MODAL_CARD_SHELL,
  DETAIL_MODAL_CARD_BODY,
} from "./common/DetailModalFieldGrid";
export { default as Tabs } from "./common/Tabs";
export { default as TinyEditor } from "./common/TinyEditor";
export { default as ConfirmActionMessage } from "./common/ConfirmActionMessage";

// ========================================
// CARD COMPONENTS
// ========================================

export { ToggleSwitch } from "./cards";

// ========================================
// LAYOUT COMPONENTS
// ========================================

export { default as AuthLayout } from "./layouts/AuthLayout";
export { default as DashboardLayout } from "./layouts/Dashboardlayout";
export { default as Header } from "./layouts/Header";
export { default as Sidebar } from "./layouts/Sidebar";

// ========================================
// AUTH COMPONENTS
// ========================================

export { default as LoginPage } from "./auth/LoginPage";
export { default as LoginPageWrapper } from "./auth/LoginPageWrapper";
export { default as ProtectedRoute } from "./auth/ProtectedRoute";
