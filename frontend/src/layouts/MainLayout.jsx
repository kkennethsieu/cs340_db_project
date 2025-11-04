import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

export default function MainLayout() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="bg-gray-800">
        <Navbar />
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-100 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
