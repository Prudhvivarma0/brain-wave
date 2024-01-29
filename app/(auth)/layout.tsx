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
          paddingLeft: '750px'
        }}>
        {children}
      </div> 
  );
};

export default AuthLayout;
