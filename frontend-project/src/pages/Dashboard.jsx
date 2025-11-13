import DashboardCard from "../components/DashboardCard";
import { Users, Building2, DollarSign, BarChart3 } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-700 mb-6">Welcome to SmartPark EPMS</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <DashboardCard
          icon={Users}
          title="Employees"
          description="Manage all employee details and records"
          link="/employee"
        />
        <DashboardCard
          icon={Building2}
          title="Departments"
          description="View and add company departments"
          link="/department"
        />
        <DashboardCard
          icon={DollarSign}
          title="Salaries"
          description="Manage payroll and employee payments"
          link="/salary"
        />
        <DashboardCard
          icon={BarChart3}
          title="Reports"
          description="View monthly payroll reports"
          link="/reports"
        />
      </div>
    </div>
  );
}
