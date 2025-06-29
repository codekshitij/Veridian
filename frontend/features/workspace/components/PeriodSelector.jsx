// features/workspace/components/PeriodSelector.jsx
import React, { useState } from 'react';

const selectorStyles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    background: 'rgba(30, 41, 59, 0.8)',
    padding: '10px 15px',
    borderRadius: '8px',
    border: '1px solid #334155',
    backdropFilter: 'blur(10px)',
    fontFamily: 'inherit',
  },
  label: {
    color: '#94a3b8',
    fontSize: '0.85rem',
    fontWeight: '500',
    whiteSpace: 'nowrap',
  },
  input: {
    background: 'rgba(15, 23, 42, 0.8)',
    border: '1px solid #475569',
    color: '#e2e8f0',
    padding: '6px 8px',
    borderRadius: '4px',
    fontSize: '0.85rem',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.2s ease',
    minWidth: '130px',
  },
  inputFocus: {
    borderColor: '#60a5fa',
    boxShadow: '0 0 0 2px rgba(96, 165, 250, 0.1)',
  },
  presetContainer: {
    position: 'relative',
  },
  presetButton: {
    background: 'rgba(15, 23, 42, 0.8)',
    border: '1px solid #475569',
    color: '#e2e8f0',
    padding: '6px 12px',
    borderRadius: '4px',
    fontSize: '0.85rem',
    fontFamily: 'inherit',
    cursor: 'pointer',
    outline: 'none',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    minWidth: '100px',
    justifyContent: 'space-between',
  },
  presetButtonHover: {
    borderColor: '#60a5fa',
    background: 'rgba(96, 165, 250, 0.1)',
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    marginTop: '4px',
    background: 'rgba(15, 23, 42, 0.95)',
    border: '1px solid #475569',
    borderRadius: '6px',
    backdropFilter: 'blur(15px)',
    zIndex: 1000,
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
  },
  dropdownItem: {
    padding: '8px 12px',
    fontSize: '0.85rem',
    color: '#e2e8f0',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    borderBottom: '1px solid rgba(71, 85, 105, 0.3)',
  },
  dropdownItemHover: {
    background: 'rgba(96, 165, 250, 0.1)',
  },
  dropdownItemLast: {
    borderBottom: 'none',
  },
};

const presets = [
  {
    label: 'This Month',
    getValue: () => {
      const now = new Date();
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      return {
        startDate: start.toISOString().split('T')[0],
        endDate: end.toISOString().split('T')[0],
      };
    },
  },
  {
    label: 'Next 3 Months',
    getValue: () => {
      const now = new Date();
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      const end = new Date(now.getFullYear(), now.getMonth() + 3, 0);
      return {
        startDate: start.toISOString().split('T')[0],
        endDate: end.toISOString().split('T')[0],
      };
    },
  },
  {
    label: 'This Quarter',
    getValue: () => {
      const now = new Date();
      const quarter = Math.floor(now.getMonth() / 3);
      const start = new Date(now.getFullYear(), quarter * 3, 1);
      const end = new Date(now.getFullYear(), (quarter + 1) * 3, 0);
      return {
        startDate: start.toISOString().split('T')[0],
        endDate: end.toISOString().split('T')[0],
      };
    },
  },
  {
    label: 'This Year',
    getValue: () => {
      const now = new Date();
      const start = new Date(now.getFullYear(), 0, 1);
      const end = new Date(now.getFullYear(), 11, 31);
      return {
        startDate: start.toISOString().split('T')[0],
        endDate: end.toISOString().split('T')[0],
      };
    },
  },
  {
    label: 'Custom Range',
    getValue: null, // Special case for custom range
  },
];

function PeriodSelector({ dateRange, onChange }) {
  const [showPresets, setShowPresets] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [hoveredPreset, setHoveredPreset] = useState(null);

  const handlePresetSelect = (preset) => {
    if (preset.getValue) {
      const newRange = preset.getValue();
      onChange(newRange);
    }
    setShowPresets(false);
  };

  const handleDateChange = (field, value) => {
    const newRange = {
      ...dateRange,
      [field]: value,
    };
    onChange(newRange);
  };

  const getCurrentPresetLabel = () => {
    for (const preset of presets) {
      if (preset.getValue) {
        const presetRange = preset.getValue();
        if (
          presetRange.startDate === dateRange.startDate &&
          presetRange.endDate === dateRange.endDate
        ) {
          return preset.label;
        }
      }
    }
    return 'Custom Range';
  };

  return (
    <div style={selectorStyles.container}>
      <span style={selectorStyles.label}>Period:</span>
      
      <div style={selectorStyles.presetContainer}>
        <button
          style={{
            ...selectorStyles.presetButton,
            ...(showPresets ? selectorStyles.presetButtonHover : {}),
          }}
          onClick={() => setShowPresets(!showPresets)}
          onMouseEnter={(e) => {
            if (!showPresets) {
              Object.assign(e.target.style, selectorStyles.presetButtonHover);
            }
          }}
          onMouseLeave={(e) => {
            if (!showPresets) {
              Object.assign(e.target.style, selectorStyles.presetButton);
            }
          }}
        >
          <span>{getCurrentPresetLabel()}</span>
          <span style={{ transform: showPresets ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}>
            ▼
          </span>
        </button>

        {showPresets && (
          <>
            <div 
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 999,
              }}
              onClick={() => setShowPresets(false)}
            />
            <div style={selectorStyles.dropdown}>
              {presets.map((preset, index) => (
                <div
                  key={preset.label}
                  style={{
                    ...selectorStyles.dropdownItem,
                    ...(hoveredPreset === index ? selectorStyles.dropdownItemHover : {}),
                    ...(index === presets.length - 1 ? selectorStyles.dropdownItemLast : {}),
                  }}
                  onClick={() => handlePresetSelect(preset)}
                  onMouseEnter={() => setHoveredPreset(index)}
                  onMouseLeave={() => setHoveredPreset(null)}
                >
                  {preset.label}
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <span style={selectorStyles.label}>From:</span>
      <input
        type="date"
        value={dateRange.startDate}
        onChange={(e) => handleDateChange('startDate', e.target.value)}
        style={{
          ...selectorStyles.input,
          ...(focusedInput === 'start' ? selectorStyles.inputFocus : {}),
        }}
        onFocus={() => setFocusedInput('start')}
        onBlur={() => setFocusedInput(null)}
      />

      <span style={selectorStyles.label}>To:</span>
      <input
        type="date"
        value={dateRange.endDate}
        onChange={(e) => handleDateChange('endDate', e.target.value)}
        style={{
          ...selectorStyles.input,
          ...(focusedInput === 'end' ? selectorStyles.inputFocus : {}),
        }}
        onFocus={() => setFocusedInput('end')}
        onBlur={() => setFocusedInput(null)}
      />
    </div>
  );
}

export default PeriodSelector;