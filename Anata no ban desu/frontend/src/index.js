// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // 如果有樣式檔案，這裡引入
import App from './App'; // 引入主組件
import reportWebVitals from './reportWebVitals'; // 可選，用來測量性能

// 渲染 React 組件到 DOM
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // React 應該會將組件渲染到這個 DOM 元素中
);
