import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <main className="max-w-[1400px] mx-auto p-4">
      <Outlet />
    </main>
  );
}

export default RootLayout;
