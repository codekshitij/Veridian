import React, { useState, useEffect } from 'react';

const InspirationalQuote = ({ quote }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`bg-gray-800 border border-purple-500 rounded-lg p-8 mb-8 text-center transition-all duration-700 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
    >
      <div className="relative">
        <svg className="w-8 h-8 text-purple-400 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
        </svg>
        <blockquote className="text-xl italic text-gray-300 mb-4">
          "{quote.text}"
        </blockquote>
        <cite className="text-purple-400 font-medium">— {quote.author}</cite>
      </div>
    </div>
  );
};

export default InspirationalQuote;