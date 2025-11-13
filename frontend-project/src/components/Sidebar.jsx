import { Link, useLocation } from "react-router-dom";
import { Briefcase, Users, Building2, DollarSign, BarChart3, LogOut } from "lucide-react";
import api from "../api";

export default function Sidebar() {
  const location = useLocation();

  const linkClass = (path) =>
    `flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-100 transition ${
      location.pathname === path ? "bg-blue-200 font-semibold" : ""
    }`;

  const handleLogout = async () => {
    await api.get("/auth/logout");
    window.location.reload();
  };

  return (
    <div className="h-screen w-64 bg-white border-r shadow-sm flex flex-col justify-between">
      <div>
        <div className="p-4 border-b text-center font-bold text-xl text-blue-700">
          SmartPark EPMS
        </div>
        <nav className="p-4 space-y-2">
          <Link to="/dashboard" className={linkClass("/dashboard")}>
            <Briefcase size={20} /> <span>Dashboard</span>
          </Link>
          <Link to="/employee" className={linkClass("/employee")}>
            <Users size={20} /> <span>Employees</span>
          </Link>
          <Link to="/department" className={linkClass("/department")}>
            <Building2 size={20} /> <span>Departments</span>
          </Link>
          <Link to="/salary" className={linkClass("/salary")}>
            <DollarSign size={20} /> <span>Salaries</span>
          </Link>
          <Link to="/reports" className={linkClass("/reports")}>
            <BarChart3 size={20} /> <span>Reports</span>
          </Link>
        </nav>
      </div>
      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 text-red-600 hover:text-red-800"
        >
          <LogOut size={20} /> <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
