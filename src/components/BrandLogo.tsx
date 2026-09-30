import React from 'react';
import channelLogoImg from '../assets/images/channel_logo_1790363399319.jpg';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark' | 'full';
  showSubtitle?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'light',
  showSubtitle = true,
}) => {
  // Height presets
  const heightClasses = {
    sm: 'h-8',
    md: 'h-10 sm:h-11',
    lg: 'h-12 sm:h-14',
    xl: 'h-16 sm:h-20',
  }[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Brand Image Emblem */}
      <div className={`relative overflow-hidden rounded-xl bg-white p-1 shadow-md border border-white/20 flex items-center justify-center transition-transform hover:scale-105 ${heightClasses}`}>
        <img
          src={channelLogoImg}
          alt="Wildlife Conservation Channel Logo"
          className="h-full w-auto object-contain"
        />
      </div>

      {/* Brand Name Wordmark Typography */}
      <div className="flex flex-col justify-center text-left">
        <span className="text-base sm:text-lg font-black tracking-tight text-[#84a92e] font-['Montserrat'] leading-tight drop-shadow-sm">
          WILDLIFE
        </span>
        {showSubtitle && (
          <span
            className={`text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase leading-none mt-0.5 ${
              variant === 'light' ? 'text-white/90' : 'text-neutral-800'
            }`}
          >
            CONSERVATION CHANNEL
          </span>
        )}
      </div>
    </div>
  );
};

export default BrandLogo;
