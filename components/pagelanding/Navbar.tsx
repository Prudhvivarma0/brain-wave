"use client"

// Navbar.tsx
import React from 'react';
import './comp.css';
import { redirect } from 'next/navigation';


const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
    <img src="/brain.jpg" alt="" className="logo" />
    <div className="navbar-center-text">
      <h1>BRAINWAVE</h1>
      <p>Connecting Minds, Creating Ideas</p>  
    </div>
   
    <div className="navbar-end">
      <button className="button login-btn">Log in</button>
      <button className="button signup-btn">Sign up</button>
    </div>
  </nav>
  );
};

export default Navbar;