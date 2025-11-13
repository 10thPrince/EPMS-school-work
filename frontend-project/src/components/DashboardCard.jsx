import { useNavigate } from "react-router-dom";

export default function DashboardCard({ icon: Icon, title, description, link }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(link)}
      className="cursor-pointer bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition border border-gray-100 hover:border-blue-400"
    >
      <div className="flex items-center space-x-4">
        <div className="bg-blue-100 p-3 rounded-xl text-blue-700">
          <Icon size={28} />
        </div>
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-gray-500 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}
