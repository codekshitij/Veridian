// src/pages/dashboard/DashboardPage.jsx
import React from 'react';
import '../components/Dashboard.css';
import DashboardHeader from '../components/DashboardHeader'; // Adjust path if needed
import StatsCards from '../components/StatsCards';
import TodaysFocus from '../components/TodaysFocus';
import RecentActivity from '../components/RecentActivity';
import GoalsOverview from '../components/GoalsOverview';
import CalendarPreview from '../components/CalendarPreview';

function DashboardPage() {
  return (
    <div className="dashboard-container">
      <DashboardHeader />
      <StatsCards />
      <div className="dashboard-main-panels">
        <TodaysFocus />
        <div className="dashboard-side-panels">
          <CalendarPreview />
          <GoalsOverview />
        </div>
      </div>
      <RecentActivity />
    </div>
  );
}

export default DashboardPage;