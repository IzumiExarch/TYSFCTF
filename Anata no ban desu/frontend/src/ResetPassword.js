import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://tyshctf-1.onrender.com';

function ResetPassword({ onShowFlag }) {
  const [email, setEmail] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');

  const handleResetPassword = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${API_BASE_URL}/reset-password`, {
        email,
        securityAnswer,
        newPassword,
      });

      console.log('密碼重置成功:', response.data);
      setError('');
      if (response.data.flag) {
        onShowFlag(response.data.flag);
      }
    } catch (err) {
      setError(err.response?.data?.message || '伺服器無回應，請稍後再試');
      console.error('請求錯誤:', err);
    }
  };

  return (
    <div>
      <h2>重置密碼</h2>
      <form onSubmit={handleResetPassword}>
        <input
          type="email"
          placeholder="電子郵件"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="安全問題的答案"
          value={securityAnswer}
          onChange={(e) => setSecurityAnswer(e.target.value)}
        />
        <input
          type="password"
          placeholder="新密碼"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button type="submit">重置密碼</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default ResetPassword;
