import React, { useState, useEffect } from 'react';
import { truncateText, formatDate } from '../utils/ideaUtils';
import { getRandomGradient } from '../constant/gradients';

const IdeaCard = ({ idea, onClick, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      className={`group cursor-pointer transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      onClick={() => onClick(idea)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`bg-gray-800 border border-gray-700 rounded-lg overflow-hidden transition-all duration-300 hover:border-purple-500 hover:shadow-xl hover:shadow-purple-500/20 ${
        isHovered ? 'transform scale-105' : ''
      }`}>
        {/* Card Header with Gradient */}
        <div className={`h-32 bg-gradient-to-r ${getRandomGradient(index)} relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-white font-semibold text-lg leading-tight">
              {truncateText(idea.title, 40)}
            </h3>
          </div>
          {/* Floating Icons */}
          <div className="absolute top-3 right-3">
            <div className="bg-white bg-opacity-20 rounded-full p-2">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6">
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            {truncateText(idea.description, 120)}
          </p>
          
          {/* Card Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-500">
                {formatDate(idea.createdAt)}
              </span>
            </div>
            <div className="flex items-center space-x-1 text-gray-500 group-hover:text-purple-400 transition-colors">
              <span className="text-xs">View</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeaCard;