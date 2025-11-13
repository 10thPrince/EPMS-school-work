import { useState, useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Navbar from './components/Navbar.jsx'
import Employee from './pages/Employee.jsx'
import Department from './pages/Department.jsx'
import Salary from './pages/Salary.jsx'
import Reports from './pages/Reports.jsx'
import Sidebar from './components/Sidebar.jsx'
import Dashboard from './pages/Dashboard.jsx'
import api from './api.js'
import ProtectedRoute from './components/ProtectedRoutes.jsx'

function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    api.get("/user/check").then((res) => setLoggedIn(res.data.loggedIn));
  }, []);

  if (!loggedIn) return <Login onLogin={setLoggedIn} />;
  return (
    <>
      <>
        <Navbar />
        <div className=''>
          <Routes>
            <Route index element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <Dashboard />
                </ProtectedRoute>
              } />
            <Route path='/employee' element={<Employee />} />
            <Route path='/department' element={<Department />} />
            <Route path='/salary' element={<Salary />} />
            <Route path='/reports' element={<Reports />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </div>

      </>
    </>
  )
}

export default App
