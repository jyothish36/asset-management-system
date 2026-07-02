import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    navigate("/login");
    window.location.reload();
  };

  return (
    <div
      style={{
        background: "#ffffff",
        padding: "15px 25px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
      }}
    >
      <h2
        style={{
          margin: 0,
          fontSize: "22px",
          color: "#111827"
        }}
      >
        Asset Management
      </h2>

      <button
        onClick={handleLogout}
        style={{
          padding: "10px 16px",
          background: "#dc2626",
          color: "#ffffff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold"
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;