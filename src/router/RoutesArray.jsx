import AuthLayout from "../components/layouts/AuthLayout";
import DashboardLayout from "../components/layouts/Dashboardlayout";
import LoginPageWrapper from "../components/auth/LoginPageWrapper";
import RegisterPage from "../components/auth/RegisterPage";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import RouteWrapper from "../components/auth/RouteWrapper";
import {
  DashboardPage,
  VehiclesPage,
  FuelLogsPage,
  TripPlanningPage,
  CrisisModePage,
  BudgetPage,
  AnalyticsPage,
  UserManagementPage,
  OrganizationsPage,
  PrototypeGuidelinesPage,
  NotFound,
} from "../pages";
import EditProfilePage from "../pages/users/EditProfilePage";

export const routesArray = [
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <LoginPageWrapper />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: (
          <RouteWrapper>
            <DashboardPage />
          </RouteWrapper>
        ),
      },
      {
        path: "/vehicles",
        element: (
          <RouteWrapper>
            <VehiclesPage />
          </RouteWrapper>
        ),
      },
      {
        path: "/fuel-logs",
        element: (
          <RouteWrapper>
            <FuelLogsPage />
          </RouteWrapper>
        ),
      },
      {
        path: "/trip-planning",
        element: (
          <RouteWrapper>
            <TripPlanningPage />
          </RouteWrapper>
        ),
      },
      {
        path: "/my-trips",
        element: (
          <RouteWrapper>
            <TripPlanningPage />
          </RouteWrapper>
        ),
      },
      {
        path: "/crisis-mode",
        element: (
          <RouteWrapper>
            <CrisisModePage />
          </RouteWrapper>
        ),
      },
      {
        path: "/budget",
        element: (
          <RouteWrapper>
            <BudgetPage />
          </RouteWrapper>
        ),
      },
      {
        path: "/analytics",
        element: (
          <RouteWrapper>
            <AnalyticsPage />
          </RouteWrapper>
        ),
      },
      {
        path: "/user-management",
        element: (
          <RouteWrapper>
            <UserManagementPage />
          </RouteWrapper>
        ),
      },
       {
        path: "/edit-profile",
        element: (
          <RouteWrapper>
            <EditProfilePage />
          </RouteWrapper>
        ),
      },
      {
        path: "/organizations",
        element: (
          <RouteWrapper>
            <OrganizationsPage />
          </RouteWrapper>
        ),
      },
      {
        path: "/prototype-guidelines",
        element: (
          <RouteWrapper>
            <PrototypeGuidelinesPage />
          </RouteWrapper>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
