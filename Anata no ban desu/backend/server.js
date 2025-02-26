const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

// 啟用 CORS
app.use(cors({origin:'*'}));

app.use(express.json());  // 使 Express 解析 JSON 請求

// 假設用戶資料（包括安全問題和答案）
const users = {
  "admin@example.com": {
    "password": "admin123",
    "securityQuestion": "你的第一台車是什麼？",
    "securityAnswer": "toyota"
  }
};

// 登入路由
app.post('/api/login', (req, res) => {
  console.log('Login route triggered');
  
  const { email, password } = req.body;

  // 檢查用戶是否存在
  if (!users[email]) {
    console.log('User not found');
    return res.status(400).json({ message: "用戶不存在" });
  }

  // 無論密碼為何，始終返回密碼錯誤
  console.log('Password incorrect');
  return res.status(400).json({ message: "密碼錯誤" });
});

// 重置密碼路由
app.post('/api/reset-password', (req, res) => {
  console.log('Reset password route triggered');
  
  const { email, securityAnswer, newPassword } = req.body;

  // 檢查用戶是否存在
  if (!users[email]) {
    console.log('User not found');
    return res.status(400).json({ message: "用戶不存在" });
  }

  // 檢查安全問題答案是否正確
  if (users[email].securityAnswer !== securityAnswer) {
    console.log('Security answer incorrect');
    return res.status(400).json({ message: "安全問題回答錯誤" });
  }

  // 更新密碼
  users[email].password = newPassword;
  console.log('Password successfully updated');
  return res.json({ message: "密碼已成功重置" });
});

// 設定靜態檔案目錄為 frontend/build
app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));

// 處理所有其他路由，返回前端應用的 index.html
app.get('*', (req, res) => {
  console.log('Serving frontend application');
  res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html'));
});

// 啟動伺服器
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
