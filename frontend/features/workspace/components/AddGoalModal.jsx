// features/workspace/components/AddGoalModal.jsx
import React, { useState } from 'react';
import { goalTypes, goalTypeConfigs, priorities, createDefaultGoal, validators } from '../types/workspaceTypes';
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
    maxWidth: '700px',
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
    justifyContent: 'space-between',
    borderBottom: '1px solid #475569',
  },
  title: {
    fontSize: '1.5rem',
    color: '#e2e8f0',
    fontWeight: '600',
    margin: 0,
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
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    fontSize: '0.9rem',
    fontWeight: '500',
    color: '#cbd5e1',
    marginBottom: '8px',
  },
  input: {
    background: 'rgba(15, 23, 42, 0.8)',
    border: '1px solid #475569',
    color: '#e2e8f0',
    padding: '12px',
    borderRadius: '8px',
    fontSize: '0.95rem',
    fontFamily: 'inherit',
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.2s ease',
  },
  inputFocus: {
    borderColor: '#60a5fa',
    boxShadow: '0 0 0 2px rgba(96, 165, 250, 0.1)',
  },
  textarea: {
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
  select: {
    background: 'rgba(15, 23, 42, 0.8)',
    border: '1px solid #475569',
    color: '#e2e8f0',
    padding: '12px',
    borderRadius: '8px',
    fontSize: '0.95rem',
    fontFamily: 'inherit',
    width: '100%',
    outline: 'none',
    cursor: 'pointer',
  },
  typeGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '12px',
  },
  typeCard: {
    background: 'rgba(30, 41, 59, 0.8)',
    border: '2px solid #334155',
    borderRadius: '12px',
    padding: '16px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  typeCardSelected: {
    borderColor: '#60a5fa',
    background: 'rgba(96, 165, 250, 0.1)',
  },
  typeIcon: {
    fontSize: '24px',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    flexShrink: 0,
  },
  typeInfo: {
    flex: 1,
  },
  typeName: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#fff',
    marginBottom: '4px',
  },
  typeDescription: {
    fontSize: '0.8rem',
    color: '#cbd5e1', // Changed from #94a3b8 for better contrast
    lineHeight: '1.4',
  },

  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  },
  errorText: {
    color: '#ef4444',
    fontSize: '0.85rem',
    marginTop: '4px',
  },
  footer: {
    padding: '20px 24px',
    borderTop: '1px solid #334155',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    background: 'rgba(30, 41, 59, 0.8)',
  },
  button: {
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '0.9rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  primaryButton: {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: 'white',
  },
  secondaryButton: {
    background: 'rgba(71, 85, 105, 0.8)',
    color: '#e2e8f0',
    border: '1px solid #475569',
  },
};

function AddGoalModal({ onClose, onGoalAdded, userId }) {
  const [formData, setFormData] = useState(() => {
    const defaultGoal = createDefaultGoal(userId);
    return {
      ...defaultGoal,
      title: '',
      description: '',
      type: goalTypes.PROJECT,
    };
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const handleTypeSelect = (type) => {
    setFormData(prev => ({
      ...prev,
      type,
    }));
  };

  const validateForm = () => {
    const validationErrors = validators.validateGoal(formData);
    const errorMap = {};
    
    validationErrors.forEach(error => {
      if (error.includes('Title')) {
        errorMap.title = error;
      } else if (error.includes('type')) {
        errorMap.type = error;
      } else if (error.includes('date')) {
        errorMap.dates = error;
      }
    });

    setErrors(errorMap);
    return Object.keys(errorMap).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const goalData = {
        ...formData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      const createdGoal = await workspaceService.createGoal(goalData);
      onGoalAdded(createdGoal);
      onClose();
    } catch (error) {
      console.error('Error creating goal:', error);
      setErrors({ submit: error.message || 'Failed to create goal. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div style={modalStyles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={modalStyles.modal}>
        <div style={modalStyles.header}>
          <h2 style={modalStyles.title}>Create New Goal</h2>
          <button 
            style={modalStyles.closeButton}
            onClick={onClose}
            onMouseEnter={(e) => e.target.style.background = 'rgba(71, 85, 105, 0.8)'}
            onMouseLeave={(e) => e.target.style.background = 'none'}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={modalStyles.content}>
            {errors.submit && (
              <div style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid #ef4444',
                color: '#ef4444',
                padding: '12px',
                borderRadius: '8px',
                marginBottom: '20px',
                fontSize: '0.9rem'
              }}>
                {errors.submit}
              </div>
            )}

            {/* Goal Type Selection */}
            <div style={modalStyles.section}>
              <h3 style={modalStyles.sectionTitle}>
                🎯 Goal Type
              </h3>
              <div style={modalStyles.typeGrid}>
                {Object.entries(goalTypeConfigs).map(([type, config]) => (
                  <div
                    key={type}
                    style={{
                      ...modalStyles.typeCard,
                      ...(formData.type === type ? modalStyles.typeCardSelected : {}),
                    }}
                    onClick={() => handleTypeSelect(type)}
                  >
                    <div 
                      style={{
                        ...modalStyles.typeIcon,
                        background: config.color,
                      }}
                    >
                      {config.icon}
                    </div>
                    <div style={modalStyles.typeInfo}>
                      <div style={modalStyles.typeName}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </div>
                      <div style={modalStyles.typeDescription}>
                        {config.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {errors.type && (
                <div style={modalStyles.errorText}>{errors.type}</div>
              )}
            </div>

            {/* Basic Information */}
            <div style={modalStyles.section}>
              <h3 style={modalStyles.sectionTitle}>
                📝 Basic Information
              </h3>
              
              <div style={modalStyles.formGroup}>
                <label style={modalStyles.label}>Goal Title *</label>
                <input
                  type="text"
                  style={{
                    ...modalStyles.input,
                    ...(focusedField === 'title' ? modalStyles.inputFocus : {}),
                  }}
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  onFocus={() => setFocusedField('title')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="e.g., Learn React Development, Build Portfolio Website..."
                  required
                />
                {errors.title && (
                  <div style={modalStyles.errorText}>{errors.title}</div>
                )}
              </div>

              <div style={modalStyles.formGroup}>
                <label style={modalStyles.label}>Description</label>
                <textarea
                  style={modalStyles.textarea}
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe your goal, what you want to achieve, and why it matters to you..."
                  rows={3}
                />
              </div>
            </div>

            {/* Timeline & Settings */}
            <div style={modalStyles.section}>
              <h3 style={modalStyles.sectionTitle}>
                📅 Timeline & Settings
              </h3>
              
              <div style={modalStyles.formRow}>
                <div style={modalStyles.formGroup}>
                  <label style={modalStyles.label}>Start Date</label>
                  <input
                    type="date"
                    style={modalStyles.input}
                    value={formData.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                  />
                </div>
                
                <div style={modalStyles.formGroup}>
                  <label style={modalStyles.label}>Target Date</label>
                  <input
                    type="date"
                    style={modalStyles.input}
                    value={formData.targetDate || ''}
                    onChange={(e) => handleInputChange('targetDate', e.target.value)}
                  />
                </div>
              </div>

              <div style={modalStyles.formRow}>
                <div style={modalStyles.formGroup}>
                  <label style={modalStyles.label}>Priority</label>
                  <select
                    style={modalStyles.select}
                    value={formData.priority}
                    onChange={(e) => handleInputChange('priority', e.target.value)}
                  >
                    <option value={priorities.LOW}>Low Priority</option>
                    <option value={priorities.MEDIUM}>Medium Priority</option>
                    <option value={priorities.HIGH}>High Priority</option>
                  </select>
                </div>
                
                <div style={modalStyles.formGroup}>
                  <label style={modalStyles.label}>Status</label>
                  <select
                    style={modalStyles.select}
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                  >
                    <option value="active">Active</option>
                    <option value="paused">Paused</option>
                  </select>
                </div>
              </div>

              {errors.dates && (
                <div style={modalStyles.errorText}>{errors.dates}</div>
              )}
            </div>

            {/* Tags */}
            <div style={modalStyles.section}>
              <h3 style={modalStyles.sectionTitle}>
                🏷️ Tags
              </h3>
              <div style={modalStyles.formGroup}>
                <label style={modalStyles.label}>Tags (comma-separated)</label>
                <input
                  type="text"
                  style={modalStyles.input}
                  value={formData.tags?.join(', ') || ''}
                  onChange={(e) => handleInputChange('tags', e.target.value.split(',').map(tag => tag.trim()).filter(Boolean))}
                  placeholder="e.g., frontend, learning, career, health..."
                />
              </div>
            </div>
          </div>

          <div style={modalStyles.footer}>
            <button
              type="button"
              style={{...modalStyles.button, ...modalStyles.secondaryButton}}
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{...modalStyles.button, ...modalStyles.primaryButton}}
              disabled={isSubmitting || !formData.title.trim()}
              onMouseEnter={(e) => !e.target.disabled && (e.target.style.transform = 'translateY(-1px)')}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              {isSubmitting ? (
                <>
                  <span>⏳</span> Creating...
                </>
              ) : (
                <>
                  <span>✨</span> Create Goal
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddGoalModal;