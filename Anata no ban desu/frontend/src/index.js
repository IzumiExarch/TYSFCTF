import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // 可選的樣式表
import App from "./App"; // 引入主應用組件

// React 18 引入的根 API
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App /> {/* 將 App 組件渲染到 HTML */}
  </React.StrictMode>
);
