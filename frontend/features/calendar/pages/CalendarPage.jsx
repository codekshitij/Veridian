import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../src/contexts/authContext';
import calendarService from '../services/calendarService';
import { TASK_CATEGORIES, COMPLEXITY_LEVELS } from '../constants/categories';
import { VIEW_MODES } from '../constants/viewModes';
import { formatDate, formatDateToISO, isToday } from '../utils/dateUtils';
import CalendarHeader from '../components/CalendarHeader';
import CalendarTaskList from '../components/CalendarTaskList';
import SpotlightCard from '../components/SpotlightCard';

function CalendarPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  
  // State management
  const [currentView, setCurrentView] = useState(VIEW_MODES.TODAY);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [isLoadingTasks, setIsLoadingTasks] = useState(true);
  const [error, setError] = useState(null);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);

  // Fetch tasks when component mounts or date changes
  useEffect(() => {
    if (isAuthenticated && user?.attributes?.sub) {
      fetchTasks();
    }
  }, [isAuthenticated, user, selectedDate]);

  const fetchTasks = async () => {
    setIsLoadingTasks(true);
    setError(null);
    
    try {
      const startDate = formatDateToISO(selectedDate);
      const fetchedTasks = await calendarService.getTasks(user.attributes.sub, startDate);
      setTasks(fetchedTasks || []);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('Failed to load tasks. Please try refreshing.');
    } finally {
      setIsLoadingTasks(false);
    }
  };

  // Task management functions
  const handleTaskCreated = (newTask) => {
    setTasks(prevTasks => [...prevTasks, newTask]);
    setShowAddTaskModal(false);
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.taskId === updatedTask.taskId ? updatedTask : task
      )
    );
  };

  const handleTaskDeleted = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.taskId !== taskId));
  };

  const toggleTaskCompletion = async (taskId) => {
    try {
      const task = tasks.find(t => t.taskId === taskId);
      if (!task) return;

      const updatedTask = await calendarService.toggleTaskCompletion(taskId, !task.completed);
      handleTaskUpdated(updatedTask);
    } catch (err) {
      console.error('Error updating task:', err);
      setError('Failed to update task');
    }
  };

  // Navigation functions
  const navigateDate = (direction) => {
    const newDate = new Date(selectedDate);
    if (currentView === VIEW_MODES.TODAY) {
      newDate.setDate(selectedDate.getDate() + direction);
    } else if (currentView === VIEW_MODES.WEEKLY) {
      newDate.setDate(selectedDate.getDate() + (direction * 7));
    } else if (currentView === VIEW_MODES.MONTHLY) {
      newDate.setMonth(selectedDate.getMonth() + direction);
    }
    setSelectedDate(newDate);
  };

  // Get display text for current view
  const getDateDisplayText = () => {
    if (currentView === VIEW_MODES.TODAY) {
      return formatDate(selectedDate, 'long');
    } else if (currentView === VIEW_MODES.WEEKLY) {
      // Week range logic would go here
      return `Week of ${formatDate(selectedDate, 'short')}`;
    } else {
      return selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }
  };

  // Calculate insights
  const todayTasks = tasks.filter(task => task.date === formatDateToISO(selectedDate));
  const completedTasks = todayTasks.filter(task => task.completed);
  const completionRate = todayTasks.length > 0 ? Math.round((completedTasks.length / todayTasks.length) * 100) : 0;

  // Styles following your app's design patterns
  const styles = {
    container: {
      fontFamily: 'var(--font-family, Inter, Poppins, Nunito, sans-serif)',
      padding: '32px',
      background: 'linear-gradient(120deg, #0B1120 0%, #1E293B 100%)',
      borderRadius: '18px',
      boxShadow: '0 8px 32px rgba(30,41,59,0.18)',
      margin: '20px 20px',
      color: '#e2e8f0',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '32px',
      paddingBottom: '18px',
      borderBottom: '2px solid #232B3E',
    },
    title: {
      fontFamily: 'var(--font-family, Inter, Poppins, Nunito, sans-serif)',
      fontSize: '2.4em',
      fontWeight: 800,
      color: '#fff',
      margin: 0,
      letterSpacing: '0.5px',
      textShadow: '0 2px 8px #0f172a44',
    },
    headerControls: {
      display: 'flex',
      alignItems: 'center',
      gap: '24px',
    },
    viewToggle: {
      display: 'flex',
      gap: '6px',
      background: 'rgba(30,41,59,0.7)',
      borderRadius: '10px',
      padding: '6px',
      boxShadow: '0 2px 8px #a21caf44', // purple shadow
    },
    viewButton: {
      fontFamily: 'var(--font-family, Inter, Poppins, Nunito, sans-serif)',
      padding: '10px 20px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      fontWeight: 700,
      transition: 'all 0.2s',
      background: 'transparent',
      color: '#c4b5fd', // purple-ish text
      fontSize: '1em',
      letterSpacing: '0.5px',
    },
    activeViewButton: {
      background: 'linear-gradient(90deg, #8317ea 0%, #844fdb 100%)', // purple gradient
      color: '#fff',
      boxShadow: '0 2px 8px #a21caf44', // purple shadow
    },
    dateNav: {
      display: 'flex',
      alignItems: 'center',
      gap: '18px',
    },
    navButton: {
      background: 'none',
      border: '2px solid #8317ea', // purple border
      borderRadius: '10px',
      padding: '8px 16px',
      cursor: 'pointer',
      color: '#8317ea', // purple text
      fontWeight: 700,
      fontSize: '1.1em',
      transition: 'all 0.2s',
    },
    currentDate: {
      fontFamily: 'var(--font-family, Inter, Poppins, Nunito, sans-serif)',
      fontSize: '1.15em',
      fontWeight: 700,
      color: '#fff',
      minWidth: '200px',
      textAlign: 'center',
      letterSpacing: '0.5px',
    },
    addButton: {
      background: 'linear-gradient(90deg, #8317ea 0%, #844fdb 100%)', // purple gradient
      color: 'white',
      border: 'none',
      borderRadius: '10px',
      padding: '12px 28px',
      cursor: 'pointer',
      fontWeight: 800,
      fontSize: '1.1em',
      boxShadow: '0 2px 8px #a21caf44', // purple shadow
      letterSpacing: '0.5px',
    },
    loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '200px',
      color: '#22d3ee',
      fontSize: '1.2em',
    },
    errorContainer: {
      background: 'rgba(239,68,68,0.12)',
      color: '#ef4444',
      padding: '18px',
      borderRadius: '10px',
      margin: '24px 0',
      textAlign: 'center',
      fontWeight: 700,
      fontSize: '1.1em',
    },
    mainContent: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: '36px',
      width: '100%',
      maxWidth: '1500px',
      margin: '0 auto',
      justifyContent: 'space-between', // Pushes sidebar to the far right
    },
    tasksContainer: {
      background: 'linear-gradient(120deg, #172554 0%, #1e293b 100%)',
      borderRadius: '22px',
      padding: '6vw 8vw',
      boxShadow: '0 8px 32px 0 #0ea5e944, 0 2px 12px #33415522',
      minHeight: '600px',
      minWidth: '300px',
      width: '100%',
      maxWidth: '100%',
      marginRight: '0',
      marginLeft: '0',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      border: '2.5px solid #8317ea',
      transition: 'all 0.3s cubic-bezier(.4,2,.6,1)',
      zIndex: 2,
      flex: 1,
    },
    sidebar: {
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      minWidth: '300px',
      maxWidth: '340px',
      zIndex: 1,
      position: 'relative',
      flexShrink: 0,
      alignSelf: 'stretch',
    },
    insightCard: {
      background: 'rgba(30,41,59,0.85)', // dark background like other cards
      color: 'white',
      padding: '24px',
      borderRadius: '14px',
      textAlign: 'center',
      border: '2.5px solid #8317ea', // purple border
      boxShadow: '0 2px 12px #a21caf22', // subtle purple shadow
    },
    insightTitle: {
      fontFamily: 'var(--font-family, Inter, Poppins, Nunito, sans-serif)',
      fontSize: '1.15em',
      fontWeight: 700,
      marginBottom: '10px',
      letterSpacing: '0.5px',
    },
    insightValue: {
      fontFamily: 'var(--font-family, Inter, Poppins, Nunito, sans-serif)',
      fontSize: '2.7em',
      fontWeight: 800,
      marginBottom: '5px',
      letterSpacing: '1px',
      textShadow: '0 2px 8px #0ea5e944',
    },
    insightLabel: {
      fontFamily: 'var(--font-family, Inter, Poppins, Nunito, sans-serif)',
      fontSize: '1em',
      opacity: 0.92,
      letterSpacing: '0.5px',
    },
    tasksList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },
    taskItem: {
      background: 'rgba(30,41,59,0.85)',
      border: '1.5px solid #334155',
      borderRadius: '10px',
      padding: '18px',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      transition: 'all 0.2s',
      cursor: 'pointer',
      boxShadow: '0 2px 8px #33415522',
    },
    taskCompleted: {
      opacity: 0.5,
      textDecoration: 'line-through',
    },
    taskIcon: {
      fontSize: '1.5em',
      filter: 'drop-shadow(0 2px 4px #22d3ee44)',
    },
    taskContent: {
      flex: 1,
    },
    taskTitle: {
      fontFamily: 'var(--font-family, Inter, Poppins, Nunito, sans-serif)',
      fontWeight: 700,
      color: '#fff',
      marginBottom: '4px',
      fontSize: '1.1em',
      letterSpacing: '0.5px',
    },
    taskTime: {
      fontFamily: 'var(--font-family, Inter, Poppins, Nunito, sans-serif)',
      fontSize: '1em',
      color: '#a78bfa', // purple
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontWeight: 700,
    },
    completeButton: {
      fontFamily: 'var(--font-family, Inter, Poppins, Nunito, sans-serif)',
      padding: '7px 16px',
      borderRadius: '22px',
      border: 'none',
      fontSize: '0.95em',
      cursor: 'pointer',
      fontWeight: 800,
      background: 'linear-gradient(90deg, #8317ea 0%, #844fdb 100%)', // purple gradient
      color: '#fff',
      boxShadow: '0 2px 8px #a21caf22', // purple shadow
      letterSpacing: '0.5px',
      transition: 'all 0.2s',
    },
  };

  // Loading state
  if (authLoading) {
    return (
      <div style={styles.container}>
        <div style={styles.loadingContainer}>
          Loading application...
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated) {
    return (
      <div style={styles.container}>
        <div style={styles.loadingContainer}>
          Please log in to access your calendar.
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <CalendarHeader
        styles={styles}
        currentView={currentView}
        setCurrentView={setCurrentView}
        VIEW_MODES={VIEW_MODES}
        navigateDate={navigateDate}
        getDateDisplayText={getDateDisplayText}
        setShowAddTaskModal={setShowAddTaskModal}
      />

      {/* Error Display */}
      {error && (
        <div style={styles.errorContainer}>
          {error}
          <button onClick={fetchTasks} style={{ marginLeft: '10px', padding: '5px 10px' }}>
            Retry
          </button>
        </div>
      )}

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Tasks Container with SpotlightCard */}
        <SpotlightCard spotlightColor="rgba(131, 23, 234, 0.18)" style={{height: '100%'}}>
          <CalendarTaskList
            styles={styles}
            todayTasks={todayTasks}
            isLoadingTasks={isLoadingTasks}
            isToday={isToday}
            selectedDate={selectedDate}
            toggleTaskCompletion={toggleTaskCompletion}
          />
        </SpotlightCard>

        {/* Sidebar insight cards */}
        <div style={styles.sidebar}>
          <div style={styles.insightCard}>
            <div style={styles.insightTitle}>Tasks</div>
            <div style={styles.insightValue}>{todayTasks.length}</div>
            <div style={styles.insightLabel}>Today</div>
          </div>
          <div style={styles.insightCard}>
            <div style={styles.insightTitle}>Progress</div>
            <div style={styles.insightValue}>{completionRate}%</div>
            <div style={styles.insightLabel}>Completed</div>
          </div>
          <div style={styles.insightCard}>
            <div style={styles.insightTitle}>Completed</div>
            <div style={styles.insightValue}>{completedTasks.length}</div>
            <div style={styles.insightLabel}>of {todayTasks.length} tasks</div>
          </div>
        </div>
      </div>

      {/* Add Task Modal - We'll create this component next */}
      {showAddTaskModal && (
        <div>Task Creation Modal Placeholder</div>
      )}
    </div>
  );
}

export default CalendarPage;