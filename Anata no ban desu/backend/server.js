const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

// 啟用 CORS
app.use(cors({ origin: '*' }));

// 解析 JSON 請求
app.use(express.json());

// 假設用戶資料（包括安全問題和答案）
const users = {
  "admin@example.com": {
    "password": "admin123",
    "securityQuestion": "你的第一台車是什麼？",
    "securityAnswer": "toyota"
  }
};

// API 路由：登入
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!users[email]) {
    return res.status(400).json({ message: "用戶不存在" });
  }

  if (users[email].password !== password) {
    return res.status(400).json({ message: "密碼錯誤" });
  }

  return res.json({ message: "登入成功" });
});

// API 路由：重置密碼
app.post('/reset-password', (req, res) => {
  const { email, securityAnswer, newPassword } = req.body;

  if (!users[email]) {
    return res.status(400).json({ message: "用戶不存在" });
  }

  if (users[email].securityAnswer !== securityAnswer) {
    return res.status(400).json({ message: "安全問題回答錯誤" });
  }

  users[email].password = newPassword;
  return res.json({ message: "密碼已成功重置" });
});

// 靜態檔案服務
app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));

// 前端路由
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html'));
});

// 啟動伺服器
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
