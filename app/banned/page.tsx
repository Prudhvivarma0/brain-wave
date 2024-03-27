
import React from 'react';

export default function BannedPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src="brain.jpg" alt="Brain" className="w-20 h-20 mb-4" /> {/* Adjust width and height as needed */}
      <h1 className="text-3xl font-bold mb-2">Sorry, you've been banned :(</h1> {/* Adjust text size as needed */}
      <p className="text-lg text-center">You cannot access this platform anymore.</p> {/* Adjust text size as needed */}
    </div>
  );
}
