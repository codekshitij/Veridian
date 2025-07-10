// src/pages/dashboard/DashboardPage.jsx
import React from 'react';
// import { useAuth } from '../../../src/contexts/authContext';
// import '../components/Dashboard.css';
// import DashboardHeader from '../components/DashboardHeader';
// import StatsCards from '../components/StatsCards';
// import TodaysFocus from '../components/TodaysFocus';
// import RecentActivity from '../components/RecentActivity';
// import GoalsOverview from '../components/GoalsOverview';
// import CalendarPreview from '../components/CalendarPreview';


import DashboardHeader from '../components/DashboardHeader';
import OrangeProgressBar from '../components/OrangeProgressBar';
import TodaysTasksCard from '../components/TodaysTasksCard';

function DashboardPage() {
  return (
    <div
      className="dashboard-container"
      style={{
        minHeight: '60vh',
        padding: '3rem',
        paddingBottom: '13rem',
        backgroundColor: '#0F172A',
        border: '2px solid #334155',
        color: '#FFFFFF',
        boxSizing: 'border-box',
      }}
    >
      <DashboardHeader />
      <OrangeProgressBar />
      <TodaysTasksCard />

    </div>
  );
}

export default DashboardPage;