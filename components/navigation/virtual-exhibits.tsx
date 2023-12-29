"use client"
// Import useRouter from next/navigation instead of next/router
import { Footprints } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

const VirtualExhibits = () => {
  const router = useRouter();

  const handleClick = () => {
    // Use the router to navigate to the home page
    router.push('/virtualexhibits');
  };

  return (
    <div>
      <Button onClick={handleClick} variant="link" className='text-white'>
        <Footprints className='pr-2'/>
        Virtual Ex
      </Button>
    </div>
  );
};

export default VirtualExhibits;
