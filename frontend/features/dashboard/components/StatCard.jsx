import React from 'react';

const StatCard = ({ title, value, period, color, icon }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className={`text-xs text-${color}-600`}>{period}</p>
      </div>
      <div className={`h-12 w-12 bg-${color}-100 rounded-lg flex items-center justify-center`}>
        {icon}
      </div>
    </div>
  </div>
);

export default StatCard;