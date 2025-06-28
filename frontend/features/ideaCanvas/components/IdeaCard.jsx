// src/components/IdeaCard.jsx
import React, { useState } from 'react';
import { stripMarkdown } from '../utils/markdownUtils';

const cardStyles = {
  card: {
    backgroundColor: '#1E293B',
    border: '2px solid #334155',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '320px',
    position: 'relative',
  },
  
  cardHover: {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
    borderColor: '#3B82F6',
  },
  
  imageHeader: {
    position: 'relative',
    width: '100%',
    height: '180px',
    backgroundColor: '#334155',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFFFFF',
  },
  
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'brightness(0.7) contrast(1.1)',
    transition: 'all 0.3s ease',
  },
  
  imageHover: {
    filter: 'brightness(0.8) contrast(1.2)',
    transform: 'scale(1.05)',
  },
  
  titleOverlay: {
    position: 'absolute',
    zIndex: 2,
    fontSize: '1.3rem',
    fontWeight: '800',
    padding: '1rem',
    textAlign: 'center',
    width: '100%',
    boxSizing: 'border-box',
    color: '#FFFFFF',
    top: '50%',
    transform: 'translateY(-50%)',
    textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)',
    letterSpacing: '-0.01em',
    lineHeight: '1.2',
  },
  
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(167, 139, 250, 0.3) 100%)',
    zIndex: 1,
    transition: 'opacity 0.3s ease',
  },
  
  gradientOverlayHover: {
    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.5) 0%, rgba(167, 139, 250, 0.5) 100%)',
  },
  
  body: {
    padding: '1.5rem',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#1E293B',
  },
  
  descriptionPreview: {
    fontSize: '1rem',
    color: '#94A3B8',
    marginBottom: '1rem',
    lineHeight: '1.6',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontWeight: '500',
  },
  
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
    paddingTop: '1rem',
    borderTop: '1px solid #334155',
  },
  
  date: {
    fontSize: '0.9rem',
    color: '#64748B',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  
  wordCount: {
    fontSize: '0.9rem',
    color: '#3B82F6',
    fontWeight: '700',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    padding: '0.25rem 0.75rem',
    borderRadius: '8px',
    border: '1px solid rgba(59, 130, 246, 0.3)',
  },
  
  // New element: Category tag
  categoryTag: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    backgroundColor: 'rgba(52, 211, 153, 0.9)',
    color: '#FFFFFF',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    fontSize: '0.8rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    zIndex: 3,
    backdropFilter: 'blur(4px)',
  },
};

function IdeaCard({ idea, onClick, headerImageUrl }) {
  const [isHovered, setIsHovered] = useState(false);

  const truncatedDescription = stripMarkdown(idea.description).substring(0, 120) + 
    (stripMarkdown(idea.description).length > 120 ? '...' : '');
  
  const formattedDate = idea.createdAt ? new Date(idea.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }) : 'No date';

  const wordCount = stripMarkdown(idea.description).split(' ').filter(word => word.length > 0).length;

  return (
    <div
      style={{ 
        ...cardStyles.card, 
        ...(isHovered ? cardStyles.cardHover : {}) 
      }}
      onClick={() => onClick(idea)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={cardStyles.imageHeader}>
        {headerImageUrl && (
          <img 
            src={headerImageUrl} 
            alt={idea.title} 
            style={{
              ...cardStyles.image,
              ...(isHovered ? cardStyles.imageHover : {})
            }}
          />
        )}
        
        <div style={{
          ...cardStyles.gradientOverlay,
          ...(isHovered ? cardStyles.gradientOverlayHover : {})
        }}></div>
        
        <h3 style={cardStyles.titleOverlay}>{idea.title}</h3>
        
        {/* Category Tag */}
        <div style={cardStyles.categoryTag}>
          <span className="material-icons" style={{ fontSize: '0.9rem', marginRight: '0.25rem' }}>
            lightbulb
          </span>
          Idea
        </div>
      </div>
      
      <div style={cardStyles.body}>
        <p style={cardStyles.descriptionPreview}>{truncatedDescription}</p>
        
        <div style={cardStyles.footer}>
          <div style={cardStyles.date}>
            <span className="material-icons" style={{ fontSize: '1rem' }}>
              schedule
            </span>
            {formattedDate}
          </div>
          <div style={cardStyles.wordCount}>
            {wordCount} words
          </div>
        </div>
      </div>
    </div>
  );
}

export default IdeaCard;