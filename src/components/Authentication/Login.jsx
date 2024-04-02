import React from 'react';
import { useState } from 'react';
function Login() {
  const [isHovered, setIsHovered] = useState(false);

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
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-center">Sign in</h1>
            <p className="text-center ">
              <a
                href="/register"
                className='text-success'
                style={linkStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                Need an account?
              </a>
            </p>
            <form>
              <div className="form-group mb-3">
                <input className="form-control form-control-lg" type="text" placeholder="Email" />
              </div>

              <div className="form-group mb-3">
                <input className="form-control form-control-lg" type="password" placeholder="Password" />
              </div>

              <div className="text-end mb-3">
                <button className="btn btn-lg btn-success">Sign in</button>
              </div>
            </form>


          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;