import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const location = useLocation();
  const role = localStorage.getItem("role");

  return (
    <div className="sidebar">

      <h2>
        {role === "admin"
          ? "⚡ Asset Admin"
          : "👤 Employee Portal"}
      </h2>

      {role === "admin" ? (
        <>
          <Link
            to="/dashboard"
            className={
              location.pathname === "/dashboard"
                ? "active"
                : ""
            }
          >
            📊 Dashboard
          </Link>

          <Link
            to="/assets"
            className={
              location.pathname === "/assets"
                ? "active"
                : ""
            }
          >
            💻 Assets
          </Link>

          <Link
            to="/inventory"
            className={
              location.pathname === "/inventory"
                ? "active"
                : ""
            }
          >
            📦 Inventory
          </Link>

          <Link
            to="/admin-repair-tickets"
            className={
              location.pathname ===
              "/admin-repair-tickets"
                ? "active"
                : ""
            }
          >
            🛠 Repair Tickets
          </Link>
        </>
      ) : (
        <>
          <Link
            to="/employee-dashboard"
            className={
              location.pathname ===
              "/employee-dashboard"
                ? "active"
                : ""
            }
          >
            🏠 Dashboard
          </Link>

          <Link
            to="/profile"
            className={
              location.pathname === "/profile"
                ? "active"
                : ""
            }
          >
            👤 My Profile
          </Link>

          <Link
            to="/my-assets"
            className={
              location.pathname === "/my-assets"
                ? "active"
                : ""
            }
          >
            💻 My Assets
          </Link>

          <Link
            to="/repair-ticket"
            className={
              location.pathname ===
              "/repair-ticket"
                ? "active"
                : ""
            }
          >
            🛠 Repair Ticket
          </Link>
        </>
      )}

      <div className="sidebar-footer">
        <div className="role-tag">
          {role === "admin"
            ? "Administrator"
            : "Employee"}
        </div>
      </div>

    </div>
  );
}

export default Sidebar;