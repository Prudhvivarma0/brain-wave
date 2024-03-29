"use client"
import { Plane } from 'lucide-react';
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
    <a href='/pagelanding' style={{ position: 'absolute', top: 20, right: 20 }}>
      <Plane className='text-white hover:bg-white hover:text-black rounded-s'/>
    </a>
    </div>
  );
};

export default AuthLayout;
