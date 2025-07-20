import React from 'react';
import { getDaysInMonth, getFirstDayOfMonth, isSameDay } from '../utils/calendarUtils';

const CalendarGrid = ({ currentDate, events, onDateClick }) => {
  const today = new Date();
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Generate calendar grid
  const days = [];
  
  // Previous month's trailing days
  const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 0);
  for (let i = firstDay - 1; i >= 0; i--) {
    const day = prevMonth.getDate() - i;
    days.push({
      day,
      isCurrentMonth: false,
      date: new Date(prevMonth.getFullYear(), prevMonth.getMonth(), day)
    });
  }
  
  // Current month's days
  for (let day = 1; day <= daysInMonth; day++) {
    days.push({
      day,
      isCurrentMonth: true,
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    });
  }
  
  // Next month's leading days
  const remainingSlots = 42 - days.length;
  for (let day = 1; day <= remainingSlots; day++) {
    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, day);
    days.push({
      day,
      isCurrentMonth: false,
      date: nextMonth
    });
  }

  return (
    <div className="flex-1">
      {/* Days of week header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="p-4 text-center text-sm font-medium text-gray-400">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((dayInfo, index) => {
          const isToday = isSameDay(dayInfo.date, today);
          const dayEvents = events.filter(event => isSameDay(new Date(event.date), dayInfo.date));
          
          return (
            <div
              key={index}
              onClick={() => onDateClick(dayInfo.date)}
              className={`min-h-[120px] p-2 border border-gray-700 cursor-pointer transition-colors ${
                dayInfo.isCurrentMonth
                  ? 'bg-gray-800 hover:bg-gray-750'
                  : 'bg-gray-900 text-gray-600'
              } ${isToday ? 'ring-2 ring-purple-500' : ''}`}
            >
              <div className={`text-sm mb-2 ${isToday ? 'font-bold text-purple-400' : 'text-gray-300'}`}>
                {dayInfo.day}
              </div>
              
              {/* Events for this day */}
              <div className="space-y-1">
                {dayEvents.slice(0, 2).map((event, eventIndex) => (
                  <div
                    key={eventIndex}
                    className={`text-xs p-1 rounded truncate ${
                      event.type === 'meeting' ? 'bg-blue-600 text-white' :
                      event.type === 'task' ? 'bg-green-600 text-white' :
                      'bg-purple-600 text-white'
                    }`}
                  >
                    {event.title}
                  </div>
                ))}
                {dayEvents.length > 2 && (
                  <div className="text-xs text-gray-400">
                    +{dayEvents.length - 2} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;