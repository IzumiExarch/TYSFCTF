import React, { useState } from 'react';
import axios from 'axios';

function ResetPassword({ onShowFlag }) {
  const [email, setEmail] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');

  const handleResetPassword = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/reset-password', {
        email: email,
        securityAnswer: securityAnswer,
        newPassword: newPassword,
      });

      onShowFlag(response.data.flag);
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
