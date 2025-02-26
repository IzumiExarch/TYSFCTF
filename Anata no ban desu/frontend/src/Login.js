import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://tyshctf-1.onrender.com/api';  // 確保這裡有 /api 前綴

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
      // 詳細錯誤處理
      if (err.response) {
        console.log('Error response:', err.response);
        setError('伺服器回應錯誤: ' + err.response.data.message);
      } else if (err.request) {
        console.log('Error request:', err.request);
        setError('無法建立連接，請檢查您的網絡連接');
      } else {
        console.log('Error message:', err.message);
        setError('伺服器未響應，請稍後再試');
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
