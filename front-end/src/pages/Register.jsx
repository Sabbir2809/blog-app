import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import "./../assets/styles/form.css";

const Register = () => {
  // react state
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (inputs.username.length === 0) {
      return toast.error("Username is Required");
    }
    if (inputs.email.length === 0) {
      return toast.error("Email is Required");
    }
    if (inputs.password.length === 0) {
      return toast.error("Password is Required");
    }

    try {
      const { data } = await axios.post("https://blog-app-zn8u.onrender.com/api/v1/user/register", inputs);
      if (data.success) {
        toast.success("User Registration Successfully");
        navigate("/login");
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
          <h3 className="Auth-form-title">Register</h3>
          <div className="form-group mt-3">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              value={inputs.username}
              onChange={handleChange}
              id="username"
              className="form-control mt-1"
              placeholder="enter your username"
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
              id="email"
              className="form-control mt-1"
              placeholder="enter your email"
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={inputs.password}
              id="password"
              className="form-control mt-1"
              onChange={handleChange}
              placeholder="enter your  password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
            <p className="text-center mt-2">
              Already Register?<Link to="/login"> Please Login</Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
