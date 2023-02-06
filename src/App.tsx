import React from 'react';
import './App.css';
import Home from './components/Home';
import Login from './components/Authentication/Login';
import Register from './components/Authentication/Register';
import { Route, Routes } from 'react-router-dom'
import Profile from './components/Authentication/Profile';
import Post from './components/Posts/Post';
import Search from './components/Search';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/account' element={<Profile/>} />
        <Route path='/posts' element={<Post/>} />
        <Route path='/search' element={<Search/>} />
      </Routes>
    </>
  );
}

export default App;