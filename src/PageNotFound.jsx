import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './pagenotfound.css';  // You can style this component as per your needs.

const PageNotFound = () => {
  const navigate = useNavigate();  // Hook for programmatically navigating to other routes
const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Start a countdown interval
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          navigate('/'); // Redirect to the home page
        }
        return prev - 1;
      });
    }, 1000); // 1 second interval

    // Cleanup the timer if the component is unmounted
    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <>
    <div className="page-not-found">
      <h1>404 - Page Not Found</h1>
      <p>We couldn't find the page you are looking for.</p>
      <p>You will be redirected to the homepage in <strong>{countdown} seconds...</strong></p>
    </div>
    </>
  );
}

export default PageNotFound;