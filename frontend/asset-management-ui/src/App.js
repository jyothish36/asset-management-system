import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import Profile from "./pages/Profile";
import MyAssets from "./pages/MyAssets";
import RepairTicket from "./pages/RepairTicket";
import Assets from "./pages/Assets";
import Inventory from "./pages/Inventory"; 
import AdminRepairTickets from "./pages/AdminRepairTickets"; 

function App() {
  const [isAuth, setIsAuth] = useState(
    !!localStorage.getItem("token")
  );

  const role = localStorage.getItem("role");

  if (!isAuth) {
    return (
      <BrowserRouter>
        <Routes>
          <Route
            path="*"
            element={<Login setIsAuth={setIsAuth} />}
          />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          background: "#f3f4f6"
        }}
      >
        <Sidebar />

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column"
          }}
        >
          <Navbar />

          <div
            style={{
              padding: "20px",
              flex: 1
            }}
          >
            <Routes>
              <Route
                path="/"
                element={
                  <Navigate
                    to={
                      role === "admin"
                        ? "/dashboard"
                        : "/employee-dashboard"
                    }
                    replace
                  />
                }
              />

              <Route
                path="/dashboard"
                element={<Dashboard />}
              />

              <Route
                path="/employee-dashboard"
                element={<EmployeeDashboard />}
              />

              <Route
                path="/profile"
                element={<Profile />}
              />

              <Route
                path="/my-assets"
                element={<MyAssets />}
              />

              <Route
                path="/repair-ticket"
                element={<RepairTicket />}
              />

              <Route
                path="/assets"
                element={<Assets />}
              /> 

              <Route
                path="/inventory"
                element={<Inventory />}
              />

              <Route
                path="/admin-repair-tickets"
                element={<AdminRepairTickets />}
              />

              <Route
                path="*"
                element={
                  <Navigate
                    to={
                      role === "admin"
                        ? "/dashboard"
                        : "/employee-dashboard"
                    }
                    replace
                  />
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;