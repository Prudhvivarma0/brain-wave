"use client"

// Navbar.tsx
import React from 'react';
import './comp.css';


const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
    <img src="/brain.jpg" alt="" className="logo" />
    <div className="navbar-center-text">
      <h1>BRAINWAVE</h1>
      <p>Connecting Minds, Creating Ideas</p>  
    </div>
   
    <div className="navbar-end">
      <a href="/sign-in">
      <button className="button login-btn">Log in</button>
      </a>
      <a href="/sign-up">
      <button className="button signup-btn">Sign up</button>
      </a>
    </div>
  </nav>
  );
};

export default Navbar;