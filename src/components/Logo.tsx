import React from 'react';

interface LogoProps {
    className?: string;
    showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "h-8 w-8", showText = false }) => {
  return (
    <div className="flex items-center gap-3 select-none">
        <svg 
        viewBox="0 0 48 48" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        >
        <defs>
            <linearGradient id="sonaraGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f2fe" />
            <stop offset="100%" stopColor="#6a5af9" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
        </defs>
        
        {/* Abstract Sound Wave Shape - Sonara Symbol */}
        <path 
            d="M12 24C12 18 16 12 24 12C32 12 36 18 36 24M8 24C8 14 14 6 24 6C34 6 40 14 40 24" 
            stroke="url(#sonaraGradient)" 
            strokeWidth="3" 
            strokeLinecap="round" 
            className="opacity-40"
        />
        
        <rect x="22" y="14" width="4" height="20" rx="2" fill="url(#sonaraGradient)" filter="url(#glow)" />
        <rect x="14" y="20" width="4" height="8" rx="2" fill="url(#sonaraGradient)" className="opacity-80" />
        <rect x="30" y="18" width="4" height="12" rx="2" fill="url(#sonaraGradient)" className="opacity-80" />
        
        {/* Pulse Dot */}
        <circle cx="24" cy="40" r="3" fill="#00f2fe" className="animate-pulse">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
        </circle>
        </svg>

        {showText && (
            <span className="text-xl md:text-2xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
                SONARA
            </span>
        )}
    </div>
  );
};

export default Logo;