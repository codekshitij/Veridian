import React from 'react';

function getDayProgressPercent() {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
  const end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0);
  const percent = ((now - start) / (end - start)) * 100;
  return Math.max(0, Math.min(percent, 100));
}

function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

const barStyles = {
  container: {
    width: '100%',
    margin: '0 0 2rem 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '0.5rem',
  },
  date: {
    fontSize: '1.1rem',
    fontWeight: 600,
    color: '#a7ffb0',
    letterSpacing: '0.5px',
  },
  barBg: {
    width: '100%',
    height: '18px',
    background: 'rgba(34,255,85,0.12)',
    borderRadius: '10px',
    overflow: 'hidden',
    border: '1.5px solid #22ff55',
  },
  barFill: percent => ({
    width: `${percent}%`,
    height: '100%',
    background: 'linear-gradient(90deg, #22ff55 0%, #60A5FA 100%)',
    borderRadius: '10px',
    transition: 'width 0.5s cubic-bezier(.4,2,.6,1)',
    boxShadow: '0 2px 8px #22ff5544',
  }),
  percentText: {
    fontSize: '1rem',
    color: '#22ff55',
    fontWeight: 700,
    marginLeft: '0.5rem',
  },
};

const DayProgressBar = () => {
  const percent = getDayProgressPercent();
  const today = new Date();

  return (
    <div style={barStyles.container}>
      <span style={barStyles.date}>{formatDate(today)}</span>
      <div style={barStyles.barBg}>
        <div style={barStyles.barFill(percent)} />
      </div>
      <span style={barStyles.percentText}>{percent.toFixed(1)}% of the day completed</span>
    </div>
  );
};

export default DayProgressBar;
