import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../api";
import { LogOut } from "lucide-react";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.get("/auth/logout");
      window.location.reload();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const linkClass = (path) =>
    `px-4 py-2 rounded-md transition ${
      location.pathname === path
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-blue-100"
    }`;

  return (
    <nav className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo / Title */}
        <div
          onClick={() => navigate("/dashboard")}
          className="text-xl font-bold text-blue-700 cursor-pointer"
        >
          SmartPark EPMS
        </div>

        {/* Links */}
        <div className="flex space-x-4">
          <Link to="/dashboard" className={linkClass("/employee")}>
            Dashboard
          </Link>
          <Link to="/employee" className={linkClass("/employee")}>
            Employees
          </Link>
          <Link to="/department" className={linkClass("/department")}>
            Departments
          </Link>
          <Link to="/salary" className={linkClass("/salary")}>
            Salaries
          </Link>
          <Link to="/reports" className={linkClass("/reports")}>
            Reports
          </Link>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
}
