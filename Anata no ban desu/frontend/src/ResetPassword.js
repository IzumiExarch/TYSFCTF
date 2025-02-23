import React, { useState } from "react";

const ResetPassword = ({ onShowFlag }) => {
  const [email, setEmail] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");

  const handleReset = async () => {
    setError("");

    const response = await fetch("http://localhost:3001/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, answer }),
    });

    const data = await response.json();
    if (!response.ok) {
      setError(data.message);
    } else {
      onShowFlag(data.flag);
    }
  };

  return (
    <div>
      <h2>重置密碼</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="text" placeholder="回答安全性問題" value={answer} onChange={(e) => setAnswer(e.target.value)} />
      <button onClick={handleReset}>提交</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default ResetPassword;
