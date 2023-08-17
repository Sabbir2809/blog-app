import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/features/authSlice';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import './../assets/styles/form.css';

const Login = () => {
  // redux global State
  const dispatch = useDispatch();
  // react state
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    setInputs((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  const handleSubmit = (event) => {
    if (inputs.email.length === 0) {
      toast.error('Please Check Your Email Address');
    }
    if (inputs.password.length === 0) {
      toast.error('Please Check Your Password');
    }

    event.preventDefault();
    (async () => {
      try {
        const formBody = {
          email: inputs.email,
          password: inputs.password,
        };
        const { data } = await axios.post('http://localhost:8000/api/v1/user/login', formBody);
        if (data.success) {
          // get id localStorage
          localStorage.setItem('userId', data?.data?.id);
          // dispatch action and tost alert
          dispatch(login());
          toast.success('User Login Successfully');
          // navigate
          navigate('/blogs');
        }
      } catch (error) {
        toast.error('Invalid Username or Password');
        console.error(error.message);
      }
    })();
  };

  return (
    <div className='Auth-form-container'>
      <form className='Auth-form' onSubmit={handleSubmit}>
        <div className='Auth-form-content'>
          <h3 className='Auth-form-title'>Login</h3>
          <div className='form-group mt-3'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              name='email'
              value={inputs.email}
              onChange={handleChange}
              id='email'
              className='form-control mt-1'
              placeholder='your email'
            />
          </div>
          <div className='form-group mt-3'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              value={inputs.password}
              onChange={handleChange}
              id='password'
              className='form-control mt-1'
              placeholder='your Password'
            />
          </div>
          <div className='d-grid gap-2 mt-3'>
            <button type='submit' className='btn btn-primary'>
              Login
            </button>
            <p className='text-center mt-2'>
              Don't have an account? <Link to='/register'>Please Register</Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
