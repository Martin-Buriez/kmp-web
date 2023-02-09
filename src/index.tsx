import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import Navbar from './components/Navbar';

ReactDOM.render(
  <>
  <head>
    <link href="/dist/output.css" rel="stylesheet"></link>
  </head>
  <BrowserRouter>
    <App />
  </BrowserRouter>
      <head>
      <link href="/dist/output.css" rel="stylesheet"></link>
    </head>
  </>,
  document.getElementById("root")
);
