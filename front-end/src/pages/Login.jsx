import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../redux/features/authSlice";
import "./../assets/styles/form.css";

const Login = () => {
  // redux global State
  const dispatch = useDispatch();
  // react state
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
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

    if (inputs.email.length === 0) {
      return toast.error("Please Check Your Email Address");
    }
    if (inputs.password.length === 0) {
      return toast.error("Please Check Your Password");
    }

    try {
      const { data } = await axios.post("https://blog-app-zn8u.onrender.com/api/v1/user/login", inputs);
      if (data.success) {
        // get id localStorage
        localStorage.setItem("userId", data?.data?.id);
        // dispatch action and tost alert
        dispatch(login());
        toast.success("User Login Successfully");
        // navigate
        navigate("/blogs");
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
          <h3 className="Auth-form-title">Login</h3>
          <div className="form-group mt-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
              id="email"
              className="form-control mt-1"
              placeholder="your email"
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={inputs.password}
              onChange={handleChange}
              id="password"
              className="form-control mt-1"
              placeholder="your Password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
            <p className="text-center mt-2">
              Do not have an account? <Link to="/register">Please Register</Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
