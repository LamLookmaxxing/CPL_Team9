import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./setting.css";

const Settings = () => {
  const [image, setImage] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      fetchUserData(storedToken);
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await axios.get("https://api.realworld.io/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userData = response.data.user;
      setImage(userData.image);
      setUsername(userData.username);
      setEmail(userData.email);
      setBio(userData.bio);
    } catch (error) {
      console.error("Fetching user data failed:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      user: {
        image,
        username,
        email,
        bio,
        password,
      },
    };

    try {
      const response = await axios.put(
        "https://api.realworld.io/api/user",
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedUser = response.data.user;
      console.log("User settings updated:", updatedUser);
      alert("Update successfully");
      navigate("/");
    } catch (error) {
      console.error("Update settings failed:", error);
      alert("Error occurs when updated");
    }
  };

  return (
    <div className="container-all-settings">
      <div className="container-settings">
        <div>
          <h1>Your Settings</h1>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <fieldset className="form-group">
              <input
                type="text"
                className="form-control form-control-lg"
                id="image"
                name="image"
                placeholder="Image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
              />
            </fieldset>
            <fieldset className="form-group">
              <input
                type="text"
                className="form-control form-control-lg"
                id="username"
                name="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </fieldset>
            <fieldset className="form-group">
              <input
                type="email"
                className="form-control form-control-lg"
                id="email"
                name="email"
                placeholder="Email"
                value={email}
                disabled
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </fieldset>
            <fieldset className="form-group">
              <input
                type="text"
                className="form-control form-control-lg"
                id="bio"
                name="bio"
                placeholder="Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                required
              />
            </fieldset>
            <button type="submit" className="btn">
              Update Settings
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
