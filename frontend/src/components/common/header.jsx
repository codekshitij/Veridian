import React, { useState, useEffect } from 'react';

const styles = {
  headerContainer: {
    fontFamily: 'var(--font-family), sans-serif',
    background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    color: '#FFFFFF',
    padding: '0 2rem',
    borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxSizing: 'border-box',
    width: '100%',
    height: '72px',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  headerScrolled: {
    background: 'rgba(15, 23, 42, 0.98)',
    backdropFilter: 'blur(24px)',
    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)',
    borderBottom: '1px solid rgba(59, 130, 246, 0.1)',
  },
  
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
    flex: 1,
  },
  
  // Sidebar toggle button (for when sidebar is collapsed)
  sidebarToggle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '44px',
    height: '44px',
    background: 'rgba(148, 163, 184, 0.1)',
    border: '1px solid rgba(148, 163, 184, 0.2)',
    borderRadius: '14px',
    color: '#94A3B8',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    fontSize: '1.1rem',
  },
  
  sidebarToggleHover: {
    background: 'rgba(59, 130, 246, 0.15)',
    borderColor: 'rgba(59, 130, 246, 0.3)',
    color: '#60A5FA',
    transform: 'scale(1.05)',
  },
  
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    padding: '0.5rem 0.75rem',
    borderRadius: '16px',
    position: 'relative',
    overflow: 'hidden',
  },
  
  brandContainerHover: {
    transform: 'translateY(-1px)',
  },
  
  brandIcon: {
    width: '36px',
    height: '36px',
    background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.3rem',
    color: 'white',
    boxShadow: '0 4px 16px rgba(59, 130, 246, 0.3)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  brandIconHover: {
    transform: 'scale(1.05) rotate(5deg)',
    boxShadow: '0 6px 24px rgba(59, 130, 246, 0.4)',
  },
  
  brandText: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.125rem',
  },
  
  brandName: {
    fontSize: '1.5rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #F1F5F9 0%, #CBD5E1 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    letterSpacing: '0.5px',
    lineHeight: '1.2',
    margin: 0,
  },
  
  brandSubtitle: {
    fontSize: '0.75rem',
    color: '#64748B',
    fontWeight: '500',
    letterSpacing: '0.5px',
    lineHeight: '1',
  },
  
  // Search bar
  searchContainer: {
    position: 'relative',
    flex: '1',
    maxWidth: '400px',
    marginLeft: '2rem',
    '@media (max-width: 768px)': {
      display: 'none',
    },
  },
  
  searchInput: {
    width: '100%',
    padding: '0.75rem 1rem 0.75rem 3rem',
    background: 'rgba(148, 163, 184, 0.08)',
    border: '1px solid rgba(148, 163, 184, 0.15)',
    borderRadius: '16px',
    color: '#F1F5F9',
    fontSize: '0.9rem',
    fontWeight: '400',
    outline: 'none',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    backdropFilter: 'blur(8px)',
    boxSizing: 'border-box',
  },
  
  searchInputFocus: {
    background: 'rgba(59, 130, 246, 0.08)',
    borderColor: 'rgba(59, 130, 246, 0.3)',
    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
  },
  
  searchIcon: {
    position: 'absolute',
    left: '1rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#94A3B8',
    fontSize: '1.1rem',
    pointerEvents: 'none',
    transition: 'color 0.3s ease',
  },
  
  searchIconFocus: {
    color: '#60A5FA',
  },
  
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  
  // Action buttons
  actionButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '44px',
    height: '44px',
    background: 'rgba(148, 163, 184, 0.08)',
    border: '1px solid rgba(148, 163, 184, 0.15)',
    borderRadius: '14px',
    color: '#94A3B8',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    fontSize: '1.1rem',
    position: 'relative',
    backdropFilter: 'blur(8px)',
  },
  
  actionButtonHover: {
    background: 'rgba(59, 130, 246, 0.15)',
    borderColor: 'rgba(59, 130, 246, 0.3)',
    color: '#60A5FA',
    transform: 'translateY(-2px) scale(1.05)',
    boxShadow: '0 4px 16px rgba(59, 130, 246, 0.15)',
  },
  
  notificationBadge: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    width: '8px',
    height: '8px',
    background: 'linear-gradient(135deg, #EF4444 0%, #F87171 100%)',
    borderRadius: '50%',
    border: '2px solid rgba(15, 23, 42, 0.8)',
    boxShadow: '0 0 8px rgba(239, 68, 68, 0.6)',
    animation: 'pulse 2s infinite',
  },
  
  // User profile section
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.5rem 0.75rem',
    borderRadius: '16px',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    background: 'rgba(148, 163, 184, 0.08)',
    border: '1px solid rgba(148, 163, 184, 0.15)',
    backdropFilter: 'blur(8px)',
    minWidth: '160px',
  },
  
  userSectionHover: {
    background: 'rgba(59, 130, 246, 0.1)',
    borderColor: 'rgba(59, 130, 246, 0.2)',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 16px rgba(59, 130, 246, 0.1)',
  },
  
  userAvatar: {
    width: '36px',
    height: '36px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: '0.9rem',
    border: '2px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  userAvatarHover: {
    transform: 'scale(1.05)',
    boxShadow: '0 4px 16px rgba(59, 130, 246, 0.4)',
  },
  
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.125rem',
    flex: 1,
    minWidth: 0,
    '@media (max-width: 768px)': {
      display: 'none',
    },
  },
  
  userName: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#F1F5F9',
    lineHeight: '1.2',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  
  userStatus: {
    fontSize: '0.75rem',
    color: '#34D399',
    lineHeight: '1.2',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
  },
  
  statusDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: '#34D399',
    boxShadow: '0 0 6px rgba(52, 211, 153, 0.6)',
    animation: 'pulse 2s infinite',
  },
  
  dropdownIcon: {
    color: '#94A3B8',
    fontSize: '1rem',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  dropdownIconHover: {
    color: '#60A5FA',
    transform: 'rotate(180deg)',
  },
  
  // Mobile responsive
  mobileHidden: {
    '@media (max-width: 768px)': {
      display: 'none',
    },
  },
  
  // Animation keyframes
  animations: `
    @keyframes pulse {
      0%, 100% {
        opacity: 1;
        transform: scale(1);
      }
      50% {
        opacity: 0.8;
        transform: scale(1.1);
      }
    }
    
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `,
};

function Header({ onSidebarToggle, isSidebarCollapsed }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [hoveredElement, setHoveredElement] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <>
      <style>{styles.animations}</style>
      <header 
        style={{
          ...styles.headerContainer,
          ...(isScrolled ? styles.headerScrolled : {}),
        }}
      >
        <div style={styles.headerLeft}>
          {/* Sidebar Toggle (when collapsed) */}
          {isSidebarCollapsed && (
            <button
              style={{
                ...styles.sidebarToggle,
                ...(hoveredElement === 'sidebar' ? styles.sidebarToggleHover : {}),
              }}
              onClick={onSidebarToggle}
              onMouseEnter={() => setHoveredElement('sidebar')}
              onMouseLeave={() => setHoveredElement(null)}
              aria-label="Toggle sidebar"
            >
              <span className="material-icons">menu</span>
            </button>
          )}

          {/* Brand */}
          <div
            style={{
              ...styles.brandContainer,
              ...(hoveredElement === 'brand' ? styles.brandContainerHover : {}),
            }}
            onMouseEnter={() => setHoveredElement('brand')}
            onMouseLeave={() => setHoveredElement(null)}
            onClick={() => window.location.href = '/dashboard'}
          >
            <div 
              style={{
                ...styles.brandIcon,
                ...(hoveredElement === 'brand' ? styles.brandIconHover : {}),
              }}
            >
              <span className="material-icons">auto_awesome</span>
            </div>
            <div style={styles.brandText}>
              <h1 style={styles.brandName}>Veridian</h1>
              <span style={styles.brandSubtitle}>Workspace</span>
            </div>
          </div>

          {/* Search Bar */}
          <div style={styles.searchContainer}>
            <span 
              className="material-icons" 
              style={{
                ...styles.searchIcon,
                ...(searchFocused ? styles.searchIconFocus : {}),
              }}
            >
              search
            </span>
            <input
              type="text"
              placeholder="Search anything..."
              style={{
                ...styles.searchInput,
                ...(searchFocused ? styles.searchInputFocus : {}),
              }}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>
        </div>

        <div style={styles.headerRight}>
          {/* Quick Actions */}
          <button
            style={{
              ...styles.actionButton,
              ...(hoveredElement === 'notifications' ? styles.actionButtonHover : {}),
            }}
            onMouseEnter={() => setHoveredElement('notifications')}
            onMouseLeave={() => setHoveredElement(null)}
            aria-label="Notifications"
          >
            <span className="material-icons">notifications</span>
            <div style={styles.notificationBadge}></div>
          </button>

          <button
            style={{
              ...styles.actionButton,
              ...(hoveredElement === 'help' ? styles.actionButtonHover : {}),
            }}
            onMouseEnter={() => setHoveredElement('help')}
            onMouseLeave={() => setHoveredElement(null)}
            aria-label="Help"
          >
            <span className="material-icons">help_outline</span>
          </button>

          {/* User Profile */}
          <div
            style={{
              ...styles.userSection,
              ...(hoveredElement === 'user' ? styles.userSectionHover : {}),
            }}
            onMouseEnter={() => setHoveredElement('user')}
            onMouseLeave={() => setHoveredElement(null)}
          >
            <div 
              style={{
                ...styles.userAvatar,
                ...(hoveredElement === 'user' ? styles.userAvatarHover : {}),
              }}
            >
              JD
            </div>
            <div style={styles.userInfo}>
              <span style={styles.userName}>John Doe</span>
              <div style={styles.userStatus}>
                <div style={styles.statusDot}></div>
                Online • {currentTime}
              </div>
            </div>
            <span 
              className="material-icons" 
              style={{
                ...styles.dropdownIcon,
                ...(hoveredElement === 'user' ? styles.dropdownIconHover : {}),
              }}
            >
              keyboard_arrow_down
            </span>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;