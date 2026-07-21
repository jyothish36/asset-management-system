import { useEffect, useState } from "react";
import axios from "axios";
import "./MyAssets.css";

function MyAssets() {
  const [assets, setAssets] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchAssets = async () => {
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
        console.error(error);
      }
    };

    fetchAssets();
  }, []);

  const filteredAssets = assets.filter(
    (asset) =>
      asset.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      asset.type
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="myassets-container">

      <div className="myassets-banner">
        <h2>My Assets 💻</h2>
        <p>
          View all assets assigned to you.
        </p>
      </div>

      <div className="myassets-top">
        <div className="asset-count-card">
          <p>Total Assigned Assets</p>
          <h3>{assets.length}</h3>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search assets..."
        className="search-box"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <div className="assets-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Serial Number</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {filteredAssets.map((asset) => (
              <tr key={asset.id}>

                <td>{asset.name}</td>

                <td>{asset.type}</td>

                <td>
                  {asset.serial_number}
                </td>

                <td>

                  <span
                    className={`status-badge ${
                      asset.status ===
                      "Available"
                        ? "available"
                        : asset.status ===
                          "Assigned"
                        ? "assigned"
                        : "repair"
                    }`}
                  >
                    {asset.status}
                  </span>

                </td>

              </tr>
            ))}

          </tbody>
        </table>
      </div>

    </div>
  );
}

export default MyAssets;