import { Link } from "react-router-dom";
import { Button } from "../ui/button";

function AdminNav() {
  return (
    <nav className="flex py-12 justify-between items-center">
      <div>
        <Link to={"/"} className="text-4xl font-medium text-underlay-1">
          HirelyAI v1.0
        </Link>
      </div>

      <div className="flex justify-end items-center gap-x-4 py-4">
        <Link to="/admin/jobs">Job Posts</Link>
        <Button asChild>
          <Link to="/admin/job/create">Post A Job</Link>
        </Button>
      </div>
    </nav>
  );
}

export default AdminNav;
