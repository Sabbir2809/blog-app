import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import BlogCard from "../components/BlogCard";

const UserBlogs = () => {
  // react state
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const id = localStorage.getItem("userId");
        const { data } = await axios.get(`https://blog-app-zn8u.onrender.com/api/v1/blog/user-blog/${id}`);

        if (data.success) {
          setBlogs(data?.data?.blogs);
        }
      } catch (error) {
        if (error.response.data.message) {
          return toast.error(error.response.data.message);
        }
      }
    })();
  }, []);

  return (
    <>
      {blogs.length > 0 ? (
        <div className="containerCard">
          {blogs.map((blog) => (
            <BlogCard key={blog?._id} blog={blog} isUser={true} />
          ))}
        </div>
      ) : (
        <h2 className="text-center text-success mt-4">You have created a New Blog</h2>
      )}
    </>
  );
};

export default UserBlogs;
