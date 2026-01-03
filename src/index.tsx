import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

console.log("React start sequence initiated");
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);