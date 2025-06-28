import React from 'react';

const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div style={{ color: 'red', margin: '1rem 0', fontWeight: 'bold' }}>
      {message}
    </div>
  );
};

export default ErrorMessage;
