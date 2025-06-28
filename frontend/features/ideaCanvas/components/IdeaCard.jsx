// src/components/IdeaCard.jsx
import React, { useState } from 'react';
// Corrected import path for stripMarkdown
import { stripMarkdown } from '../utils/markdownUtils'; // CORRECTED PATH

// Enhanced styles for the card with modern design
const cardStyles = {
  card: {
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '340px',
    position: 'relative',
    backdropFilter: 'blur(10px)',
    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
    willChange: 'transform, box-shadow',
  },
  cardHover: {
    transform: 'translateY(-12px) scale(1.03)',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(16, 185, 129, 0.3)',
    borderColor: '#10b981',
  },
  imageHeader: {
    position: 'relative',
    width: '100%',
    height: '200px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    textShadow: '0 2px 8px rgba(0,0,0,0.5)',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'brightness(0.7) contrast(1.1) saturate(1.2)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  imageHover: {
    transform: 'scale(1.1) rotate(2deg)',
    filter: 'brightness(0.8) contrast(1.2) saturate(1.3)',
  },
  titleOverlay: {
    position: 'absolute',
    zIndex: 3,
    fontSize: '1.375rem',
    fontWeight: '800',
    padding: '20px',
    textAlign: 'center',
    width: '100%',
    boxSizing: 'border-box',
    color: '#ffffff',
    top: '50%',
    transform: 'translateY(-50%)',
    textShadow: '0 3px 15px rgba(0,0,0,0.8)',
    lineHeight: '1.2',
    background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)',
    letterSpacing: '0.5px',
  },
  body: {
    padding: '28px',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '18px',
    position: 'relative',
  },
  descriptionPreview: {
    fontSize: '1rem',
    color: '#64748b',
    lineHeight: '1.7',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontWeight: '400',
    marginBottom: '4px',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
    paddingTop: '20px',
    borderTop: '1px solid #f1f5f9',
  },
  date: {
    fontSize: '0.875rem',
    color: '#94a3b8',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'color 0.2s ease',
  },
  readMore: {
    fontSize: '0.875rem',
    color: '#10b981',
    fontWeight: '700',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
    padding: '6px 12px',
    borderRadius: '20px',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    border: '1px solid rgba(16, 185, 129, 0.2)',
  },
  readMoreHover: {
    backgroundColor: '#10b981',
    color: '#ffffff',
    transform: 'scale(1.05)',
  },
  tag: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '6px 14px',
    background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
    color: '#0369a1',
    borderRadius: '25px',
    fontSize: '0.75rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    border: '1px solid rgba(3, 105, 161, 0.2)',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  },
  hoverGlow: {
    position: 'absolute',
    top: '-2px',
    left: '-2px',
    right: '-2px',
    bottom: '-2px',
    borderRadius: '22px',
    background: 'linear-gradient(135deg, #10b981, #3b82f6)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
    zIndex: -1,
  },
  hoverGlowVisible: {
    opacity: 0.2,
  },
};

function IdeaCard({ idea, onClick, headerImageUrl }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isReadMoreHovered, setIsReadMoreHovered] = useState(false);

  const truncatedDescription = stripMarkdown(idea.description).substring(0, 140) + (idea.description.length > 140 ? '...' : '');
  const formattedDate = idea.createdAt ? new Date(idea.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }) : 'N/A';

  // Generate a random tag based on content length or other criteria
  const getIdeaTag = () => {
    const length = idea.description.length;
    if (length > 500) return { text: 'Detailed', icon: '📝' };
    if (length > 200) return { text: 'Medium', icon: '📄' };
    return { text: 'Quick', icon: '⚡' };
  };

  const ideaTag = getIdeaTag();

  return (
    <div
      style={{ 
        ...cardStyles.card, 
        ...(isHovered ? cardStyles.cardHover : {}),
        position: 'relative',
      }}
      onClick={() => onClick(idea)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hover glow effect */}
      <div style={{
        ...cardStyles.hoverGlow,
        ...(isHovered ? cardStyles.hoverGlowVisible : {})
      }} />
      
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
        <h3 style={cardStyles.titleOverlay}>{idea.title}</h3>
      </div>
      
      <div style={cardStyles.body}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <span style={cardStyles.tag}>
            <span style={{ marginRight: '6px' }}>{ideaTag.icon}</span>
            {ideaTag.text}
          </span>
          {isHovered && (
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
              animation: 'pulse 2s infinite',
              boxShadow: '0 0 8px rgba(16, 185, 129, 0.6)',
            }} />
          )}
        </div>
        
        <p style={cardStyles.descriptionPreview}>{truncatedDescription}</p>
        
        <div style={cardStyles.footer}>
          <div style={{
            ...cardStyles.date,
            ...(isHovered ? { color: '#10b981' } : {})
          }}>
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style={{ opacity: 0.8 }}>
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"/>
            </svg>
            {formattedDate}
          </div>
          <div 
            style={{
              ...cardStyles.readMore,
              ...(isReadMoreHovered ? cardStyles.readMoreHover : {})
            }}
            onMouseEnter={() => setIsReadMoreHovered(true)}
            onMouseLeave={() => setIsReadMoreHovered(false)}
          >
            <span>Read more</span>
            <span style={{ 
              marginLeft: '6px',
              transition: 'transform 0.2s ease',
              transform: isReadMoreHovered ? 'translateX(4px)' : 'translateX(0)'
            }}>→</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IdeaCard;