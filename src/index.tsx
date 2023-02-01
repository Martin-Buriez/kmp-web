import ReactDOM from 'react-dom';
import React from "react"
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';

ReactDOM.render(
  <>
  <head>
    <link href="/dist/output.css" rel="stylesheet"></link>
  </head>
  <BrowserRouter>
    <App />
  </BrowserRouter>,
      <head>
      <link href="/dist/output.css" rel="stylesheet"></link>
    </head>
  </>,
  document.getElementById("root")
);
