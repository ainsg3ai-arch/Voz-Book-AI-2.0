import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = "h-8 w-8" }) => {
  return (
    <svg 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3AB8FF" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* Abstract Book/Wave Shape */}
      <path 
        d="M14 12C14 12 14 36 14 36C14 39.3137 16.6863 42 20 42H40V18H20C17.7909 18 16 16.2091 16 14V8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8V32" 
        stroke="url(#logoGradient)" 
        strokeWidth="4" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        filter="url(#glow)"
      />
      
      {/* Sound Waves */}
      <path d="M26 24V36" stroke="white" strokeWidth="2" strokeLinecap="round" className="animate-[pulse_1s_ease-in-out_infinite]" />
      <path d="M32 20V40" stroke="white" strokeWidth="2" strokeLinecap="round" className="animate-[pulse_1.2s_ease-in-out_infinite]" />
      <path d="M38 26V34" stroke="white" strokeWidth="2" strokeLinecap="round" className="animate-[pulse_0.8s_ease-in-out_infinite]" />
    </svg>
  );
};

export default Logo;