import React, { useState } from 'react';
import { useAuth } from '../../../src/contexts/authContext';
import { useIdeaCanvas } from '../Hooks/useIdeaCanvas';
import {
  IdeaCanvasHeader,
  StatsOverview,
  InspirationalQuote,
  FilterTabs,
  IdeasGrid,
  AddIdeaModal
} from '../components';
import { animations } from '../utils/animations';

const IdeaCanvasPage = () => {
  const { user } = useAuth();
  const [showAddModal, setShowAddModal] = useState(false);
  
  const {
    ideas,
    isLoading,
    searchTerm,
    setSearchTerm,
    activeFilter,
    setActiveFilter,
    stats,
    filterCounts,
    mockQuote,
    handleSaveIdea,
    handleIdeaClick
  } = useIdeaCanvas();

  const handleNewIdea = () => {
    setShowAddModal(true);
  };

  const handleModalSave = async (ideaData) => {
    await handleSaveIdea(ideaData);
    setShowAddModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <IdeaCanvasHeader
          onNewIdea={handleNewIdea}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        
        <StatsOverview stats={stats} />
        
        <InspirationalQuote quote={mockQuote} />
        
        <div style={animations.slideInRight}>
          <FilterTabs
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            counts={filterCounts}
          />
          
          <IdeasGrid
            ideas={ideas}
            onIdeaClick={handleIdeaClick}
            isLoading={isLoading}
            onNewIdea={handleNewIdea}
          />
        </div>

        <AddIdeaModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSave={handleModalSave}
        />
      </div>
    </div>
  );
};

export default IdeaCanvasPage;