import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import "./../assets/styles/blogDetails.css";
import Loader from "./Loader";

const BlogDetails = () => {
  // react state
  const [blog, setBlog] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const { id } = useParams();

  // get blogs
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`https://blog-app-zn8u.onrender.com/api/v1/blog/get-blog/${id}`);
        if (data?.success) {
          setLoading(false);
          setBlog(data?.data);
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
      {isLoading ? (
        <div className="d-flex justify-content-center">
          <Loader />
        </div>
      ) : (
        <div className="card card-section">
          <div className="card-header">
            <img src={blog.image} className="blog-details__img" alt={blog.title} />
          </div>
          <div className="card-footer">
            <h2 className="card-title text-primary">{blog.title}</h2>
          </div>
          <div className="card-body">
            <p className="card-text">{blog.description}</p>
            <p className="card-text">
              <small className="text-body-secondary">{blog.createdAt}</small>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogDetails;
