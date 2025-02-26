import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://tyshctf-1.onrender.com/api';  // 確保這裡有 /api 前綴

function ResetPassword({ onShowFlag }) {
  const [email, setEmail] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');

  const handleResetPassword = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${API_BASE_URL}/reset-password`, {
        email: email,
        securityAnswer: securityAnswer,
        newPassword: newPassword,
      });

      // 如果密碼重置成功，則可以傳遞相應的消息
      onShowFlag(response.data.message);
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
