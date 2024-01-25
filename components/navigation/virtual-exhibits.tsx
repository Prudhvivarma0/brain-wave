"use client"
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { AppWindow, Footprints } from 'lucide-react';
import { useState } from 'react';

const VirtualExhibits = () => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    router.push('/virtualexhibits');
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
        <AppWindow className='pr-2'/>
        {/* <Footprints className='pr-2'/> */}
        Exhibits
      </Button>
    </div>
  );
};

export default VirtualExhibits;
