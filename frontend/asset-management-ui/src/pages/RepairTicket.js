import { useEffect, useState } from "react";
import axios from "axios";
import "./RepairTickets.css";

function RepairTickets() {
  const [assets, setAssets] = useState([]);
  const [asset, setAsset] = useState("");
  const [issue, setIssue] = useState("");

  useEffect(() => {
    const loadAssets = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://127.0.0.1:8000/api/my-assets/",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setAssets(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    loadAssets();
  }, []);

  const submitTicket = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://127.0.0.1:8000/api/tickets/",
        {
          asset,
          issue,
          status: "Pending",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Repair Ticket Submitted Successfully");

      setAsset("");
      setIssue("");
    } catch (err) {
      alert("Failed to submit ticket");
    } 
  }; 

  return (
    <div className="repair-container">

      <div className="repair-header">
        <h2>Repair Ticket System</h2>
        <p>Report and track hardware issues</p>
      </div>

      <div className="ticket-card">

        <form onSubmit={submitTicket}>

          <label>Select Asset</label>

          <select
            value={asset}
            onChange={(e) => setAsset(e.target.value)}
            required
          >
            <option value="">
              Select Asset
            </option>

            {assets.map((item) => (
              <option
                key={item.id}
                value={item.id}
              >
                {item.name}
              </option>
            ))}
          </select>

          <label>Issue Description</label>

          <textarea
            rows="5"
            placeholder="Describe the issue..."
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            required
          />

          <button
            type="submit"
            className="submit-btn"
          >
            Submit Repair Ticket
          </button>

        </form>

      </div>

    </div>
  );
}

export default RepairTickets;