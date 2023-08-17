import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Blogs from './pages/Blogs';
import Login from './pages/Login';
import Register from './pages/Register';
import UserBlogs from './pages/UserBlogs';
import CreateBlog from './pages/CreateBlog';
import BlogUpdate from './pages/BlogUpdate';
import NotFound from './pages/NotFound';
import BlogDetails from './pages/BlogDetails';

const App = () => {
  return (
    <BrowserRouter>
      <Header></Header>
      <Toaster position='top-center' reverseOrder={false} />
      <Routes>
        <Route path='/' element={<Blogs />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/my-blogs' element={<UserBlogs />} />
        <Route path='/blog-update/:id' element={<BlogUpdate />} />
        <Route path='/blog-details/:id' element={<BlogDetails />} />
        <Route path='/create-blog' element={<CreateBlog />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
