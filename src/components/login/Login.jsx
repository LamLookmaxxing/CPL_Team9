import React, { useState } from "react";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMesage] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      user: {
        email: email,
        password: password,
      },
    };

    try {
      const response = await fetch("https://api.realworld.io/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.status === 200 && data.user && data.user.token) {
        localStorage.setItem("token", data.user.token);

        window.location.href = "/";
      } else if (response.status === 401) {
        setErrorMesage("Invalid email or password");
      } else {
        setErrorMesage("Username or password incorrect");
      }
    } catch (err) {
      setErrorMesage("Username or password incorrect");
    }
  };
  const linkStyle = {
    color: 'green',
    textDecoration: isHovered ? 'underline' : 'none'
  };
  return (

    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 col-xs-12">
          <h1 className="text-center">Sign in</h1>
          <p className="text-center ">
            <a
              href="/users/register"
              className="text-success"
              style={linkStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Need an account?
            </a>
          </p>

          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <input
                type="input"
                className="form-control"
                id="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="text-end mb-3">
                <button className="btn btn-lg btn-success">Sign in</button>
              </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
