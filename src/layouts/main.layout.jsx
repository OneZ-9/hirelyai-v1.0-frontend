import Navigation from "@/components/shared/Navigation";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="flex flex-col">
      <Navigation />

      <Outlet />
    </div>
  );
}

export default MainLayout;
