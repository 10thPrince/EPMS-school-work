import { useEffect, useState } from "react";
import api from "../api";
import Dashboard from "./Dashboard";

export default function Employee() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    position: "",
    address: "",
    telephone: "",
    gender: "",
    hired_date: "",
    department_id: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ✅ Load all employees
  const fetchEmployees = async () => {
    try {
      const res = await api.get("/employee/all");
      setEmployees(res.data.data);
    } catch (err) {
      setError("Failed to load employees");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // ✅ Handle form change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await api.post("/employee/add", form);
      setSuccess("✅ Employee added successfully!");
      setForm({
        first_name: "",
        last_name: "",
        position: "",
        address: "",
        telephone: "",
        gender: "",
        hired_date: "",
        department_id: "",
      });
      fetchEmployees();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add employee");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen ">
      <h1 className="text-2xl font-bold text-gray-700 mb-6">👨‍💼 Employee Management</h1>

      {/* <Dashboard /> */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-10">
        <h2 className="text-lg font-semibold text-blue-700 mb-4">Add New Employee</h2>

        {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
        {success && <div className="text-green-600 text-sm mb-2">{success}</div>}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <input
            name="first_name"
            placeholder="First Name"
            value={form.first_name}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="last_name"
            placeholder="Last Name"
            value={form.last_name}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="position"
            placeholder="Position"
            value={form.position}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="telephone"
            placeholder="Telephone"
            value={form.telephone}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input
            type="date"
            name="hired_date"
            value={form.hired_date}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <select
            name="department_id"
            value={form.department_id}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Select Department</option>
            <option value="1">Carwash</option>
            <option value="2">Stock</option>
            <option value="3">Mechanic</option>
            <option value="4">Admin Staff</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="col-span-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? "Adding..." : "Add Employee"}
          </button>
        </form>
      </div>


      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-blue-700 mb-4">Employee List</h2>

        {employees.length === 0 ? (
          <p className="text-gray-500">No employees found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-blue-100 text-left">
                  <th className="p-2 border">ID</th>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Position</th>
                  <th className="p-2 border">Department</th>
                  <th className="p-2 border">Phone</th>
                  <th className="p-2 border">Gender</th>
                  <th className="p-2 border">Hired Date</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr key={emp.employee_id} className="hover:bg-gray-50">
                    <td className="p-2 border">{emp.employee_id}</td>
                    <td className="p-2 border">{emp.first_name} {emp.last_name}</td>
                    <td className="p-2 border">{emp.position}</td>
                    <td className="p-2 border">{emp.department_id}</td>
                    <td className="p-2 border">{emp.telephone}</td>
                    <td className="p-2 border">{emp.gender}</td>
                    <td className="p-2 border">{emp.hired_date?.substring(0, 10)}</td>
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
