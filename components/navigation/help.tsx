"use client"
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { Bike, MessageCircleQuestion, Swords } from 'lucide-react';
import { useState } from 'react';

const Help = () => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    router.push('/help');
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
    padding: '22px 12px', // Adjust these values as needed
    border: '1px solid transparent',
    backgroundColor: isActive ? 'rgb(99, 103, 180)' : (isHovered ? 'rgb(99, 103, 180)' : 'rgb(60,38,91)'),
    boxShadow: isHovered ? '0px 6px 15px rgba(0, 0, 0, 0.3)' : 'none',
};

return (
    <div>
        <Button
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMouseDown}
            className='text-white'
            style={buttonStyle}
        >
            <MessageCircleQuestion />
        </Button>
    </div>
);

}

export default Help;
