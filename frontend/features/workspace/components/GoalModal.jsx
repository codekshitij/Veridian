// features/workspace/components/GoalModal.jsx
import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import ProgressBar from './ProgressBar';
import { calculateProgress, getProgressStatus, formatProgress } from '../utils/progressUtils';
import { formatDisplayDate, formatDateRange } from '../utils/dateUtils';
import { goalTypeConfigs, goalStatuses, priorities, createDefaultTask } from '../types/workspaceTypes';
import workspaceService from '../services/workspaceService';

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(4px)',
  },
  modal: {
    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    border: '1px solid #334155',
    borderRadius: '16px',
    width: '90%',
    maxWidth: '900px',
    maxHeight: '90vh',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: "'JetBrains Mono', 'SF Mono', 'Monaco', monospace",
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
  },
  header: {
    background: 'linear-gradient(135deg, #334155 0%, #475569 100%)',
    padding: '24px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    borderBottom: '1px solid #475569',
  },
  icon: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    color: 'white',
    flexShrink: 0,
  },
  titleSection: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    fontSize: '1.5rem',
    color: '#e2e8f0',
    marginBottom: '4px',
    fontWeight: '600',
  },
  titleInput: {
    background: 'rgba(15, 23, 42, 0.8)',
    border: '1px solid #475569',
    color: '#e2e8f0',
    padding: '8px 12px',
    borderRadius: '6px',
    fontSize: '1.5rem',
    fontWeight: '600',
    fontFamily: 'inherit',
    width: '100%',
    outline: 'none',
  },
  metadata: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '0.85rem',
    color: '#94a3b8',
    flexWrap: 'wrap',
  },
  statusBadge: {
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '0.75rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    color: '#94a3b8',
    fontSize: '24px',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '6px',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    overflowY: 'auto',
    padding: '24px',
    color: '#e2e8f0',
  },
  section: {
    marginBottom: '24px',
  },
  sectionTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#cbd5e1',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  progressSection: {
    background: 'rgba(30, 41, 59, 0.8)',
    border: '1px solid #334155',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '24px',
  },
  progressHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  progressText: {
    fontSize: '0.9rem',
    color: '#94a3b8',
  },
  progressValue: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#60a5fa',
  },
  descriptionSection: {
    marginBottom: '24px',
  },
  description: {
    color: '#cbd5e1',
    lineHeight: '1.6',
    fontSize: '0.95rem',
  },
  descriptionTextarea: {
    background: 'rgba(15, 23, 42, 0.8)',
    border: '1px solid #475569',
    color: '#e2e8f0',
    padding: '12px',
    borderRadius: '8px',
    fontSize: '0.95rem',
    fontFamily: 'inherit',
    width: '100%',
    minHeight: '80px',
    resize: 'vertical',
    outline: 'none',
    lineHeight: '1.6',
  },
  dateSection: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    marginBottom: '24px',
  },
  dateGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  dateLabel: {
    fontSize: '0.85rem',
    color: '#94a3b8',
    fontWeight: '500',
  },
  dateInput: {
    background: 'rgba(15, 23, 42, 0.8)',
    border: '1px solid #475569',
    color: '#e2e8f0',
    padding: '8px 12px',
    borderRadius: '6px',
    fontSize: '0.9rem',
    fontFamily: 'inherit',
    outline: 'none',
  },
  tasksSection: {
    marginBottom: '24px',
  },
  tasksHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  addTaskButton: {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    border: 'none',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '6px',
    fontSize: '0.85rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  tasksList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  emptyTasks: {
    textAlign: 'center',
    color: '#64748b',
    padding: '40px 20px',
    fontSize: '0.9rem',
  },
  footer: {
    padding: '20px 24px',
    borderTop: '1px solid #334155',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '12px',
    background: 'rgba(30, 41, 59, 0.8)',
  },
  footerLeft: {
    display: 'flex',
    gap: '12px',
  },
  footerRight: {
    display: 'flex',
    gap: '12px',
  },
  button: {
    padding: '10px 20px',
    borderRadius: '8px',
    fontSize: '0.9rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    border: 'none',
  },
  primaryButton: {
    background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
    color: 'white',
  },
  secondaryButton: {
    background: 'rgba(71, 85, 105, 0.8)',
    color: '#e2e8f0',
    border: '1px solid #475569',
  },
  dangerButton: {
    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    color: 'white',
  },
  selectInput: {
    background: 'rgba(15, 23, 42, 0.8)',
    border: '1px solid #475569',
    color: '#e2e8f0',
    padding: '8px 12px',
    borderRadius: '6px',
    fontSize: '0.9rem',
    fontFamily: 'inherit',
    outline: 'none',
    cursor: 'pointer',
  },
};

function GoalModal({ goal, onClose, onGoalUpdated, onGoalDeleted, userId }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');
  
  // Local state for editing
  const [localGoal, setLocalGoal] = useState(goal);
  const [showAddTask, setShowAddTask] = useState(false);

  useEffect(() => {
    setLocalGoal(goal);
    setIsEditing(false);
    setError('');
  }, [goal]);

  const progress = calculateProgress(localGoal);
  const status = getProgressStatus(progress, localGoal);
  const typeConfig = goalTypeConfigs[localGoal.type];

  const handleSave = async () => {
    setError('');
    setIsSaving(true);
    
    try {
      const updatedGoal = await workspaceService.updateGoal(localGoal.goalId, {
        ...localGoal,
        updatedAt: new Date().toISOString(),
      });
      
      onGoalUpdated(updatedGoal);
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating goal:', err);
      setError(err.message || 'Failed to update goal');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this goal? This action cannot be undone.')) {
      return;
    }

    setIsDeleting(true);
    try {
      await workspaceService.deleteGoal(localGoal.goalId);
      onGoalDeleted(localGoal.goalId);
    } catch (err) {
      console.error('Error deleting goal:', err);
      setError(err.message || 'Failed to delete goal');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancel = () => {
    setLocalGoal(goal);
    setIsEditing(false);
    setError('');
  };

  const handleInputChange = (field, value) => {
    setLocalGoal(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTaskUpdate = async (taskIndex, updatedTask) => {
    const updatedTasks = [...localGoal.tasks];
    updatedTasks[taskIndex] = updatedTask;
    
    try {
      const updatedGoal = await workspaceService.updateGoal(localGoal.goalId, {
        ...localGoal,
        tasks: updatedTasks,
        updatedAt: new Date().toISOString(),
      });
      
      setLocalGoal(updatedGoal);
      onGoalUpdated(updatedGoal);
    } catch (err) {
      console.error('Error updating task:', err);
      setError(err.message || 'Failed to update task');
    }
  };

  const handleTaskDelete = async (taskIndex) => {
    const updatedTasks = localGoal.tasks.filter((_, index) => index !== taskIndex);
    
    try {
      const updatedGoal = await workspaceService.updateGoal(localGoal.goalId, {
        ...localGoal,
        tasks: updatedTasks,
        updatedAt: new Date().toISOString(),
      });
      
      setLocalGoal(updatedGoal);
      onGoalUpdated(updatedGoal);
    } catch (err) {
      console.error('Error deleting task:', err);
      setError(err.message || 'Failed to delete task');
    }
  };

  const handleAddTask = async () => {
    const newTask = createDefaultTask();
    newTask.title = 'New Task';
    
    const updatedTasks = [...localGoal.tasks, newTask];
    
    try {
      const updatedGoal = await workspaceService.updateGoal(localGoal.goalId, {
        ...localGoal,
        tasks: updatedTasks,
        updatedAt: new Date().toISOString(),
      });
      
      setLocalGoal(updatedGoal);
      onGoalUpdated(updatedGoal);
    } catch (err) {
      console.error('Error adding task:', err);
      setError(err.message || 'Failed to add task');
    }
  };

  const statusColor = {
    'active': '#10b981',
    'paused': '#f59e0b', 
    'completed': '#8b5cf6',
    'archived': '#6b7280',
  }[localGoal.status] || '#6b7280';

  return (
    <div style={modalStyles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={modalStyles.modal}>
        <div style={modalStyles.header}>
          <div 
            style={{
              ...modalStyles.icon,
              background: typeConfig?.color || '#60a5fa',
            }}
          >
            {typeConfig?.icon || '🎯'}
          </div>
          <div style={modalStyles.titleSection}>
            {isEditing ? (
              <input
                style={modalStyles.titleInput}
                value={localGoal.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Goal title..."
              />
            ) : (
              <h2 style={modalStyles.title}>{localGoal.title}</h2>
            )}
            <div style={modalStyles.metadata}>
              <span 
                style={{
                  ...modalStyles.statusBadge,
                  backgroundColor: `${statusColor}20`,
                  color: statusColor,
                  border: `1px solid ${statusColor}40`,
                }}
              >
                {localGoal.status}
              </span>
              <span>{typeConfig?.description || localGoal.type}</span>
              <span>Created {formatDisplayDate(localGoal.createdAt)}</span>
            </div>
          </div>
          <button 
            style={modalStyles.closeButton}
            onClick={onClose}
            onMouseEnter={(e) => e.target.style.background = 'rgba(71, 85, 105, 0.8)'}
            onMouseLeave={(e) => e.target.style.background = 'none'}
          >
            ×
          </button>
        </div>

        <div style={modalStyles.content}>
          {error && (
            <div style={{ 
              background: 'rgba(239, 68, 68, 0.1)', 
              border: '1px solid #ef4444', 
              color: '#ef4444', 
              padding: '12px', 
              borderRadius: '8px', 
              marginBottom: '20px',
              fontSize: '0.9rem'
            }}>
              {error}
            </div>
          )}

          {/* Progress Section */}
          <div style={modalStyles.progressSection}>
            <div style={modalStyles.progressHeader}>
              <span style={modalStyles.progressText}>Overall Progress</span>
              <span style={modalStyles.progressValue}>{Math.round(progress)}%</span>
            </div>
            <ProgressBar progress={progress} />
            <div style={{ marginTop: '8px', fontSize: '0.85rem', color: '#94a3b8' }}>
              {formatProgress(localGoal)}
            </div>
          </div>

          {/* Description Section */}
          <div style={modalStyles.descriptionSection}>
            <h3 style={modalStyles.sectionTitle}>
              📝 Description
            </h3>
            {isEditing ? (
              <textarea
                style={modalStyles.descriptionTextarea}
                value={localGoal.description || ''}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Add a description for this goal..."
              />
            ) : (
              <p style={modalStyles.description}>
                {localGoal.description || 'No description provided.'}
              </p>
            )}
          </div>

          {/* Date Section */}
          <div style={modalStyles.section}>
            <h3 style={modalStyles.sectionTitle}>
              📅 Timeline
            </h3>
            <div style={modalStyles.dateSection}>
              <div style={modalStyles.dateGroup}>
                <label style={modalStyles.dateLabel}>Start Date</label>
                {isEditing ? (
                  <input
                    type="date"
                    style={modalStyles.dateInput}
                    value={localGoal.startDate || ''}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                  />
                ) : (
                  <span style={{ color: '#cbd5e1' }}>
                    {localGoal.startDate ? formatDisplayDate(localGoal.startDate) : 'Not set'}
                  </span>
                )}
              </div>
              <div style={modalStyles.dateGroup}>
                <label style={modalStyles.dateLabel}>Target Date</label>
                {isEditing ? (
                  <input
                    type="date"
                    style={modalStyles.dateInput}
                    value={localGoal.targetDate || ''}
                    onChange={(e) => handleInputChange('targetDate', e.target.value)}
                  />
                ) : (
                  <span style={{ color: '#cbd5e1' }}>
                    {localGoal.targetDate ? formatDisplayDate(localGoal.targetDate) : 'Not set'}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Settings Section (when editing) */}
          {isEditing && (
            <div style={modalStyles.section}>
              <h3 style={modalStyles.sectionTitle}>
                ⚙️ Settings
              </h3>
              <div style={modalStyles.dateSection}>
                <div style={modalStyles.dateGroup}>
                  <label style={modalStyles.dateLabel}>Status</label>
                  <select
                    style={modalStyles.selectInput}
                    value={localGoal.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                  >
                    {Object.values(goalStatuses).map(status => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                <div style={modalStyles.dateGroup}>
                  <label style={modalStyles.dateLabel}>Priority</label>
                  <select
                    style={modalStyles.selectInput}
                    value={localGoal.priority}
                    onChange={(e) => handleInputChange('priority', e.target.value)}
                  >
                    {Object.values(priorities).map(priority => (
                      <option key={priority} value={priority}>
                        {priority.charAt(0).toUpperCase() + priority.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Tasks Section */}
          {localGoal.type === 'project' || localGoal.type === 'task' || localGoal.tasks?.length > 0 ? (
            <div style={modalStyles.tasksSection}>
              <div style={modalStyles.tasksHeader}>
                <h3 style={modalStyles.sectionTitle}>
                  ✅ Tasks ({localGoal.tasks?.length || 0})
                </h3>
                <button
                  style={modalStyles.addTaskButton}
                  onClick={handleAddTask}
                  onMouseEnter={(e) => e.target.style.transform = 'translateY(-1px)'}
                  onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  <span>+</span> Add Task
                </button>
              </div>
              
              {localGoal.tasks && localGoal.tasks.length > 0 ? (
                <div style={modalStyles.tasksList}>
                  {localGoal.tasks.map((task, index) => (
                    <TaskItem
                      key={task.taskId || index}
                      task={task}
                      onUpdate={(updatedTask) => handleTaskUpdate(index, updatedTask)}
                      onDelete={() => handleTaskDelete(index)}
                      isEditable={true}
                    />
                  ))}
                </div>
              ) : (
                <div style={modalStyles.emptyTasks}>
                  No tasks yet. Add your first task to start tracking progress.
                </div>
              )}
            </div>
          ) : null}
        </div>

        <div style={modalStyles.footer}>
          <div style={modalStyles.footerLeft}>
            <button
              style={{...modalStyles.button, ...modalStyles.dangerButton}}
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete Goal'}
            </button>
          </div>
          
          <div style={modalStyles.footerRight}>
            {isEditing ? (
              <>
                <button
                  style={{...modalStyles.button, ...modalStyles.secondaryButton}}
                  onClick={handleCancel}
                  disabled={isSaving}
                >
                  Cancel
                </button>
                <button
                  style={{...modalStyles.button, ...modalStyles.primaryButton}}
                  onClick={handleSave}
                  disabled={isSaving}
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </>
            ) : (
              <button
                style={{...modalStyles.button, ...modalStyles.primaryButton}}
                onClick={() => setIsEditing(true)}
              >
                Edit Goal
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GoalModal;