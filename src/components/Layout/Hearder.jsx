import React from 'react';
import { Link } from 'react-router-dom';
function Header() {
  const brandStyle = {
    color: 'green',
    fontWeight: 'bold',
    fontSize: '25px'
  };
  return (
    <div className="container">
      <div className='row'>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className='col-10'>
            <Link className="navbar-brand" to="/" style={brandStyle}>conduit</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>

          <div className='col-2'>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <Link className="nav-link" to="/">Home </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Sign in</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link " to="/register">Sign up</Link>
                </li>
              </ul>

            </div>
          </div>


        </nav>
      </div>
    </div>

  );
}

export default Header;
