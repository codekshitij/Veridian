import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../src/contexts/authContext';
import { calculateDayProgress } from '../utils/dashboardUtils';
import { useDashboardData } from '../hooks/useDashboardData';
import {
  DashboardHeader,
  StatsOverview,
  TodaysTasks,
  UpcomingMeetings,
  OKRProgress,
  RecentIdeas,
  QuickActions,
  ProductivityTip
} from '../components';

const DashboardPage = () => {
  const { user } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [dayProgress, setDayProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      setDayProgress(calculateDayProgress(now));
    }, 60000);

    // Initial calculation
    const now = new Date();
    setDayProgress(calculateDayProgress(now));

    return () => clearInterval(timer);
  }, []);

  // Use the dashboard data hook
  const { dashboardData, loading, error } = useDashboardData();

  const userName = user?.attributes?.given_name || user?.name || "Developer";

  // Handle loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Dashboard</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  // Handle case when dashboardData is null
  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No dashboard data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <DashboardHeader 
          currentTime={currentTime} 
          dayProgress={dayProgress} 
          userName={userName} 
        />
        
        <StatsOverview stats={dashboardData.weeklyStats} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <TodaysTasks tasks={dashboardData.todaysTasks} />
          <UpcomingMeetings meetings={dashboardData.upcomingMeetings} />
          <OKRProgress okrs={dashboardData.okrs} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentIdeas ideas={dashboardData.recentIdeas} />
          <QuickActions />
        </div>

        <ProductivityTip />
      </div>
    </div>
  );
};

export default DashboardPage;