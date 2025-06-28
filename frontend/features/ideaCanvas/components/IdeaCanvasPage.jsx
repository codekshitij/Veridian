// src/features/ideas/components/IdeaCanvasPage.jsx - High Contrast Version
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../src/contexts/authContext';
import ideasService from '../service/ideasService';
import AddIdeaModal from '../components/AddIdeaModal';
import IdeaCard from '../components/IdeaCard';
import IdeaDetailModal from '../components/IdeaDetailModal';

import quotesData from '../../../src/assets/quotes.json';

// Import your background images from src/assets/ideasBG for MODAL/CARD HEADERS
import headerBg1 from '../../../src/assets/ideasBG/Gemini_Generated_Image_e5th7ye5th7ye5th.png';
import headerBg2 from '../../../src/assets/ideasBG/Gemini_Generated_Image_e5th7ze5th7ze5th.png';
import headerBg3 from '../../../src/assets/ideasBG/Gemini_Generated_Image_e5th80e5th80e5th.png';
import headerBg4 from '../../../src/assets/ideasBG/Gemini_Generated_Image_e5th84e5th84e5th.png';
import headerBg5 from '../../../src/assets/ideasBG/Gemini_Generated_Image_yib2bsyib2bsyib2.png';
import headerBg6 from '../../../src/assets/ideasBG/Gemini_Generated_Image_yib2btyib2btyib2.png';
import headerBg7 from '../../../src/assets/ideasBG/Gemini_Generated_Image_yib2bxyib2bxyib2.png';
import headerBg8 from '../../../src/assets/ideasBG/Gemini_Generated_Image_yib2byyib2byyib2.png';
import headerBg9 from '../../../src/assets/ideasBG/Gemini_Generated_Image_yib2bzyib2bzyib2.png';

// Array of imported images for Modal Headers
const modalHeaderImages = [
  headerBg1, headerBg2, headerBg3, headerBg4, headerBg5,
  headerBg6, headerBg7, headerBg8, headerBg9
];

const styles = {
  container: {
    padding: '0',
    backgroundColor: 'transparent',
    borderRadius: '0',
    boxShadow: 'none',
    minHeight: '100%',
    position: 'relative',
    overflow: 'visible',
    display: 'flex',
    flexDirection: 'column',
    color: '#FFFFFF',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '3rem',
    paddingBottom: '2rem',
    borderBottom: '2px solid #475569',
  },
  
  headerLeft: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  
  title: {
    fontSize: '3.5rem',
    fontWeight: '900',
    color: '#FFFFFF',
    margin: '0',
    letterSpacing: '-0.03em',
    textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    lineHeight: '1.1',
  },
  
  subtitle: {
    fontSize: '1.4rem',
    color: '#CBD5E1',
    fontWeight: '600',
    margin: '0',
    letterSpacing: '0.01em',
  },
  
  addIdeaBtn: {
    backgroundColor: '#4F46E5',
    color: '#FFFFFF',
    border: 'none',
    padding: '1.25rem 2.5rem',
    borderRadius: '16px',
    fontSize: '1.2rem',
    fontWeight: '800',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    boxShadow: '0 8px 24px rgba(79, 70, 229, 0.4)',
    textTransform: 'uppercase',
    letterSpacing: '0.02em',
  },
  
  addIdeaBtnHover: {
    backgroundColor: '#4338CA',
    transform: 'translateY(-3px)',
    boxShadow: '0 12px 32px rgba(79, 70, 229, 0.5)',
  },
  
  statsBar: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '2rem',
    marginBottom: '3rem',
  },
  
  statCard: {
    backgroundColor: '#1E293B',
    padding: '2rem',
    borderRadius: '20px',
    border: '2px solid #475569',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
  },
  
  statCardBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)',
    zIndex: 0,
  },
  
  statCardContent: {
    position: 'relative',
    zIndex: 1,
  },
  
  statCardHover: {
    backgroundColor: '#334155',
    borderColor: '#4F46E5',
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.3)',
  },
  
  statNumber: {
    fontSize: '3rem',
    fontWeight: '900',
    color: '#FFFFFF',
    lineHeight: '1',
    marginBottom: '0.75rem',
    textShadow: '0 2px 4px rgba(79, 70, 229, 0.3)',
  },
  
  statLabel: {
    fontSize: '1.1rem',
    color: '#E2E8F0',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  
  quoteBox: {
    backgroundColor: '#1E293B',
    borderRadius: '20px',
    padding: '2.5rem',
    margin: '2.5rem 0',
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#FFFFFF',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
    border: '2px solid #475569',
    position: 'relative',
    overflow: 'hidden',
  },
  
  quoteBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%)',
    zIndex: 0,
  },
  
  quoteContent: {
    position: 'relative',
    zIndex: 1,
  },
  
  quoteText: {
    fontSize: '1.6rem',
    marginBottom: '1.5rem',
    fontWeight: '600',
    lineHeight: '1.6',
    color: '#F8FAFC',
  },
  
  quoteAuthor: {
    fontSize: '1.2rem',
    fontWeight: '800',
    color: '#60A5FA',
  },
  
  filtersBar: {
    display: 'flex',
    gap: '1.5rem',
    marginBottom: '2.5rem',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  
  filterButton: {
    padding: '1rem 2rem',
    backgroundColor: '#334155',
    color: '#F1F5F9',
    border: '2px solid #475569',
    borderRadius: '16px',
    fontSize: '1.1rem',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textTransform: 'uppercase',
    letterSpacing: '0.02em',
  },
  
  filterButtonActive: {
    backgroundColor: '#4F46E5',
    color: '#FFFFFF',
    borderColor: '#60A5FA',
    boxShadow: '0 8px 24px rgba(79, 70, 229, 0.4)',
    transform: 'translateY(-2px)',
  },
  
  filterButtonHover: {
    backgroundColor: '#475569',
    borderColor: '#64748B',
    color: '#FFFFFF',
    transform: 'translateY(-2px)',
  },
  
  searchContainer: {
    position: 'relative',
    maxWidth: '400px',
    marginLeft: 'auto',
  },
  
  searchInput: {
    width: '100%',
    padding: '1rem 1.25rem 1rem 3.5rem',
    backgroundColor: '#1E293B',
    border: '2px solid #475569',
    borderRadius: '16px',
    color: '#FFFFFF',
    fontSize: '1.1rem',
    fontWeight: '600',
    outline: 'none',
    transition: 'all 0.3s ease',
  },
  
  searchInputFocus: {
    borderColor: '#4F46E5',
    boxShadow: '0 0 0 4px rgba(79, 70, 229, 0.2)',
    backgroundColor: '#334155',
  },
  
  searchIcon: {
    position: 'absolute',
    left: '1.25rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#94A3B8',
    fontSize: '1.3rem',
    pointerEvents: 'none',
  },
  
  ideaGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '2.5rem',
    marginTop: '2.5rem',
  },
  
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5rem 2rem',
    color: '#FFFFFF',
  },
  
  loadingSpinner: {
    width: '56px',
    height: '56px',
    border: '4px solid #475569',
    borderTop: '4px solid #4F46E5',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '2rem',
  },
  
  loadingText: {
    fontSize: '1.4rem',
    fontWeight: '700',
    color: '#E2E8F0',
  },
  
  errorContainer: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    border: '2px solid rgba(239, 68, 68, 0.4)',
    borderRadius: '20px',
    padding: '2.5rem',
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: '1.2rem',
    fontWeight: '700',
    margin: '2.5rem 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
  },
  
  emptyContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5rem 2rem',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  
  emptyIcon: {
    fontSize: '5rem',
    color: '#64748B',
    marginBottom: '2rem',
  },
  
  emptyTitle: {
    fontSize: '2rem',
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: '1rem',
  },
  
  emptyText: {
    fontSize: '1.3rem',
    lineHeight: '1.6',
    maxWidth: '500px',
    color: '#CBD5E1',
    fontWeight: '500',
  },
};

// Add keyframe animation for loading spinner
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  if (!document.head.querySelector('style[data-idea-spinner]')) {
    styleSheet.setAttribute('data-idea-spinner', 'true');
    document.head.appendChild(styleSheet);
  }
}

function IdeaCanvasPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const [ideas, setIdeas] = useState([]);
  const [showAddIdeaModal, setShowAddIdeaModal] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [isLoadingIdeas, setIsLoadingIdeas] = useState(true);
  const [errorLoadingIdeas, setErrorLoadingIdeas] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  const [currentQuote, setCurrentQuote] = useState({ text: '', author: '' });
  const [modalHeaderImageUrl, setModalHeaderImageUrl] = useState('');

  // Quote Logic
  useEffect(() => {
    if (quotesData && quotesData.length > 0) {
      const randomQuoteIndex = Math.floor(Math.random() * quotesData.length);
      setCurrentQuote(quotesData[randomQuoteIndex]);
    }
  }, []);

  // Idea Fetching Logic
  const fetchIdeas = async () => {
    if (!isAuthenticated || !user || !user.attributes || !user.attributes.sub) {
      setIsLoadingIdeas(false);
      return;
    }

    setIsLoadingIdeas(true);
    setErrorLoadingIdeas(null);
    try {
      const fetchedIdeas = await ideasService.getIdeas(user.attributes.sub);
      setIdeas(fetchedIdeas || []);
    } catch (error) {
      console.error("Error fetching ideas:", error);
      setErrorLoadingIdeas("Failed to load ideas. Please try refreshing.");
    } finally {
      setIsLoadingIdeas(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user && user.attributes && user.attributes.sub) {
      fetchIdeas();
    }
  }, [isAuthenticated, user]);

  // Filter and search ideas
  const filteredIdeas = ideas.filter(idea => {
    const matchesSearch = idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         idea.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeFilter === 'all') return matchesSearch;
    if (activeFilter === 'recent') {
      const isRecent = new Date(idea.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      return matchesSearch && isRecent;
    }
    return matchesSearch;
  });

  // Idea Management Callbacks
  const handleIdeaAdded = (newIdea) => {
    setIdeas((prevIdeas) => [newIdea, ...prevIdeas]);
    setShowAddIdeaModal(false);
  };

  const handleCardClick = (idea) => {
    const randomIndex = Math.floor(Math.random() * modalHeaderImages.length);
    setModalHeaderImageUrl(modalHeaderImages[randomIndex]);
    setSelectedIdea(idea);
  };

  const handleIdeaUpdated = (updatedIdea) => {
    setIdeas((prevIdeas) =>
      prevIdeas.map((idea) =>
        idea.ideaId === updatedIdea.ideaId ? updatedIdea : idea
      )
    );
    setSelectedIdea(null);
    setModalHeaderImageUrl('');
  };

  const handleIdeaDeleted = (ideaId) => {
    setIdeas((prevIdeas) => prevIdeas.filter((idea) => idea.ideaId !== ideaId));
    setSelectedIdea(null);
    setModalHeaderImageUrl('');
  };

  const filters = [
    { key: 'all', label: 'All Ideas' },
    { key: 'recent', label: 'Recent' },
  ];

  const stats = [
    { number: ideas.length.toString(), label: 'Total Ideas' },
    { number: filteredIdeas.length.toString(), label: 'Filtered Results' },
    { number: ideas.filter(idea => new Date(idea.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length.toString(), label: 'This Week' },
    { number: ideas.filter(idea => new Date(idea.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length.toString(), label: 'This Month' },
  ];

  if (authLoading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingSpinner}></div>
        <div style={styles.loadingText}>Loading application...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div style={styles.emptyContainer}>
        <span className="material-icons" style={styles.emptyIcon}>
          login
        </span>
        <div style={styles.emptyTitle}>Authentication Required</div>
        <div style={styles.emptyText}>Please log in to access your Idea Canvas.</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.title}>Idea Canvas</h1>
          <p style={styles.subtitle}>Capture, organize, and develop your brilliant ideas</p>
        </div>
        <button 
          style={styles.addIdeaBtn} 
          onClick={() => setShowAddIdeaModal(true)}
          onMouseEnter={(e) => Object.assign(e.target.style, styles.addIdeaBtnHover)}
          onMouseLeave={(e) => Object.assign(e.target.style, styles.addIdeaBtn)}
        >
          <span className="material-icons" style={{ fontSize: '1.5rem' }}>add</span>
          New Idea
        </button>
      </div>

      {/* Stats Bar */}
      <div style={styles.statsBar}>
        {stats.map((stat, index) => (
          <div
            key={index}
            style={styles.statCard}
            onMouseEnter={(e) => Object.assign(e.target.style, styles.statCardHover)}
            onMouseLeave={(e) => Object.assign(e.target.style, styles.statCard)}
          >
            <div style={styles.statCardBg}></div>
            <div style={styles.statCardContent}>
              <div style={styles.statNumber}>{stat.number}</div>
              <div style={styles.statLabel}>{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Quote Box */}
      {currentQuote.text && (
        <div style={styles.quoteBox}>
          <div style={styles.quoteBg}></div>
          <div style={styles.quoteContent}>
            <div style={styles.quoteText}>"{currentQuote.text}"</div>
            <div style={styles.quoteAuthor}>— {currentQuote.author}</div>
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div style={styles.filtersBar}>
        {filters.map((filter) => (
          <button
            key={filter.key}
            style={{
              ...styles.filterButton,
              ...(activeFilter === filter.key ? styles.filterButtonActive : {}),
            }}
            onClick={() => setActiveFilter(filter.key)}
            onMouseEnter={(e) => {
              if (activeFilter !== filter.key) {
                Object.assign(e.target.style, styles.filterButtonHover);
              }
            }}
            onMouseLeave={(e) => {
              if (activeFilter !== filter.key) {
                Object.assign(e.target.style, styles.filterButton);
              }
            }}
          >
            {filter.label}
          </button>
        ))}

        <div style={styles.searchContainer}>
          <span className="material-icons" style={styles.searchIcon}>
            search
          </span>
          <input
            type="text"
            placeholder="Search ideas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              ...styles.searchInput,
              ...(searchFocused ? styles.searchInputFocus : {}),
            }}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
        </div>
      </div>

      {/* Content */}
      {isLoadingIdeas && (
        <div style={styles.loadingContainer}>
          <div style={styles.loadingSpinner}></div>
          <div style={styles.loadingText}>Loading your ideas...</div>
        </div>
      )}

      {errorLoadingIdeas && (
        <div style={styles.errorContainer}>
          <span className="material-icons" style={{ fontSize: '3rem', marginBottom: '1rem' }}>
            error_outline
          </span>
          <div>{errorLoadingIdeas}</div>
        </div>
      )}

      {!isLoadingIdeas && filteredIdeas.length === 0 && !errorLoadingIdeas && (
        <div style={styles.emptyContainer}>
          <span className="material-icons" style={styles.emptyIcon}>
            lightbulb
          </span>
          <div style={styles.emptyTitle}>
            {searchTerm ? 'No ideas found' : 'Ready to create your first idea?'}
          </div>
          <div style={styles.emptyText}>
            {searchTerm 
              ? 'Try adjusting your search terms or filters to find what you\'re looking for.'
              : 'Click "New Idea" to capture your first brilliant thought and start building your creative collection.'
            }
          </div>
        </div>
      )}

      {/* Ideas Grid */}
      <div style={styles.ideaGrid}>
        {filteredIdeas.map((idea) => (
          <IdeaCard
            key={idea.ideaId}
            idea={idea}
            onClick={() => handleCardClick(idea)}
            headerImageUrl={modalHeaderImages[Math.floor(Math.random() * modalHeaderImages.length)]}
          />
        ))}
      </div>

      {/* Modals */}
      {showAddIdeaModal && (
        <AddIdeaModal
          onClose={() => setShowAddIdeaModal(false)}
          onIdeaAdded={handleIdeaAdded}
          userId={user.attributes.sub}
        />
      )}

      {selectedIdea && (
        <IdeaDetailModal
          idea={selectedIdea}
          onClose={() => { setSelectedIdea(null); setModalHeaderImageUrl(''); }}
          onIdeaUpdated={handleIdeaUpdated}
          onIdeaDeleted={handleIdeaDeleted}
          userId={user.attributes.sub}
          headerImageUrl={modalHeaderImageUrl}
        />
      )}
    </div>
  );
}

export default IdeaCanvasPage;