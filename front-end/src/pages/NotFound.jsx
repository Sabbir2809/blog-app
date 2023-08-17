import React from 'react';
import './../assets/styles/notFound.css';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='section'>
      <div className='section__header'>
        <h1 className='error'>404</h1>
        <div className='page'>Ooops!!! The page you are looking for is not found</div>
      </div>
      <div className='section__body'>
        <Link to={'/'} className='back-home'>
          Back to home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
