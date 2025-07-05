import React from 'react';
import { TASK_CATEGORIES, COMPLEXITY_LEVELS } from '../constants/categories';

export default function CalendarTaskItem({ styles, task, toggleTaskCompletion }) {
  return (
    <div
      key={task.taskId}
      style={{
        ...styles.taskItem,
        borderLeft: `4px solid ${TASK_CATEGORIES[task.category]?.color || '#008080'}`,
        ...(task.completed ? styles.taskCompleted : {})
      }}
    >
      <div style={styles.taskIcon}>
        {TASK_CATEGORIES[task.category]?.icon || '📝'}
      </div>
      <div style={styles.taskContent}>
        <div style={styles.taskTitle}>{task.title}</div>
        <div style={styles.taskTime}>
          <span>{task.startTime} - {task.endTime}</span>
          <span style={{ color: COMPLEXITY_LEVELS[task.complexity]?.color || '#666' }}>
            {COMPLEXITY_LEVELS[task.complexity]?.indicator || '●'}
          </span>
        </div>
        {task.description && (
          <div style={{ fontSize: '0.85em', color: '#777', marginTop: '4px' }}>
            {task.description}
          </div>
        )}
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleTaskCompletion(task.taskId);
        }}
        style={{
          ...styles.completeButton,
          background: task.completed ? '#4CAF50' : '#E0E0E0',
          color: task.completed ? 'white' : '#666'
        }}
      >
        {task.completed ? '✓ Done' : 'Mark Done'}
      </button>
    </div>
  );
}
