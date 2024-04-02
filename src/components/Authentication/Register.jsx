import React from 'react';
import { useState } from 'react';
function Register() {
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
            <h1 className="text-center">Sign up</h1>
            <p className="text-center">
            <a
                href="/login"
                className='text-success'
                style={linkStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                Have an account?
              </a>
             
            </p>
            <form>
              <fieldset className="form-group mb-3">
                <input className="form-control form-control-lg" type="text" placeholder="Username" />
              </fieldset>
              <fieldset className="form-group mb-3">
                <input className="form-control form-control-lg" type="text" placeholder="Email" />
              </fieldset>
              <fieldset className="form-group mb-3">
                <input className="form-control form-control-lg" type="password" placeholder="Password" />
              </fieldset>

              <div className="text-end">
                <button className="btn btn-lg btn-success">Sign up</button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;