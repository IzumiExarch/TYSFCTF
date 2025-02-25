const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
app.use(cors());
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
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // 檢查用戶是否存在
    if (!users[email]) {
        return res.status(400).json({ message: "用戶不存在" });
    }

    // 無論密碼為何，始終返回密碼錯誤
    return res.status(400).json({ message: "密碼錯誤" });
});

// 重置密碼路由
app.post('/reset-password', (req, res) => {
    const { email, securityAnswer, newPassword } = req.body;

    // 檢查用戶是否存在
    if (!users[email]) {
        return res.status(400).json({ message: "用戶不存在" });
    }

    // 檢查安全問題答案是否正確
    if (users[email].securityAnswer !== securityAnswer) {
        return res.status(400).json({ message: "安全問題回答錯誤" });
    }

    // 更新密碼
    users[email].password = newPassword;
    return res.json({ message: "密碼已成功重置" });
});

// 啟動伺服器
app.listen(PORT,'0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
  });
