import { useEffect, useState } from "react";
import axios from "axios";
import "./Assets.css";

function Assets() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://127.0.0.1:8000/api/assets/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setAssets(res.data);
      } catch (err) {
        setError("Failed to load assets");
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, []);

  const filteredAssets = assets.filter(
    (asset) =>
      asset.name.toLowerCase().includes(search.toLowerCase()) ||
      asset.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="assets-container">

      <div className="assets-header">
        <h2>Assets Management</h2>
        <p>Manage and monitor all company assets</p>
      </div>

      <div className="assets-stats">
        <div className="assets-card">
          <p>Total Assets</p>
          <h3>{assets.length}</h3>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search assets by name or type..."
        className="search-box"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && <p>Loading assets...</p>}

      {error && (
        <p style={{ color: "red", marginBottom: "15px" }}>
          {error}
        </p>
      )}

      {!loading && !error && (
        <div className="assets-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredAssets.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.type}</td>

                  <td>
                    <span
                      className={`status ${
                        item.status === "Available"
                          ? "available-status"
                          : item.status === "Assigned"
                          ? "assigned-status"
                          : "repair-status"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredAssets.length === 0 && (
            <p style={{ marginTop: "15px" }}>
              No assets found.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default Assets;