import React from 'react';
import './App.css';
import Navbar from './components/navbar';
import Post from './components/post';

const App: React.FC = () => {
  return (
    <div className="App">
      <Navbar />
      <Post />
    </div>
  );
}

export default App;