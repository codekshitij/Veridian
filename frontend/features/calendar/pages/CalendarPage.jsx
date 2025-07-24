import React, { useState } from 'react';
import { useAuth } from '../../../src/contexts/authContext';
import { useCalendarData } from '../hooks/useCalendarData';
import {
  CalendarHeader,
  CalendarGrid,
  WeekView,
  TodaysSchedule,
  TasksWidget,
  ProgressWidget,
  CompletedWidget
} from '../components';

const CalendarPage = () => {
  const { user } = useAuth();
  const { events, tasks, loading, error } = useCalendarData();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p>Loading calendar...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p>Error loading calendar: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="p-6">
        <CalendarHeader
          currentDate={currentDate}
          onDateChange={setCurrentDate}
          view={view}
          onViewChange={setView}
        />

        <div className="flex gap-6">
          {/* Main Calendar Area */}
          <div className="flex-1">
            {view === 'month' && (
              <CalendarGrid
                currentDate={currentDate}
                events={events}
                onDateClick={handleDateClick}
              />
            )}
            
            {view === 'week' && (
              <WeekView
                currentDate={currentDate}
                events={events}
              />
            )}
            
            {view === 'day' && (
              <div className="bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">
                  {currentDate.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </h2>
                <div className="text-gray-400">Day view coming soon...</div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-80 space-y-6">
            <TodaysSchedule events={events} selectedDate={selectedDate} />
            <TasksWidget tasks={tasks} />
            <ProgressWidget progress={tasks.progress} />
            <CompletedWidget completed={tasks.completed} total={tasks.total} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;