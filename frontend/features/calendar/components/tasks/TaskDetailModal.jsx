// TaskDetailModal.jsx
// Modal for viewing and editing task details

import React, { useState, useEffect } from 'react';

const TaskDetailModal = ({ 
  task, 
  onClose, 
  onTaskUpdated, 
  onTaskDeleted, 
  isEditing: initialEditing = false 
}) => {
  const [isEditing, setIsEditing] = useState(initialEditing);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
    category: 'deep-work',
    complexity: 'medium',
    priority: 'medium',
    estimatedHours: 1,
    linkedUrl: '',
    tags: '',
    energyLevel: 'high',
    interruptible: false,
    status: 'pending'
  });

  // Initialize task data when task prop changes
  useEffect(() => {
    if (task) {
      setTaskData({
        ...task,
        date: task.date || new Date().toISOString().split('T')[0],
        tags: Array.isArray(task.tags) ? task.tags.join(', ') : (task.tags || ''),
      });
    }
  }, [task]);

  // Developer-specific categories
  const devCategories = {
    'deep-work': { label: 'Deep Work', icon: '🧠', color: '#008080' },
    'code-review': { label: 'Code Review', icon: '👀', color: '#FF6B6B' },
    'debugging': { label: 'Debugging', icon: '🐛', color: '#FFA500' },
    'research': { label: 'Research', icon: '🔬', color: '#45B7D1' },
    'meeting': { label: 'Meeting', icon: '🤝', color: '#9B59B6' },
    'deployment': { label: 'Deployment', icon: '🚀', color: '#27AE60' },
    'refactoring': { label: 'Refactoring', icon: '♻️', color: '#E67E22' },
    'documentation': { label: 'Documentation', icon: '📝', color: '#34495E' }
  };

  const complexityLevels = {
    'low': { label: 'Low Focus', color: '#96CEB4' },
    'medium': { label: 'Medium Focus', color: '#FECA57' },
    'high': { label: 'Deep Focus', color: '#FF6B6B' }
  };

  const priorityLevels = {
    'low': { label: 'Low Priority', color: '#95A5A6' },
    'medium': { label: 'Medium Priority', color: '#F39C12' },
    'high': { label: 'High Priority', color: '#E74C3C' },
    'urgent': { label: 'Urgent', color: '#8E44AD' }
  };

  const energyLevels = {
    'low': { label: 'Low Energy', description: 'When tired' },
    'medium': { label: 'Medium Energy', description: 'Regular focus' },
    'high': { label: 'High Energy', description: 'Peak performance' }
  };

  const statusOptions = {
    'pending': { label: 'Pending', icon: '⏳', color: '#95A5A6' },
    'in-progress': { label: 'In Progress', icon: '🔄', color: '#3498DB' },
    'completed': { label: 'Completed', icon: '✅', color: '#27AE60' },
    'blocked': { label: 'Blocked', icon: '🚫', color: '#E74C3C' },
    'cancelled': { label: 'Cancelled', icon: '❌', color: '#95A5A6' }
  };

  const calculateEndTime = (start, hours) => {
    if (!start || !hours) return '';
    const [startHours, startMinutes] = start.split(':').map(Number);
    const totalMinutes = startHours * 60 + startMinutes + (hours * 60);
    const endHours = Math.floor(totalMinutes / 60);
    const endMins = totalMinutes % 60;
    return `${endHours.toString().padStart(2, '0')}:${endMins.toString().padStart(2, '0')}`;
  };

  const handleStartTimeChange = (time) => {
    setTaskData(prev => ({
      ...prev,
      startTime: time,
      endTime: calculateEndTime(time, prev.estimatedHours)
    }));
  };

  const handleHoursChange = (hours) => {
    setTaskData(prev => ({
      ...prev,
      estimatedHours: hours,
      endTime: calculateEndTime(prev.startTime, hours)
    }));
  };

  const handleSave = async () => {
    if (!taskData.title.trim()) {
      alert('Task title is required');
      return;
    }

    setIsSubmitting(true);
    try {
      const updatedTask = {
        ...taskData,
        title: taskData.title.trim(),
        description: taskData.description.trim(),
        tags: taskData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };
      
      await onTaskUpdated(updatedTask);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Failed to update task. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await onTaskDeleted(task.id);
        onClose();
      } catch (error) {
        console.error('Error deleting task:', error);
        alert('Failed to delete task. Please try again.');
      }
    }
  };

  const formatTime = (time) => {
    if (!time) return 'Not set';
    return new Date(`2000-01-01T${time}`).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (date) => {
    if (!date) return 'No date set';
    return new Date(date).toLocaleDateString([], {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const selectedCategory = devCategories[taskData.category] || devCategories['deep-work'];
  const selectedPriority = priorityLevels[taskData.priority] || priorityLevels['medium'];
  const selectedComplexity = complexityLevels[taskData.complexity] || complexityLevels['medium'];
  const selectedStatus = statusOptions[taskData.status] || statusOptions['pending'];

  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    },
    modal: {
      backgroundColor: 'white',
      borderRadius: '16px',
      width: '100%',
      maxWidth: '1200px',
      maxHeight: '90vh',
      overflow: 'hidden',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
      fontFamily: "'Poppins', sans-serif"
    },
    header: {
      background: `linear-gradient(135deg, ${selectedCategory.color} 0%, ${selectedCategory.color}dd 100%)`,
      color: 'white',
      padding: '24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    },
    headerLeft: {
      flex: 1
    },
    title: {
      fontSize: '1.4em',
      fontWeight: '600',
      margin: '0 0 8px 0',
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    subtitle: {
      fontSize: '0.9em',
      opacity: 0.9,
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      flexWrap: 'wrap'
    },
    headerActions: {
      display: 'flex',
      gap: '8px',
      marginLeft: '16px'
    },
    headerButton: {
      background: 'rgba(255, 255, 255, 0.2)',
      border: 'none',
      borderRadius: '8px',
      width: '36px',
      height: '36px',
      color: 'white',
      fontSize: '1.1em',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background 0.2s ease'
    },
    content: {
      padding: '24px',
      overflowY: 'auto',
      maxHeight: 'calc(90vh - 200px)'
    },
    section: {
      marginBottom: '24px'
    },
    sectionTitle: {
      fontSize: '1.1em',
      fontWeight: '600',
      color: '#1A3636',
      marginBottom: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    infoGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '16px',
      marginBottom: '20px'
    },
    infoCard: {
      padding: '16px',
      borderRadius: '8px',
      border: '1px solid #E8E8E8',
      backgroundColor: '#FAFAFA'
    },
    infoLabel: {
      fontSize: '0.8em',
      fontWeight: '600',
      color: '#666',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      marginBottom: '4px'
    },
    infoValue: {
      fontSize: '1em',
      fontWeight: '500',
      color: '#1A3636',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    },
    statusBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      padding: '6px 12px',
      borderRadius: '20px',
      fontSize: '0.85em',
      fontWeight: '500',
      backgroundColor: `${selectedStatus.color}15`,
      color: selectedStatus.color,
      border: `1px solid ${selectedStatus.color}30`
    },
    priorityBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '0.8em',
      fontWeight: '500',
      backgroundColor: `${selectedPriority.color}15`,
      color: selectedPriority.color
    },
    complexityBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '0.8em',
      fontWeight: '500',
      backgroundColor: `${selectedComplexity.color}15`,
      color: selectedComplexity.color
    },
    description: {
      backgroundColor: '#F8F9FA',
      padding: '16px',
      borderRadius: '8px',
      borderLeft: `4px solid ${selectedCategory.color}`,
      fontSize: '0.95em',
      lineHeight: '1.6',
      color: '#444',
      whiteSpace: 'pre-wrap'
    },
    tagsList: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '6px'
    },
    tag: {
      padding: '4px 8px',
      backgroundColor: '#E8F4FD',
      color: '#2980B9',
      borderRadius: '12px',
      fontSize: '0.8em',
      fontWeight: '500'
    },
    link: {
      color: '#008080',
      textDecoration: 'none',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    },
    // Editing styles (same as AddDeveloperTaskModal)
    formGrid: {
      display: 'grid',
      gap: '20px'
    },
    formRow: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '16px'
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px'
    },
    label: {
      fontSize: '0.9em',
      fontWeight: '600',
      color: '#1A3636',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    },
    input: {
      padding: '12px 16px',
      border: '2px solid #E8E8E8',
      borderRadius: '8px',
      fontSize: '1em',
      transition: 'all 0.2s ease',
      fontFamily: 'inherit'
    },
    textarea: {
      padding: '12px 16px',
      border: '2px solid #E8E8E8',
      borderRadius: '8px',
      fontSize: '1em',
      minHeight: '80px',
      resize: 'vertical',
      fontFamily: 'inherit',
      transition: 'all 0.2s ease'
    },
    select: {
      padding: '12px 16px',
      border: '2px solid #E8E8E8',
      borderRadius: '8px',
      fontSize: '1em',
      backgroundColor: 'white',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    },
    timeContainer: {
      display: 'grid',
      gridTemplateColumns: '1fr auto 1fr',
      gap: '12px',
      alignItems: 'end'
    },
    durationButtons: {
      display: 'flex',
      gap: '6px',
      marginTop: '6px'
    },
    durationButton: {
      padding: '6px 12px',
      border: '2px solid #E8E8E8',
      borderRadius: '20px',
      backgroundColor: 'white',
      cursor: 'pointer',
      fontSize: '0.85em',
      fontWeight: '500',
      transition: 'all 0.2s ease'
    },
    durationButtonActive: {
      borderColor: '#008080',
      backgroundColor: '#008080',
      color: 'white'
    },
    checkboxGroup: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 0'
    },
    checkbox: {
      width: '18px',
      height: '18px',
      accentColor: '#008080'
    },
    footer: {
      padding: '20px 24px',
      borderTop: '1px solid #E8E8E8',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#FAFAFA'
    },
    footerLeft: {
      display: 'flex',
      gap: '12px'
    },
    footerRight: {
      display: 'flex',
      gap: '12px'
    },
    button: {
      padding: '12px 24px',
      borderRadius: '8px',
      border: 'none',
      fontSize: '1em',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    primaryButton: {
      backgroundColor: '#008080',
      color: 'white'
    },
    secondaryButton: {
      backgroundColor: 'white',
      color: '#666',
      border: '2px solid #E8E8E8'
    },
    dangerButton: {
      backgroundColor: '#E74C3C',
      color: 'white'
    },
    disabledButton: {
      opacity: 0.6,
      cursor: 'not-allowed'
    }
  };

  if (!task) {
    return null;
  }

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <h2 style={styles.title}>
              <span>{selectedCategory.icon}</span>
              {isEditing ? 'Edit Task' : taskData.title}
            </h2>
            {!isEditing && (
              <div style={styles.subtitle}>
                <span style={styles.statusBadge}>
                  {selectedStatus.icon} {selectedStatus.label}
                </span>
                <span style={styles.priorityBadge}>
                  {selectedPriority.label}
                </span>
                <span style={styles.complexityBadge}>
                  {selectedComplexity.label}
                </span>
              </div>
            )}
          </div>
          <div style={styles.headerActions}>
            {!isEditing && (
              <button
                style={styles.headerButton}
                onClick={() => setIsEditing(true)}
                title="Edit task"
              >
                ✏️
              </button>
            )}
            <button
              style={styles.headerButton}
              onClick={onClose}
              title="Close"
            >
              ×
            </button>
          </div>
        </div>

        <div style={styles.content}>
          {isEditing ? (
            // Edit Mode
            <div style={styles.formGrid}>
              {/* Title */}
              <div style={styles.formGroup}>
                <label style={styles.label}>📝 Task Title *</label>
                <input
                  style={styles.input}
                  type="text"
                  value={taskData.title}
                  onChange={(e) => setTaskData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Implement user authentication API"
                  onFocus={(e) => e.target.style.borderColor = '#008080'}
                  onBlur={(e) => e.target.style.borderColor = '#E8E8E8'}
                />
              </div>

              {/* Status and Category */}
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>📊 Status</label>
                  <select
                    style={styles.select}
                    value={taskData.status}
                    onChange={(e) => setTaskData(prev => ({ ...prev, status: e.target.value }))}
                    onFocus={(e) => e.target.style.borderColor = '#008080'}
                    onBlur={(e) => e.target.style.borderColor = '#E8E8E8'}
                  >
                    {Object.entries(statusOptions).map(([key, status]) => (
                      <option key={key} value={key}>
                        {status.icon} {status.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>🎯 Category</label>
                  <select
                    style={styles.select}
                    value={taskData.category}
                    onChange={(e) => setTaskData(prev => ({ ...prev, category: e.target.value }))}
                    onFocus={(e) => e.target.style.borderColor = '#008080'}
                    onBlur={(e) => e.target.style.borderColor = '#E8E8E8'}
                  >
                    {Object.entries(devCategories).map(([key, category]) => (
                      <option key={key} value={key}>
                        {category.icon} {category.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Priority and Complexity */}
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>⚡ Priority</label>
                  <select
                    style={styles.select}
                    value={taskData.priority}
                    onChange={(e) => setTaskData(prev => ({ ...prev, priority: e.target.value }))}
                    onFocus={(e) => e.target.style.borderColor = '#008080'}
                    onBlur={(e) => e.target.style.borderColor = '#E8E8E8'}
                  >
                    {Object.entries(priorityLevels).map(([key, level]) => (
                      <option key={key} value={key}>
                        {level.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>🧠 Focus Level</label>
                  <select
                    style={styles.select}
                    value={taskData.complexity}
                    onChange={(e) => setTaskData(prev => ({ ...prev, complexity: e.target.value }))}
                    onFocus={(e) => e.target.style.borderColor = '#008080'}
                    onBlur={(e) => e.target.style.borderColor = '#E8E8E8'}
                  >
                    {Object.entries(complexityLevels).map(([key, level]) => (
                      <option key={key} value={key}>
                        {level.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date and Energy Level */}
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>📅 Date</label>
                  <input
                    style={styles.input}
                    type="date"
                    value={taskData.date}
                    onChange={(e) => setTaskData(prev => ({ ...prev, date: e.target.value }))}
                    onFocus={(e) => e.target.style.borderColor = '#008080'}
                    onBlur={(e) => e.target.style.borderColor = '#E8E8E8'}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>🔋 Energy Level</label>
                  <select
                    style={styles.select}
                    value={taskData.energyLevel}
                    onChange={(e) => setTaskData(prev => ({ ...prev, energyLevel: e.target.value }))}
                    onFocus={(e) => e.target.style.borderColor = '#008080'}
                    onBlur={(e) => e.target.style.borderColor = '#E8E8E8'}
                  >
                    {Object.entries(energyLevels).map(([key, level]) => (
                      <option key={key} value={key}>
                        {level.label} - {level.description}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Time Planning */}
              <div style={styles.formGroup}>
                <label style={styles.label}>⏰ Time Planning</label>
                <div style={styles.timeContainer}>
                  <div>
                    <div style={{ fontSize: '0.85em', color: '#666', marginBottom: '4px' }}>Start Time</div>
                    <input
                      style={styles.input}
                      type="time"
                      value={taskData.startTime}
                      onChange={(e) => handleStartTimeChange(e.target.value)}
                      onFocus={(e) => e.target.style.borderColor = '#008080'}
                      onBlur={(e) => e.target.style.borderColor = '#E8E8E8'}
                    />
                  </div>
                  
                  <div style={{ textAlign: 'center', color: '#666', padding: '0 8px' }}>
                    →
                  </div>
                  
                  <div>
                    <div style={{ fontSize: '0.85em', color: '#666', marginBottom: '4px' }}>End Time</div>
                    <input
                      style={styles.input}
                      type="time"
                      value={taskData.endTime}
                      onChange={(e) => setTaskData(prev => ({ ...prev, endTime: e.target.value }))}
                      onFocus={(e) => e.target.style.borderColor = '#008080'}
                      onBlur={(e) => e.target.style.borderColor = '#E8E8E8'}
                    />
                  </div>
                </div>
                
                <div>
                  <div style={{ fontSize: '0.85em', color: '#666', marginBottom: '6px' }}>Duration (hours)</div>
                  <div style={styles.durationButtons}>
                    {[0.5, 1, 1.5, 2, 3, 4].map(hours => (
                      <button
                        key={hours}
                        type="button"
                        style={{
                          ...styles.durationButton,
                          ...(taskData.estimatedHours === hours ? styles.durationButtonActive : {})
                        }}
                        onClick={() => handleHoursChange(hours)}
                      >
                        {hours}h
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div style={styles.formGroup}>
                <label style={styles.label}>📄 Description</label>
                <textarea
                  style={styles.textarea}
                  value={taskData.description}
                  onChange={(e) => setTaskData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="What exactly needs to be done? Any specific requirements or context..."
                  onFocus={(e) => e.target.style.borderColor = '#008080'}
                  onBlur={(e) => e.target.style.borderColor = '#E8E8E8'}
                />
              </div>

              {/* URL and Tags */}
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>🔗 Link (Optional)</label>
                  <input
                    style={styles.input}
                    type="url"
                    value={taskData.linkedUrl}
                    onChange={(e) => setTaskData(prev => ({ ...prev, linkedUrl: e.target.value }))}
                    placeholder="GitHub issue, Jira ticket, etc."
                    onFocus={(e) => e.target.style.borderColor = '#008080'}
                    onBlur={(e) => e.target.style.borderColor = '#E8E8E8'}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>🏷️ Tags (Optional)</label>
                  <input
                    style={styles.input}
                    type="text"
                    value={taskData.tags}
                    onChange={(e) => setTaskData(prev => ({ ...prev, tags: e.target.value }))}
                    placeholder="frontend, react, urgent (comma separated)"
                    onFocus={(e) => e.target.style.borderColor = '#008080'}
                    onBlur={(e) => e.target.style.borderColor = '#E8E8E8'}
                  />
                </div>
              </div>

              {/* Interruptible Option */}
              <div style={styles.checkboxGroup}>
                <input
                  style={styles.checkbox}
                  type="checkbox"
                  id="interruptible"
                  checked={taskData.interruptible}
                  onChange={(e) => setTaskData(prev => ({ ...prev, interruptible: e.target.checked }))}
                />
                <label htmlFor="interruptible" style={{ fontSize: '0.9em', color: '#666' }}>
                  ❓ Interruptible (I can handle questions during this task)
                </label>
              </div>
            </div>
          ) : (
            // View Mode
            <>
              {/* Quick Info */}
              <div style={styles.section}>
                <div style={styles.infoGrid}>
                  <div style={styles.infoCard}>
                    <div style={styles.infoLabel}>Date & Time</div>
                    <div style={styles.infoValue}>
                      📅 {formatDate(taskData.date)}
                      <br />
                      ⏰ {formatTime(taskData.startTime)} - {formatTime(taskData.endTime)}
                      {taskData.estimatedHours && (
                        <span style={{ fontSize: '0.9em', color: '#666' }}>
                          ({taskData.estimatedHours}h)
                        </span>
                      )}
                    </div>
                  </div>

                  <div style={styles.infoCard}>
                    <div style={styles.infoLabel}>Category</div>
                    <div style={styles.infoValue}>
                      {selectedCategory.icon} {selectedCategory.label}
                    </div>
                  </div>

                  <div style={styles.infoCard}>
                    <div style={styles.infoLabel}>Energy Required</div>
                    <div style={styles.infoValue}>
                      🔋 {energyLevels[taskData.energyLevel]?.label}
                    </div>
                  </div>

                  {taskData.interruptible && (
                    <div style={styles.infoCard}>
                      <div style={styles.infoLabel}>Interruptible</div>
                      <div style={styles.infoValue}>
                        ❓ Yes
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              {taskData.description && (
                <div style={styles.section}>
                  <div style={styles.sectionTitle}>📄 Description</div>
                  <div style={styles.description}>
                    {taskData.description || 'No description provided.'}
                  </div>
                </div>
              )}

              {/* Tags */}
              {taskData.tags && Array.isArray(taskData.tags) && taskData.tags.length > 0 && (
                <div style={styles.section}>
                  <div style={styles.sectionTitle}>🏷️ Tags</div>
                  <div style={styles.tagsList}>
                    {taskData.tags.map((tag, index) => (
                      <span key={index} style={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Linked URL */}
              {taskData.linkedUrl && (
                <div style={styles.section}>
                  <div style={styles.sectionTitle}>🔗 Related Link</div>
                  <a
                    href={taskData.linkedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.link}
                  >
                    🌐 Open Link
                  </a>
                </div>
              )}
            </>
          )}
        </div>

        <div style={styles.footer}>
          <div style={styles.footerLeft}>
            {!isEditing && (
              <button
                style={{ ...styles.button, ...styles.dangerButton }}
                onClick={handleDelete}
              >
                🗑️ Delete
              </button>
            )}
          </div>
          
          <div style={styles.footerRight}>
            {isEditing ? (
              <>
                <button
                  style={{ ...styles.button, ...styles.secondaryButton }}
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
                <button
                  style={{
                    ...styles.button,
                    ...styles.primaryButton,
                    ...(isSubmitting ? styles.disabledButton : {})
                  }}
                  onClick={handleSave}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span>⏳</span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <span>💾</span>
                      Save Changes
                    </>
                  )}
                </button>
              </>
            ) : (
              <button
                style={{ ...styles.button, ...styles.secondaryButton }}
                onClick={onClose}
              >
                Close
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailModal;
