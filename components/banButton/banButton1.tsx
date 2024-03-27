'use client'
import React, { useState } from 'react';
import axios from 'axios';
//import { useRouter } from 'next/router';

const BanButton: React.FC<{ profileId: string }> = ({ profileId }) => {
  //const router = useRouter(); // Initialize the router
  const [banStatus, setBanStatus] = useState<string>("Unbanned");

  const toggleBanStatus = async () => {
    try {
      // Send API request to update ban status based on current status
      if (banStatus === "Unbanned") {
        // If currently unbanned, send request to ban
        await axios.post("/api/systBanning", { profileId });
        // Update local state to reflect the change
        setBanStatus("Banned");
        // Redirect to the "banned" page
       // router.push('/banned');
      } else {
        // If currently banned, send request to unban
        await axios.post("/api/systUnbanning", { profileId });
        // Update local state to reflect the change
        setBanStatus("Unbanned");
      }
    } catch (error) {
      console.error("Error updating ban status:", error);
    }
  };

  return (
    <button onClick={toggleBanStatus} style={{ backgroundColor: 'blue', color: 'white', borderRadius: '5px', padding: '5px 10px', border: 'none', width: '80px' }}>
      {banStatus === "Banned" ? "Unban" : "Ban"}
    </button>
  );
};

export default BanButton;