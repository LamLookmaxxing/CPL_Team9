import React from 'react';
import { Link } from 'react-router-dom';

function Headers() {
  const authToken = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    // Điều hướng người dùng về trang chủ hoặc trang đăng nhập sau khi đăng xuất
    window.location.href = '/';
  };

  return (
    <header>
      <nav>
        <ul style={{ listStyleType: 'none', display: 'flex', justifyContent: 'space-around' }}>
          <li><Link to="/">Home</Link></li>
          {authToken ? (
            // Nếu người dùng đã đăng nhập
            <>
              <li><Link to="/editor">New Article</Link></li>
              <li><Link to="/settings">Settings</Link></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </>
          ) : (
            // Nếu người dùng chưa đăng nhập
            <>
              <li><Link to="/login">Sign in</Link></li>
              <li><Link to="/register">Sign up</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Headers;
