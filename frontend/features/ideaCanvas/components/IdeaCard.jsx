// src/components/IdeaCard.jsx
import React, { useState } from 'react';
// Corrected import path for stripMarkdown
import { stripMarkdown } from '../utils/markdownUtils'; // CORRECTED PATH

// Styles for the card (remains the same)
const cardStyles = {
  card: {
    backgroundColor: 'var(--color-white)',
    border: '1px solid rgba(58, 78, 108, 0.1)',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px var(--color-subtle-shadow)',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '280px',
  },
  cardHover: {
    transform: 'translateY(-3px)',
    boxShadow: '0 4px 12px var(--color-subtle-shadow)',
    borderColor: 'var(--color-green-primary)',
  },
  imageHeader: {
    position: 'relative',
    width: '100%',
    paddingTop: '56.25%',
    backgroundColor: 'var(--color-blue-ink)',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--color-white)',
    textShadow: '1px 1px 3px rgba(0,0,0,0.7)',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'brightness(0.8)',
  },
  titleOverlay: {
    position: 'absolute',
    zIndex: 1,
    fontSize: '1.2em',
    fontWeight: '600',
    padding: '10px',
    textAlign: 'center',
    width: '100%',
    boxSizing: 'border-box',
    color: 'var(--color-white)',
    top: '50%',
    transform: 'translateY(-50%)',
  },
  body: {
    padding: '20px',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  descriptionPreview: {
    fontSize: '0.9em',
    color: 'var(--color-gray-text-on-light)',
    marginBottom: '10px',
    lineHeight: '1.4',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  date: {
    fontSize: '0.8em',
    color: 'var(--color-gray-text-on-light)',
    textAlign: 'right',
    opacity: 0.7,
    marginTop: 'auto',
  },
};

function IdeaCard({ idea, onClick, headerImageUrl }) {
  const [isHovered, setIsHovered] = useState(false);

  const truncatedDescription = stripMarkdown(idea.description).substring(0, 150) + (idea.description.length > 150 ? '...' : '');
  const formattedDate = idea.createdAt ? new Date(idea.createdAt).toLocaleDateString() : 'N/A';

  return (
    <div
      style={{ ...cardStyles.card, ...(isHovered ? cardStyles.cardHover : {}) }}
      onClick={() => onClick(idea)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={cardStyles.imageHeader}>
        {headerImageUrl && <img src={headerImageUrl} alt={idea.title} style={cardStyles.image} />}
        <h3 style={cardStyles.titleOverlay}>{idea.title}</h3>
      </div>
      <div style={cardStyles.body}>
        <p style={cardStyles.descriptionPreview}>{truncatedDescription}</p>
        <div style={cardStyles.date}>{formattedDate}</div>
      </div>
    </div>
  );
}

export default IdeaCard;