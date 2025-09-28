import React from 'react';

const Loading = ({ message = 'Loading...', size = 'md' }) => {
  const sizeClasses = {
    sm: 'spinner-sm',
    md: 'spinner-md',
    lg: 'spinner-lg'
  };

  return (
    <div className="loading-container">
      <div className={`spinner ${sizeClasses[size]}`}></div>
      <p className="loading-message">{message}</p>
    </div>
  );
};

export default Loading;
