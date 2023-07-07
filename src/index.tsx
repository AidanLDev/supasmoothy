import React from 'react';
import ReactDOM, { Root } from 'react-dom/client';
import './index.css';
import App from './App';

const rootElement = document.getElementById('root');

let root: Root;

if (rootElement) {
  root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('root not found');
}
