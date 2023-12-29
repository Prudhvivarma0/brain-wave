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
      <Button onClick={handleClick} variant="link" className='text-white'>
        <Bike className='pr-2'/>
        Challenges
      </Button>
    </div>
  );
};

export default Challenges;
