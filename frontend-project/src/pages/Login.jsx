import React, { useState } from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
   const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // ✅ Basic validation
    if (!username || !password) {
      setError("Please enter both username and password.");
      setLoading(false);
      return;
    }

    try {
      const res = await api.post("/user/login", { username, password });
      alert(res.data.message);
      onLogin(true);
      navigate('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed. Try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-blue-100 to-blue-300">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-96">
        <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Employee Payroll Management System
        </h1>

        {error && (
          <div className="bg-red-100 text-red-700 border border-red-300 rounded p-2 mb-3 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">Username</label>
            <input
              type="text"
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm mb-2">Password</label>
            <input
              type="password"
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login