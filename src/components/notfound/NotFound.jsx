import React from 'react';
import './NotFound.css';


const NotFound = () => {
  return (
    <div className='pnf'>
    <h1>404</h1>
    <h2>Page Not Found</h2>
    <p>The page you are looking for does not exist or has been moved.</p>
    <a href="/home" style={{ textDecoration: "none", color: "blue" }}>
      Go Back to Home
    </a>
  </div>
  )
}

export default NotFound