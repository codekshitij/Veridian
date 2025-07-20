// Utility functions for idea management
export const truncateText = (text, maxLength) => {
    if (!text) return 'No description available';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };
  
  export const formatDate = (dateString) => {
    if (!dateString) return 'Recently';
    return new Date(dateString).toLocaleDateString();
  };
  
  export const filterIdeasBySearch = (ideas, searchTerm) => {
    if (!searchTerm) return ideas;
    
    return ideas.filter(idea => 
      idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      idea.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };
  
  export const filterIdeasByTimeframe = (ideas, timeframe) => {
    const now = new Date();
    const timeframes = {
      week: 7 * 24 * 60 * 60 * 1000,
      month: 30 * 24 * 60 * 60 * 1000,
      year: 365 * 24 * 60 * 60 * 1000
    };
  
    const cutoff = new Date(now.getTime() - timeframes[timeframe]);
    return ideas.filter(idea => new Date(idea.createdAt) > cutoff);
  };
  
  export const calculateStats = (ideas) => {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  
    return {
      total: ideas.length,
      thisWeek: ideas.filter(idea => new Date(idea.createdAt) > weekAgo).length,
      thisMonth: ideas.filter(idea => new Date(idea.createdAt) > monthAgo).length
    };
  };