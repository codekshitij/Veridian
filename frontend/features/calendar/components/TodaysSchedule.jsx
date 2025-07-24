import React from 'react';
import { isSameDay } from '../utils/calendarUtils';

const TodaysSchedule = ({ events, selectedDate }) => {
  const todaysEvents = events.filter(event => 
    isSameDay(new Date(event.date), selectedDate)
  );

  return (
    <div className="bg-gray-800 border border-purple-500 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-white mb-6 text-center">Today's Schedule</h3>
      
      {todaysEvents.length === 0 ? (
        <div className="text-center text-gray-400 py-8">
          <svg className="w-12 h-12 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p>No tasks scheduled for today</p>
        </div>
      ) : (
        <div className="space-y-3">
          {todaysEvents.map((event, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg hover:bg-gray-650 transition-colors"
            >
              <div className={`w-3 h-3 rounded-full ${
                event.type === 'meeting' ? 'bg-blue-500' :
                event.type === 'task' ? 'bg-green-500' :
                'bg-purple-500'
              }`}></div>
              
              <div className="flex-1">
                <h4 className="text-white font-medium">{event.title}</h4>
                <p className="text-sm text-gray-400">{event.time}</p>
              </div>
              
              <div className="text-xs text-gray-500">
                {event.type}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TodaysSchedule;