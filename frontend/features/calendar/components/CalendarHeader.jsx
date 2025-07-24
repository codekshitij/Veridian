import React from 'react';
import { formatDate, getMonthName } from '../utils/calendarUtils';

const CalendarHeader = ({ currentDate, onDateChange, view, onViewChange }) => {
  const previousPeriod = () => {
    const newDate = new Date(currentDate);
    if (view === 'month') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setDate(newDate.getDate() - 1);
    }
    onDateChange(newDate);
  };

  const nextPeriod = () => {
    const newDate = new Date(currentDate);
    if (view === 'month') {
      newDate.setMonth(newDate.getMonth() + 1);
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    onDateChange(newDate);
  };

  const goToToday = () => {
    onDateChange(new Date());
  };

  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold text-white">~/Calendar</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        {/* View Toggle */}
        <div className="flex bg-gray-800 rounded-lg p-1">
          {['Today', 'Week', 'Month'].map((viewOption) => (
            <button
              key={viewOption}
              onClick={() => {
                if (viewOption === 'Today') {
                  goToToday();
                  onViewChange('day');
                } else {
                  onViewChange(viewOption.toLowerCase());
                }
              }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                (viewOption.toLowerCase() === view || (viewOption === 'Today' && view === 'day'))
                  ? 'bg-white text-gray-900'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {viewOption}
            </button>
          ))}
        </div>

        {/* Date Navigation */}
        <div className="flex items-center space-x-2">
          <button
            onClick={previousPeriod}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <span className="text-white font-medium min-w-[200px] text-center">
            {view === 'day' ? formatDate(currentDate) : getMonthName(currentDate)}
          </span>
          
          <button
            onClick={nextPeriod}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Add Task Button */}
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>+ Add Task</span>
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;