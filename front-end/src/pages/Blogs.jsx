import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import BlogCard from "../components/BlogCard";
import Loader from "./Loader";

const Blogs = () => {
  // react state
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setLoading] = useState(false);

  // get blogs
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("https://blog-app-zn8u.onrender.com/api/v1/blog/all-blog");
        if (data?.success) {
          setLoading(false);
          setBlogs(data?.data);
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
      {isLoading && (
        <div className="d-flex justify-content-center">
          <Loader />
        </div>
      )}
      <div className="containerCard">
        {blogs.map((blog) => (
          <BlogCard key={blog?._id} blog={blog} isUser={localStorage.getItem("userId") === blog?.user?._id} />
        ))}
      </div>
    </>
  );
};

export default Blogs;
