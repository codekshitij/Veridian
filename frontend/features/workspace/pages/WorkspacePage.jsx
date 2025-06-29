// features/workspace/pages/WorkspacePage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../src/contexts/authContext';
import GoalCard from '../components/GoalCard';
import GoalModal from '../components/GoalModal';
import AddGoalModal from '../components/AddGoalModal';
import PeriodSelector from '../components/PeriodSelector';
import workspaceService from '../services/workspaceService';

const workspaceStyles = {
  container: {
    fontFamily: "'JetBrains Mono', 'SF Mono', 'Monaco', monospace",
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    color: '#e2e8f0',
    minHeight: 'calc(100vh - 120px)',
    padding: '20px',
    borderRadius: '12px',
    position: 'relative',
  },
  header: {
    marginBottom: '30px',
    paddingBottom: '20px',
    borderBottom: '1px solid #334155',
  },
  headerTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
    flexWrap: 'wrap',
    gap: '15px',
  },
  title: {
    fontSize: '2rem',
    color: '#60a5fa',
    fontWeight: '600',
    margin: 0,
  },
  subtitle: {
    color: '#94a3b8',
    fontSize: '0.9rem',
    marginTop: '5px',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    flexWrap: 'wrap',
  },
  addButton: {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    border: 'none',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontFamily: 'inherit',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  goalsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '20px',
    marginBottom: '30px',
  },
  loadingText: {
    textAlign: 'center',
    color: '#94a3b8',
    padding: '40px',
    fontSize: '1rem',
  },
  errorText: {
    textAlign: 'center',
    color: '#f87171',
    padding: '40px',
    fontSize: '1rem',
  },
  emptyState: {
    textAlign: 'center',
    color: '#94a3b8',
    padding: '60px 20px',
  },
  emptyIcon: {
    fontSize: '4rem',
    marginBottom: '20px',
    opacity: 0.5,
  },
  emptyTitle: {
    fontSize: '1.5rem',
    marginBottom: '10px',
    color: '#cbd5e1',
  },
  emptySubtitle: {
    fontSize: '1rem',
    lineHeight: 1.6,
    maxWidth: '400px',
    margin: '0 auto',
  },
  statsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '15px',
    marginBottom: '30px',
    padding: '20px',
    background: 'rgba(30, 41, 59, 0.5)',
    borderRadius: '12px',
    border: '1px solid #334155',
  },
  statCard: {
    textAlign: 'center',
    padding: '15px',
  },
  statNumber: {
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '5px',
  },
  statLabel: {
    fontSize: '0.85rem',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  statActive: { color: '#10b981' },
  statPaused: { color: '#f59e0b' },
  statCompleted: { color: '#8b5cf6' },
  statTotal: { color: '#60a5fa' },
};

function WorkspacePage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const [goals, setGoals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
    endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 3, 0).toISOString().split('T')[0]
  });

  // Fetch goals from AWS
  const fetchGoals = async () => {
    if (!isAuthenticated || !user?.attributes?.sub) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const fetchedGoals = await workspaceService.getGoals(user.attributes.sub, dateRange);
      setGoals(fetchedGoals || []);
    } catch (err) {
      console.error('Error fetching goals:', err);
      setError('Failed to load goals. Please try refreshing.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user?.attributes?.sub) {
      fetchGoals();
    }
  }, [isAuthenticated, user, dateRange]);

  // Calculate stats
  const stats = React.useMemo(() => {
    const total = goals.length;
    const active = goals.filter(g => g.status === 'active').length;
    const paused = goals.filter(g => g.status === 'paused').length;
    const completed = goals.filter(g => g.status === 'completed').length;
    
    return { total, active, paused, completed };
  }, [goals]);

  // Handle goal actions
  const handleGoalAdded = (newGoal) => {
    setGoals(prev => [...prev, newGoal]);
    setShowAddModal(false);
  };

  const handleGoalUpdated = (updatedGoal) => {
    setGoals(prev => 
      prev.map(goal => 
        goal.goalId === updatedGoal.goalId ? updatedGoal : goal
      )
    );
    setSelectedGoal(null);
  };

  const handleGoalDeleted = (goalId) => {
    setGoals(prev => prev.filter(goal => goal.goalId !== goalId));
    setSelectedGoal(null);
  };

  const handleCardClick = (goal) => {
    setSelectedGoal(goal);
  };

  const handlePeriodChange = (newDateRange) => {
    setDateRange(newDateRange);
  };

  if (authLoading) {
    return <div style={workspaceStyles.loadingText}>Loading application...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div style={workspaceStyles.emptyState}>
        <div style={workspaceStyles.emptyIcon}>🔒</div>
        <h3 style={workspaceStyles.emptyTitle}>Authentication Required</h3>
        <p style={workspaceStyles.emptySubtitle}>
          Please log in to access your personal workspace.
        </p>
      </div>
    );
  }

  return (
    <div style={workspaceStyles.container}>
      <div style={workspaceStyles.header}>
        <div style={workspaceStyles.headerTop}>
          <div>
            <h1 style={workspaceStyles.title}>~/workspace</h1>
            <p style={workspaceStyles.subtitle}>
              Personal development & project tracking
            </p>
          </div>
          <div style={workspaceStyles.controls}>
            <PeriodSelector 
              dateRange={dateRange}
              onChange={handlePeriodChange}
            />
            <button 
              style={workspaceStyles.addButton}
              onClick={() => setShowAddModal(true)}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              <span>+</span> New Goal
            </button>
          </div>
        </div>

        {goals.length > 0 && (
          <div style={workspaceStyles.statsContainer}>
            <div style={workspaceStyles.statCard}>
              <div style={{...workspaceStyles.statNumber, ...workspaceStyles.statTotal}}>
                {stats.total}
              </div>
              <div style={workspaceStyles.statLabel}>Total Goals</div>
            </div>
            <div style={workspaceStyles.statCard}>
              <div style={{...workspaceStyles.statNumber, ...workspaceStyles.statActive}}>
                {stats.active}
              </div>
              <div style={workspaceStyles.statLabel}>Active</div>
            </div>
            <div style={workspaceStyles.statCard}>
              <div style={{...workspaceStyles.statNumber, ...workspaceStyles.statPaused}}>
                {stats.paused}
              </div>
              <div style={workspaceStyles.statLabel}>Paused</div>
            </div>
            <div style={workspaceStyles.statCard}>
              <div style={{...workspaceStyles.statNumber, ...workspaceStyles.statCompleted}}>
                {stats.completed}
              </div>
              <div style={workspaceStyles.statLabel}>Completed</div>
            </div>
          </div>
        )}
      </div>

      {isLoading && (
        <div style={workspaceStyles.loadingText}>
          Loading your goals...
        </div>
      )}

      {error && (
        <div style={workspaceStyles.errorText}>
          {error}
        </div>
      )}

      {!isLoading && !error && goals.length === 0 && (
        <div style={workspaceStyles.emptyState}>
          <div style={workspaceStyles.emptyIcon}>🎯</div>
          <h3 style={workspaceStyles.emptyTitle}>No Goals Yet</h3>
          <p style={workspaceStyles.emptySubtitle}>
            Start tracking your personal projects, learning goals, habits, and tasks. 
            Click "New Goal" to create your first objective.
          </p>
        </div>
      )}

      {!isLoading && !error && goals.length > 0 && (
        <div style={workspaceStyles.goalsGrid}>
          {goals.map((goal) => (
            <GoalCard
              key={goal.goalId}
              goal={goal}
              onClick={() => handleCardClick(goal)}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      {showAddModal && (
        <AddGoalModal
          onClose={() => setShowAddModal(false)}
          onGoalAdded={handleGoalAdded}
          userId={user.attributes.sub}
        />
      )}

      {selectedGoal && (
        <GoalModal
          goal={selectedGoal}
          onClose={() => setSelectedGoal(null)}
          onGoalUpdated={handleGoalUpdated}
          onGoalDeleted={handleGoalDeleted}
          userId={user.attributes.sub}
        />
      )}
    </div>
  );
}

export default WorkspacePage;