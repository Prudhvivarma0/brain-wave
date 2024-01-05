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
          justifyContent: 'end',
          backgroundImage: backgroundImage,
          backgroundSize: 'cover',
          paddingRight: '50px'
        }}>
        {children}
      </div> 
  );
};

export default AuthLayout;
