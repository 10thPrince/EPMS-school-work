import { useEffect, useState } from "react";
import api from "../api";

export default function Salary() {
  const [salaries, setSalaries] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [form, setForm] = useState({
    employee_id: "",
    department_id: "",
    base_salary: "",
    bonuses: "",
    deductions: "",
    payment_date: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ------------------------
  // Fetch Data
  // ------------------------
  const fetchSalaries = async () => {
    try {
      const res = await api.get("/salary/all");
      setSalaries(res.data.data);
    } catch (err) {
      setError("Failed to load salaries");
    }
  };

  const fetchEmployees = async () => {
    try {
      const res = await api.get("/employee/all");
      setEmployees(res.data.data);
    } catch (err) {}
  };

  const fetchDepartments = async () => {
    try {
      const res = await api.get("/department/all");
      setDepartments(res.data);
    } catch (err) {}
  };

  useEffect(() => {
    fetchSalaries();
    fetchEmployees();
    fetchDepartments();
  }, []);

  // ------------------------
  // Handle Form Logic
  // ------------------------
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await api.post("/api/salary/add", form);

      setSuccess("Salary record added successfully!");
      setForm({
        employee_id: "",
        department_id: "",
        base_salary: "",
        bonuses: "",
        deductions: "",
        payment_date: "",
      });
      fetchSalaries();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add salary");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-700 mb-6">💰 Salary Management</h1>

      
      <div className="bg-white rounded-lg shadow-md p-6 mb-10">
        <h2 className="text-lg font-semibold text-blue-700 mb-4">Add Salary Record</h2>

        {error && <p className="text-red-600 mb-2">{error}</p>}
        {success && <p className="text-green-600 mb-2">{success}</p>}

        <form
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          onSubmit={handleSubmit}
        >
          
          <select
            name="employee_id"
            value={form.employee_id}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Select Employee</option>
            {employees.map((emp) => (
              <option key={emp.employee_id} value={emp.employee_id}>
                {emp.FirstName} {emp.LastName}
              </option>
            ))}
          </select>

          
          <select
            name="department_id"
            value={form.department_id}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept.department_id} value={dept.department_id}>
                {dept.department_name}
              </option>
            ))}
          </select>

          <input
            name="base_salary"
            placeholder="Base Salary"
            value={form.base_salary}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            name="bonuses"
            placeholder="Bonuses"
            value={form.bonuses}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            name="deductions"
            placeholder="Deductions"
            value={form.deductions}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            name="payment_date"
            type="date"
            value={form.payment_date}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <button
            disabled={loading}
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition col-span-full"
          >
            {loading ? "Saving..." : "Add Salary"}
          </button>
        </form>
      </div>

      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-blue-700 mb-4">Salary Records</h2>

        {salaries.length === 0 ? (
          <p className="text-gray-500">No salary records found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-blue-100">
                  <th className="p-2 border">ID</th>
                  <th className="p-2 border">Employee</th>
                  <th className="p-2 border">Department</th>
                  <th className="p-2 border">Base</th>
                  <th className="p-2 border">Bonus</th>
                  <th className="p-2 border">Deduction</th>
                  <th className="p-2 border">Total</th>
                  <th className="p-2 border">Date</th>
                </tr>
              </thead>

              <tbody>
                {salaries.map((sal) => (
                  <tr key={sal.salary_id} className="hover:bg-gray-50">
                    <td className="p-2 border">{sal.salary_id}</td>
                    <td className="p-2 border">{sal.employee_name}</td>
                    <td className="p-2 border">{sal.department_name}</td>
                    <td className="p-2 border">{sal.base_salary}</td>
                    <td className="p-2 border">{sal.bonuses}</td>
                    <td className="p-2 border">{sal.deductions}</td>
                    <td className="p-2 border font-semibold text-green-700">
                      {sal.total_salary}
                    </td>
                    <td className="p-2 border">
                      {sal.payment_date?.substring(0, 10)}
                    </td>
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
