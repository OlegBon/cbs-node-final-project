import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className="container">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you're looking for doesn't exist.</p>
      <Link to="/">Go back to Home</Link>
    </div>
  );
};

export default Error;
