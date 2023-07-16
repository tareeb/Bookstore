import React, { useState, useEffect } from 'react';
import './RequestStatus.css';

const RequestStatus = ({ status , message }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (status) {
      setIsVisible(true);
      setIsLoading(true);

      const timeout = setTimeout(() => {
        setIsVisible(false);
        setIsLoading(false);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [status]);


  if (!isVisible) {
    return null;
  }

  return (
    <div className={`request-status ${status}`}>
      {status && <p>{message}</p>}
      {isLoading && <div className={`loading-indicator ${status}`} />}
    </div>
  );
};

export default RequestStatus;
