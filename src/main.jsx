import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { initializeData } from './services/initializeData.js';
import './index.css';

initializeData(); // <--- IMPORTANT

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
