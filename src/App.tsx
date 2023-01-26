import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Authentication/Login';
import Register from './components/Authentication/Register';

const App: React.FC = () => {
  return (
    <div className="App">
      <Register />
      <Navbar />
      <Home />
    </div>
  );
}

export default App;