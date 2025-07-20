// features/workspace/components/ProgressBar.jsx
import React from 'react';

const progressStyles = {
  container: {
    width: '100%',
    height: '6px',
    backgroundColor: 'rgba(51, 65, 85, 0.8)',
    borderRadius: '3px',
    overflow: 'hidden',
    position: 'relative',
  },
  fill: {
    height: '100%',
    borderRadius: '3px',
    transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
  },
  fillGradient: {
    background: 'linear-gradient(90deg, #10b981 0%, #34d399 50%, #6ee7b7 100%)',
  },
  fillGradientMedium: {
    background: 'linear-gradient(90deg, #f59e0b 0%, #fbbf24 50%, #fcd34d 100%)',
  },
  fillGradientLow: {
    background: 'linear-gradient(90deg, #ef4444 0%, #f87171 50%, #fca5a5 100%)',
  },
  shimmer: {
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
    animation: 'shimmer 2s infinite',
  },
};

// Define the shimmer animation keyframes
const shimmerKeyframes = `
  @keyframes shimmer {
    0% { left: -100%; }
    100% { left: 100%; }
  }
`;

// Inject the keyframes into the document head if not already present
if (typeof document !== 'undefined' && !document.querySelector('#shimmer-keyframes')) {
  const style = document.createElement('style');
  style.id = 'shimmer-keyframes';
  style.textContent = shimmerKeyframes;
  document.head.appendChild(style);
}

function ProgressBar({ 
  progress = 0, 
  size = 'medium', 
  showShimmer = false,
  customColor = null,
  className = '',
  ...props 
}) {
  // Clamp progress between 0 and 100
  const clampedProgress = Math.max(0, Math.min(100, progress));
  
  // Determine fill style based on progress or custom color
  let fillStyle = progressStyles.fillGradient; // default (high progress)
  
  if (customColor) {
    fillStyle = { background: customColor };
  } else if (clampedProgress < 30) {
    fillStyle = progressStyles.fillGradientLow;
  } else if (clampedProgress < 70) {
    fillStyle = progressStyles.fillGradientMedium;
  }

  // Size variations
  const sizeStyles = {
    small: { height: '4px' },
    medium: { height: '6px' },
    large: { height: '8px' },
  };

  return (
    <div 
      style={{
        ...progressStyles.container,
        ...sizeStyles[size],
      }}
      className={className}
      role="progressbar"
      aria-valuenow={clampedProgress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Progress: ${Math.round(clampedProgress)}%`}
      {...props}
    >
      <div
        style={{
          ...progressStyles.fill,
          ...fillStyle,
          width: `${clampedProgress}%`,
        }}
      >
        {showShimmer && clampedProgress > 0 && (
          <div style={progressStyles.shimmer} />
        )}
      </div>
    </div>
  );
}

export default ProgressBar;