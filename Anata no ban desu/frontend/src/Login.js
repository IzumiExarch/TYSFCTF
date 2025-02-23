import React, { useState } from "react";

const Login = ({ onLogin, onForgotPassword }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    const response = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      setError(data.message);
    } else {
      onLogin();
    }
  };

  return (
    <div>
      <h2>登入</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="密碼" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>登入</button>
      <button onClick={onForgotPassword}>忘記密碼</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
