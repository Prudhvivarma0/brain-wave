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
                src="https://utfs.io/f/88bf3c89-9762-449f-8f02-ba09b9284789-1tp0wm.gif" 
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
