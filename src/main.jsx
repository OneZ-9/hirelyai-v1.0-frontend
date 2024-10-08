import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

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
import ErrorComponent from "./components/shared/ErrorComponent";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 0 },
  },
});

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ErrorComponent />,
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
            path: "/job/:jobId",
            element: <JobPage />,
          },
        ],
      },
      {
        path: "/admin",
        element: <AdminLayout />,
        errorElement: <ErrorComponent />,
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
            path: "job/update/:jobId",
            element: <AdminJobUpdatePage />,
          },
          {
            path: "job/:jobId",
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
        errorElement: <ErrorComponent />,
      },
      {
        path: "/sign-up",
        element: <SignUpPage />,
        errorElement: <ErrorComponent />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />

          <RouterProvider router={router} />

          <Toaster
            // toastOptions={{ style: { backgroundColor: "var(--card)" } }}
            toastOptions={{ className: "toastStyles" }}
          />
        </QueryClientProvider>
      </ClerkProvider>
    </ThemeProvider>
  </React.StrictMode>
);
