import { useState, useEffect } from 'react';

export const useDashboardData = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace with actual API calls
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // const response = await api.getDashboardData();
        // setDashboardData(response.data);
        
        // Mock data for now
        setDashboardData({
          todaysTasks: { completed: 8, pending: 4, total: 12 },
          weeklyStats: { tasksCompleted: 45, hoursWorked: 32, meetingsAttended: 12, ideasGenerated: 7 },
          upcomingMeetings: [
            { id: 1, title: "Team Standup", time: "10:00 AM", attendees: 5 },
            { id: 2, title: "Product Review", time: "2:30 PM", attendees: 8 },
            { id: 3, title: "Client Call", time: "4:00 PM", attendees: 3 }
          ],
          recentIdeas: [
            { id: 1, title: "Mobile App Enhancement", category: "Product", date: "2 hours ago" },
            { id: 2, title: "Marketing Campaign", category: "Strategy", date: "1 day ago" },
            { id: 3, title: "Team Workflow Optimization", category: "Process", date: "2 days ago" }
          ],
          okrs: [
            { id: 1, title: "Increase User Engagement", progress: 75, target: "Q1 2025" },
            { id: 2, title: "Launch New Feature Set", progress: 45, target: "Q1 2025" },
            { id: 3, title: "Improve Team Productivity", progress: 88, target: "Q1 2025" }
          ]
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return { dashboardData, loading, error };
};