// CalendarPage.jsx
// Main page for the calendar feature

import React from 'react';
import CalendarView from '../components/CalendarView';

const CalendarPage = () => {
  return (
    <div style={{ padding: '2rem', minHeight: '100vh', background: '#0F0F23' }}>
      <CalendarView />
    </div>
  );
};

export default CalendarPage;
