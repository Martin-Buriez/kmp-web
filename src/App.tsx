import React from 'react';
import './App.css';
import Home from './components/Home';
import Login from './components/Authentication/Login';
import Register from './components/Authentication/Register';
import { Route, Routes } from 'react-router-dom'
import Profile from './components/Authentication/Profile';
import Post from './components/Posts/Post';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/account' element={<Profile/>} />
        <Route path='/posts' element={<Post/>} />
      </Routes>
    </>
  );
}

export default App;