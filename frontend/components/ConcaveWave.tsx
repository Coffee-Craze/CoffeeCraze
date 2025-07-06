import React from 'react';

/**
 * Responsive concave SVG wave for hero/cards/footers.
 * Gradient and fingerprint fill for premium claymorphic look.
 * Usage: <ConcaveWave className="w-full h-16 md:h-24" />
 */
export default function ConcaveWave({ className = '', color = '#f9f8f4', fingerprint = false }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f9f8f4" />
          <stop offset="100%" stopColor="#dbdbdb" />
        </linearGradient>
        <pattern id="fingerprint" patternUnits="userSpaceOnUse" width="40" height="40">
          <circle cx="20" cy="20" r="18" fill="none" stroke="#dbdbdb" strokeWidth="2" />
          <circle cx="20" cy="20" r="10" fill="none" stroke="#dbdbdb" strokeWidth="1" />
        </pattern>
      </defs>
      <path
        d="M0,0 C480,120 960,0 1440,120 L1440,120 L0,120 Z"
        fill={fingerprint ? 'url(#fingerprint)' : 'url(#waveGradient)'}
        style={{ filter: 'drop-shadow(0 4px 24px rgba(55,44,45,0.10))' }}
      />
    </svg>
  );
}
