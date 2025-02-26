// login.js 示例
import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://tyshctf-1.onrender.com/api'; // 確保這裡有 /api 前綴

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email: email,
        password: password,
      });
      console.log('登入成功:', response.data);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError('無法連接到伺服器');
      }
    }
  };

  return (
    <div>
      <h2>登入</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="電子郵件"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="密碼"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">登入</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Login;
