"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Button } from '../ui/button';
import { Lightbulb, MessageCircleQuestion } from 'lucide-react';
import { STATUS, Step } from 'react-joyride';

// Dynamically import react-joyride to prevent server-side rendering
const Joyride = dynamic(() => import('react-joyride'), { ssr: false });

const ChalRecom = () => {
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
        content: <h2>Here are few recommendations for you!</h2>,
        locale: { skip: <strong>SKIP</strong> },
        placement: "center",
        target: "body"
      },
      {
        content: <h2>Take on challenges, conquer obstacles together, and collaborate towards shared goals. </h2>,
        placement: "center",
        target: "body",
        title: "Challenge. Conquer. Collaborate."
      },
      {
        content: <h2>Embrace challenges as opportunities for growth, evolve through shared experiences, and excel together as a community.</h2>,
        placement: "center",
        target: "body",
        title: "Embrace. Evolve. Excel."
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
        <Lightbulb />
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
        styles={{
          buttonNext:{
            background:"#6e13ab"
          },
          buttonBack:{
            color:"GrayText"
          }
        }}
      />
    </div>
  );
}

export default ChalRecom;
