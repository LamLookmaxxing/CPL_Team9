import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Tạo instance của useNavigate

  const handleLogin = async (e) => {
    e.preventDefault(); // Ngăn chặn form submit theo cách truyền thống

    try {
      const response = await axios.post('https://api.realworld.io/api/users/login', {
        user: {
          email: email,
          password: password,
        },
      });

      console.log('Login success:', response.data);
      
      // Đảm bảo token tồn tại trước khi lưu vào localStorage
      if (response.data && response.data.user && response.data.user.token) {
        localStorage.setItem('token', response.data.user.token);
        navigate('/'); // Chuyển hướng đến trang chủ
      } else {
        // Xử lý trường hợp không nhận được token
        console.error('Token not found in response');
        setError('Login succeeded but token was not found. Please try again.');
      }
    } catch (error) {
      // Xử lý lỗi
      console.error('Login failed:', error.response ? error.response.data : error.message);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      {error && <p>{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
