// src/components/IdeaDetailModal.jsx
import React, { useState, useEffect } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ideasService from '../service/ideasService';
// REMOVE THIS LINE: import { stripMarkdown } from '../features/ideaCanvas/utils/markdownUtils'; // THIS LINE IS UNNECESSARY HERE

// Styles for the Modal (remains the same)
const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  content: {
    backgroundColor: 'var(--color-white-primary)',
    borderRadius: '10px',
    boxShadow: '0 5px 20px rgba(0, 0, 0, 0.3)',
    width: '90%',
    maxWidth: '900px',
    maxHeight: '90vh',
    overflowY: 'auto',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    color: 'var(--color-gray-text-on-light)',
  },
  headerImageContainer: {
    position: 'relative',
    width: '100%',
    height: '200px',
    overflow: 'hidden',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    textShadow: '1px 1px 4px rgba(0,0,0,0.7)',
    fontSize: '2em',
    fontWeight: 'bold',
  },
  headerImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'brightness(0.7) blur(1px)',
    position: 'absolute',
    zIndex: 0,
  },
  headerImageTitle: {
    position: 'relative',
    zIndex: 1,
    padding: '20px',
    textAlign: 'center',
    color: 'var(--color-white)',
  },
  closeBtnAbsolute: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    background: 'rgba(0,0,0,0.4)',
    borderRadius: '50%',
    width: '35px',
    height: '35px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    fontSize: '1.5em',
    cursor: 'pointer',
    color: 'white',
    zIndex: 2,
  },
  bodyContent: {
    padding: '25px',
    flexGrow: 1,
  },
  input: {
    width: 'calc(100% - 20px)',
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #EEEEEE',
    borderRadius: '5px',
    fontSize: '1em',
    color: 'var(--color-gray-text-on-light)',
    backgroundColor: 'var(--color-white-primary)',
  },
  simpleMdeContainer: {
    marginBottom: '15px',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
    marginTop: '20px',
    padding: '15px 25px',
    borderTop: '1px solid #EEEEEE',
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
    backgroundColor: 'var(--color-blue-ink)',
    color: 'var(--color-white)',
  },
  dangerButton: {
    backgroundColor: 'red',
    color: 'white',
  },
  textButton: {
    background: 'none',
    color: 'var(--color-gray-text-on-light)',
    fontWeight: 'normal',
    textDecoration: 'underline',
  },
  errorText: {
    color: 'red',
    marginBottom: '10px',
    fontSize: '0.9em',
  },
  markdownContainer: {
    lineHeight: '1.6',
    color: 'var(--color-gray-text-on-light)',
  },
  'markdownContainer h1, markdownContainer h2, markdownContainer h3, markdownContainer h4, markdownContainer h5, markdownContainer h6': {
      color: 'var(--color-blue-ink)',
      marginTop: '1.5em',
      marginBottom: '0.8em',
      fontWeight: '600',
  },
  'markdownContainer h1': { fontSize: '2em' },
  'markdownContainer h2': { fontSize: '1.7em' },
  'markdownContainer h3': { fontSize: '1.4em' },
  'markdownContainer p': { marginBottom: '1em' },
  'markdownContainer ul, markdownContainer ol': {
      listStylePosition: 'inside',
      marginBottom: '1em',
      paddingLeft: '20px',
  },
  'markdownContainer li': {
      marginBottom: '0.5em',
  },
  'markdownContainer a': {
      color: 'var(--color-green-primary)',
      textDecoration: 'underline',
  },
  'markdownContainer strong, markdownContainer b': { fontWeight: 'bold' },
  'markdownContainer em, markdownContainer i': { fontStyle: 'italic' },
  'markdownContainer code': {
      backgroundColor: 'rgba(0,0,0,0.05)',
      padding: '2px 4px',
      borderRadius: '3px',
      fontFamily: 'monospace',
  },
  'markdownContainer pre': {
      backgroundColor: 'rgba(0,0,0,0.05)',
      padding: '10px',
      borderRadius: '5px',
      overflowX: 'auto',
      marginBottom: '1em',
  },
};

function IdeaDetailModal({ idea, onClose, onIdeaUpdated, onIdeaDeleted, userId, headerImageUrl }) {
  const [localTitle, setLocalTitle] = useState(idea.title);
  const [localDescription, setLocalDescription] = useState(idea.description);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formError, setFormError] = useState('');

  // Update local state if the idea prop changes (e.g., if modal is reused)
  useEffect(() => {
    setLocalTitle(idea.title);
    setLocalDescription(idea.description);
    setIsEditing(false); // Start in view mode
    setFormError('');
  }, [idea]);

  const handleSaveEdit = async () => {
    setFormError('');
    if (!localTitle.trim()) {
      setFormError('Title cannot be empty.');
      return;
    }

    setIsSaving(true);
    try {
      const updatedIdea = await ideasService.updateIdea(idea.ideaId, {
        userId,
        title: localTitle.trim(),
        description: localDescription.trim(),
      });
      onIdeaUpdated(updatedIdea);
    } catch (error) {
      console.error("Failed to update idea:", error);
      setFormError(error.message || "Failed to save changes.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteIdea = async () => {
    // IMPORTANT: In a real app, replace window.confirm with a custom modal/dialog
    if (window.confirm("Are you sure you want to delete this idea? This action cannot be undone.")) {
      setIsDeleting(true);
      try {
        await ideasService.deleteIdea(idea.ideaId);
        onIdeaDeleted(idea.ideaId);
      } catch (error) {
        console.error("Failed to delete idea:", error);
        setFormError(error.message || "Failed to delete idea.");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.content}>
        {/* Modal Header with Image */}
        <div style={modalStyles.headerImageContainer}>
          {headerImageUrl && <img src={headerImageUrl} alt={idea.title} style={modalStyles.headerImage} />}
          <h3 style={modalStyles.headerImageTitle}>
            {isEditing ? (
              <input
                type="text"
                value={localTitle}
                onChange={(e) => setLocalTitle(e.target.value)}
                style={{ ...modalStyles.input, width: 'auto', textAlign: 'center', fontSize: '1em', color: 'var(--color-white)', backgroundColor: 'rgba(0,0,0,0.3)', border: 'none' }}
                disabled={isSaving}
              />
            ) : (
              localTitle
            )}
          </h3>
          <button style={modalStyles.closeBtnAbsolute} onClick={onClose}>&times;</button>
        </div>

        <div style={modalStyles.bodyContent}>
          {formError && <p style={modalStyles.errorText}>{formError}</p>}

          {isEditing ? (
            <div style={modalStyles.simpleMdeContainer}>
              <SimpleMDE
                value={localDescription}
                onChange={setLocalDescription}
                options={{
                    spellChecker: false,
                    autofocus: true,
                    placeholder: "Write your idea details here using Markdown...",
                }}
              />
            </div>
          ) : (
            <div style={modalStyles.markdownContainer}>
              {/* Render Markdown content */}
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {localDescription || "_No description provided._"}
              </ReactMarkdown>
            </div>
          )}
        </div>

        <div style={modalStyles.footer}>
          {isEditing ? (
            <>
              <button
                style={{ ...modalStyles.button, ...modalStyles.secondaryButton }}
                onClick={() => {
                  setIsEditing(false);
                  setLocalTitle(idea.title); // Revert changes
                  setLocalDescription(idea.description);
                  setFormError('');
                }}
                disabled={isSaving}
              >
                Cancel
              </button>
              <button
                style={{ ...modalStyles.button, ...modalStyles.primaryButton }}
                onClick={handleSaveEdit}
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </>
          ) : (
            <>
              <button
                style={{ ...modalStyles.button, ...modalStyles.dangerButton }}
                onClick={handleDeleteIdea}
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete Idea'}
              </button>
              <button
                style={{ ...modalStyles.button, ...modalStyles.primaryButton }}
                onClick={() => setIsEditing(true)}
              >
                Edit Idea
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default IdeaDetailModal;