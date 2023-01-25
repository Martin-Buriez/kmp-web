import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";

import './index.css';
import reportWebVitals from './reportWebVitals';
import React from 'react';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    <head>
      <link href="/dist/output.css" rel="stylesheet"></link>
    </head>
    <App />
  </BrowserRouter>
);

reportWebVitals();