import React from 'react';

const ProgressWidget = ({ progress }) => (
  <div className="bg-gray-800 border border-blue-500 rounded-lg p-6">
    <h3 className="text-lg font-semibold text-white mb-4">Progress</h3>
    <div className="text-center">
      <div className="text-3xl font-bold text-white mb-2">{progress}%</div>
      <div className="text-sm text-gray-400">Completed</div>
      
      {/* Progress bar */}
      <div className="w-full bg-gray-700 rounded-full h-2 mt-4">
        <div 
          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  </div>
);

export default ProgressWidget;