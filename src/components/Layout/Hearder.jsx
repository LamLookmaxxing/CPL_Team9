import React from 'react';

function Header() {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="/">conduit</a>
        <ul className="nav navbar-nav ms-auto"> {/* Thay đổi ở đây là ms-auto để đẩy nội dung sang phải, tương tự như pull-xs-right trong Bootstrap cũ */}
          <li className="nav-item">
            <a className="nav-link active" href="/">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/login">Sign in</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/register">Sign up</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
