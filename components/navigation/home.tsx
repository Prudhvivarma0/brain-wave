"use client"
// Import useRouter from next/navigation instead of next/router
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { Home } from 'lucide-react';

const HomeButton = () => {
  const router = useRouter();

  const handleClick = () => {
    // Use the router to navigate to the home page
    router.push('/');
  };

  return (
    <div>
      <Button onClick={handleClick} variant="link" className='text-white'>
        <Home className='pr-2'/>
        Home
      </Button>
    </div>
  );
};

export default HomeButton;
