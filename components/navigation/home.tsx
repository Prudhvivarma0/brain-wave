"use client"
// Import useRouter from next/navigation instead of next/router
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { Home } from 'lucide-react';
import { useState } from 'react';

const HomeButton = () => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  
  const handleClick = () => {
    router.push('/');
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
        <Home className='pr-2'/>
        Home
      </Button>
    </div>
  );
};

export default HomeButton;
