"use client";
import React, { useState } from 'react';


export const Ads = () => {
  const [ContainerVisible, setContainerVisible] = useState(true);

  const handleCloseContainer = () => {
    setContainerVisible(false);
  }

  return (
    <>
      {ContainerVisible && (
        <div className="tlbxad-container">
          <div className="tlbxad">
            {/* Advertisement */}
            <button style={{float:'right'}} onClick={handleCloseContainer}>X</button>
            <div className='mb-1'>
              <img 
                src="https://utfs.io/f/cfc8e80a-5dd9-4886-9694-688d0928857e-tk5z48.gif" 
                alt="Ad GIF" 
                style={{ width: '250px', height: '150px' }} // specify the width and height here
              />
            </div>
          </div>
        </div>
      )}
    </>
);

}
