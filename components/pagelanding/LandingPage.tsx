import React from 'react';
import Navbar from './Navbar'; // Import your Navbar component
import TypedText from './types';

const LandingPage: React.FC = () => {
  return (
    <div className="landingpagecontainer">
      <Navbar /> {/* Render the Navbar component */}
      <div className="welcome-container">
      <h2>Welcome to BrainWave!</h2>
      
    </div>

    <div className="content-body" style={{ fontSize: "20px"}}>
  <h1 style={{ fontWeight: "bold"}}>Teamwork -  <TypedText  />  </h1>
  <p>Get more and better results by working together.</p>
  <p>Explore Video Calls, Instant Messaging, Collaboration Boards and much more. Teamwork was never easier!</p>
</div>


<div className="buttons-container">
      <a href="https://www.instagram.com/realcodecraft_?igsh=aWVmNWo4Ymhrc3Mw" className="custom-button-link" target="_blank" rel="noopener noreferrer">
      <button className="custom-button">Visit Our Socials</button>
      </a>
      <a href="/sign-in">
      <button className="custom-button">Get Started!</button>
      </a>
    </div>
    <img src="/collaborate.svg" alt="Description" className="myImage" />
    
    {/* <img src="/business-meeting.svg" alt="Description" className="myImage" /> */}

    <div className="bottom-section">
    
    <div className="image-container">
    <img src="/drawing.svg" alt="Descriptive Text" className="transition-image1" />
    <p className="image-caption1">Draw: Get Creative!</p>
  </div>

  <div className="image-container">
    <img src="/business-meeting.svg" alt="Descriptive Text" className="transition-image2" />
    <p className="image-caption2">Collaborate: Accomplish Together!</p>
  </div>

  <div className="image-container">
    <img src="/message.svg" alt="Descriptive Text" className="transition-image3" />
    <p className="image-caption3">Message:Chat with your friends!
    </p>
  </div>


    </div>
      
      {/* Add other components or sections as needed */}
    </div>
  );
};

export default LandingPage;