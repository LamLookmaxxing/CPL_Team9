import React, { useState } from "react";
import { Link } from "react-router-dom";


const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      user: {
        username: username,
        email: email,
        password: password,
      },
    };

    try {
      const response = await fetch("https://api.realworld.io/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.status === 201 && data.user && data.user.token) {
        localStorage.setItem("token", data.user.token);
        window.location.href = "/";
      } else if (response.status === 422) {
        setError(data.errors.body.join(", "));
      } else {
        setError("Username or email is existed");
      }
    } catch (err) {
      setError("Username or email is existed");
    }
  };
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const linkStyle = {
    color: 'green',
    textDecoration: isHovered ? 'underline' : 'none'
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 col-xs-12">
          {error && <div className="error-message">{error}</div>}
          <h1 className="text-center">Sign up</h1>
          <p className="text-center">
            <a
              href="/users/login"
              className='text-success'
              style={linkStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Have an account?
            </a>
          </p>

          <form onSubmit={handleSubmit}>

            <fieldset className="form-group mb-3">
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
            <fieldset className="form-group mb-3">

              <input
                type="input"
                className="form-control form-control-lg"
                id="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </fieldset>
            <fieldset className="form-group mb-3">
              <input
                type="password"
                className="form-control form-control-lg"
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </fieldset>
            <div className="text-end">
              <button className="btn btn-lg btn-success">Sign up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
