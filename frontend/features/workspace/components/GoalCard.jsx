// features/workspace/components/GoalCard.jsx
import React from 'react';
import TiltedCard from './TiltedCard';
import ProgressBar from './ProgressBar';
import { formatRelativeDate } from '../utils/dateUtils';
import { calculateProgress } from '../utils/progressUtils';
import './TiltedCard.css';

const cardStyles = {
  card: {
    background: 'rgba(30, 41, 59, 0.8)',
    border: '1px solid #334155',
    borderRadius: '12px',
    padding: '20px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    position: 'relative',
    backdropFilter: 'blur(10px)',
    minHeight: '200px',
    display: 'flex',
    flexDirection: 'column',
  },
  cardHover: {
    transform: 'translateY(-4px)',
    borderColor: '#60a5fa',
    boxShadow: '0 12px 32px rgba(96, 165, 250, 0.15)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '15px',
  },
  icon: {
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    flexShrink: 0,
    background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
    color: 'white',
    boxShadow: '0 4px 12px rgba(96, 165, 250, 0.25)',
  },
  iconProject: {
    background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
  },
  iconSkill: {
    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
  },
  iconHabit: {
    background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
  },
  iconTask: {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  },
  titleSection: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    fontSize: '1rem',
    color: '#e2e8f0',
    marginBottom: '4px',
    fontWeight: '600',
    lineHeight: '1.3',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  type: {
    fontSize: '0.75rem',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    fontWeight: '500',
  },
  statusIndicator: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    width: '8px',
    height: '8px',
    borderRadius: '50%',
  },
  statusActive: { 
    background: '#10b981',
    boxShadow: '0 0 8px rgba(16, 185, 129, 0.5)',
  },
  statusPaused: { 
    background: '#f59e0b',
    boxShadow: '0 0 8px rgba(245, 158, 11, 0.5)',
  },
  statusCompleted: { 
    background: '#8b5cf6',
    boxShadow: '0 0 8px rgba(139, 92, 246, 0.5)',
  },
  progressSection: {
    marginBottom: '15px',
    flex: 1,
  },
  progressHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  progressLabel: {
    fontSize: '0.8rem',
    color: '#94a3b8',
  },
  progressPercent: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#60a5fa',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '0.75rem',
    color: '#64748b',
    marginTop: 'auto',
  },
  timeline: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  itemsCount: {
    background: 'rgba(51, 65, 85, 0.8)',
    padding: '2px 8px',
    borderRadius: '12px',
    fontSize: '0.7rem',
    fontWeight: '500',
    color: '#cbd5e1',
  },
  description: {
    fontSize: '0.85rem',
    color: '#94a3b8',
    lineHeight: '1.4',
    marginBottom: '12px',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    textOverflow: 'ellipsis',
  },
};

const goalTypeIcons = {
  project: '🚀',
  skill: '🧠',
  habit: '⚡',
  task: '✅',
  learning: '📚',
  health: '💪',
  creative: '🎨',
  business: '💼',
};

const goalTypeStyles = {
  project: cardStyles.iconProject,
  skill: cardStyles.iconSkill,
  habit: cardStyles.iconHabit,
  task: cardStyles.iconTask,
  learning: cardStyles.iconSkill,
  health: cardStyles.iconHabit,
  creative: cardStyles.iconSkill,
  business: cardStyles.iconProject,
};

function GoalCard({ goal, onClick }) {
  const progress = calculateProgress(goal);
  const statusStyles = {
    active: cardStyles.statusActive,
    paused: cardStyles.statusPaused,
    completed: cardStyles.statusCompleted,
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(goal);
    }
  };

  return (
    <TiltedCard
      containerHeight="300px"
      containerWidth="100%"
      imageHeight="300px"
      imageWidth="100%"
      scaleOnHover={1.05}
      rotateAmplitude={10}
      showMobileWarning={false}
      showTooltip={true}
    >
      <div
        style={{
          ...cardStyles.card,
          ...goalTypeStyles[goal.type],
          boxShadow: 'none',
          background: 'rgba(30, 41, 59, 0.8)',
          position: 'relative',
          minHeight: '200px',
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 2,
        }}
        onClick={() => onClick(goal)}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label={`Open ${goal.title} goal details`}
      >
        <div 
          style={{
            ...cardStyles.statusIndicator,
            ...statusStyles[goal.status],
          }}
          aria-label={`Status: ${goal.status}`}
        />

        <div style={cardStyles.header}>
          <div 
            style={{
              ...cardStyles.icon,
              ...goalTypeStyles[goal.type],
            }}
          >
            {goalTypeIcons[goal.type] || '🎯'}
          </div>
          <div style={cardStyles.titleSection}>
            <div style={cardStyles.title}>{goal.title}</div>
            <div style={cardStyles.type}>{goal.type}</div>
          </div>
        </div>

        {goal.description && (
          <div style={cardStyles.description}>
            {goal.description}
          </div>
        )}

        <div style={cardStyles.progressSection}>
          <div style={cardStyles.progressHeader}>
            <span style={cardStyles.progressLabel}>Progress</span>
            <span style={cardStyles.progressPercent}>{Math.round(progress)}%</span>
          </div>
          <ProgressBar progress={progress} />
        </div>

        <div style={cardStyles.footer}>
          <div style={cardStyles.timeline}>
            <span>📅</span>
            <span>{formatRelativeDate(goal.startDate)}</span>
          </div>
          <div style={cardStyles.itemsCount}>
            {goal.tasks?.length || 0} tasks
          </div>
        </div>
      </div>
    </TiltedCard>
  );
}

export default GoalCard;