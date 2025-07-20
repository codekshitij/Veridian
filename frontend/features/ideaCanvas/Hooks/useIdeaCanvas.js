import { useState, useEffect } from 'react';
import { calculateStats, filterIdeasBySearch, filterIdeasByTimeframe } from '../utils/ideaUtils';

export const useIdeaCanvas = () => {
  const [ideas, setIdeas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  // Mock data - replace with actual API calls
  const mockQuote = {
    text: "It always seems impossible until it's done.",
    author: "Nelson Mandela"
  };

  const mockIdeas = [
    {
      id: 1,
      title: "AI-Powered Task Management",
      description: "Develop an intelligent task management system that learns from user behavior and automatically prioritizes tasks based on deadlines, importance, and user preferences.",
      createdAt: "2025-01-15"
    },
    {
      id: 2,
      title: "Sustainable Energy Dashboard",
      description: "Create a comprehensive dashboard for monitoring renewable energy usage in smart homes, providing insights and recommendations for energy optimization.",
      createdAt: "2025-01-14"
    },
    {
      id: 3,
      title: "Virtual Reality Meeting Spaces",
      description: "Design immersive VR environments for remote meetings that simulate physical presence and enable natural collaboration.",
      createdAt: "2025-01-13"
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIdeas(mockIdeas);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Filter ideas based on search and active filter
  const filteredIdeas = ideas.filter(idea => {
    const matchesSearch = filterIdeasBySearch([idea], searchTerm).length > 0;
    
    if (activeFilter === 'recent') {
      const isRecent = filterIdeasByTimeframe([idea], 'week').length > 0;
      return matchesSearch && isRecent;
    }
    
    return matchesSearch;
  });

  const stats = {
    ...calculateStats(ideas),
    filtered: filteredIdeas.length
  };

  const filterCounts = {
    all: ideas.length,
    recent: filterIdeasByTimeframe(ideas, 'week').length
  };

  const handleSaveIdea = async (ideaData) => {
    const newIdea = {
      id: Date.now(),
      ...ideaData,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setIdeas(prev => [newIdea, ...prev]);
  };

  const handleIdeaClick = (idea) => {
    console.log('Open idea:', idea);
    // TODO: Implement idea detail modal or navigation
  };

  return {
    ideas: filteredIdeas,
    allIdeas: ideas,
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
  };
};