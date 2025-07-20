// features/workspace/components/TaskItem.jsx
import React, { useState, useRef, useEffect } from 'react';
import { priorities } from '../types/workspaceTypes';
import { formatDisplayDate } from '../utils/dateUtils';

const taskStyles = {
  container: {
    background: 'rgba(15, 23, 42, 0.8)',
    border: '1px solid #334155',
    borderRadius: '8px',
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    transition: 'all 0.2s ease',
    position: 'relative',
  },
  containerHover: {
    borderColor: '#475569',
    background: 'rgba(30, 41, 59, 0.8)',
  },
  containerCompleted: {
    opacity: 0.7,
    background: 'rgba(16, 185, 129, 0.1)',
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  checkbox: {
    width: '18px',
    height: '18px',
    borderRadius: '4px',
    border: '2px solid #475569',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    flexShrink: 0,
    background: 'transparent',
  },
  checkboxChecked: {
    background: '#10b981',
    borderColor: '#10b981',
    color: 'white',
  },
  checkboxHover: {
    borderColor: '#60a5fa',
  },
  checkmark: {
    fontSize: '12px',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  title: {
    fontSize: '0.95rem',
    color: '#e2e8f0',
    fontWeight: '500',
    lineHeight: '1.4',
    cursor: 'text',
  },
  titleCompleted: {
    textDecoration: 'line-through',
    color: '#94a3b8',
  },
  titleInput: {
    background: 'transparent',
    border: 'none',
    color: '#e2e8f0',
    fontSize: '0.95rem',
    fontWeight: '500',
    fontFamily: 'inherit',
    outline: 'none',
    width: '100%',
    padding: '2px 0',
  },
  metadata: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.8rem',
    color: '#64748b',
    flexWrap: 'wrap',
  },
  priorityBadge: {
    padding: '2px 6px',
    borderRadius: '4px',
    fontSize: '0.7rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  priorityLow: {
    background: 'rgba(107, 114, 128, 0.2)',
    color: '#9ca3af',
  },
  priorityMedium: {
    background: 'rgba(245, 158, 11, 0.2)',
    color: '#f59e0b',
  },
  priorityHigh: {
    background: 'rgba(239, 68, 68, 0.2)',
    color: '#ef4444',
  },
  dueDate: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  dueDateOverdue: {
    color: '#ef4444',
  },
  dueDateToday: {
    color: '#f59e0b',
  },
  dueDateUpcoming: {
    color: '#10b981',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    opacity: 0,
    transition: 'opacity 0.2s ease',
  },
  actionsVisible: {
    opacity: 1,
  },
  actionButton: {
    background: 'none',
    border: 'none',
    color: '#64748b',
    padding: '4px',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
  },
  actionButtonHover: {
    background: 'rgba(71, 85, 105, 0.5)',
    color: '#e2e8f0',
  },
  deleteButton: {
    color: '#ef4444',
  },
  deleteButtonHover: {
    background: 'rgba(239, 68, 68, 0.1)',
    color: '#ef4444',
  },
  expandedContent: {
    marginTop: '8px',
    paddingTop: '8px',
    borderTop: '1px solid #334155',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  descriptionInput: {
    background: 'rgba(30, 41, 59, 0.8)',
    border: '1px solid #475569',
    color: '#e2e8f0',
    padding: '8px 10px',
    borderRadius: '6px',
    fontSize: '0.85rem',
    fontFamily: 'inherit',
    outline: 'none',
    resize: 'vertical',
    minHeight: '60px',
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '8px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  label: {
    fontSize: '0.75rem',
    color: '#94a3b8',
    fontWeight: '500',
  },
  select: {
    background: 'rgba(30, 41, 59, 0.8)',
    border: '1px solid #475569',
    color: '#e2e8f0',
    padding: '6px 8px',
    borderRadius: '4px',
    fontSize: '0.8rem',
    fontFamily: 'inherit',
    outline: 'none',
  },
  dateInput: {
    background: 'rgba(30, 41, 59, 0.8)',
    border: '1px solid #475569',
    color: '#e2e8f0',
    padding: '6px 8px',
    borderRadius: '4px',
    fontSize: '0.8rem',
    fontFamily: 'inherit',
    outline: 'none',
  },
};

function TaskItem({ task, onUpdate, onDelete, isEditable = true }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [localTask, setLocalTask] = useState(task);
  const titleInputRef = useRef(null);

  useEffect(() => {
    setLocalTask(task);
  }, [task]);

  useEffect(() => {
    if (isEditingTitle && titleInputRef.current) {
      titleInputRef.current.focus();
      titleInputRef.current.select();
    }
  }, [isEditingTitle]);

  const handleCheckboxToggle = () => {
    if (!isEditable) return;
    
    const updatedTask = {
      ...localTask,
      completed: !localTask.completed,
      completedAt: !localTask.completed ? new Date().toISOString() : null,
      updatedAt: new Date().toISOString(),
    };
    
    setLocalTask(updatedTask);
    onUpdate(updatedTask);
  };

  const handleTitleEdit = () => {
    if (!isEditable) return;
    setIsEditingTitle(true);
  };

  const handleTitleSave = () => {
    setIsEditingTitle(false);
    if (localTask.title !== task.title) {
      const updatedTask = {
        ...localTask,
        updatedAt: new Date().toISOString(),
      };
      onUpdate(updatedTask);
    }
  };

  const handleTitleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleTitleSave();
    } else if (e.key === 'Escape') {
      setLocalTask(prev => ({ ...prev, title: task.title }));
      setIsEditingTitle(false);
    }
  };

  const handleFieldChange = (field, value) => {
    const updatedTask = {
      ...localTask,
      [field]: value,
      updatedAt: new Date().toISOString(),
    };
    
    setLocalTask(updatedTask);
    onUpdate(updatedTask);
  };

  const handleExpand = () => {
    if (!isEditable) return;
    setIsExpanded(!isExpanded);
  };

  const handleDelete = () => {
    if (!isEditable) return;
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete();
    }
  };

  const getDueDateStatus = () => {
    if (!localTask.dueDate) return null;
    
    const today = new Date();
    const dueDate = new Date(localTask.dueDate);
    const diffDays = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'overdue';
    if (diffDays === 0) return 'today';
    if (diffDays <= 3) return 'upcoming';
    return 'future';
  };

  const priorityStyles = {
    low: taskStyles.priorityLow,
    medium: taskStyles.priorityMedium,
    high: taskStyles.priorityHigh,
  };

  const dueDateStatus = getDueDateStatus();
  const dueDateStyleMap = {
    overdue: taskStyles.dueDateOverdue,
    today: taskStyles.dueDateToday,
    upcoming: taskStyles.dueDateUpcoming,
    future: {},
  };

  return (
    <div
      style={{
        ...taskStyles.container,
        ...(isHovered ? taskStyles.containerHover : {}),
        ...(localTask.completed ? taskStyles.containerCompleted : {}),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Checkbox */}
      <div
        style={{
          ...taskStyles.checkbox,
          ...(localTask.completed ? taskStyles.checkboxChecked : {}),
          ...(isHovered && !localTask.completed ? taskStyles.checkboxHover : {}),
        }}
        onClick={handleCheckboxToggle}
      >
        {localTask.completed && (
          <span style={taskStyles.checkmark}>✓</span>
        )}
      </div>

      {/* Content */}
      <div style={taskStyles.content}>
        {/* Title */}
        <div>
          {isEditingTitle ? (
            <input
              ref={titleInputRef}
              style={taskStyles.titleInput}
              value={localTask.title}
              onChange={(e) => setLocalTask(prev => ({ ...prev, title: e.target.value }))}
              onBlur={handleTitleSave}
              onKeyDown={handleTitleKeyDown}
            />
          ) : (
            <div
              style={{
                ...taskStyles.title,
                ...(localTask.completed ? taskStyles.titleCompleted : {}),
              }}
              onClick={handleTitleEdit}
            >
              {localTask.title}
            </div>
          )}
        </div>

        {/* Metadata */}
        <div style={taskStyles.metadata}>
          {/* Priority Badge */}
          <span
            style={{
              ...taskStyles.priorityBadge,
              ...priorityStyles[localTask.priority],
            }}
          >
            {localTask.priority}
          </span>

          {/* Due Date */}
          {localTask.dueDate && (
            <div 
              style={{
                ...taskStyles.dueDate,
                ...dueDateStyleMap[dueDateStatus],
              }}
            >
              <span>📅</span>
              <span>{formatDisplayDate(localTask.dueDate)}</span>
              {dueDateStatus === 'overdue' && <span>(Overdue)</span>}
              {dueDateStatus === 'today' && <span>(Today)</span>}
            </div>
          )}

          {/* Time Tracking */}
          {(localTask.estimatedHours || localTask.actualHours) && (
            <div style={taskStyles.dueDate}>
              <span>⏱️</span>
              <span>
                {localTask.actualHours ? `${localTask.actualHours}h` : ''}
                {localTask.actualHours && localTask.estimatedHours && '/'}
                {localTask.estimatedHours ? `${localTask.estimatedHours}h est` : ''}
              </span>
            </div>
          )}
        </div>

        {/* Expanded Content */}
        {isExpanded && isEditable && (
          <div style={taskStyles.expandedContent}>
            {/* Description */}
            <div style={taskStyles.formGroup}>
              <label style={taskStyles.label}>Description</label>
              <textarea
                style={taskStyles.descriptionInput}
                value={localTask.description || ''}
                onChange={(e) => handleFieldChange('description', e.target.value)}
                placeholder="Add task description..."
                rows={2}
              />
            </div>

            {/* Form Row */}
            <div style={taskStyles.formRow}>
              <div style={taskStyles.formGroup}>
                <label style={taskStyles.label}>Priority</label>
                <select
                  style={taskStyles.select}
                  value={localTask.priority}
                  onChange={(e) => handleFieldChange('priority', e.target.value)}
                >
                  <option value={priorities.LOW}>Low</option>
                  <option value={priorities.MEDIUM}>Medium</option>
                  <option value={priorities.HIGH}>High</option>
                </select>
              </div>

              <div style={taskStyles.formGroup}>
                <label style={taskStyles.label}>Due Date</label>
                <input
                  type="date"
                  style={taskStyles.dateInput}
                  value={localTask.dueDate || ''}
                  onChange={(e) => handleFieldChange('dueDate', e.target.value)}
                />
              </div>

              <div style={taskStyles.formGroup}>
                <label style={taskStyles.label}>Est. Hours</label>
                <input
                  type="number"
                  style={taskStyles.dateInput}
                  value={localTask.estimatedHours || ''}
                  onChange={(e) => handleFieldChange('estimatedHours', e.target.value ? parseFloat(e.target.value) : null)}
                  placeholder="0"
                  min="0"
                  step="0.5"
                />
              </div>
            </div>

            {/* Second Form Row */}
            <div style={taskStyles.formRow}>
              <div style={taskStyles.formGroup}>
                <label style={taskStyles.label}>Actual Hours</label>
                <input
                  type="number"
                  style={taskStyles.dateInput}
                  value={localTask.actualHours || ''}
                  onChange={(e) => handleFieldChange('actualHours', e.target.value ? parseFloat(e.target.value) : null)}
                  placeholder="0"
                  min="0"
                  step="0.5"
                />
              </div>

              <div style={taskStyles.formGroup}>
                <label style={taskStyles.label}>Tags</label>
                <input
                  type="text"
                  style={taskStyles.dateInput}
                  value={localTask.tags?.join(', ') || ''}
                  onChange={(e) => handleFieldChange('tags', e.target.value.split(',').map(tag => tag.trim()).filter(Boolean))}
                  placeholder="tag1, tag2"
                />
              </div>

              <div style={taskStyles.formGroup}>
                {/* Empty space for alignment */}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      {isEditable && (
        <div
          style={{
            ...taskStyles.actions,
            ...(isHovered || isExpanded ? taskStyles.actionsVisible : {}),
          }}
        >
          <button
            style={taskStyles.actionButton}
            onClick={handleExpand}
            title={isExpanded ? "Collapse" : "Expand"}
            onMouseEnter={(e) => Object.assign(e.target.style, taskStyles.actionButtonHover)}
            onMouseLeave={(e) => Object.assign(e.target.style, taskStyles.actionButton)}
          >
            {isExpanded ? '▲' : '▼'}
          </button>

          <button
            style={{
              ...taskStyles.actionButton,
              ...taskStyles.deleteButton,
            }}
            onClick={handleDelete}
            title="Delete task"
            onMouseEnter={(e) => Object.assign(e.target.style, taskStyles.deleteButtonHover)}
            onMouseLeave={(e) => Object.assign(e.target.style, { ...taskStyles.actionButton, ...taskStyles.deleteButton })}
          >
            🗑️
          </button>
        </div>
      )}
    </div>
  );
}

export default TaskItem;