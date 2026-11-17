import React from 'react';

interface LogoProps {
  size?: 'md' | 'lg';
}

export const JoussourLogo: React.FC<LogoProps> = ({ size = 'md' }) => {
  const svgWidth = size === 'lg' ? 'w-44 sm:w-48' : 'w-32 sm:w-40 lg:w-44';
  const enSize = size === 'lg' ? 'text-xs' : 'text-[10px] sm:text-[11px]';

  return (
    <div className="flex flex-col items-center leading-none select-none">
      <svg className={`${svgWidth} h-auto`} viewBox="0 0 220 68" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="جسور">
        <defs>
          <linearGradient id="joussourGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F9E58A" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#9A7214" />
          </linearGradient>
        </defs>
        <path d="M38 35 C37 46, 28 54, 15 56" stroke="url(#joussourGoldGrad)" strokeWidth="4.2" strokeLinecap="round" />
        <circle cx="57" cy="31" r="6.5" stroke="url(#joussourGoldGrad)" strokeWidth="3.6" />
        <path d="M63 33 C63 46, 54 55, 42 57" stroke="url(#joussourGoldGrad)" strokeWidth="4" strokeLinecap="round" />
        <path d="M64 38 L145 38" stroke="url(#joussourGoldGrad)" strokeWidth="3.2" strokeLinecap="round" />
        <path d="M74 38 C74 22, 92 22, 92 38" className="logo-arch-contrast" strokeWidth="2.8" strokeLinecap="round" />
        <path d="M95 38 C95 16, 117 16, 117 38" stroke="url(#joussourGoldGrad)" strokeWidth="3" strokeLinecap="round" />
        <path d="M120 38 C120 22, 138 22, 138 38" className="logo-arch-contrast" strokeWidth="2.8" strokeLinecap="round" />
        <line x1="93.5" y1="24" x2="93.5" y2="42" stroke="url(#joussourGoldGrad)" strokeWidth="1.6" opacity="0.85" />
        <line x1="118.5" y1="24" x2="118.5" y2="42" stroke="url(#joussourGoldGrad)" strokeWidth="1.6" opacity="0.85" />
        <path d="M145 38 C154 38, 166 36, 174 28 C162 24, 152 25, 146 28" stroke="url(#joussourGoldGrad)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M167 34 C178 40, 176 54, 158 56 C146 57, 138 52, 135 46" stroke="url(#joussourGoldGrad)" strokeWidth="3.8" strokeLinecap="round" />
        <rect x="155" y="43" width="4.8" height="4.8" rx="0.8" transform="rotate(45 157.4 45.4)" fill="#F9E58A" />
      </svg>
      <div className="flex items-center gap-1.5 -mt-1">
        <span className="w-3 h-[1px] bg-gradient-to-l from-amber-400/70 to-transparent" />
        <span className={`font-logo-en ${enSize} font-bold uppercase`}>JOUSSOUR</span>
        <span className="w-3 h-[1px] bg-gradient-to-r from-amber-400/70 to-transparent" />
      </div>
    </div>
  );
};
