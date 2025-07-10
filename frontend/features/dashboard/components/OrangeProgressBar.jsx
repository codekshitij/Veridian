import React from 'react';

function getDayProgressPercent() {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
  const end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0);
  const percent = ((now - start) / (end - start)) * 100;
  return Math.max(0, Math.min(percent, 100));
}

const barStyles = {
  card: {
    width: '100%',
    background: 'rgba(26,26,26,0.65)',
    borderRadius: '16px',
    border: '2px solid #ff9800',
    boxShadow: '0 2px 12px #ff980044',
    padding: '2rem',
    margin: '0 0 2rem 0',
    color: '#F8FAFC',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
    alignItems: 'flex-start',
  },
  date: {
    fontSize: '2rem',
    fontWeight: 800,
    color: '#60A5FA', // Soft blue for contrast
    letterSpacing: '0.5px',
    marginBottom: '0.5rem',
  },
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '0.5rem',
  },
  barBg: {
    width: '100%',
    height: '18px',
    background: 'rgba(255, 140, 0, 0.10)',
    borderRadius: '10px',
    overflow: 'hidden',
    border: '1.5px solid #ff9800',
  },
  barFill: percent => ({
    width: `${percent}%`,
    height: '100%',
    background: 'linear-gradient(90deg, #ff9800 0%, #ffb347 100%)',
    borderRadius: '10px',
    transition: 'width 0.5s cubic-bezier(.4,2,.6,1)',
    boxShadow: '0 2px 8px #ff980044',
  }),
  percentText: {
    fontSize: '1.4rem',
    color: '#ef4444', // Red
    fontWeight: 800,
    marginLeft: '0.5rem',
    marginTop: '0.7rem',
  },
};

function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

const OrangeProgressBar = () => {
  const percent = getDayProgressPercent();
  const today = new Date();
  return (
    <div style={barStyles.card}>
      <div style={barStyles.date}>{formatDate(today)}</div>
      <div style={barStyles.container}>
        <div style={barStyles.barBg}>
          <div style={barStyles.barFill(percent)} />
        </div>
        <span style={barStyles.percentText}>{percent.toFixed(1)}% of the day completed</span>
      </div>
    </div>
  );
};

export default OrangeProgressBar;
