import axios from 'axios';
import { useEffect, useState } from 'react';
import BlogCard from '../components/BlogCard';
import { Link } from 'react-router-dom';

const Blogs = () => {
  // react state
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setLoading] = useState(false);

  // get blogs
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('http://localhost:8000/api/v1/blog/all-blog');
        if (data?.success) {
          setLoading(false);
          setBlogs(data?.data);
        }
      } catch (error) {
        console.error(error.message);
      }
    })();
  }, []);
  return (
    <>
      {isLoading && (
        <div className='d-flex justify-content-center'>
          <div className='spinner-border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        </div>
      )}
      {blogs.length > 0 ? (
        <div className='containerCard'>
          {blogs.map((blog) => (
            <BlogCard blog={blog} isUser={localStorage.getItem('userId') === blog?.user?._id} />
          ))}
        </div>
      ) : (
        <h2 className='text-center text-success mt-4'>
          Blog Not Found! <Link to={'/create-blog'}>Please Create a New Blog</Link>{' '}
        </h2>
      )}
    </>
  );
};

export default Blogs;
