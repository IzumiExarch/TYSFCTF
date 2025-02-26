import React, { useState } from 'react';
import axios from 'axios';
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://tyshctf-1.onrender.com';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://tyshctf-1.onrender.com/login', {
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
      console.error('請求錯誤:', err);
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
