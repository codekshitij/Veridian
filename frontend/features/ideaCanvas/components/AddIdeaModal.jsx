import React, { useState, useEffect, useRef } from 'react';

// Premium Add Idea Modal Component
const AddIdeaModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'innovation',
    priority: 'medium',
    tags: [],
    inspiration: '',
    targetDate: '',
    collaborators: []
  });
  
  const [currentTag, setCurrentTag] = useState('');
  const [currentCollaborator, setCurrentCollaborator] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const titleInputRef = useRef(null);

  // Enhanced categories with gradients and icons
  const categories = [
    { 
      id: 'innovation', 
      name: 'Innovation', 
      icon: '🚀', 
      gradient: 'from-purple-500 via-pink-500 to-red-500',
      description: 'Breakthrough ideas and cutting-edge concepts'
    },
    { 
      id: 'business', 
      name: 'Business', 
      icon: '💼', 
      gradient: 'from-blue-500 via-cyan-500 to-teal-500',
      description: 'Revenue streams and business opportunities'
    },
    { 
      id: 'technology', 
      name: 'Technology', 
      icon: '⚡', 
      gradient: 'from-yellow-500 via-orange-500 to-red-500',
      description: 'Technical solutions and digital innovations'
    },
    { 
      id: 'design', 
      name: 'Design', 
      icon: '🎨', 
      gradient: 'from-pink-500 via-purple-500 to-indigo-500',
      description: 'User experience and visual concepts'
    },
    { 
      id: 'sustainability', 
      name: 'Sustainability', 
      icon: '🌱', 
      gradient: 'from-green-500 via-emerald-500 to-teal-500',
      description: 'Environmental and social impact ideas'
    },
    { 
      id: 'lifestyle', 
      name: 'Lifestyle', 
      icon: '✨', 
      gradient: 'from-indigo-500 via-purple-500 to-pink-500',
      description: 'Personal development and wellness'
    }
  ];

  // Priority levels with enhanced styling
  const priorities = [
    { 
      id: 'low', 
      name: 'Someday', 
      icon: '🌙', 
      color: 'from-gray-400 to-gray-600',
      description: 'Future consideration'
    },
    { 
      id: 'medium', 
      name: 'This Month', 
      icon: '⭐', 
      color: 'from-yellow-400 to-orange-500',
      description: 'Regular priority'
    },
    { 
      id: 'high', 
      name: 'This Week', 
      icon: '🔥', 
      color: 'from-red-400 to-pink-600',
      description: 'High urgency'
    },
    { 
      id: 'urgent', 
      name: 'Today', 
      icon: '⚡', 
      color: 'from-purple-400 to-indigo-600',
      description: 'Immediate action'
    }
  ];

  // Form steps
  const steps = [
    { title: 'Idea Basics', icon: '💡', description: 'What\'s your core idea?' },
    { title: 'Details & Context', icon: '📝', description: 'Add depth to your concept' },
    { title: 'Organization', icon: '🎯', description: 'Categorize and prioritize' },
    { title: 'Collaboration', icon: '👥', description: 'Team and timeline' }
  ];

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        title: '',
        description: '',
        category: 'innovation',
        priority: 'medium',
        tags: [],
        inspiration: '',
        targetDate: '',
        collaborators: []
      });
      setCurrentTag('');
      setCurrentCollaborator('');
      setErrors({});
      setActiveStep(0);
      setShowPreview(false);
      
      setTimeout(() => titleInputRef.current?.focus(), 400);
    }
  }, [isOpen]);

  // Update form data
  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  // Validation
  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 0) {
      if (!formData.title.trim()) newErrors.title = 'Title is required';
      else if (formData.title.trim().length < 3) newErrors.title = 'Minimum 3 characters';
    }
    
    if (step === 1) {
      if (formData.description.trim() && formData.description.trim().length < 10) {
        newErrors.description = 'Please provide more detail (minimum 10 characters)';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle tag management
  const addTag = () => {
    const tag = currentTag.trim().toLowerCase();
    if (tag && !formData.tags.includes(tag) && formData.tags.length < 8) {
      updateFormData('tags', [...formData.tags, tag]);
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    updateFormData('tags', formData.tags.filter(tag => tag !== tagToRemove));
  };

  // Handle collaborator management
  const addCollaborator = () => {
    const collaborator = currentCollaborator.trim();
    if (collaborator && !formData.collaborators.includes(collaborator) && formData.collaborators.length < 5) {
      updateFormData('collaborators', [...formData.collaborators, collaborator]);
      setCurrentCollaborator('');
    }
  };

  const removeCollaborator = (collaboratorToRemove) => {
    updateFormData('collaborators', formData.collaborators.filter(c => c !== collaboratorToRemove));
  };

  // Navigation
  const nextStep = () => {
    if (validateStep(activeStep)) {
      if (activeStep < steps.length - 1) {
        setActiveStep(activeStep + 1);
      } else {
        setShowPreview(true);
      }
    }
  };

  const prevStep = () => {
    if (showPreview) {
      setShowPreview(false);
    } else if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  // Submit
  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await onSave({
        ...formData,
        createdAt: new Date().toISOString(),
        id: Date.now()
      });
      onClose();
    } catch (error) {
      setErrors({ submit: 'Failed to save idea. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  const progress = showPreview ? 100 : ((activeStep + 1) / steps.length) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Animated Background Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xl animate-in fade-in duration-500" />
      
      {/* Floating Particles Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main Modal */}
      <div className="relative w-full max-w-6xl max-h-[95vh] bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-3xl shadow-2xl animate-in zoom-in-95 duration-500 overflow-hidden">
        
        {/* Gradient Border Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 rounded-3xl blur-xl" />
        
        {/* Header */}
        <div className="relative bg-gradient-to-r from-purple-900/50 via-blue-900/50 to-purple-900/50 p-8 border-b border-gray-700/50">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <span className="text-2xl">💡</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Create New Idea
                </h2>
                <p className="text-gray-400 mt-1">
                  {showPreview ? 'Review your idea' : steps[activeStep]?.description}
                </p>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="p-3 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 group"
            >
              <svg className="w-6 h-6 group-hover:rotate-90 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Progress Bar */}
          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    index <= activeStep || showPreview
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'bg-gray-700 text-gray-400'
                  }`}>
                    {index < activeStep || showPreview ? '✓' : index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 mx-2 transition-colors duration-300 ${
                      index < activeStep || showPreview ? 'bg-purple-500' : 'bg-gray-700'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            
            <div className="bg-gray-700/50 rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative p-8 h-[calc(95vh-300px)] overflow-y-auto">
          {!showPreview ? (
            <>
              {/* Step 0: Idea Basics */}
              {activeStep === 0 && (
                <div className="space-y-8 animate-in slide-in-from-right duration-300">
                  <div className="text-center mb-8">
                    <div className="text-6xl mb-4">🧠</div>
                    <h3 className="text-2xl font-bold text-white mb-2">What's brewing in your mind?</h3>
                    <p className="text-gray-400">Give your idea a powerful title that captures its essence</p>
                  </div>

                  <div className="max-w-2xl mx-auto">
                    <label className="block text-lg font-semibold text-gray-300 mb-4">
                      Idea Title *
                    </label>
                    <div className="relative">
                      <input
                        ref={titleInputRef}
                        type="text"
                        value={formData.title}
                        onChange={(e) => updateFormData('title', e.target.value)}
                        className={`w-full bg-gray-800/50 border-2 rounded-2xl px-6 py-6 text-xl text-white placeholder-gray-500 focus:outline-none transition-all duration-300 ${
                          errors.title 
                            ? 'border-red-500 focus:border-red-400 focus:ring-4 focus:ring-red-500/20' 
                            : 'border-gray-600 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20'
                        }`}
                        placeholder="e.g., AI-powered personal productivity assistant..."
                        maxLength={80}
                      />
                      <div className="absolute right-4 top-6 text-sm text-gray-500 bg-gray-800 px-2 py-1 rounded">
                        {formData.title.length}/80
                      </div>
                    </div>
                    {errors.title && (
                      <p className="text-red-400 text-sm mt-3 flex items-center animate-in slide-in-from-top duration-200">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {errors.title}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 1: Details & Context */}
              {activeStep === 1 && (
                <div className="space-y-8 animate-in slide-in-from-right duration-300">
                  <div className="text-center mb-8">
                    <div className="text-6xl mb-4">📝</div>
                    <h3 className="text-2xl font-bold text-white mb-2">Tell us more about it</h3>
                    <p className="text-gray-400">Describe your vision and what inspired this idea</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Description */}
                    <div>
                      <label className="block text-lg font-semibold text-gray-300 mb-4">
                        Detailed Description
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => updateFormData('description', e.target.value)}
                        rows={8}
                        className={`w-full bg-gray-800/50 border-2 rounded-2xl px-4 py-4 text-white placeholder-gray-500 focus:outline-none transition-all duration-300 resize-none ${
                          errors.description 
                            ? 'border-red-500 focus:border-red-400 focus:ring-4 focus:ring-red-500/20' 
                            : 'border-gray-600 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20'
                        }`}
                        placeholder="Explain your idea in detail. What problem does it solve? How would it work? What makes it special?"
                        maxLength={1000}
                      />
                      <div className="flex justify-between items-center mt-2">
                        {errors.description && (
                          <p className="text-red-400 text-sm flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {errors.description}
                          </p>
                        )}
                        <span className="text-sm text-gray-500 ml-auto">
                          {formData.description.length}/1000
                        </span>
                      </div>
                    </div>

                    {/* Inspiration */}
                    <div>
                      <label className="block text-lg font-semibold text-gray-300 mb-4">
                        What Inspired This? (Optional)
                      </label>
                      <textarea
                        value={formData.inspiration}
                        onChange={(e) => updateFormData('inspiration', e.target.value)}
                        rows={8}
                        className="w-full bg-gray-800/50 border-2 border-gray-600 rounded-2xl px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 resize-none"
                        placeholder="Was there a specific moment, problem, or experience that sparked this idea? Share the story behind it..."
                        maxLength={500}
                      />
                      <div className="text-right mt-2">
                        <span className="text-sm text-gray-500">
                          {formData.inspiration.length}/500
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Organization */}
              {activeStep === 2 && (
                <div className="space-y-8 animate-in slide-in-from-right duration-300">
                  <div className="text-center mb-8">
                    <div className="text-6xl mb-4">🎯</div>
                    <h3 className="text-2xl font-bold text-white mb-2">Organize & Prioritize</h3>
                    <p className="text-gray-400">Help us categorize your idea and set its priority</p>
                  </div>

                  {/* Category Selection */}
                  <div>
                    <label className="block text-lg font-semibold text-gray-300 mb-6">
                      Choose a Category
                    </label>
                    <div className="grid md:grid-cols-3 gap-4">
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => updateFormData('category', cat.id)}
                          className={`relative p-6 rounded-2xl border-2 transition-all duration-300 group hover:scale-105 ${
                            formData.category === cat.id
                              ? 'border-purple-500 bg-purple-500/20'
                              : 'border-gray-600 bg-gray-800/30 hover:border-gray-500'
                          }`}
                        >
                          <div className={`absolute inset-0 bg-gradient-to-r ${cat.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
                          <div className="relative">
                            <div className="text-3xl mb-3">{cat.icon}</div>
                            <h4 className="font-bold text-white mb-2">{cat.name}</h4>
                            <p className="text-sm text-gray-400">{cat.description}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Priority Selection */}
                  <div>
                    <label className="block text-lg font-semibold text-gray-300 mb-6">
                      Set Priority Level
                    </label>
                    <div className="grid md:grid-cols-4 gap-4">
                      {priorities.map((priority) => (
                        <button
                          key={priority.id}
                          onClick={() => updateFormData('priority', priority.id)}
                          className={`relative p-6 rounded-2xl border-2 transition-all duration-300 group hover:scale-105 ${
                            formData.priority === priority.id
                              ? 'border-purple-500 bg-purple-500/20'
                              : 'border-gray-600 bg-gray-800/30 hover:border-gray-500'
                          }`}
                        >
                          <div className={`absolute inset-0 bg-gradient-to-r ${priority.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
                          <div className="relative text-center">
                            <div className="text-2xl mb-2">{priority.icon}</div>
                            <h4 className="font-bold text-white mb-1">{priority.name}</h4>
                            <p className="text-xs text-gray-400">{priority.description}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-lg font-semibold text-gray-300 mb-4">
                      Add Tags (Optional)
                    </label>
                    <div className="flex items-center space-x-3 mb-4">
                      <input
                        type="text"
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                        className="flex-1 bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                        placeholder="Enter a tag and press Enter..."
                        maxLength={20}
                        disabled={formData.tags.length >= 8}
                      />
                      <button
                        onClick={addTag}
                        disabled={!currentTag.trim() || formData.tags.length >= 8}
                        className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl transition-all duration-200 font-medium"
                      >
                        Add
                      </button>
                    </div>
                    
                    {formData.tags.length > 0 && (
                      <div className="flex flex-wrap gap-3">
                        {formData.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 text-purple-300 px-4 py-2 rounded-full text-sm flex items-center space-x-2 hover:scale-105 transition-transform duration-200"
                          >
                            <span>#{tag}</span>
                            <button
                              onClick={() => removeTag(tag)}
                              className="text-purple-400 hover:text-purple-200 transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <p className="text-gray-500 text-sm mt-3">
                      {formData.tags.length}/8 tags • Tags help organize and find your ideas later
                    </p>
                  </div>
                </div>
              )}

              {/* Step 3: Collaboration */}
              {activeStep === 3 && (
                <div className="space-y-8 animate-in slide-in-from-right duration-300">
                  <div className="text-center mb-8">
                    <div className="text-6xl mb-4">👥</div>
                    <h3 className="text-2xl font-bold text-white mb-2">Collaboration & Timeline</h3>
                    <p className="text-gray-400">Set up your team and timeline for this idea</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Collaborators */}
                    <div>
                      <label className="block text-lg font-semibold text-gray-300 mb-4">
                        Collaborators (Optional)
                      </label>
                      <div className="flex items-center space-x-3 mb-4">
                        <input
                          type="text"
                          value={currentCollaborator}
                          onChange={(e) => setCurrentCollaborator(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCollaborator())}
                          className="flex-1 bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                          placeholder="Enter name or email..."
                          disabled={formData.collaborators.length >= 5}
                        />
                        <button
                          onClick={addCollaborator}
                          disabled={!currentCollaborator.trim() || formData.collaborators.length >= 5}
                          className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl transition-all duration-200 font-medium"
                        >
                          Add
                        </button>
                      </div>
                      
                      {formData.collaborators.length > 0 && (
                        <div className="space-y-2">
                          {formData.collaborators.map((collaborator, index) => (
                            <div
                              key={index}
                              className="bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 flex items-center justify-between"
                            >
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                  {collaborator[0].toUpperCase()}
                                </div>
                                <span className="text-white">{collaborator}</span>
                              </div>
                              <button
                                onClick={() => removeCollaborator(collaborator)}
                                className="text-gray-400 hover:text-red-400 transition-colors"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <p className="text-gray-500 text-sm mt-3">
                        {formData.collaborators.length}/5 collaborators
                      </p>
                    </div>

                    {/* Target Date */}
                    <div>
                      <label className="block text-lg font-semibold text-gray-300 mb-4">
                        Target Date (Optional)
                      </label>
                      <input
                        type="date"
                        value={formData.targetDate}
                        onChange={(e) => updateFormData('targetDate', e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                      />
                      <p className="text-gray-500 text-sm mt-3">
                        When would you like to revisit or implement this idea?
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Preview */
            <div className="space-y-8 animate-in slide-in-from-right duration-300">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">✨</div>
                <h3 className="text-2xl font-bold text-white mb-2">Your Idea is Ready!</h3>
                <p className="text-gray-400">Review everything before saving</p>
              </div>

              <div className="max-w-4xl mx-auto bg-gray-800/30 rounded-2xl p-8 border border-gray-700">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-purple-300 mb-2">💡 Idea Title</h4>
                      <p className="text-white text-xl font-medium">{formData.title}</p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-purple-300 mb-2">📝 Description</h4>
                      <p className="text-gray-300 leading-relaxed">
                        {formData.description || 'No description provided'}
                      </p>
                    </div>

                    {formData.inspiration && (
                      <div>
                        <h4 className="text-lg font-semibold text-purple-300 mb-2">💭 Inspiration</h4>
                        <p className="text-gray-300 leading-relaxed italic">
                          "{formData.inspiration}"
                        </p>
                      </div>
                    )}

                    {formData.tags.length > 0 && (
                      <div>
                        <h4 className="text-lg font-semibold text-purple-300 mb-2">🏷️ Tags</h4>
                        <div className="flex flex-wrap gap-2">
                          {formData.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 text-purple-300 px-3 py-1 rounded-full text-sm"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-purple-300 mb-2">🎯 Category</h4>
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">
                          {categories.find(c => c.id === formData.category)?.icon}
                        </span>
                        <div>
                          <p className="text-white font-medium">
                            {categories.find(c => c.id === formData.category)?.name}
                          </p>
                          <p className="text-gray-400 text-sm">
                            {categories.find(c => c.id === formData.category)?.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-purple-300 mb-2">⚡ Priority</h4>
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">
                          {priorities.find(p => p.id === formData.priority)?.icon}
                        </span>
                        <div>
                          <p className="text-white font-medium">
                            {priorities.find(p => p.id === formData.priority)?.name}
                          </p>
                          <p className="text-gray-400 text-sm">
                            {priorities.find(p => p.id === formData.priority)?.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {formData.targetDate && (
                      <div>
                        <h4 className="text-lg font-semibold text-purple-300 mb-2">📅 Target Date</h4>
                        <p className="text-white">
                          {new Date(formData.targetDate).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    )}

                    {formData.collaborators.length > 0 && (
                      <div>
                        <h4 className="text-lg font-semibold text-purple-300 mb-2">👥 Collaborators</h4>
                        <div className="space-y-2">
                          {formData.collaborators.map((collaborator, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                {collaborator[0].toUpperCase()}
                              </div>
                              <span className="text-white">{collaborator}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Success Animation */}
                <div className="mt-8 text-center">
                  <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 text-green-300 px-6 py-3 rounded-full">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-medium">Ready to create your idea!</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {errors.submit && (
            <div className="max-w-4xl mx-auto bg-red-500/10 border border-red-500/30 text-red-300 p-4 rounded-xl flex items-center space-x-3 animate-in slide-in-from-top duration-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{errors.submit}</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="relative border-t border-gray-700/50 p-8 bg-gray-900/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              {(activeStep > 0 || showPreview) && (
                <button
                  onClick={prevStep}
                  className="flex items-center space-x-2 text-gray-400 hover:text-white transition-all duration-200 group"
                >
                  <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span className="font-medium">Back</span>
                </button>
              )}
              
              <div className="text-sm text-gray-500">
                {showPreview ? 'Final Review' : `Step ${activeStep + 1} of ${steps.length}`}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={onClose}
                className="px-6 py-3 text-gray-400 hover:text-white transition-colors font-medium"
              >
                Cancel
              </button>
              
              {!showPreview ? (
                <button
                  onClick={nextStep}
                  disabled={activeStep === 0 && !formData.title.trim()}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 group"
                >
                  <span>{activeStep === steps.length - 1 ? 'Review' : 'Continue'}</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m0-7H3" />
                  </svg>
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 group"
                >
                  {isLoading ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      <span>Creating Magic...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Create Idea</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
          
          {/* Keyboard Shortcuts */}
          <div className="mt-6 pt-6 border-t border-gray-700/30">
            <div className="flex items-center justify-center space-x-8 text-xs text-gray-500">
              <div className="flex items-center space-x-2">
                <kbd className="bg-gray-800 border border-gray-600 px-2 py-1 rounded text-xs">Tab</kbd>
                <span>Navigate fields</span>
              </div>
              <div className="flex items-center space-x-2">
                <kbd className="bg-gray-800 border border-gray-600 px-2 py-1 rounded text-xs">Enter</kbd>
                <span>Add tags</span>
              </div>
              <div className="flex items-center space-x-2">
                <kbd className="bg-gray-800 border border-gray-600 px-2 py-1 rounded text-xs">Esc</kbd>
                <span>Close modal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddIdeaModal;