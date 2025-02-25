import React, { useState } from "react";

const ResetPassword = ({ onShowFlag }) => {
  const [email, setEmail] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(""); // 儲存錯誤信息

  const handleReset = async () => {
    setError(""); // 清除錯誤信息

    const response = await fetch("http://tyshctf-1.onrender.com/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, answer }),
    });

    const data = await response.json();
    if (!response.ok) {
      setError(data.message); // 顯示錯誤信息
    } else {
      onShowFlag(data.flag); // 顯示 FLAG
    }
  };

  return (
    <div>
      <h2>重置密碼</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="回答安全性問題"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <button onClick={handleReset}>提交</button>
      {error && <p>{error}</p>} {/* 顯示錯誤信息 */}
    </div>
  );
};

export default ResetPassword;
