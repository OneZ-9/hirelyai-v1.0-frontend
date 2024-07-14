import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ModeToggle } from "@/components/theme/ModeToggle";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import Logo from "./Logo";

function Navigation() {
  return (
    <nav className="sticky top-0 bg-background z-50 h-[112px] flex justify-between items-center px-16 shadow-sm">
      <Logo />

      <div className="flex justify-center gap-x-8 items-center">
        <Link to={"/"}>Home</Link>

        <SignedIn>
          <UserButton showName="true" />
        </SignedIn>

        <SignedOut>
          <div className="flex gap-x-4 items-center">
            <Link to={"/sign-in"}>Sign In</Link>
            <Button asChild>
              <Link to={"/sign-up"}>Sign Up</Link>
            </Button>
          </div>
        </SignedOut>

        <ModeToggle />
      </div>
    </nav>
  );
}

export default Navigation;
