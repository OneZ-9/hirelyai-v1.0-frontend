import { useUser } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router-dom";

import AdminNav from "@/components/shared/AdminNav";
import Spinner from "@/components/shared/Spinner";

function AdminLayout() {
  const { user, isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return <Spinner />;

  if (!isSignedIn || user?.publicMetadata?.role !== "admin")
    return <Navigate to="/sign-in" />;

  return (
    <div className="container">
      <AdminNav />
      <Outlet />
    </div>
  );
}

export default AdminLayout;
