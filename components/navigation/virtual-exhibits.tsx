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
      <Button onClick={handleClick}  className='text-white' style={{ border: '1px solid transperant', padding: '8px 19px', borderRadius: '20px',backgroundColor:'#b754c9'}}
      >
        <Footprints className='pr-2'/>
        Exhibits
      </Button>
    </div>
  );
};

export default VirtualExhibits;
