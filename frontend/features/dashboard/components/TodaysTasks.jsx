import React from 'react';

const TodaysTasks = ({ tasks }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-lg font-semibold text-gray-900">Today's Tasks</h3>
      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
        {tasks.completed}/{tasks.total}
      </span>
    </div>
    
    <div className="space-y-4">
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Completed: {tasks.completed}</span>
        <span className="text-gray-600">Pending: {tasks.pending}</span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-green-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${(tasks.completed / tasks.total) * 100}%` }}
        ></div>
      </div>
      
      <div className="text-center text-gray-500 text-sm mt-4">
        {tasks.pending === 0 ? 
          "🎉 All tasks completed!" : 
          `${tasks.pending} tasks remaining`
        }
      </div>
    </div>
  </div>
);

export default TodaysTasks;