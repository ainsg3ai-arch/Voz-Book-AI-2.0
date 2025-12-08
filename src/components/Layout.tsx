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
    <div className="flex h-screen w-full bg-background-dark text-white overflow-hidden">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="relative flex-1 flex flex-col h-full overflow-hidden">
        
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar scroll-smooth">
             <Outlet />
             {/* Spacer for bottom nav/player */}
             <div className="h-32 md:h-24"></div>
        </div>

        {/* Floating Elements */}
        {showMiniPlayer && (
            <div className="absolute bottom-0 w-full pointer-events-none z-50">
                {/* On mobile, MiniPlayer is above BottomNav. On Desktop, it's at bottom. */}
                <div className="pointer-events-auto">
                     <MiniPlayer currentBook={currentBook} />
                </div>
                
                {/* Mobile Nav */}
                <div className="pointer-events-auto md:hidden">
                    <BottomNav />
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default Layout;