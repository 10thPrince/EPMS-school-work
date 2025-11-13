import { useEffect, useState } from "react";
import api from "../api";

export default function Department() {
  const [departments, setDepartments] = useState([]);
  const [form, setForm] = useState({
    DepartmentCode: "",
    DepartmentName: "",
    GrossSalary: "",
    TotalDeduction: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ✅ Fetch all departments
  const fetchDepartments = async () => {
    try {
      const res = await api.get("/department/all");
      console.log(res.data)
      setDepartments(res.data);
      
    } catch (err) {
      console.error("Error fetching departments:", err);
      setError("Failed to load departments");
    }
  };

  useEffect(() => {
    fetchDepartments();
    //console.log("Departments updated:", departments);
  }, []);

  // ✅ Handle form inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await api.post("/department/add", form);
      setSuccess("✅ Department added successfully!");
      setForm({
        DepartmentCode: "",
        DepartmentName: "",
        GrossSalary: "",
        TotalDeduction: "",
      });
      fetchDepartments();
    } catch (err) {
      console.error("Error adding department:", err);
      setError(err.response?.data?.message || "Failed to add department");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-700 mb-6">🏢 Department Management</h1>

      {/* ===== Add Department Form ===== */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-10">
        <h2 className="text-lg font-semibold text-blue-700 mb-4">Add New Department</h2>

        {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
        {success && <div className="text-green-600 text-sm mb-2">{success}</div>}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <input
            name="DepartmentCode"
            placeholder="Department Code"
            value={form.DepartmentCode}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="DepartmentName"
            placeholder="Department Name"
            value={form.DepartmentName}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="number"
            name="GrossSalary"
            placeholder="Gross Salary"
            value={form.GrossSalary}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="number"
            name="TotalDeduction"
            placeholder="Total Deduction"
            value={form.TotalDeduction}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className="col-span-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? "Adding..." : "Add Department"}
          </button>
        </form>
      </div>

      {/* ===== Department Table ===== */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-blue-700 mb-4">Department List</h2>

        {departments.length === 0 ? (
          <p className="text-gray-500">No departments found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-blue-100 text-left">
                  <th className="p-2 border">Code</th>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Gross Salary</th>
                  <th className="p-2 border">Total Deduction</th>
                </tr>
              </thead>
              <tbody>
                {departments.map((index, dep) => (
                  <tr key={index } className="hover:bg-gray-50">
                    <td className="p-2 border">{dep.DepartmentCode}</td>
                    <td className="p-2 border">{dep.DepartmentName}</td>
                    <td className="p-2 border">{dep.GrossSalary}</td>
                    <td className="p-2 border">{dep.TotalDeduction}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
