// src/components/AddIdeaModal.jsx
import React, { useState } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css'; // Don't forget the CSS for the editor!
import ideasService from '../service/ideasService'; // Adjust path

// Styles for the Modal
const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Darker overlay
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  content: {
    backgroundColor: 'var(--color-white-primary)', // Creamy white background
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 5px 20px rgba(0, 0, 0, 0.3)',
    width: '90%',
    maxWidth: '700px', // Slightly wider for Markdown editor
    position: 'relative',
    maxHeight: '90vh',
    overflowY: 'auto',
    color: 'var(--color-gray-text-on-light)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    paddingBottom: '10px',
    borderBottom: '1px solid rgba(0,0,0,0.05)',
  },
  h3: {
    fontSize: '1.8em',
    fontWeight: '600',
    margin: 0,
    color: 'var(--color-blue-ink)',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    fontSize: '1.8em',
    cursor: 'pointer',
    color: 'var(--color-gray-text-on-light)',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '500',
    color: 'var(--color-gray-text-on-light)',
  },
  input: {
    width: 'calc(100% - 20px)',
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid rgba(0,0,0,0.1)',
    borderRadius: '5px',
    fontSize: '1em',
    color: 'var(--color-gray-text-on-light)',
    backgroundColor: 'var(--color-white-primary)',
  },
  simpleMdeContainer: { // Specific styling for SimpleMDE
    marginBottom: '15px',
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    marginTop: '20px',
    paddingTop: '15px',
    borderTop: '1px solid rgba(0,0,0,0.05)',
  },
  button: {
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1em',
    fontWeight: '600',
    border: 'none',
    transition: 'background-color 0.2s ease',
  },
  primaryButton: {
    backgroundColor: 'var(--color-green-primary)',
    color: 'var(--color-white)',
  },
  secondaryButton: {
    backgroundColor: 'var(--color-blue-ink)', // Blue ink for secondary
    color: 'var(--color-white)',
  },
  errorText: {
    color: 'red',
    marginBottom: '10px',
    fontSize: '0.9em',
  },
};

function AddIdeaModal({ onClose, onIdeaAdded, userId }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState('');

  const handleSaveIdea = async () => {
    setFormError('');
    if (!title.trim()) {
      setFormError('Idea Title cannot be empty.');
      return;
    }
    // Description can be empty, but we'll ensure it's a string
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
    } catch (error) {
      console.error("Failed to save idea:", error);
      setFormError(error.message || "Failed to save idea. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.content}>
        <div style={modalStyles.header}>
          <h3 style={modalStyles.h3}>Add New Idea</h3>
          <button style={modalStyles.closeBtn} onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          {formError && <p style={modalStyles.errorText}>{formError}</p>}
          <label htmlFor="ideaTitle" style={modalStyles.label}>Idea Title</label>
          <input
            type="text"
            id="ideaTitle"
            style={modalStyles.input}
            placeholder="e.g., Launch new marketing campaign"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isSaving}
          />

          <label htmlFor="ideaDescription" style={modalStyles.label}>Description (Markdown)</label>
          <div style={modalStyles.simpleMdeContainer}>
            <SimpleMDE
              value={description}
              onChange={setDescription}
              options={{
                  spellChecker: false,
                  placeholder: "Write your idea details here using Markdown...",
              }}
            />
          </div>
        </div>
        <div style={modalStyles.footer}>
          <button
            style={{ ...modalStyles.button, ...modalStyles.secondaryButton }}
            onClick={onClose}
            disabled={isSaving}
          >
            Cancel
          </button>
          <button
            style={{ ...modalStyles.button, ...modalStyles.primaryButton }}
            onClick={handleSaveIdea}
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Idea'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddIdeaModal;