import React from 'react';

const IdeaCanvasHeader = ({ onNewIdea, searchTerm, onSearchChange }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 space-y-4 md:space-y-0">
      
      {/* Left Side - Title & Description */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Idea Canvas</h1>
        <p className="text-gray-400">Capture, organize, and develop your brilliant ideas</p>
      </div>
      
      {/* Right Side - Search & New Idea Button */}
      <div className="flex items-center space-x-4">
        
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search ideas..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 pl-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 w-64"
          />
          <svg 
            className="w-4 h-4 text-gray-400 absolute left-3 top-3" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* New Idea Button */}
        <button
          onClick={onNewIdea}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>NEW IDEA</span>
        </button>
      </div>
    </div>
  );
};

export default IdeaCanvasHeader;