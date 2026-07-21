import { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";

function Profile() {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "https://jyothish.pythonanywhere.com/api/profile/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProfile(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="profile-container">

      <div className="profile-banner">
        <h2>My Profile 👤</h2>
        <p>
          View your account information
          and employee details.
        </p>
      </div>

      <div className="profile-top">

        <div className="profile-stat-card">
          <h4>Username</h4>
          <h2>{profile.username}</h2>
        </div>

        <div className="profile-stat-card">
          <h4>Role</h4>
          <h2>{profile.role}</h2>
        </div>

        <div className="profile-stat-card">
          <h4>Email</h4>
          <h2 style={{fontSize:"18px"}}>
            {profile.email}
          </h2>
        </div>

      </div>

      <div className="profile-card">

        <div className="profile-avatar">
          {profile.username
            ? profile.username
                .charAt(0)
                .toUpperCase()
            : "U"}
        </div>

        <div className="profile-item">
          <strong>Username:</strong>{" "}
          {profile.username}
        </div>

        <div className="profile-item">
          <strong>Email:</strong>{" "}
          {profile.email}
        </div>

        <div className="profile-item">
          <strong>Role:</strong>{" "}
          {profile.role}
        </div>

      </div>

    </div>
  );
}

export default Profile;