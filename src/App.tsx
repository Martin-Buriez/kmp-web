import React from 'react';
import './App.css';
import Home from './components/Home';
import Login from './components/Authentication/Login';
import Register from './components/Authentication/Register';
import { Route, Routes } from 'react-router-dom'
import Profile from './components/Account/Profile';
import PostList from './components/Posts/PostList';
import Search from './components/Account/Search';
import User from './components/Account/User';
import CreateNewPost from './components/Posts/CreateNewPost';
import Post from './components/Posts/Post';
import Catalogue from './components/Catalogue/Catalogue';
import CreateNewCatalogue from './components/Catalogue/CreateNewCatalogue';
import CatalogueList from './components/Catalogue/CatalogueList';
import Comment from "./components/Comments/Comment";
import TestActivityRequests from './components/TestActivityRequests';
import PostListByRelation from './components/Posts/PostListByRelation';



const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/account' element={<Profile/>} />
        <Route path='/post/add' element={<CreateNewPost/>} />
        <Route path='/post/:id' element={<Post/>} />
        <Route path='/post' element={<PostList/>} />
        <Route path='/posts' element={<PostListByRelation/>} />
        <Route path='/search' element={<Search/>} />
        <Route path='/users/:id' element={<User/>} />
        <Route path='/post/:id/comment/:id' element={<Comment/>}></Route> 
        <Route path='/catalogue/add' element={<CreateNewCatalogue/>} />
        <Route path='/catalogue/:id' element={<Catalogue/>} />
        <Route path='/catalogue' element={<CatalogueList/>} />
        <Route path='*' element={<h1>404: Not Found</h1>} />
        <Route path='/activity' element={<TestActivityRequests/>} />
      </Routes>
    </>
  );
}

export default App;