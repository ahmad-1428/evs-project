import React from 'react';

const Loader = () => {
  const loaderStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  };

  const spinnerStyles = {
    border: '8px solid #f3f3f3', /* Light grey */
    borderTop: '8px solid #333', /* Accent charcoal grey */
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    animation: 'spin 2s linear infinite',
  };

  return (
    <div style={loaderStyles}>
      <div style={spinnerStyles}></div>
    </div>
  );
};

export default Loader;
