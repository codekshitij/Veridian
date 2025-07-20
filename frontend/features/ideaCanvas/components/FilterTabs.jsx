import React from 'react';

const FilterTabs = ({ activeFilter, onFilterChange, counts }) => {
  const tabs = [
    { id: 'all', label: 'ALL IDEAS', count: counts.all },
    { id: 'recent', label: 'RECENT', count: counts.recent }
  ];

  return (
    <div className="flex space-x-4 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onFilterChange(tab.id)}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
            activeFilter === tab.id
              ? 'bg-purple-600 text-white shadow-lg'
              : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
          }`}
        >
          <span>{tab.label}</span>
          <span className={`px-2 py-1 rounded-full text-xs ${
            activeFilter === tab.id ? 'bg-purple-700' : 'bg-gray-700'
          }`}>
            {tab.count}
          </span>
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;