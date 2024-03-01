import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const backgroundImage = 'url("/login.png")';

  return (
    <div
      className='items-end'
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: backgroundImage,
        backgroundSize: 'cover',
        padding: '5% 5%', // Adjust padding for responsiveness
      }}
    >
      {children}
    </div>
  );
};

export default AuthLayout;
