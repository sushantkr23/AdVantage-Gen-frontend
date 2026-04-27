import { useEffect, useState } from 'react';
import socketService from '../services/socket';

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  
  useEffect(() => {
    socketService.connect();
    
    const onConnect = () => setIsConnected(true);
    const onDisconnect = () => setIsConnected(false);
    
    socketService.socket?.on('connect', onConnect);
    socketService.socket?.on('disconnect', onDisconnect);
    
    return () => {
      socketService.socket?.off('connect', onConnect);
      socketService.socket?.off('disconnect', onDisconnect);
      socketService.disconnect();
    };
  }, []);
  
  const joinCampaign = (campaignId) => {
    socketService.joinCampaign(campaignId);
  };
  
  const onCampaignComplete = (callback) => {
    socketService.onCampaignComplete(callback);
    return () => socketService.offCampaignComplete();
  };
  
  return {
    isConnected,
    joinCampaign,
    onCampaignComplete,
  };
};