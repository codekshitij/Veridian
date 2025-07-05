import React from 'react';
import '../components/Dashboard.css';

const stats = [
  { label: 'Tasks Due', value: 5 },
  { label: 'Ideas This Week', value: 3 },
  { label: 'Goals Progress', value: '60%' },
  { label: 'Upcoming Events', value: 2 },
];

const StatsCards = () => (
  <div className="stats-cards-row">
    {stats.map((stat, idx) => (
      <div className="stats-card" key={idx}>
        <div className="stats-value">{stat.value}</div>
        <div className="stats-label">{stat.label}</div>
      </div>
    ))}
  </div>
);

export default StatsCards;
