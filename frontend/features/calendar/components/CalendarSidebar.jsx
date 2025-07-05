import React from 'react';

export default function CalendarSidebar({
  styles,
  todayTasks,
  completedTasks,
  completionRate,
  selectedDate,
  isToday
}) {
  return (
    <div style={styles.sidebar}>
      {/* Tasks Count */}
      <div style={styles.insightCard}>
        <div style={styles.insightTitle}>Tasks</div>
        <div style={styles.insightValue}>{todayTasks.length}</div>
        <div style={styles.insightLabel}>
          {isToday(selectedDate) ? 'Today' : 'This Date'}
        </div>
      </div>
      {/* Completion Rate */}
      <div style={styles.insightCard}>
        <div style={styles.insightTitle}>Progress</div>
        <div style={styles.insightValue}>{completionRate}%</div>
        <div style={styles.insightLabel}>Completed</div>
      </div>
      {/* Completed Tasks */}
      <div style={styles.insightCard}>
        <div style={styles.insightTitle}>Completed</div>
        <div style={styles.insightValue}>{completedTasks.length}</div>
        <div style={styles.insightLabel}>
          of {todayTasks.length} tasks
        </div>
      </div>
    </div>
  );
}
