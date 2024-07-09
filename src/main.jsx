import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";

import "./index.css";
import HomePage from "./pages/home/home.page.jsx";
import JobPage from "./pages/job/job.page";
import RootLayout from "./layouts/root.layout";
import SignUpPage from "./pages/auth/sign-up.page";
import SignInPage from "./pages/auth/sign-in.page";
import MainLayout from "./layouts/main.layout";
import AdminLayout from "./layouts/admin.layout";
import AdminJobCreatePage from "./pages/admin/admin-job-create.page";
import AdminJobPostsPage from "./pages/admin/admin-job-posts.page";
import AdminJobPage from "./pages/admin/admin-job.page";
import AdminJobApplicationPage from "./pages/admin/admin-job-application.page";
import AdminJobUpdatePage from "./pages/admin/admin-job-update.page";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        // Nested layout
        element: <MainLayout />,
        children: [
          {
            path: "/",
            element: <HomePage />,
          },
          {
            path: "/job/:id",
            element: <JobPage />,
          },
        ],
      },
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          {
            path: "jobs",
            element: <AdminJobPostsPage />,
          },
          {
            path: "job/create",
            element: <AdminJobCreatePage />,
          },
          {
            path: "job/update/:id",
            element: <AdminJobUpdatePage />,
          },
          {
            path: "job/:id",
            element: <AdminJobPage />,
          },
          {
            path: "job/:id/application/:applicationId",
            element: <AdminJobApplicationPage />,
          },
        ],
      },
      {
        path: "/sign-in",
        element: <SignInPage />,
      },
      {
        path: "/sign-up",
        element: <SignUpPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <RouterProvider router={router} />
    </ClerkProvider>
  </React.StrictMode>
);
