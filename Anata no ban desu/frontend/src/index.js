import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // 假設有一個 App.js
import reportWebVitals from './reportWebVitals'; // 如果有這個功能

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
