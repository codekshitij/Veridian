// src/components/AddIdeaModal.jsx - Improved Typography
import React, { useState } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import ideasService from '../service/ideasService';
import headerBgImg from '../../../src/assets/ideasBG/Gemini_Generated_Image_e5th7ye5th7ye5th.png';

// Styles for the Modal with improved typography
const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(12px)',
  },
  
  content: {
    backgroundColor: '#0F172A',
    padding: '0',
    borderRadius: '0', // Remove border radius
    boxShadow: '0 32px 64px rgba(0, 0, 0, 0.6)',
    width: '90%',
    maxWidth: '900px',
    maxHeight: '90vh',
    overflowY: 'auto',
    position: 'relative',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: '#FFFFFF',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  
  header: {
    background: `
      linear-gradient(135deg, rgba(79,70,229,0.25) 0%, rgba(124,58,237,0.18) 50%, rgba(236,72,153,0.18) 100%),
      url(${headerBgImg}) center/cover no-repeat
    `,
    padding: '6.9rem 3rem 3.5rem', // Increased top and bottom padding
    borderRadius: '0',
    position: 'relative',
    overflow: 'hidden',
  },
  
  headerBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.08) 0%, transparent 50%)
    `,
    zIndex: 0,
  },
  
  headerText: {
    flex: 1,
  },
  
  glassHeading: {
    display: 'inline-block',
    background: 'rgba(30, 41, 59, 0.35)', // semi-transparent dark
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    borderRadius: '18px',
    padding: '0.5rem 1.5rem',
    boxShadow: '0 4px 24px 0 rgba(0,0,0,0.10)',
    border: '1.5px solid rgba(255,255,255,0.18)',
    marginBottom: '0.5rem',
    marginTop: '-2rem', // move up
    marginLeft: '-2rem', // move left
  },
  
  h3: {
    fontSize: '2.75rem',
    fontWeight: '800',
    margin: 0,
    color: '#FFFFFF',
    textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    letterSpacing: '-0.025em',
    lineHeight: '1.1',
    fontFamily: "'Inter', sans-serif",
  },
  
  subtitle: {
    fontSize: '1.25rem',
    color: '#FFFFFF', // Pure white for maximum contrast
    fontWeight: '500',
    marginTop: '0.75rem',
    lineHeight: '1.5',
    letterSpacing: '0.01em',
    textShadow: '0 2px 8px rgba(0,0,0,0.45)', // Strong dark shadow for legibility
  },
  
  closeBtn: {
    position: 'absolute',
    top: '1.5rem',
    right: '2rem',
    background: 'rgba(255, 255, 255, 0.15)',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '0',
    fontSize: '1.25rem',
    cursor: 'pointer',
    color: '#FFFFFF',
    width: '38px',
    height: '38px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(8px)',
    marginLeft: 0,
    zIndex: 2,
  },
  
  closeBtnHover: {
    background: 'rgba(255, 255, 255, 0.25)',
    borderColor: 'rgba(255, 255, 255, 0.4)',
    transform: 'scale(1.05)',
    boxShadow: '0 8px 32px rgba(255, 255, 255, 0.2)',
  },
  
  body: {
    padding: '3rem',
    backgroundColor: '#0F172A',
  },
  
  formGroup: {
    marginBottom: '2.5rem',
  },
  
  label: {
    display: 'block',
    marginBottom: '1rem',
    fontWeight: '700',
    color: '#F8FAFC',
    fontSize: '1.25rem',
    letterSpacing: '0.01em',
    fontFamily: "'Inter', sans-serif",
  },
  
  input: {
    width: '100%',
    padding: '1.25rem 1.5rem',
    backgroundColor: '#1E293B',
    border: '2px solid #334155',
    borderRadius: '16px',
    fontSize: '1.125rem',
    color: '#F8FAFC',
    outline: 'none',
    transition: 'all 0.3s ease',
    fontFamily: "'Inter', sans-serif",
    fontWeight: '500',
    boxSizing: 'border-box',
    lineHeight: '1.5',
  },
  
  inputPlaceholder: {
    color: '#64748B',
    fontWeight: '400',
  },
  
  inputFocus: {
    borderColor: '#4F46E5',
    boxShadow: '0 0 0 4px rgba(79, 70, 229, 0.15)',
    backgroundColor: '#334155',
    color: '#FFFFFF',
  },
  
  simpleMdeContainer: {
    marginBottom: '1rem',
  },
  
  simpleMdeWrapper: {
    borderRadius: '16px',
    overflow: 'hidden',
    border: '2px solid #334155',
    transition: 'all 0.3s ease',
    backgroundColor: '#1E293B',
  },
  
  simpleMdeFocus: {
    borderColor: '#4F46E5',
    boxShadow: '0 0 0 4px rgba(79, 70, 229, 0.15)',
  },
  
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '1.5rem',
    padding: '2.5rem 3rem 3rem',
    backgroundColor: '#0F172A',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  },
  
  button: {
    padding: '1.25rem 2.5rem',
    borderRadius: '16px',
    cursor: 'pointer',
    fontSize: '1.125rem',
    fontWeight: '700',
    border: 'none',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    letterSpacing: '0.01em',
    fontFamily: "'Inter', sans-serif",
    minWidth: '140px',
    justifyContent: 'center',
  },
  
  primaryButton: {
    background: 'linear-gradient(90deg, #6366F1 0%, #A78BFA 100%)',
    color: '#FFFFFF',
    boxShadow: '0 8px 32px 0 rgba(99,102,241,0.25)',
    border: 'none',
    fontWeight: '800',
    fontSize: '1.1rem', // smaller font
    borderRadius: '16px',
    padding: '1rem 2.2rem', // less padding
    letterSpacing: '0.01em',
    transition: 'all 0.2s cubic-bezier(.4,0,.2,1)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.7rem',
    minWidth: '140px',
    justifyContent: 'center',
    outline: 'none',
    position: 'relative',
    overflow: 'hidden',
  },
  
  primaryButtonHover: {
    background: 'linear-gradient(90deg, #4F46E5 0%, #8B5CF6 100%)',
    transform: 'translateY(-2px) scale(1.03)',
    boxShadow: '0 12px 32px 0 rgba(99,102,241,0.35)',
  },
  
  primaryButtonDisabled: {
    backgroundColor: '#374151',
    color: '#9CA3AF',
    cursor: 'not-allowed',
    transform: 'none',
    boxShadow: 'none',
  },
  
  secondaryButton: {
    backgroundColor: 'transparent',
    color: '#E5E7EB',
    border: '2px solid #374151',
  },
  
  secondaryButtonHover: {
    backgroundColor: '#374151',
    borderColor: '#4B5563',
    color: '#FFFFFF',
    transform: 'translateY(-2px)',
  },
  
  errorText: {
    color: '#F87171',
    marginBottom: '1.5rem',
    fontSize: '1.1rem',
    fontWeight: '600',
    padding: '1.25rem 1.5rem',
    backgroundColor: 'rgba(248, 113, 113, 0.1)',
    border: '2px solid rgba(248, 113, 113, 0.3)',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    lineHeight: '1.5',
  },
  
  loadingSpinner: {
    width: '20px',
    height: '20px',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderTop: '2px solid #FFFFFF',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
};

// Enhanced CSS for SimpleMDE dark theme
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    /* Enhanced SimpleMDE dark theme with better typography */
    .modal-simplemde .CodeMirror {
      background-color: #1E293B !important;
      color: #F8FAFC !important;
      border: none !important;
      font-family: 'Inter', 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace !important;
      font-size: 16px !important;
      line-height: 1.6 !important;
      padding: 1rem !important;
    }
    
    .modal-simplemde .CodeMirror-scroll {
      min-height: 300px !important;
    }
    
    .modal-simplemde .CodeMirror-cursor {
      border-left: 2px solid #F8FAFC !important;
    }
    
    .modal-simplemde .CodeMirror-selected {
      background: rgba(79, 70, 229, 0.3) !important;
    }
    
    .modal-simplemde .editor-toolbar {
      background-color: #334155 !important;
      border-bottom: 1px solid #475569 !important;
      border-top: none !important;
      border-left: none !important;
      border-right: none !important;
      padding: 12px !important;
    }
    
    .modal-simplemde .editor-toolbar button {
      color: #E5E7EB !important;
      border: none !important;
      background: transparent !important;
      padding: 8px 12px !important;
      border-radius: 8px !important;
      font-size: 14px !important;
      font-weight: 600 !important;
      transition: all 0.2s ease !important;
    }
    
    .modal-simplemde .editor-toolbar button:hover {
      background-color: #475569 !important;
      color: #FFFFFF !important;
      border: none !important;
      transform: translateY(-1px) !important;
    }
    
    .modal-simplemde .editor-toolbar button.active {
      background-color: #4F46E5 !important;
      color: #FFFFFF !important;
    }
    
    .modal-simplemde .editor-toolbar .separator {
      border-left: 1px solid #475569 !important;
      margin: 0 8px !important;
    }
    
    .modal-simplemde .editor-preview {
      background-color: #1E293B !important;
      color: #F8FAFC !important;
      padding: 1.5rem !important;
      font-family: 'Inter', sans-serif !important;
      font-size: 16px !important;
      line-height: 1.7 !important;
    }
    
    .modal-simplemde .editor-preview h1,
    .modal-simplemde .editor-preview h2,
    .modal-simplemde .editor-preview h3,
    .modal-simplemde .editor-preview h4,
    .modal-simplemde .editor-preview h5,
    .modal-simplemde .editor-preview h6 {
      color: #FFFFFF !important;
      font-weight: 700 !important;
      margin-top: 1.5em !important;
      margin-bottom: 0.5em !important;
    }
    
    .modal-simplemde .editor-preview p {
      margin-bottom: 1em !important;
      color: #E5E7EB !important;
    }
    
    .modal-simplemde .editor-preview ul,
    .modal-simplemde .editor-preview ol {
      color: #E5E7EB !important;
      padding-left: 1.5em !important;
    }
    
    .modal-simplemde .editor-preview code {
      background-color: #374151 !important;
      color: #A78BFA !important;
      padding: 2px 6px !important;
      border-radius: 4px !important;
      font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace !important;
    }
    
    .modal-simplemde .editor-preview pre {
      background-color: #111827 !important;
      color: #F3F4F6 !important;
      padding: 1rem !important;
      border-radius: 8px !important;
      border: 1px solid #374151 !important;
    }
    
    .modal-simplemde .editor-preview blockquote {
      border-left: 4px solid #4F46E5 !important;
      margin: 1em 0 !important;
      padding-left: 1em !important;
      color: #D1D5DB !important;
      font-style: italic !important;
    }
    
    /* Placeholder styling */
    .modal-simplemde .CodeMirror-placeholder {
      color: #64748B !important;
      font-size: 16px !important;
      line-height: 1.6 !important;
      font-style: normal !important;
    }
  `;
  if (!document.head.querySelector('style[data-enhanced-modal-styles]')) {
    styleSheet.setAttribute('data-enhanced-modal-styles', 'true');
    document.head.appendChild(styleSheet);
  }
}

function AddIdeaModal({ onClose, onIdeaAdded, userId }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState('');
  const [titleFocused, setTitleFocused] = useState(false);

  const handleSaveIdea = async () => {
    setFormError('');
    if (!title.trim()) {
      setFormError('Please enter a title for your idea before saving.');
      return;
    }
    
    const finalDescription = description.trim();

    setIsSaving(true);
    try {
      const newIdea = await ideasService.createIdea({
        userId,
        title: title.trim(),
        description: finalDescription,
      });
      onIdeaAdded(newIdea);
      setTitle('');
      setDescription('');
      onClose();
    } catch (error) {
      console.error("Failed to save idea:", error);
      setFormError(error.message || "Unable to save your idea. Please check your connection and try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div style={modalStyles.overlay} onClick={onClose}>
      <div style={modalStyles.content} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={modalStyles.header}>
          <div style={modalStyles.headerBg}></div>
          <div style={modalStyles.headerContent}>
            <div style={modalStyles.headerText}>
              <div style={modalStyles.glassHeading}>
                <h3 style={modalStyles.h3}>Create New Idea</h3>
              </div>
            </div>
            <button 
              style={modalStyles.closeBtn} 
              onClick={onClose}
              onMouseEnter={(e) => Object.assign(e.target.style, modalStyles.closeBtnHover)}
              onMouseLeave={(e) => Object.assign(e.target.style, modalStyles.closeBtn)}
              aria-label="Close modal"
            >
              <span className="material-icons" style={{ fontSize: '1.5rem' }}>close</span>
            </button>
          </div>
        </div>

        {/* Body */}
        <div style={modalStyles.body}>
          {formError && (
            <div style={modalStyles.errorText}>
              <span className="material-icons" style={{ fontSize: '1.25rem' }}>error_outline</span>
              {formError}
            </div>
          )}

          {/* Title Input */}
          <div style={modalStyles.formGroup}>
            <label htmlFor="ideaTitle" style={modalStyles.label}>
              Idea Title
            </label>
            <input
              type="text"
              id="ideaTitle"
              style={{
                ...modalStyles.input,
                ...(titleFocused ? modalStyles.inputFocus : {})
              }}
              placeholder="e.g., Revolutionary productivity app for remote teams"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onFocus={() => setTitleFocused(true)}
              onBlur={() => setTitleFocused(false)}
              disabled={isSaving}
            />
          </div>

          {/* Description Input */}
          <div style={modalStyles.formGroup}>
            <label htmlFor="ideaDescription" style={modalStyles.label}>
              Description & Details
            </label>
            <div style={modalStyles.simpleMdeContainer} className="modal-simplemde">
              <SimpleMDE
                value={description}
                onChange={setDescription}
                options={{
                  spellChecker: false,
                  placeholder: "Describe your idea in detail...\n\n**Key Features:**\n• Feature 1\n• Feature 2\n\n**Target Audience:**\nWho will benefit from this idea?\n\n**Implementation Notes:**\nHow might this be built or executed?",
                  toolbar: [
                    "bold", "italic", "strikethrough", "|",
                    "heading-1", "heading-2", "heading-3", "|",
                    "unordered-list", "ordered-list", "|",
                    "link", "quote", "code", "|",
                    "preview", "side-by-side", "fullscreen"
                  ],
                  status: false,
                  autofocus: false,
                  renderingConfig: {
                    singleLineBreaks: false,
                  },
                }}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={modalStyles.footer}>
          <button
            style={{
              ...modalStyles.primaryButton,
              ...(isSaving ? modalStyles.primaryButtonDisabled : {})
            }}
            onClick={handleSaveIdea}
            disabled={isSaving}
            onMouseEnter={(e) => {
              if (!isSaving) Object.assign(e.target.style, modalStyles.primaryButtonHover);
            }}
            onMouseLeave={(e) => {
              if (!isSaving) Object.assign(e.target.style, modalStyles.primaryButton);
            }}
          >
            {isSaving ? (
              <>
                <div style={modalStyles.loadingSpinner}></div>
                Saving Idea...
              </>
            ) : (
              <>
                <span className="material-icons" style={{
                  color: '#fff',
                  borderRadius: '50%',
                  fontSize: '1.5rem',
                  padding: 0,
                  marginRight: 0,
                  boxShadow: 'none'
                }}>add_circle</span>
                Save Idea
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddIdeaModal;