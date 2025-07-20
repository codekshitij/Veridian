import React from 'react';

const TasksWidget = ({ tasks }) => (
  <div className="bg-gray-800 border border-blue-500 rounded-lg p-6">
    <h3 className="text-lg font-semibold text-white mb-4">Tasks</h3>
    <div className="text-center">
      <div className="text-3xl font-bold text-white mb-2">{tasks.today}</div>
      <div className="text-sm text-gray-400">Today</div>
    </div>
  </div>
);

export default TasksWidget;