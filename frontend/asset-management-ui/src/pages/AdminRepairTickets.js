import { useEffect, useState } from "react";
import axios from "axios";
import "./AdminRepairTickets.css";

function AdminRepairTickets() {
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");

  const loadTickets = async () => {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      "http://127.0.0.1:8000/api/tickets/",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setTickets(res.data);
  };

  useEffect(() => {
    loadTickets();
  }, []);

  const updateStatus = async (id, status) => {
    const token = localStorage.getItem("token");

    const ticket = tickets.find(
      (t) => t.id === id
    );

    await axios.put(
      `http://127.0.0.1:8000/api/tickets/${id}/`,
      {
        ...ticket,
        status
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    loadTickets();
  };

  const filteredTickets =
    tickets.filter((ticket) =>
      ticket.issue
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  const completedCount =
    tickets.filter(
      (t) => t.status === "Completed"
    ).length;

  const progressCount =
    tickets.filter(
      (t) => t.status === "In Progress"
    ).length;

  return (
    <div className="admin-ticket-container">

      <div className="admin-ticket-header">
        <h2>Repair Ticket Management</h2>
        <p>
          Manage and track all repair
          requests
        </p>
      </div>

      <div className="ticket-stats">

        <div className="stat-box">
          <p>Total Tickets</p>
          <h3>{tickets.length}</h3>
        </div>

        <div className="stat-box">
          <p>In Progress</p>
          <h3>{progressCount}</h3>
        </div>

        <div className="stat-box">
          <p>Completed</p>
          <h3>{completedCount}</h3>
        </div>

      </div>

      <input
        type="text"
        className="search-box"
        placeholder="Search ticket..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <div className="ticket-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Asset</th>
              <th>Issue</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {filteredTickets.map(
              (ticket) => (
                <tr key={ticket.id}>

                  <td>{ticket.id}</td>

                  <td>{ticket.asset}</td>

                  <td>{ticket.issue}</td>

                  <td>
                    <span
                      className={`status-badge ${
                        ticket.status ===
                        "Completed"
                          ? "completed"
                          : ticket.status ===
                            "In Progress"
                          ? "progress"
                          : "pending"
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </td>

                  <td>

                    <button
                      className="progress-btn"
                      onClick={() =>
                        updateStatus(
                          ticket.id,
                          "In Progress"
                        )
                      }
                    >
                      In Progress
                    </button>

                    <button
                      className="complete-btn"
                      onClick={() =>
                        updateStatus(
                          ticket.id,
                          "Completed"
                        )
                      }
                    >
                      Completed
                    </button>

                  </td>

                </tr>
              )
            )}

          </tbody>
        </table>
      </div>

    </div>
  );
}

export default AdminRepairTickets;