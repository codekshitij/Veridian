import React from 'react';

const IdeaCardSkeleton = () => (
  <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden animate-pulse">
    <div className="h-48 bg-gray-700"></div>
    <div className="p-6">
      <div className="h-4 bg-gray-700 rounded mb-4"></div>
      <div className="h-3 bg-gray-700 rounded mb-2"></div>
      <div className="h-3 bg-gray-700 rounded w-3/4"></div>
    </div>
  </div>
);

export default IdeaCardSkeleton;