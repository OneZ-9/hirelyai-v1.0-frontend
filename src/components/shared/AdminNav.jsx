import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ModeToggle } from "../theme/ModeToggle";
import Logo from "./Logo";

function AdminNav() {
  return (
    <nav className="sticky top-0 bg-background z-50 flex py-10 justify-between items-center">
      <Logo />

      <div className="flex justify-end items-center gap-x-6 py-4">
        <Link to="/admin/jobs">Job Posts</Link>
        <Button asChild>
          <Link to="/admin/job/create">Post A Job</Link>
        </Button>

        <ModeToggle />
      </div>
    </nav>
  );
}

export default AdminNav;
