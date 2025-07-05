// src/components/AddIdeaModal.jsx
import React, { useState } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import 'simplemde/dist/simplemde.min.css'; // Import SimpleMDE CSS
import './AddIdeaModal.css'; // Import our custom styles
import ideasService from '../service/ideasService'; // Adjust path

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

  const simpleMdeOptions = {
    spellChecker: false,
    placeholder: "Write your idea details here using Markdown...",
    toolbar: [
      "bold", "italic", "heading", "|",
      "quote", "unordered-list", "ordered-list", "|",
      "link", "image", "|",
      "preview", "side-by-side", "fullscreen", "|",
      "guide"
    ],
    autofocus: false,
    autosave: {
      enabled: false,
    },
    status: ["lines", "words", "cursor"],
    hideIcons: [],
    showIcons: ["bold", "italic", "heading", "quote", "unordered-list", "ordered-list", "link", "image"],
    renderingConfig: {
      singleLineBreaks: false,
      codeSyntaxHighlighting: true,
    },
    insertTexts: {
      horizontalRule: ["", "\n\n-----\n\n"],
      image: ["![](http://", ")"],
      link: ["[", "](http://)"],
      table: ["", "\n\n| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Text     | Text      | Text     |\n\n"],
    },
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">Add New Idea</h3>
          <button className="modal-close-btn" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          {formError && <div className="modal-error-text">{formError}</div>}
          <label htmlFor="ideaTitle" className="modal-label">Idea Title</label>
          <input
            type="text"
            id="ideaTitle"
            className="modal-input"
            placeholder="e.g., Launch new marketing campaign"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isSaving}
          />

          <label htmlFor="ideaDescription" className="modal-label">Description (Markdown)</label>
          <div className="simple-mde-container">
            <SimpleMDE
              id="ideaDescription"
              value={description}
              onChange={setDescription}
              options={simpleMdeOptions}
              className="custom-simplemde"
            />
          </div>
        </div>
        <div className="modal-footer">
          <button
            className="modal-button modal-button-secondary"
            onClick={onClose}
            disabled={isSaving}
          >
            Cancel
          </button>
          <button
            className="modal-button modal-button-primary"
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