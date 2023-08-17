import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BlogCard from '../components/BlogCard';

const UserBlogs = () => {
  // react state
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const id = localStorage.getItem('userId');
        const { data } = await axios.get(`http://localhost:8000/api/v1/blog/user-blog/${id}`);
        if (data.success) {
          setBlogs(data?.data?.blogs);
        }
      } catch (error) {
        console.error(error.message);
      }
    })();
  }, []);

  return (
    <>
      <div className='alert alert-primary text-center' role='alert'>
        <h5>Profile: {localStorage.getItem('userEmail')}</h5>
      </div>
      {blogs && blogs.length > 0 ? (
        <div className='containerCard'>
          {blogs.map((blog) => (
            <BlogCard blog={blog} isUser={true} />
          ))}
        </div>
      ) : (
        <h2 className='text-center text-success mt-4'>You have created a New Blog</h2>
      )}
    </>
  );
};

export default UserBlogs;
