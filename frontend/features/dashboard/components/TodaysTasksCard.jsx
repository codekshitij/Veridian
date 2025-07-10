import React, { useEffect, useState } from 'react';
import calendarService from '../../calendar/services/calendarService';
import { formatDateToISO } from '../../calendar/utils/dateUtils';
import { useAuth } from '../../../src/contexts/authContext';

const cardStyles = {
  container: {
    width: '100%',
    background: 'rgba(26,26,26,0.65)',
    borderRadius: '16px',
    border: '2px solid #22ff55', // Bright green border
    padding: '2rem',
    margin: '0 0 2rem 0',
    color: '#F8FAFC',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
  },
  title: {
    fontSize: '1.4rem',
    fontWeight: 700,
    color: '#22ff55',
    marginBottom: '0.5rem',
  },
  stats: {
    display: 'flex',
    gap: '2rem',
    fontSize: '1.1rem',
    fontWeight: 600,
    color: '#a7ffb0',
  },
  taskList: {
    marginTop: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.7rem',
  },
  taskItem: completed => ({
    padding: '0.7rem 1.2rem',
    borderRadius: '10px',
    background: completed ? 'rgba(34,255,85,0.10)' : 'rgba(255,255,255,0.04)',
    color: completed ? '#22ff55' : '#F8FAFC',
    textDecoration: completed ? 'line-through' : 'none',
    fontWeight: completed ? 600 : 500,
    border: completed ? '1.5px solid #22ff55' : '1.5px solid #232B3E',
    display: 'flex',
    alignItems: 'center',
    gap: '0.7rem',
  }),
  empty: {
    color: '#64748B',
    fontStyle: 'italic',
    marginTop: '0.5rem',
  },
};

const TodaysTasksCard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError(null);
      try {
        const todayISO = formatDateToISO(new Date());
        const fetched = await calendarService.getTasks(user?.attributes?.sub, todayISO);
        setTasks(fetched || []);
      } catch (error) {
        setError('Failed to load today\'s tasks.');
      } finally {
        setLoading(false);
      }
    };
    if (user?.attributes?.sub) fetchTasks();
  }, [user]);

  const completed = tasks.filter(t => t.completed);
  const notCompleted = tasks.filter(t => !t.completed);

  return (
    <div style={cardStyles.container}>
      <div style={cardStyles.title}>Today's Tasks</div>
      <div style={cardStyles.stats}>
        <span>Completed: {completed.length}</span>
        <span>Pending: {notCompleted.length}</span>
        <span>Total: {tasks.length}</span>
      </div>
      <div style={cardStyles.taskList}>
        {loading ? (
          <span style={cardStyles.empty}>Loading tasks...</span>
        ) : error ? (
          <span style={cardStyles.empty}>{error}</span>
        ) : tasks.length === 0 ? (
          <span style={cardStyles.empty}>No tasks for today.</span>
        ) : (
          tasks.map(task => (
            <div key={task.taskId} style={cardStyles.taskItem(task.completed)}>
              <span>{task.title}</span>
              {task.completed && <span style={{fontSize: '1.1em'}}>✔️</span>}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TodaysTasksCard;
