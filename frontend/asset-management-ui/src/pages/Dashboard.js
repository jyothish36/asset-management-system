import "./Dashboard.css";
import { useEffect, useState } from "react";
import axios from "axios";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

function Dashboard() {
  const [username, setUsername] = useState("");
  const [stats, setStats] = useState({
    totalAssets: 0,
    availableAssets: 0, 
    assignedAssets: 0,
    totalInventory: 0,
    openTickets: 0,
    lowStockItems: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const profileRes = await axios.get(
          "https://jyothish.pythonanywhere.com/api/profile/",
          {
            headers: {
              Authorization: `Bearer ${token}`
          }
          }
        );
        setUsername(profileRes.data.username);

        const assetRes = await axios.get(
          "https://jyothish.pythonanywhere.com/api/assets/",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const inventoryRes = await axios.get(
          "https://jyothish.pythonanywhere.com/api/inventory/",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const dashboardRes = await axios.get(
          "https://jyothish.pythonanywhere.com/api/dashboard-stats/",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const assets = assetRes.data;
        const inventory = inventoryRes.data;

        const available = assets.filter(
          (item) => item.status === "Available"
        ).length;

        const assigned = assets.length - available;

        setStats({
          totalAssets: assets.length,
          availableAssets: available,
          assignedAssets: assigned,
          totalInventory: inventory.length,
          openTickets: dashboardRes.data.open_tickets,
          lowStockItems: dashboardRes.data.low_stock_items
        });
      } catch (error) {
        console.log("Dashboard load failed", error);
      }
    };

    fetchData();
  }, []);

              const pieData = {
  labels: ["Available Assets", "Assigned Assets"],
  datasets: [
    {
      data: [
        stats.availableAssets,
        stats.assignedAssets
      ],
      backgroundColor: [
        "#0679de",
        "#0f2135"
      ], 
      borderColor: [ 
        "#17bdc6",
        "#1743a3"
      ], 
      borderWidth: 3,
      hoverOffset: 15
    }
  ]
};

const pieOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        padding: 20,
        font: {
          size: 14
        }
      }
    }
  }
};

const barData = {
  labels: [
    "Assets",
    "Inventory",
    "Tickets",
    "Low Stock"
  ],
  datasets: [
    {
      label: "System Overview",
      data: [
        stats.totalAssets,
        stats.totalInventory,
        stats.openTickets,
        stats.lowStockItems
      ],
      backgroundColor: [
        "#2563eb",
        "#06b6d4",
        "#ef4444",
        "#7c3aed"
      ],
      borderRadius: 10
    }
  ]
};

const barOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    }
  }
};
 

  return (
  <div className="dashboard-container">

    <div className="welcome-banner">
      <div>
        <h2>Welcome, {username} 👋</h2>
        <p>
          Manage assets, inventory and repair tickets from one place.
        </p>
      </div>
    </div>

    <div className="stats-grid">

      <div className="stat-card assets">
        <h4>Total Assets</h4>
        <h2>{stats.totalAssets}</h2>
      </div>

      <div className="stat-card available">
        <h4>Available Assets</h4>
        <h2>{stats.availableAssets}</h2>
      </div>

      <div className="stat-card assigned">
        <h4>Assigned Assets</h4>
        <h2>{stats.assignedAssets}</h2>
      </div>

      <div className="stat-card inventory">
        <h4>Inventory Items</h4>
        <h2>{stats.totalInventory}</h2>
      </div>

      <div className="stat-card tickets"> 
        <h4>Open Tickets</h4>
        <h2>{stats.openTickets}</h2>
      </div>

      <div className="stat-card lowstock">
        <h4>Low Stock Items</h4>
        <h2>{stats.lowStockItems}</h2>
      </div>

    </div>

    <div className="dashboard-grid">

  <div className="chart-card">
    <h3>Asset Status Overview</h3>

    <div className="chart-wrapper">
      <Pie
        data={pieData}
        options={pieOptions}
      />
    </div>
  </div>

  <div className="activity-card">
    {/* Your Recent Activity code */}
  </div>

  <div className="chart-card">
    <h3>System Analytics</h3>

    <Bar
      data={barData}
      options={barOptions}
    />
  </div>

  <div className="quick-actions">
    <h3>Quick Actions</h3>

    <button>Add Asset</button>
    <button>Add Inventory</button>
    <button>Create Ticket</button>
  </div>

</div>



      <div className="activity-card">

  <div className="activity-header">
    <h3>Recent Activity</h3>
    <span className="live-badge">LIVE</span>
  </div>

  <div className="activity-item">
    <div className="activity-icon success">✓</div>
    <div>
      <h4>Asset Assigned</h4>
      <p>Laptop assigned to employee</p>
    </div>
  </div>

  <div className="activity-item">
    <div className="activity-icon inventory">📦</div>
    <div>
      <h4>Inventory Updated</h4>
      <p>Stock quantity changed</p>
    </div>
  </div>

  <div className="activity-item">
    <div className="activity-icon repair">🔧</div>
    <div>
      <h4>Repair Ticket</h4>
      <p>New repair request created</p>
    </div>
  </div>

  <div className="activity-item">
    <div className="activity-icon user">👤</div>
    <div>
      <h4>Employee Activity</h4>
      <p>Assignment records updated</p>
    </div>
  </div>

</div>


    </div>

);
}
 
export default Dashboard; 