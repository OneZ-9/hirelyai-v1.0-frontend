import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ModeToggle } from "@/components/theme/ModeToggle";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import Logo from "./Logo";

function Navigation() {
  return (
    <nav className="sticky top-0 bg-background z-50 h-[50px] sm:h-[125px] flex justify-between items-center py-8 px-1 sm:py-10 sm:px-16 shadow-sm dark:border-b-2 dark:border-b-slate-900">
      <Logo />

      <div className="flex justify-center gap-x-2 sm:gap-x-8 items-center">
        {/* <Link to="/">Home</Link> */}

        <SignedIn>
          {/* <UserButton showName="true" /> */}
          <UserButton />
        </SignedIn>

        <SignedOut>
          <div className="flex gap-x-4 items-center">
            {/* <Link to={"/sign-in"}>Sign In</Link> */}
            <Button asChild size="menu">
              <Link to={"/sign-up"} className="max-sm:text-[0.6rem]">
                Sign Up
              </Link>
            </Button>
          </div>
        </SignedOut>

        <ModeToggle />
      </div>
    </nav>
  );
}

export default Navigation;
