import React from 'react';
import { animations } from '../utils/animations';

const EmptyState = ({ onNewIdea }) => (
  <div 
    className="text-center py-16"
    style={animations.fadeInUp}
  >
    <div className="mb-6">
      <svg className="w-24 h-24 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
      <h3 className="text-xl font-semibold text-gray-300 mb-2">No ideas yet</h3>
      <p className="text-gray-500 max-w-md mx-auto">
        Start capturing your brilliant ideas and watch your creativity flourish. Every great project begins with a single idea.
      </p>
    </div>
    <button
      onClick={onNewIdea}
      className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 transform"
    >
      Create Your First Idea
    </button>
  </div>
);

export default EmptyState;