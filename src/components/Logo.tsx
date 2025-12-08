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
        
        {/* Abstract Sound Wave / 'S' Shape for SONARA */}
        <path 
            d="M12 16C12 12 16 8 24 8C32 8 36 12 36 16C36 24 12 24 12 32C12 36 16 40 24 40C32 40 36 36 36 32" 
            stroke="url(#sonaraGradient)" 
            strokeWidth="4" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            filter="url(#glow)"
        />
        
        {/* Accent Dots */}
        <circle cx="24" cy="24" r="3" fill="#ffffff" className="animate-pulse" />
        <circle cx="36" cy="16" r="2" fill="url(#sonaraGradient)" className="opacity-60" />
        <circle cx="12" cy="32" r="2" fill="url(#sonaraGradient)" className="opacity-60" />
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