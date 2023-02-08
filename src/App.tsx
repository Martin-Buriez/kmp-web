import React from 'react';
import './App.css';
import Home from './components/Home';
import Login from './components/Authentication/Login';
import Register from './components/Authentication/Register';
import { Route, Routes } from 'react-router-dom'
import Profile from './components/Authentication/Profile';
import PostList from './components/Posts/PostList';
import Search from './components/Search';
import User from './components/Account/User';
import CreateNewPost from './components/Posts/CreateNewPost';
import Post from './components/Posts/Post';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/account' element={<Profile/>} />
        <Route path='/post' element={<CreateNewPost/>} />
        <Route path='/posts/:id' element={<Post/>} />
        <Route path='/posts/add' element={<PostList/>} />
        <Route path='/search' element={<Search/>} />
        <Route path='/users/:id' element={<User/>} />
        <Route path='*' element={<h1>404: Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;