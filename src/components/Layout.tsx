import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import MiniPlayer from './MiniPlayer';
import { usePlayer } from '../contexts/PlayerContext';

const Layout: React.FC = () => {
  const location = useLocation();
  const { currentBook } = usePlayer();

  // Hide nav/player on full screen pages
  const isFullScreen = location.pathname.includes('/player') || location.pathname === '/welcome';
  const showMiniPlayer = !isFullScreen && currentBook;

  if (isFullScreen) {
    return <Outlet />;
  }

  return (
    <div className="flex h-[100dvh] w-full bg-[#0C1115] text-white overflow-hidden">
      {/* Desktop Sidebar (Fixed Left) */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="relative flex-1 flex flex-col h-full min-w-0">
        
        {/* Scrollable Container */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth w-full">
             <div className="pb-[120px] md:pb-10 min-h-full">
                <Outlet />
             </div>
        </div>

        {/* Floating Elements */}
        {showMiniPlayer && (
            <div className="absolute bottom-0 w-full pointer-events-none z-50 flex flex-col items-center">
                {/* MiniPlayer Container */}
                <div className="w-full max-w-7xl mx-auto px-4 pointer-events-auto mb-[calc(72px+env(safe-area-inset-bottom))] md:mb-6">
                     <MiniPlayer currentBook={currentBook} />
                </div>
                
                {/* Mobile Nav (Fixed Bottom) */}
                <div className="pointer-events-auto md:hidden w-full fixed bottom-0 left-0">
                    <BottomNav />
                </div>
            </div>
        )}
        
        {/* Mobile Nav Placeholder if no player but on mobile */}
        {!showMiniPlayer && (
            <div className="pointer-events-auto md:hidden w-full fixed bottom-0 left-0 z-50">
                <BottomNav />
            </div>
        )}
      </div>
    </div>
  );
};

export default Layout;