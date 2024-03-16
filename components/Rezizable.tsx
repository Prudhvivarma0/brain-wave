'use client';
import React, { useState, useCallback } from 'react';

interface ResizableProps {
  children: React.ReactNode;
}

const Resizable: React.FC<ResizableProps> = ({ children }) => {
  const [width, setWidth] = useState(200);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const startX = e.clientX;
    const startWidth = width;

    const doResize = (moveEvent: MouseEvent) => {
      const newWidth = startWidth + moveEvent.clientX - startX;
      setWidth(newWidth);
    };

    const stopResize = () => {
      window.removeEventListener('mousemove', doResize);
      window.removeEventListener('mouseup', stopResize);
    };

    window.addEventListener('mousemove', doResize);
    window.addEventListener('mouseup', stopResize);
  }, [width]);

  return (
    <div style={{ width, marginRight: 10 }}>
      {children}
      <div
        onMouseDown={handleMouseDown}
        style={{ width: 10, cursor: 'col-resize', backgroundColor: 'lightgray' }}
      />
    </div>
  );
};

export default Resizable;
