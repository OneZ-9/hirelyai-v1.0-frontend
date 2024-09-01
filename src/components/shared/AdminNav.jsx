import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ModeToggle } from "../theme/ModeToggle";
import Logo from "./Logo";

function AdminNav() {
  return (
    <nav className="sticky top-0 bg-background z-50 h-[50px] sm:h-[125px] flex justify-between items-center py-8 px-1 sm:py-10 sm:px-16 shadow-sm dark:border-b-2 dark:border-b-slate-900">
      <Logo />

      <div className="flex justify-center gap-x-2 sm:gap-x-8 items-center">
        <Link to="/admin/jobs" className="max-sm:text-[0.6rem]">
          Job Posts
        </Link>
        <Button asChild size="menu">
          <Link to="/admin/job/create" className="max-sm:text-[0.6rem]">
            Post A Job
          </Link>
        </Button>

        <ModeToggle />
      </div>
    </nav>
  );
}

export default AdminNav;
