import React from 'react';

const CompletedWidget = ({ completed, total }) => (
  <div className="bg-gray-800 border border-blue-500 rounded-lg p-6">
    <h3 className="text-lg font-semibold text-white mb-4">Completed</h3>
    <div className="text-center">
      <div className="text-3xl font-bold text-white mb-2">{completed}</div>
      <div className="text-sm text-gray-400">of {total} tasks</div>
      
      {/* Completion indicator */}
      {total > 0 && (
        <div className="flex items-center justify-center mt-4">
          <div className="flex space-x-1">
            {Array.from({ length: Math.min(total, 5) }, (_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i < completed ? 'bg-green-500' : 'bg-gray-600'
                }`}
              ></div>
            ))}
            {total > 5 && (
              <span className="text-xs text-gray-400 ml-1">+{total - 5}</span>
            )}
          </div>
        </div>
      )}
    </div>
  </div>
);

export default CompletedWidget;