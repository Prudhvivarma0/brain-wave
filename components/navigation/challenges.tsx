"use client"
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { Bike, Swords } from 'lucide-react';
import { useState } from 'react';

const Challenges = () => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    router.push('/challenges');
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
    backgroundColor: isHovered || isActive ? 'rgb(99, 103, 180)' : 'transparent',
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
        <Swords className='pr-2'/>
        Challenges
      </Button>
    </div>
  );
};

export default Challenges;
