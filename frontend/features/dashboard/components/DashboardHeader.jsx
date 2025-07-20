import React from 'react';
import { formatDate, getGreeting } from '../utils/dashboardUtils';

const DashboardHeader = ({ currentTime, dayProgress, userName }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {getGreeting(currentTime.getHours())}, {userName}!
        </h1>
        <p className="text-lg text-gray-600">
          {formatDate(currentTime)}
        </p>
      </div>
      <div className="mt-4 md:mt-0 text-right">
        <div className="text-sm text-gray-500 mb-2">Day Progress</div>
        <div className="flex items-center space-x-3">
          <div className="w-32 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${dayProgress}%` }}
            ></div>
          </div>
          <span className="text-sm font-medium text-gray-700">
            {dayProgress.toFixed(1)}%
          </span>
        </div>
      </div>
    </div>
  </div>
);

export default DashboardHeader;