// src/features/ideas/components/IdeaCanvasPage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../src/contexts/authContext'; // Adjust path
import ideasService from '../service/ideasService'; // Adjust path
import AddIdeaModal from '../components/AddIdeaModal'; // Adjust path
import IdeaCard from '../components/IdeaCard'; // Adjust path
import IdeaDetailModal from '../components/IdeaDetailModal'; // Adjust path

import quotesData from '../../../src/assets/quotes.json'; // Adjust path

// Import your background images from src/assets/ideasBG for MODAL/CARD HEADERS
// REMINDER: Replace 'imageX.jpg' with your actual image filenames and extensions
import headerBg1 from '../../../src/assets/ideasBG/Gemini_Generated_Image_e5th7ye5th7ye5th.png';
import headerBg2 from '../../../src/assets/ideasBG/Gemini_Generated_Image_e5th7ze5th7ze5th.png';
import headerBg3 from '../../../src/assets/ideasBG/Gemini_Generated_Image_e5th80e5th80e5th.png';
import headerBg4 from '../../../src/assets/ideasBG/Gemini_Generated_Image_e5th84e5th84e5th.png';
import headerBg5 from '../../../src/assets/ideasBG/Gemini_Generated_Image_yib2bsyib2bsyib2.png';
import headerBg6 from '../../../src/assets/ideasBG/Gemini_Generated_Image_yib2btyib2btyib2.png';
import headerBg7 from '../../../src/assets/ideasBG/Gemini_Generated_Image_yib2bxyib2bxyib2.png';
import headerBg8 from '../../../src/assets/ideasBG/Gemini_Generated_Image_yib2byyib2byyib2.png';
import headerBg9 from '../../../src/assets/ideasBG/Gemini_Generated_Image_yib2bzyib2bzyib2.png';


// Array of imported images for Modal Headers (and now IdeaCard Headers)
const modalHeaderImages = [
  headerBg1, headerBg2, headerBg3, headerBg4, headerBg5,
  headerBg6, headerBg7, headerBg8, headerBg9
];

// Basic styles for the IdeaCanvasPage, adapted for inline React styles
const ideaCanvasPageStyles = {
  container: {
    padding: '30px',
    backgroundColor: 'var(--color-white-primary)', // Solid white/creamy background
    borderRadius: '8px',
    boxShadow: '0 2px 5px var(--color-subtle-shadow)',
    minHeight: '80vh',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    color: 'var(--color-gray-text-on-light)',
  },
  contentWrapper: {
    position: 'relative',
    zIndex: 1,
    color: 'var(--color-gray-text-on-light)',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '25px',
    paddingBottom: '20px',
    borderBottom: '1px solid rgba(0,0,0,0.05)',
  },
  h2: {
    fontSize: '2em',
    fontWeight: '700',
    color: 'var(--color-blue-ink)',
    margin: 0,
  },
  addIdeaBtn: {
    backgroundColor: 'var(--color-green-primary)',
    color: 'var(--color-white)',
    border: 'none',
    padding: '12px 25px',
    borderRadius: '5px',
    fontSize: '1em',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease, transform 0.1s ease',
  },
  quoteBox: {
    backgroundColor: 'rgba(58, 78, 108, 0.05)',
    borderRadius: '8px',
    padding: '20px',
    margin: '20px 0 30px 0',
    textAlign: 'center',
    fontStyle: 'italic',
    color: 'var(--color-gray-text-on-light)',
    boxShadow: '0 2px 5px rgba(0,0,0,0.02)',
  },
  quoteText: {
    fontSize: '1.2em',
    marginBottom: '10px',
  },
  quoteAuthor: {
    fontSize: '0.9em',
    fontWeight: '500',
  },
  constantText: {
    backgroundColor: 'rgba(58, 78, 108, 0.05)',
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '30px',
    textAlign: 'center',
    color: 'var(--color-gray-text-on-light)',
    fontSize: '0.95em',
    boxShadow: '0 2px 5px rgba(0,0,0,0.02)',
  },
  ideaGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
    marginTop: '20px',
  },
  loadingText: {
    color: 'var(--color-gray-text-on-light)',
    textAlign: 'center',
    padding: '20px',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    padding: '20px',
  },
  emptyText: {
    color: 'var(--color-gray-text-on-light)',
    textAlign: 'center',
    padding: '20px',
  },
};


function IdeaCanvasPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const [ideas, setIdeas] = useState([]);
  const [showAddIdeaModal, setShowAddIdeaModal] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [isLoadingIdeas, setIsLoadingIdeas] = useState(true);
  const [errorLoadingIdeas, setErrorLoadingIdeas] = useState(null);

  const [currentQuote, setCurrentQuote] = useState({ text: '', author: '' });
  const [modalHeaderImageUrl, setModalHeaderImageUrl] = useState(''); // State for IdeaDetailModal header image

  // --- Quote Logic (Randomly picked on mount) ---
  useEffect(() => {
    const randomQuoteIndex = Math.floor(Math.random() * quotesData.length);
    setCurrentQuote(quotesData[randomQuoteIndex]);
  }, []);

  // --- Idea Fetching Logic ---
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

  // --- Idea Management Callbacks ---
  const handleIdeaAdded = (newIdea) => {
    setIdeas((prevIdeas) => [...prevIdeas, newIdea]);
    setShowAddIdeaModal(false);
  };

  const handleCardClick = (idea) => {
    // Randomly select an image for the IdeaCard AND IdeaDetailModal header
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
    setModalHeaderImageUrl(''); // Clear image when modal closes
  };

  const handleIdeaDeleted = (ideaId) => {
    setIdeas((prevIdeas) => prevIdeas.filter((idea) => idea.ideaId !== ideaId));
    setSelectedIdea(null);
    setModalHeaderImageUrl(''); // Clear image when modal closes
  };


  if (authLoading) return <p style={ideaCanvasPageStyles.loadingText}>Loading application...</p>;
  if (!isAuthenticated) return <p style={ideaCanvasPageStyles.emptyText}>Please log in to view your Idea Canvas.</p>;

  return (
    <div style={ideaCanvasPageStyles.container}>
      <div style={ideaCanvasPageStyles.contentWrapper}>
        <div style={ideaCanvasPageStyles.header}>
          <h2 style={ideaCanvasPageStyles.h2}>Idea Canvas</h2>
          <button style={ideaCanvasPageStyles.addIdeaBtn} onClick={() => setShowAddIdeaModal(true)}>+ New Idea</button>
        </div>

        {currentQuote.text && (
          <div style={ideaCanvasPageStyles.quoteBox}>
            <p style={ideaCanvasPageStyles.quoteText}>"{currentQuote.text}"</p>
            <p style={ideaCanvasPageStyles.quoteAuthor}>- {currentQuote.author}</p>
          </div>
        )}

        <p style={ideaCanvasPageStyles.constantText}>
          This is your personal space to capture, organize, and refine all your brilliant ideas. Let your creativity flow!
        </p>

        {isLoadingIdeas && <p style={ideaCanvasPageStyles.loadingText}>Loading ideas...</p>}
        {errorLoadingIdeas && <p style={ideaCanvasPageStyles.errorText}>Error: {errorLoadingIdeas}</p>}
        {!isLoadingIdeas && ideas.length === 0 && !errorLoadingIdeas && (
          <p style={ideaCanvasPageStyles.emptyText}>No ideas yet! Click "New Idea" to add your first thought.</p>
        )}

        <div style={ideaCanvasPageStyles.ideaGrid}>
          {ideas.map((idea) => (
            // Pass the randomly selected image URL to IdeaCard for its header
            <IdeaCard
              key={idea.ideaId}
              idea={idea}
              onClick={() => handleCardClick(idea)}
              headerImageUrl={modalHeaderImages[Math.floor(Math.random() * modalHeaderImages.length)]} // Pass a random image to each card
            />
          ))}
        </div>
      </div>

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
          headerImageUrl={modalHeaderImageUrl} // Pass the same image used for its card header
        />
      )}
    </div>
  );
}

export default IdeaCanvasPage;