import { useEffect, useState } from "react";
import axios from "axios";
import "./Inventory.css";

function Inventory() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "https://jyothish.pythonanywhere.com/api/inventory/",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setItems(res.data);
      } catch (err) {
        setError("Failed to load inventory");
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  const filteredItems = items.filter(
    (item) =>
      item.item_type
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="inventory-container">

      <div className="inventory-header">
        <h2>Inventory Management</h2>
        <p>Monitor and manage inventory stock levels</p>
      </div>

      <div className="inventory-stats">
        <div className="inventory-card">
          <p>Total Items</p>
          <h3>{items.length}</h3>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search inventory..."
        className="search-box"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && <p>Loading inventory...</p>}

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      {!loading && !error && (
        <div className="inventory-table">
          <table>
            <thead>
              <tr>
                <th>Item Type</th>
                <th>Quantity</th>
                <th>Threshold</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.item_type}</td>
                  <td>{item.quantity}</td>
                  <td>{item.threshold}</td>

                  <td>
                    <span
                      className={`stock-status ${
                        item.quantity <= item.threshold
                          ? "low-stock"
                          : "in-stock"
                      }`}
                    >
                      {item.quantity <= item.threshold
                        ? "Low Stock"
                        : "In Stock"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredItems.length === 0 && (
            <p style={{ marginTop: "15px" }}>
              No inventory items found.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default Inventory;