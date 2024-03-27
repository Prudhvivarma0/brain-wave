"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Button } from '../ui/button';
import { MessageCircleQuestion } from 'lucide-react';
import { STATUS, Step } from 'react-joyride';

// Dynamically import react-joyride to prevent server-side rendering
const Joyride = dynamic(() => import('react-joyride'), { ssr: false });

const Help = () => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [run, setRun] = useState(false);

  const handleClick = () => {
    setRun(true);
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

  const [{ steps }, setState] = useState<{ run: boolean, steps: Step[] }>({
    run: true,
    steps: [
      {
        content: <h2>Let's begin our journey!</h2>,
        locale: { skip: <strong>SKIP</strong> },
        placement: "center",
        target: "body"
      },
      {
        content: <h2>Search and navigate to your desired team.</h2>,
        placement: "bottom",
        target: "#search",
        title: "Search Bar"
      },
      {
        content: <h2>Manage your user profile over here.</h2>,
        placement: "top",
        target: "#profile",
        title: "User Profile"
      },
      {
        content: <h2>Here are all of your teams which u can navigate to!</h2>,
        placement: "bottom",
        target: "#servers",
        title: "Teams"
      },
      {
        content: <h2>Click here and create a team!!</h2>,
        placement: "right",
        target: "#create",
        title: "Create a Team"
      },
      {
        content: <h2>Navigate across Home, Calendar, Exhibits, Challenges.....</h2>,
        placement: "right",
        target: "#nav",
        title: "Navigation Bar"
      },
    ]
  });

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
      <Joyride
        continuous
        callback={(data) => {
          const { status } = data;
          if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
            setRun(false);
          }
        }}
        run={run}
        steps={steps}
        hideCloseButton
        scrollToFirstStep
        showSkipButton
        showProgress
      />
    </div>
  );
}

export default Help;
