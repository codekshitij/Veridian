import React from 'react';

import CalendarTaskItem from './CalendarTaskItem';

export default function CalendarTaskList({
  styles,
  todayTasks,
  isLoadingTasks,
  isToday,
  selectedDate,
  toggleTaskCompletion,
  onTaskClick
}) {
  return (
    <div style={{
      ...styles.tasksContainer,
      background: 'linear-gradient(120deg, #181F36 0%, #232B4E 100%)',
      border: '2.5px solid #8317ea',
      boxShadow: '0 8px 32px 0 #8317ea33, 0 2px 12px #232B4E22',
      color: '#F8FAFC',
      textAlign: 'center',
      width: '100%',
      padding: '6vw 15vw', // Responsive padding
      boxSizing: 'border-box',
      flex: 1,
    }}>
      <h3 style={{ marginBottom: '20px', color: '#fff', fontSize: '2em', fontWeight: 700, letterSpacing: '0.5px', textShadow: '0 2px 8px #8317ea44' }}>
        Today's Schedule
      </h3>
      {isLoadingTasks ? (
        <div style={styles.loadingContainer}>Loading tasks...</div>
      ) : todayTasks.length === 0 ? (
        <div style={{ textAlign: 'center', color: '#c4b5fd', padding: '40px', fontSize: '1.2em' }}>
          <p>No tasks scheduled for {isToday(selectedDate) ? 'today' : 'this date'}</p>
        </div>
      ) : (
        <div style={styles.tasksList}>
          {todayTasks
            .sort((a, b) => a.startTime.localeCompare(b.startTime))
            .map(task => (
              <CalendarTaskItem
                key={task.taskId}
                styles={styles}
                task={task}
                toggleTaskCompletion={toggleTaskCompletion}
                onTaskClick={onTaskClick}
              />
            ))}
        </div>
      )}
    </div>
  );
}
