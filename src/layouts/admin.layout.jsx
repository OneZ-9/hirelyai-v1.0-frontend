import Spinner from "@/components/shared/Spinner";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { Link, Navigate, Outlet } from "react-router-dom";

function AdminLayout() {
  const { user, isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return <Spinner />;

  if (!isSignedIn || user?.publicMetadata?.role !== "admin")
    return <Navigate to="/sign-in" />;

  return (
    <div>
      <div className="flex justify-end items-center gap-x-4 py-4">
        <Link to="/admin/jobs">Job Posts</Link>
        <Button asChild>
          <Link to="/admin/job/create">Post A Job</Link>
        </Button>
      </div>
      <Outlet />
    </div>
  );
}

export default AdminLayout;
