import React, { useState } from 'react';
import { BRAND_ASSETS } from '../data/deckData';

export const AetherLogoMark: React.FC<{
  variant?: 'plus' | 'v';
  size?: 'sm' | 'md' | 'lg';
}> = ({ variant = 'plus', size = 'md' }) => {
  const [imgError, setImgError] = useState(false);

  const dims =
    size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-11 h-11' : 'w-10 h-10';

  if (!imgError && variant === 'plus') {
    return (
      <div className={`relative ${dims} shrink-0 flex items-center justify-center`}>
        <img
          src={BRAND_ASSETS.aetherLogoUrl}
          alt="Aether Deck Logo"
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          className={`${dims} rounded-xl object-cover shadow-sm`}
        />
      </div>
    );
  }

  // Exact vector recreation of Image 1 / Image 14 (layered 3D blue-teal cards with + or V)
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${dims} shrink-0 drop-shadow-sm`}
    >
      {/* Back Right Teal Card */}
      <rect
        x="24"
        y="8"
        width="30"
        height="40"
        rx="7"
        transform="rotate(14 24 8)"
        fill="#E0FBF6"
        stroke="#0D9488"
        strokeWidth="2.5"
      />
      {/* Middle Left Indigo Card */}
      <rect
        x="11"
        y="13"
        width="30"
        height="40"
        rx="7"
        transform="rotate(-7 11 13)"
        fill="#EEF2FF"
        stroke="#4F46E5"
        strokeWidth="2.5"
      />
      {/* Foreground Gradient Deck Card */}
      <rect
        x="16"
        y="13"
        width="31"
        height="42"
        rx="7"
        fill="url(#aetherCardGrad)"
      />
      {variant === 'plus' ? (
        <g>
          <circle cx="31.5" cy="34" r="8.5" fill="#F8FAFC" />
          <path
            d="M31.5 29.5V38.5M27 34H36"
            stroke="#00685F"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </g>
      ) : (
        <path
          d="M25.5 27.5L31.5 41.5L37.5 27.5"
          stroke="#FFFFFF"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
      <defs>
        <linearGradient
          id="aetherCardGrad"
          x1="16"
          y1="13"
          x2="47"
          y2="55"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#0D9488" />
          <stop offset="50%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#4F46E5" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const FounderAvatar: React.FC<{ email?: string }> = ({ email }) => {
  return (
    <div
      title={email || 'founder@startup.io'}
      className="relative w-8 h-8 rounded-full bg-gradient-to-br from-[#00685f] to-[#38485d] p-[1.5px] shadow-sm shrink-0"
    >
      <div className="w-full h-full rounded-full overflow-hidden bg-[#eaefed] flex items-center justify-center">
        {/* Crisp stylized portrait matching Image 3 executive founder avatar */}
        <svg viewBox="0 0 40 40" className="w-full h-full">
          <rect width="40" height="40" fill="#F3EFEA" />
          {/* Hair back */}
          <path
            d="M10 22C10 13 14.5 8 20 8C25.5 8 30 13 30 22C30 25 29 28 28 29H12C11 28 10 25 10 22Z"
            fill="#1F2421"
          />
          {/* Shoulders / Charcoal sweater */}
          <path
            d="M6 40C6 33.5 11.5 30 20 30C28.5 30 34 33.5 34 40H6Z"
            fill="#374151"
          />
          {/* Neck */}
          <rect x="17" y="24" width="6" height="7" rx="2" fill="#E0B596" />
          {/* Face */}
          <ellipse cx="20" cy="18.5" rx="6.2" ry="7.2" fill="#E8C0A2" />
          {/* Hair front wave */}
          <path
            d="M13.5 17C14 12 17 9.5 21 10C24.5 10.5 26.5 13.5 26.8 17.5C25 14.5 22.5 13 19.5 13C16.5 13 14.5 14.8 13.5 17Z"
            fill="#1F2421"
          />
          {/* Eyes & Smile */}
          <circle cx="17.8" cy="18" r="0.8" fill="#2D231E" />
          <circle cx="22.2" cy="18" r="0.8" fill="#2D231E" />
          <path
            d="M18 21.5Q20 22.8 22 21.5"
            stroke="#9C6B53"
            strokeWidth="0.9"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#00685f] ring-2 ring-white" />
    </div>
  );
};
