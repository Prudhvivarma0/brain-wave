"use client"
// Import useRouter from next/navigation instead of next/router
import { Bike } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

const Challenges = () => {
  const router = useRouter();

  const handleClick = () => {
    // Use the router to navigate to the home page
    router.push('/challenges');
  };

  return (
    <div>
      <Button onClick={handleClick}  className='text-white' style={{ border: '1px solid transperant', padding: '7px 9px', borderRadius: '20px',backgroundColor:'#b754c9'}}
      >
        <Bike className='pr-2'/>
        Challenges
      </Button>
    </div>
  );
};

export default Challenges;
