// CalendarHeader.jsx
// Header for the calendar (month/year, navigation, etc.)

import React from 'react';
import GooeyNav from './GooeyNav';

export default function CalendarHeader({
  styles,
  currentView,
  setCurrentView,
  VIEW_MODES,
  navigateDate,
  getDateDisplayText,
  setShowAddTaskModal
}) {
  // GooeyNav items for calendar header
  const items = [
    { label: 'Today', onClick: () => setCurrentView(VIEW_MODES.TODAY) },
    { label: 'Week', onClick: () => setCurrentView(VIEW_MODES.WEEKLY) },
    { label: 'Month', onClick: () => setCurrentView(VIEW_MODES.MONTHLY) },
  ];

  return (
    <div style={styles.header}>
      <h1 style={styles.title}>~/Calendar</h1>
      <div style={styles.headerControls}>
        {/* GooeyNav for view toggle */}
        <div style={{ minWidth: 320 }}>
          <GooeyNav
            items={items.map((item, idx) => ({
              ...item,
              href: '#',
            }))}
            initialActiveIndex={items.findIndex(item => {
              if (currentView === VIEW_MODES.TODAY && item.label === 'Today') return true;
              if (currentView === VIEW_MODES.WEEKLY && item.label === 'Week') return true;
              if (currentView === VIEW_MODES.MONTHLY && item.label === 'Month') return true;
              return false;
            })}
            animationTime={600}
            particleCount={15}
            particleDistances={[90, 10]}
            particleR={100}
            timeVariance={300}
            colors={[1, 2, 3, 1, 2, 3, 1, 4]}
            // Custom onClick for nav items
            onItemClick={idx => items[idx].onClick()}
          />
        </div>
        {/* Date Navigation */}
        <div style={styles.dateNav}>
          <button style={styles.navButton} onClick={() => navigateDate(-1)}>
            ←
          </button>
          <div style={styles.currentDate}>
            {getDateDisplayText()}
          </div>
          <button style={styles.navButton} onClick={() => navigateDate(1)}>
            →
          </button>
        </div>
        {/* Add Task Button */}
        <button style={styles.addButton} onClick={() => setShowAddTaskModal(true)}>
          + Add Task
        </button>
      </div>
    </div>
  );
}
