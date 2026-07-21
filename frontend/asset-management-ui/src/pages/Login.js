import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaUser,
  FaLock,
  FaLaptopCode,
  FaBoxes,
  FaClipboardList,
  FaUsers
} from "react-icons/fa";

import "./Login.css";

function Login({ setIsAuth }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://jyothish.pythonanywhere.com/api/token/",
        {
          username: form.username,
          password: form.password
        }
      );

      localStorage.setItem("token", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      const profile = await axios.get(
        "https://jyothish.pythonanywhere.com/api/profile/",
        {
          headers: {
            Authorization: `Bearer ${res.data.access}`
          }
        }
      );

      localStorage.setItem(
        "user",
        JSON.stringify(profile.data)
      );

      localStorage.setItem(
        "role",
        profile.data.role
      );

      setIsAuth(true);

      if (profile.data.role === "admin") {
        navigate("/dashboard", {
          replace: true
        });
      } else {
        navigate("/employee-dashboard", {
          replace: true
        });
      }

    } catch (err) {
      console.error(err);
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="floating-circle circle-1"></div>
      <div className="floating-circle circle-2"></div>

      <div className="login-container">

        <div className="left-panel">

          <div className="brand">
            <FaLaptopCode size={45} />
            <h1>Asset Management System</h1>
          </div>

          <h2>
            Manage Assets.
            <br />
            Streamline Operations.
          </h2>

          <p>
            A complete solution to track,
            manage and optimize assets,
            inventory and employee assignments.
          </p>

          <div className="feature">
            <FaBoxes />
            <div>
              <h4>Track Assets</h4>
              <p>
                Real-time asset tracking
                and monitoring
              </p>
            </div>
          </div>

          <div className="feature">
            <FaClipboardList />
            <div>
              <h4>Manage Inventory</h4>
              <p>
                Efficient inventory
                management and alerts
              </p>
            </div>
          </div>

          <div className="feature">
            <FaUsers />
            <div>
              <h4>Assign & Monitor</h4>
              <p>
                Assign assets to employees
                seamlessly
              </p>
            </div>
          </div>

        </div>

        <div className="right-panel">

          <div className="login-card">

            <FaLaptopCode
              size={60}
              className="login-icon"
            />

            <h2>Welcome Back!</h2>

            <p>
              Sign in to continue
            </p>

            <form onSubmit={handleLogin}>

              <div className="input-group">
                <FaUser />
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={form.username}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <FaLock />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                />
              </div>

              {error && (
                <div className="error">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="login-btn"
              >
                {loading
                  ? "Logging in..."
                  : "Login"}
              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;