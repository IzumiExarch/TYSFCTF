const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

// 啟用 CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());// 解析 JSON 請求

app.use((req, res, next) => {
  console.log(`收到請求: ${req.method} ${req.url}`);
  next();
});
// 模擬用戶資料
const users = {
  "admin@example.com": {
    "password": "admin123",
    "securityQuestion": "你的第一台車是什麼？",
    "securityAnswer": "toyota"
  }
};

// 登入 API
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

// 重置密碼 API
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

// 設定靜態目錄
app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html'));
});

// 啟動伺服器
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
