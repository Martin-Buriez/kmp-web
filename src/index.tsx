import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import Navbar from './components/Navbar';

ReactDOM.render(
  <BrowserRouter>
    <Navbar />
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

const head = document.querySelector("head");
const link = document.createElement("link");
link.rel = "stylesheet";
link.href = "/dist/output.css";
if (head)
  head.appendChild(link);
