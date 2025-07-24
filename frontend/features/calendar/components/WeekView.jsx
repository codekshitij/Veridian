import React from 'react';
import { isSameDay, getWeekStart, getWeekDays } from '../utils/calendarUtils';

const WeekView = ({ currentDate, events }) => {
  const startOfWeek = getWeekStart(currentDate);
  const weekDays = getWeekDays(startOfWeek);
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const formatHour = (hour) => {
    if (hour === 0) return '12 AM';
    if (hour < 12) return `${hour} AM`;
    if (hour === 12) return '12 PM';
    return `${hour - 12} PM`;
  };

  return (
    <div className="flex-1 bg-gray-800 rounded-lg overflow-hidden">
      <div className="grid grid-cols-8 gap-1">
        {/* Time column */}
        <div className="col-span-1 bg-gray-900">
          <div className="h-12 border-b border-gray-700"></div>
          {hours.map(hour => (
            <div key={hour} className="h-12 flex items-center justify-end pr-2 text-xs text-gray-400 border-b border-gray-700">
              {formatHour(hour)}
            </div>
          ))}
        </div>

        {/* Week days */}
        {weekDays.map((day, dayIndex) => (
          <div key={dayIndex} className="col-span-1">
            {/* Day header */}
            <div className="h-12 flex flex-col items-center justify-center border-b border-gray-700 bg-gray-800">
              <div className="text-xs text-gray-400">
                {day.toLocaleDateString('en-US', { weekday: 'short' })}
              </div>
              <div className={`text-sm font-medium ${
                isSameDay(day, new Date()) ? 'text-purple-400' : 'text-white'
              }`}>
                {day.getDate()}
              </div>
            </div>

            {/* Hour slots */}
            {hours.map(hour => {
              const dayEvents = events.filter(event => {
                const eventDate = new Date(event.date);
                const eventHour = new Date(`1970-01-01 ${event.time}`).getHours();
                return isSameDay(eventDate, day) && eventHour === hour;
              });

              return (
                <div key={hour} className="h-12 border-b border-gray-700 border-r border-gray-700 relative hover:bg-gray-750 transition-colors">
                  {dayEvents.map((event, eventIndex) => (
                    <div
                      key={eventIndex}
                      className={`absolute inset-x-1 top-1 bottom-1 rounded text-xs p-1 truncate cursor-pointer hover:opacity-80 ${
                        event.type === 'meeting' ? 'bg-blue-600 text-white' :
                        event.type === 'task' ? 'bg-green-600 text-white' :
                        'bg-purple-600 text-white'
                      }`}
                      title={`${event.title} - ${event.time}`}
                    >
                      {event.title}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekView;