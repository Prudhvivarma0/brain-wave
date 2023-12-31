"use client"
// Import useRouter from next/navigation instead of next/router
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { Home } from 'lucide-react';

const HomeButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/');
  };

  return (
    <div>
      <Button
        onClick={handleClick}
        className='text-white'
        style={{ border: '1px solid transperant', padding: '2px 25px', borderRadius: '20px',backgroundColor:'#b754c9'}}
      >
        <Home className='pr-2'/>
        Home
      </Button>
    </div>
  );
};

export default HomeButton;
