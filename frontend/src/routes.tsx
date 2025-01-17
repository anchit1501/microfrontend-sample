import React from "react";
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  Outlet,
} from "react-router-dom";
import {
  ENABLE_HOMEPAGE,
} from "./customization/feature-flags";
import ContextWrapper from "./contexts";
import { CustomNavigate } from "./customization/components/custom-navigate";

// Lazy-loaded components
const PlaygroundPage = React.lazy(() => import("./pages/Playground"));
const AdminPage = React.lazy(() => import("./pages/AdminPage"));
const LoginAdminPage = React.lazy(() => import("./pages/AdminPage/LoginPage"));
const DeleteAccountPage = React.lazy(() =>
  import("./pages/DeleteAccountPage")
);

// Static imports for frequently used components/pages
import { ProtectedRoute } from "./components/authorization/authGuard";
import { AuthSettingsGuard } from "./components/authorization/authSettingsGuard";
import {AppInitPage} from "./pages/AppInitPage";
import {AppWrapperPage} from "./pages/AppWrapperPage";
import {DashboardWrapperPage} from "./pages/DashboardWrapperPage";
import FlowPage from "./pages/FlowPage";
import SettingsPage from "./pages/SettingsPage";
import StorePage from "./pages/StorePage";
import CollectionPage from "./pages/MainPage/pages";
import OldHomePage from "./pages/MainPage/oldPages/mainPage";
import HomePage from "./pages/MainPage/pages/homePage";
import MyCollectionComponent from "./pages/MainPage/oldComponents/myCollectionComponent";
import ApiKeysPage from "./pages/SettingsPage/pages/ApiKeysPage";
import GeneralPage from "./pages/SettingsPage/pages/GeneralPage";
import GlobalVariablesPage from "./pages/SettingsPage/pages/GlobalVariablesPage";
import MessagesPage from "./pages/SettingsPage/pages/messagesPage";
import ShortcutsPage from "./pages/SettingsPage/pages/ShortcutsPage";
import StoreApiKeyPage from "./pages/SettingsPage/pages/StoreApiKeyPage";

// Define routes
const routes = [
  {
    path: "/langflow",
    element: (
      <ContextWrapper>
        <AppInitPage />
      </ContextWrapper>
    ),
    children: [
      {
        path: "",
        element: <AppWrapperPage />,
        children: [
          // Public Routes
          { path: "public-flow/:id", element: <FlowPage /> },
          { path: "public-settings", element: <SettingsPage /> },
          { path: "public-store", element: <StorePage /> },

          // Authenticated Routes
          {
            path: "",
            element: (
              <ProtectedRoute>
                <Outlet />
              </ProtectedRoute>
            ),
            children: [
              {
                path: "",
                element: <DashboardWrapperPage />,
                children: [
                  // Homepage
                  {
                    path: "",
                    element: ENABLE_HOMEPAGE ? (
                      <CollectionPage />
                    ) : (
                      <OldHomePage />
                    ),
                    children: [
                      { index: true, element: <CustomNavigate replace to="flows" /> },
                      {
                        path: "flows",
                        element: ENABLE_HOMEPAGE ? (
                          <HomePage key="flows" type="flows" />
                        ) : (
                          <MyCollectionComponent key="flows" type="flows" />
                        ),
                        children: [
                          {
                            path: "folder/:folderId",
                            element: ENABLE_HOMEPAGE ? (
                              <HomePage key="flows" type="flows" />
                            ) : (
                              <MyCollectionComponent key="flows" type="flows" />
                            ),
                          },
                        ],
                      },
                    ],
                  },

                  // Settings Routes
                  {
                    path: "settings",
                    element: <SettingsPage />,
                    children: [
                      { index: true, element: <CustomNavigate replace to="general" /> },
                      { path: "global-variables", element: <GlobalVariablesPage /> },
                      { path: "api-keys", element: <ApiKeysPage /> },
                      {
                        path: "general/:scrollId?",
                        element: (
                          <AuthSettingsGuard>
                            <GeneralPage />
                          </AuthSettingsGuard>
                        ),
                      },
                      { path: "shortcuts", element: <ShortcutsPage /> },
                      { path: "messages", element: <MessagesPage /> },
                      { path: "store", element: <StoreApiKeyPage /> },
                    ],
                  },

                  // Flow Routes
                  {
                    path: "flow/:id",
                    element: <DashboardWrapperPage />,
                    children: [
                      { path: "folder/:folderId", element: <FlowPage /> },
                      { path: "", element: <FlowPage /> },
                    ],
                  },

                  // Playground
                  { path: "playground/:id", element: <PlaygroundPage /> },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  // Fallback Route
  { path: "*", element: <CustomNavigate replace to="/" /> },
];
export default routes;