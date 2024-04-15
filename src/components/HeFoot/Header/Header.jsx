import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import style from "./Header.module.css";
import { useAuth } from "../../application/Authen";

const Header = () => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const { isLoggedIn, handleLogout } = useAuth();

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

      setUser(response.data.user);
    } catch (error) {
      console.error("Fetching user data failed:", error);
    }
  };
  const brandStyle = {
    color: 'green',
    fontWeight: 'bold',
    fontSize: '25px'
  };
  return (
    <div className="container w-75">
      <div className='row'>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">

        <div className='col-8'>
            <Link className="navbar-brand" to="/" style={brandStyle}>conduit</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
              data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
              aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/" exact>
                  Home
                </NavLink>
              </li>
              {isLoggedIn ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/settings">
                      Settings
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/CreateArticles">
                      New Article
                    </NavLink>
                  </li>
                  {user && (
                    <li className="nav-item">
                      <NavLink
                        to={`/profile/${user.username}`}
                        className="nav-link"
                      >
                        <img
                          src={user.image}
                          className={style.imageUser}
                          alt={user.username}
                        />
                        <span className={style.nameUser}>{user.username}</span>
                      </NavLink>
                    </li>
                  )}
              
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/users/login">
                      Sign In
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/users/register">
                      Sign Up
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>

        </nav>
      </div>
    </div>

  );
};

export default Header;
