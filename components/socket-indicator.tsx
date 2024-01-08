"use client";

import { useSocket } from "@/components/providers/socket-provider";
import { Badge } from "@/components/ui/badge";

export const SocketIndicator = () => {
  const { isConnected } = useSocket();

  if (!isConnected) {
    return (
      <Badge 
        variant="outline" 
        className="bg-rose-500 text-white border-none"
      >
        Reloading...
      </Badge>
    )
  }

  return (
    <Badge 
      variant="outline" 
      className="bg-green-500 text-white border-none"
    >
      Connected
    </Badge>
  )
}