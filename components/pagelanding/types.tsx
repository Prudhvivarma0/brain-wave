'use client'
import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';

const TypedText: React.FC = () => {
  const el = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const typed = new Typed(el.current!, {
      strings: [
        'One platform, endless possibilities.',
        'Together, we achieve more.',
        'Connect. Collaborate. Create.',
      ],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return <span ref={el}></span>;
};

export default TypedText;