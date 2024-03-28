"use client"
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { Bike, Calendar, CalendarCheck, CalendarDays, Swords } from 'lucide-react';
import { useState } from 'react';
import { currentProfile } from '@/lib/current-profile';

const Cale = () => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);


  const handleClick = () => {
    router.push(`/calendar`);
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
        {/* <Calendar className='pr-2'/> */}
        {/* <CalendarDays className='pr-2'/> */}
        <CalendarCheck className='pr-2'/>
        Calendar
      </Button>
    </div>
  );
};

export default Cale;
