import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./../assets/styles/form.css";

const CreateBlog = () => {
  // react state
  const id = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });

  const handleChange = (event) => {
    setInputs((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (inputs.title.length === 0) {
      return toast.error("Blog Title is Required");
    }
    if (inputs.description.length === 0) {
      return toast.error("Blog Description is Required");
    }
    if (inputs.image.length === 0) {
      return toast.error("Image URL is Required");
    }

    try {
      const formBody = {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: id,
      };

      const { data } = await axios.post(
        "https://blog-app-zn8u.onrender.com/api/v1/blog/create-blog",
        formBody
      );
      if (data?.success) {
        toast.success("Blog Created Successfully");
        navigate("/my-blogs");
      }
    } catch (error) {
      if (error.response.data.message) {
        return toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Create a New Blog</h3>
          <div className="form-group mt-3">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              value={inputs.title}
              onChange={handleChange}
              id="title"
              className="form-control mt-1"
              placeholder="Blog title"
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="description">Description</label>
            <input
              type="textarea"
              name="description"
              value={inputs.description}
              onChange={handleChange}
              id="description"
              className="form-control mt-1"
              placeholder="Blog Description"
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="image">Image</label>
            <input
              type="text"
              className="form-control mt-1"
              name="image"
              value={inputs.image}
              onChange={handleChange}
              id="image"
              placeholder="Image URL"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Blog Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
