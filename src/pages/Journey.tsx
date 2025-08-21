
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import DreamTracker from '@/components/DreamTracker';

const Journey = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/80 to-purple-50/80 backdrop-blur-sm">
      <div className={`container mx-auto space-y-4 sm:space-y-6 max-w-6xl ${isMobile ? 'px-4 py-4 max-h-screen overflow-y-auto' : 'px-8 py-8'}`}>
        {/* Header with Home Button */}
        <div className="flex items-center justify-between mb-4 sm:mb-8">
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            size="sm"
            className="flex items-center gap-2 hover:bg-negari-orange hover:text-white text-xs sm:text-sm rounded-lg"
          >
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">Home</span>
          </Button>
          <h1 className="text-xl sm:text-3xl font-bold text-negari-indigo">My Journey</h1>
          <div></div>
        </div>

        <DreamTracker />
      </div>
    </div>
  );
};

export default Journey;
