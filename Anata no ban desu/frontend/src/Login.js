import React, { useState } from "react";

const Login = ({ onLogin, onForgotPassword }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // 儲存錯誤信息

  const handleLogin = async () => {
    setError(""); // 清除錯誤信息

    const response = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      setError(data.message); // 顯示錯誤信息
    } else {
      onLogin(); // 登入成功，觸發 onLogin
    }
  };

  return (
    <div>
      <h2>登入</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="密碼"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>登入</button>
      <button onClick={onForgotPassword}>忘記密碼</button>
      {error && <p>{error}</p>} {/* 顯示錯誤信息 */}
    </div>
  );
};

export default Login;
