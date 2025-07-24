import React from 'react';

const QuickActionButton = ({ title, color, icon, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center p-4 bg-gradient-to-br from-${color}-50 to-${color}-100 rounded-lg hover:from-${color}-100 hover:to-${color}-200 transition-all duration-200 group`}
  >
    <div className={`h-12 w-12 bg-${color}-500 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <span className="text-sm font-medium text-gray-900">{title}</span>
  </button>
);

export default QuickActionButton;