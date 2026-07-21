import "./EmployeeDashboard.css";
import { useEffect, useState } from "react";
import axios from "axios";

function EmployeeDashboard() {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    const loadAssets = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "https://jyothish.pythonanywhere.com/api/my-assets/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setAssets(res.data);
      } catch (error) {
        console.error(
          "Error loading assets:",
          error.response?.data || error.message
        );
      }
    };

    loadAssets();
  }, []);

  return (
    <div className="employee-container">
      <div className="employee-banner">
        <h2>Welcome Employee 👋</h2>
        <p>
          Manage your assigned assets and track repair requests.
        </p>
      </div>

      <div className="employee-stats">
        <div className="employee-card">
          <h3>💻 My Assets</h3>
          <h2>{assets.length}</h2>
        </div>

        <div className="employee-card">
          <h3>🛠 Repair Tickets</h3>
          <h2>1</h2>
        </div>

        <div className="employee-card">
          <h3>👤 Profile Status</h3>
          <h2>Active</h2>
        </div>
      </div>

      <div className="employee-grid">
        <div className="assets-section">
          <h3>Assigned Assets</h3>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                <th align="left">Asset Name</th>
                <th align="left">Type</th>
                <th align="left">Serial Number</th>
                <th align="left">Status</th>
              </tr>
            </thead>

            <tbody>
              {assets.length > 0 ? (
                assets.map((asset) => (
                  <tr key={asset.id}>
                    <td>{asset.name}</td>
                    <td>{asset.type}</td>
                    <td>{asset.serial_number}</td>
                    <td>{asset.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No assets assigned</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="activity-section">
          <h3>Recent Activity</h3>

          <div className="activity-item">
            📦 Assets Loaded Successfully
          </div>

          <div className="activity-item">
            🔐 Logged In
          </div>

          <div className="activity-item">
            👤 Employee Dashboard Active
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;