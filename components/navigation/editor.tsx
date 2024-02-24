"use client"
// Import useRouter from next/navigation instead of next/router
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { Home, Pencil } from 'lucide-react';
import { useState } from 'react';

const EditorButton = () => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  
  const handleClick = () => {
    router.push('/editor');
    setIsActive(true);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsActive(false);
  };

  const handleMouseDown = () => {
    setIsActive(true);
  };

  const buttonStyle = {
    border: '1px solid transparent',
    backgroundColor: isActive ? 'rgb(99, 103, 180)' : (isHovered ? 'rgb(99, 103, 180)' : 'transparent'),
    boxShadow: isHovered ? '0px 6px 15px rgba(0, 0, 0, 0.3)' : 'none', // Adjust this line
  };
  

  return (
    <div>
      <Button
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        className='text-white w-[155px]'
        style={buttonStyle}
      >
        <Pencil className='pr-2'/>
        Editor
      </Button>
    </div>
  );
};

export default EditorButton;
