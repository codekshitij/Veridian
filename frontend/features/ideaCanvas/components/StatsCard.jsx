import React, { useState, useEffect } from 'react';

const StatsCard = ({ title, value, subtitle, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div 
      className={`bg-gray-800 border border-gray-700 rounded-lg p-6 text-center transition-all duration-300 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20 cursor-pointer ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ 
        transition: 'all 0.6s ease-out',
        transitionDelay: `${delay}ms`
      }}
    >
      <h3 className="text-sm font-medium text-gray-400 mb-2">{title}</h3>
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-xs text-gray-500">{subtitle}</div>
    </div>
  );
};

export default StatsCard;