import React, { useState } from 'react';

const AddDeveloperTaskModal = ({ onClose, onTaskAdded, userId }) => {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    startTime: '',
    endTime: '',
    category: 'deep-work',
    complexity: 'medium',
    priority: 'medium',
    estimatedHours: 1,
    linkedUrl: '',
    tags: '',
    energyLevel: 'high',
    interruptible: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async () => {
    // Validation
    if (!taskData.title.trim()) {
      alert('Task title is required');
      return;
    }
    if (!taskData.startTime) {
      alert('Start time is required');
      return;
    }

    setIsSubmitting(true);
    try {
      const newTask = {
        ...taskData,
        userId,
        title: taskData.title.trim(),
        description: taskData.description.trim()
      };
      
      await onTaskAdded(newTask);
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Failed to create task. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedCategory = devCategories[taskData.category];

  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    },
    modal: {
      backgroundColor: '#1E293B',
      borderRadius: '16px',
      width: '100%',
      maxWidth: '900px',
      maxHeight: '80vh',
      overflow: 'hidden',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
      fontFamily: "'Poppins', sans-serif",
      border: '1px solid #334155'
    },
    header: {
      background: 'linear-gradient(135deg, #1A3636 0%, #008080 100%)',
      color: 'white',
      padding: '24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    title: {
      fontSize: '1.4em',
      fontWeight: '600',
      margin: 0,
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    closeButton: {
      background: 'rgba(255, 255, 255, 0.2)',
      border: 'none',
      borderRadius: '8px',
      width: '36px',
      height: '36px',
      color: 'white',
      fontSize: '1.2em',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background 0.2s ease'
    },
    content: {
      padding: '24px',
      overflowY: 'auto',
      maxHeight: 'calc(90vh - 160px)',
      backgroundColor: '#1E293B',
      color: '#F1F5F9'
    },
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
    formGroupFull: {
      gridColumn: '1 / -1'
    },
    label: {
      fontSize: '0.9em',
      fontWeight: '600',
      color: '#F1F5F9',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    },
    input: {
      padding: '12px 16px',
      border: '2px solid #475569',
      borderRadius: '8px',
      fontSize: '1em',
      transition: 'all 0.2s ease',
      fontFamily: 'inherit',
      backgroundColor: '#334155',
      color: '#F1F5F9'
    },
    textarea: {
      padding: '12px 16px',
      border: '2px solid #475569',
      borderRadius: '8px',
      fontSize: '1em',
      minHeight: '80px',
      resize: 'vertical',
      fontFamily: 'inherit',
      transition: 'all 0.2s ease',
      backgroundColor: '#334155',
      color: '#F1F5F9'
    },
    select: {
      padding: '12px 16px',
      border: '2px solid #475569',
      borderRadius: '8px',
      fontSize: '1em',
      backgroundColor: '#334155',
      color: '#F1F5F9',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    },
    categorySelect: {
      padding: '12px 16px',
      border: '2px solid #E8E8E8',
      borderRadius: '8px',
      fontSize: '1em',
      backgroundColor: 'white',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      background: `linear-gradient(45deg, ${selectedCategory.color}15, ${selectedCategory.color}05)`
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
      border: '2px solid #475569',
      borderRadius: '20px',
      backgroundColor: '#334155',
      color: '#F1F5F9',
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
    priorityIndicator: {
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      marginRight: '8px'
    },
    complexityIndicator: {
      display: 'inline-block',
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      marginRight: '4px'
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
      borderTop: '1px solid #475569',
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '12px',
      backgroundColor: '#1E293B'
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
      backgroundColor: '#475569',
      color: '#F1F5F9',
      border: '2px solid #64748B'
    },
    disabledButton: {
      opacity: 0.6,
      cursor: 'not-allowed'
    }
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h2 style={styles.title}>
            <span>🚀</span>
            Create Developer Task
          </h2>
          <button style={styles.closeButton} onClick={onClose}>×</button>
        </div>

        <div style={styles.content}>
          <div style={styles.formGrid}>
            {/* Title */}
            <div style={styles.formGroup}>
              <label style={styles.label}>
                📝 Task Title *
              </label>
              <input
                style={styles.input}
                type="text"
                value={taskData.title}
                onChange={(e) => setTaskData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., Implement user authentication API"
                onFocus={(e) => e.target.style.borderColor = '#008080'}
                onBlur={(e) => e.target.style.borderColor = '#475569'}
              />
            </div>

            {/* Category and Priority */}
            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  🎯 Category
                </label>
                <select
                  style={styles.select}
                  value={taskData.category}
                  onChange={(e) => setTaskData(prev => ({ ...prev, category: e.target.value }))}
                  onFocus={(e) => e.target.style.borderColor = '#008080'}
                  onBlur={(e) => e.target.style.borderColor = '#475569'}
                >
                  {Object.entries(devCategories).map(([key, category]) => (
                    <option key={key} value={key}>
                      {category.icon} {category.label}
                    </option>
                  ))}
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>
                  ⚡ Priority
                </label>
                <select
                  style={styles.select}
                  value={taskData.priority}
                  onChange={(e) => setTaskData(prev => ({ ...prev, priority: e.target.value }))}
                  onFocus={(e) => e.target.style.borderColor = '#008080'}
                  onBlur={(e) => e.target.style.borderColor = '#475569'}
                >
                  {Object.entries(priorityLevels).map(([key, level]) => (
                    <option key={key} value={key}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date and Complexity */}
            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  📅 Date
                </label>
                <input
                  style={styles.input}
                  type="date"
                  value={taskData.date}
                  onChange={(e) => setTaskData(prev => ({ ...prev, date: e.target.value }))}
                  onFocus={(e) => e.target.style.borderColor = '#008080'}
                  onBlur={(e) => e.target.style.borderColor = '#475569'}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>
                  🧠 Focus Level
                </label>
                <select
                  style={styles.select}
                  value={taskData.complexity}
                  onChange={(e) => setTaskData(prev => ({ ...prev, complexity: e.target.value }))}
                  onFocus={(e) => e.target.style.borderColor = '#008080'}
                  onBlur={(e) => e.target.style.borderColor = '#475569'}
                >
                  {Object.entries(complexityLevels).map(([key, level]) => (
                    <option key={key} value={key}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Time Planning */}
            <div style={styles.formGroup}>
              <label style={styles.label}>
                ⏰ Time Planning
              </label>
              <div style={styles.timeContainer}>
                <div>
                  <div style={{ fontSize: '0.85em', color: '#666', marginBottom: '4px' }}>Start Time *</div>
                  <input
                    style={styles.input}
                    type="time"
                    value={taskData.startTime}
                    onChange={(e) => handleStartTimeChange(e.target.value)}
                    onFocus={(e) => e.target.style.borderColor = '#008080'}
                    onBlur={(e) => e.target.style.borderColor = '#475569'}
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
                    onBlur={(e) => e.target.style.borderColor = '#475569'}
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

            {/* Energy Level */}
            <div style={styles.formGroup}>
              <label style={styles.label}>
                🔋 Energy Level Required
              </label>
              <select
                style={styles.select}
                value={taskData.energyLevel}
                onChange={(e) => setTaskData(prev => ({ ...prev, energyLevel: e.target.value }))}
                onFocus={(e) => e.target.style.borderColor = '#008080'}
                onBlur={(e) => e.target.style.borderColor = '#475569'}
              >
                {Object.entries(energyLevels).map(([key, level]) => (
                  <option key={key} value={key}>
                    {level.label} - {level.description}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div style={styles.formGroup}>
              <label style={styles.label}>
                📄 Description
              </label>
              <textarea
                style={styles.textarea}
                value={taskData.description}
                onChange={(e) => setTaskData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="What exactly needs to be done? Any specific requirements or context..."
                onFocus={(e) => e.target.style.borderColor = '#008080'}
                onBlur={(e) => e.target.style.borderColor = '#475569'}
              />
            </div>

            {/* Optional Fields */}
            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  🔗 Link (Optional)
                </label>
                <input
                  style={styles.input}
                  type="url"
                  value={taskData.linkedUrl}
                  onChange={(e) => setTaskData(prev => ({ ...prev, linkedUrl: e.target.value }))}
                  placeholder="GitHub issue, Jira ticket, etc."
                  onFocus={(e) => e.target.style.borderColor = '#008080'}
                  onBlur={(e) => e.target.style.borderColor = '#475569'}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>
                  🏷️ Tags (Optional)
                </label>
                <input
                  style={styles.input}
                  type="text"
                  value={taskData.tags}
                  onChange={(e) => setTaskData(prev => ({ ...prev, tags: e.target.value }))}
                  placeholder="frontend, react, urgent (comma separated)"
                  onFocus={(e) => e.target.style.borderColor = '#008080'}
                  onBlur={(e) => e.target.style.borderColor = '#475569'}
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
              <label htmlFor="interruptible" style={{ fontSize: '0.9em', color: '#CBD5E1' }}>
                ❓ Interruptible (I can handle questions during this task)
              </label>
            </div>
          </div>
        </div>

        <div style={styles.footer}>
          <button
            style={{ ...styles.button, ...styles.secondaryButton }}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            style={{
              ...styles.button,
              ...styles.primaryButton,
              ...(isSubmitting ? styles.disabledButton : {})
            }}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span>⏳</span>
                Creating...
              </>
            ) : (
              <>
                <span>✨</span>
                Create Task
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddDeveloperTaskModal;
