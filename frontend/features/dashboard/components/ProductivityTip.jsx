import React from 'react';

const ProductivityTip = () => (
  <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl shadow-sm p-1">
    <div className="bg-white rounded-lg p-6">
      <div className="flex items-center space-x-3">
        <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
          <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-900">Productivity Tip</h4>
          <p className="text-gray-600">Break large tasks into smaller, manageable chunks. You'll feel more accomplished and maintain momentum throughout the day.</p>
        </div>
      </div>
    </div>
  </div>
);

export default ProductivityTip;