import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Authentication/Login';

const App: React.FC = () => {
  return (
    <div className="App">
      <Login />
      <Navbar />
      <Home />
    </div>
  );
}

export default App;