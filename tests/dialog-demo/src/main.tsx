import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from './store';

// 為了 Cypress 測試，將 store 掛載到 window 對象
declare global {
  interface Window {
    store: typeof store;
  }
}
window.store = store;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
