import React from 'react';
import IdeaCard from './IdeaCard';
import IdeaCardSkeleton from './IdeaCardSkeleton';
import EmptyState from './EmptyState';

const IdeasGrid = ({ ideas, onIdeaClick, isLoading, onNewIdea }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <IdeaCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (ideas.length === 0) {
    return <EmptyState onNewIdea={onNewIdea} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {ideas.map((idea, index) => (
        <IdeaCard
          key={idea.id || index}
          idea={idea}
          onClick={onIdeaClick}
          index={index}
        />
      ))}
    </div>
  );
};

export default IdeasGrid;