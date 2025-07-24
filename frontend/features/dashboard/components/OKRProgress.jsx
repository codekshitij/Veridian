import React from 'react';

const OKRProgress = ({ okrs }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-lg font-semibold text-gray-900">OKR Progress</h3>
      <span className="text-xs text-gray-500">Q1 2025</span>
    </div>
    
    <div className="space-y-4">
      {okrs.map((okr) => (
        <div key={okr.id} className="space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium text-gray-900 truncate">{okr.title}</p>
            <span className="text-xs text-gray-500">{okr.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                okr.progress >= 80 ? 'bg-green-500' : 
                okr.progress >= 50 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${okr.progress}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default OKRProgress;