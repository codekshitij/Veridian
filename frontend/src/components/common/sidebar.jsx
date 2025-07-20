import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';

const styles = {
  sidebarContainer: {
    fontFamily: 'var(--font-family)',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '280px',
    background: 'linear-gradient(180deg, #0F172A 0%, #1E293B 100%)',
    backdropFilter: 'blur(20px)',
    borderRight: '1px solid rgba(148, 163, 184, 0.1)',
    color: '#FFFFFF',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    padding: '0',
    boxSizing: 'border-box',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    zIndex: 1000,
    boxShadow: '4px 0 24px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.05)',
    overflow: 'hidden',
  },
  
  sidebarCollapsed: {
    width: '0px',
    transform: 'translateX(-100%)',
    opacity: 0,
    visibility: 'hidden',
  },
  
  sidebarOpen: {
    '@media (max-width: 768px)': {
      width: '280px',
      transform: 'translateX(0)',
      opacity: 1,
    },
  },
  
  // Modern toggle button with glassmorphism
  toggleButton: {
    position: 'fixed',
    top: '24px',
    left: '24px',
    width: '48px',
    height: '48px',
    background: 'rgba(30, 41, 59, 0.8)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(148, 163, 184, 0.2)',
    borderRadius: '16px',
    color: '#F1F5F9',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.1rem',
    fontWeight: '500',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    zIndex: 1001,
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)',
    transform: 'scale(1)',
  },
  
  toggleButtonHover: {
    background: 'rgba(59, 130, 246, 0.15)',
    borderColor: 'rgba(59, 130, 246, 0.3)',
    color: '#60A5FA',
    transform: 'scale(1.05) translateY(-2px)',
    boxShadow: '0 12px 40px rgba(59, 130, 246, 0.15), 0 4px 16px rgba(0, 0, 0, 0.1)',
  },
  
  // Sleek header area
  sidebarHeader: {
    padding: '2rem 1.5rem 1rem',
    borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)',
    position: 'relative',
    overflow: 'hidden',
  },
  
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '0.5rem',
  },
  
  logoIcon: {
    width: '32px',
    height: '32px',
    background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    color: 'white',
    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
  },
  
  logoText: {
    fontSize: '1.25rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #F1F5F9 0%, #94A3B8 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: '0.5px',
  },
  
  logoSubtext: {
    fontSize: '0.75rem',
    color: '#94A3B8',
    fontWeight: '500',
    letterSpacing: '0.5px',
  },
  
  // Close button with modern styling
  closeButton: {
    position: 'absolute',
    top: '1.5rem',
    right: '1.5rem',
    width: '40px',
    height: '40px',
    background: 'rgba(148, 163, 184, 0.1)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(148, 163, 184, 0.2)',
    borderRadius: '12px',
    color: '#94A3B8',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.1rem',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    zIndex: 10,
  },
  
  closeButtonHover: {
    background: 'rgba(239, 68, 68, 0.15)',
    borderColor: 'rgba(239, 68, 68, 0.3)',
    color: '#F87171',
    transform: 'scale(1.05) rotate(90deg)',
  },
  
  navList: {
    listStyle: 'none',
    padding: '1.5rem 1rem',
    margin: '0',
    flexGrow: 1,
    overflowY: 'auto',
    scrollbarWidth: 'thin',
    scrollbarColor: 'rgba(148, 163, 184, 0.3) transparent',
  },
  
  navItem: {
    margin: '0.25rem 0',
    position: 'relative',
  },
  
  navLink: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.875rem 1rem',
    textDecoration: 'none',
    color: '#CBD5E1',
    fontSize: '0.95rem',
    fontWeight: '500',
    borderRadius: '16px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    border: '1px solid transparent',
    background: 'transparent',
    overflow: 'hidden',
    transform: 'translateX(0)',
  },
  
  navLinkActive: {
    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(139, 92, 246, 0.1) 100%)',
    color: '#F1F5F9',
    fontWeight: '600',
    border: '1px solid rgba(59, 130, 246, 0.2)',
    transform: 'translateX(8px) scale(1.02)',
    boxShadow: '0 8px 32px rgba(59, 130, 246, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
  },
  
  navLinkHover: {
    background: 'rgba(148, 163, 184, 0.08)',
    color: '#F1F5F9',
    transform: 'translateX(4px)',
    border: '1px solid rgba(148, 163, 184, 0.15)',
  },
  
  navIcon: {
    marginRight: '0.875rem',
    fontSize: '1.1rem',
    minWidth: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'inherit',
    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  navIconActive: {
    transform: 'scale(1.1)',
    color: '#60A5FA',
  },
  
  sidebarFooter: {
    padding: '1.5rem',
    borderTop: '1px solid rgba(148, 163, 184, 0.1)',
    background: 'linear-gradient(180deg, transparent 0%, rgba(15, 23, 42, 0.5) 100%)',
    marginTop: 'auto',
    backdropFilter: 'blur(8px)',
  },
  
  accountButton: {
    width: '100%',
    padding: '0.875rem 1rem',
    background: 'rgba(148, 163, 184, 0.08)',
    color: '#F1F5F9',
    border: '1px solid rgba(148, 163, 184, 0.15)',
    borderRadius: '14px',
    marginBottom: '0.75rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    backdropFilter: 'blur(8px)',
  },
  
  accountButtonHover: {
    background: 'rgba(59, 130, 246, 0.15)',
    borderColor: 'rgba(59, 130, 246, 0.3)',
    transform: 'translateY(-2px) scale(1.02)',
    boxShadow: '0 8px 32px rgba(59, 130, 246, 0.15)',
    color: '#60A5FA',
  },
  
  logoutButton: {
    width: '100%',
    padding: '0.875rem 1rem',
    background: 'rgba(239, 68, 68, 0.1)',
    color: '#FCA5A5',
    border: '1px solid rgba(239, 68, 68, 0.2)',
    borderRadius: '14px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    fontWeight: '500',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    backdropFilter: 'blur(8px)',
  },
  
  logoutButtonHover: {
    background: 'rgba(239, 68, 68, 0.2)',
    borderColor: 'rgba(239, 68, 68, 0.4)',
    color: '#FFFFFF',
    transform: 'translateY(-2px) scale(1.02)',
    boxShadow: '0 8px 32px rgba(239, 68, 68, 0.2)',
  },
  
  copyright: {
    textAlign: 'center',
    marginTop: '1rem',
    padding: '0.5rem',
    color: '#64748B',
    fontSize: '0.75rem',
    fontWeight: '400',
    opacity: 0.8,
    letterSpacing: '0.5px',
  },
  
  // Scroll styles
  scrollStyles: `
    .sidebar-nav::-webkit-scrollbar {
      width: 4px;
    }
    .sidebar-nav::-webkit-scrollbar-track {
      background: transparent;
    }
    .sidebar-nav::-webkit-scrollbar-thumb {
      background: rgba(148, 163, 184, 0.3);
      border-radius: 2px;
    }
    .sidebar-nav::-webkit-scrollbar-thumb:hover {
      background: rgba(148, 163, 184, 0.5);
    }
  `,
  
  // Backdrop overlay for mobile
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(4px)',
    zIndex: 999,
    opacity: 0,
    visibility: 'hidden',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  backdropVisible: {
    opacity: 1,
    visibility: 'visible',
  },
};

function Sidebar({ isMobileOpen, isCollapsed, onToggle }) {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const navLinks = [
    { path: '/dashboard', name: 'Dashboard', icon: 'dashboard' },
    { path: '/calendar', name: 'Calendar', icon: 'calendar_month' },
    { path: '/workspace', name: 'Workspace', icon: 'work' },
    { path: '/idea-canvas', name: 'Idea Canvas', icon: 'lightbulb' },
  ];

  const dynamicSidebarStyle = {
    ...styles.sidebarContainer,
    ...(isCollapsed ? styles.sidebarCollapsed : {}),
    ...(isMobileOpen ? styles.sidebarOpen : {}),
  };

  const backdropStyle = {
    ...styles.backdrop,
    ...(isMobileOpen && !isCollapsed ? styles.backdropVisible : {}),
  };

  return (
    <>
      {/* Add scroll styles */}
      <style>{styles.scrollStyles}</style>
      
      {/* Mobile backdrop */}
      <div style={backdropStyle} onClick={onToggle} />

      {/* Toggle Button - Shows when sidebar is collapsed */}
      {isCollapsed && (
        <button
          style={styles.toggleButton}
          onClick={onToggle}
          onMouseEnter={(e) => Object.assign(e.target.style, styles.toggleButtonHover)}
          onMouseLeave={(e) => Object.assign(e.target.style, styles.toggleButton)}
          aria-label="Open sidebar"
        >
          <span className="material-icons">menu</span>
        </button>
      )}

      {/* Sidebar */}
      <div style={dynamicSidebarStyle}>
        {/* Header with Logo and Close Button */}
        <div style={styles.sidebarHeader}>
          <div style={styles.logoContainer}>
            <div style={styles.logoIcon}>
              <span className="material-icons">auto_awesome</span>
            </div>
            <div>
              <div style={styles.logoText}>Veridian</div>
              <div style={styles.logoSubtext}>Workspace</div>
            </div>
          </div>
          
          {/* Close Button */}
          {!isCollapsed && (
            <button
              style={styles.closeButton}
              onClick={onToggle}
              onMouseEnter={(e) => Object.assign(e.target.style, styles.closeButtonHover)}
              onMouseLeave={(e) => Object.assign(e.target.style, styles.closeButton)}
              aria-label="Close sidebar"
            >
              <span className="material-icons">close</span>
            </button>
          )}
        </div>

        {/* Navigation Links */}
        <ul style={styles.navList} className="sidebar-nav">
          {navLinks.map((link) => (
            <li key={link.path} style={styles.navItem}>
              <NavLink
                to={link.path}
                style={({ isActive }) => ({
                  ...styles.navLink,
                  ...(isActive ? styles.navLinkActive : {}),
                })}
                onMouseEnter={(e) => {
                  const currentPath = window.location.pathname;
                  const isActive = currentPath === link.path;
                  if (!isActive) {
                    Object.assign(e.target.style, styles.navLinkHover);
                    const icon = e.target.querySelector('.nav-icon');
                    if (icon) {
                      icon.style.transform = 'scale(1.05)';
                    }
                  }
                }}
                onMouseLeave={(e) => {
                  const currentPath = window.location.pathname;
                  const isActive = currentPath === link.path;
                  if (!isActive) {
                    Object.assign(e.target.style, {
                      background: 'transparent',
                      color: '#CBD5E1',
                      transform: 'translateX(0)',
                      border: '1px solid transparent',
                    });
                    const icon = e.target.querySelector('.nav-icon');
                    if (icon) {
                      icon.style.transform = 'scale(1)';
                    }
                  }
                }}
              >
                <span 
                  className="material-icons nav-icon" 
                  style={{
                    ...styles.navIcon,
                    ...(window.location.pathname === link.path ? styles.navIconActive : {}),
                  }}
                >
                  {link.icon}
                </span>
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Footer with Account & Logout */}
        {isAuthenticated && (
          <div style={styles.sidebarFooter}>
            {/* Account Button */}
            <button
              style={styles.accountButton}
              onClick={() => navigate('/account')}
              onMouseEnter={(e) => Object.assign(e.target.style, styles.accountButtonHover)}
              onMouseLeave={(e) => Object.assign(e.target.style, styles.accountButton)}
            >
              <span className="material-icons" style={{ fontSize: '1rem' }}>
                settings
              </span>
              Account Settings
            </button>
            
            {/* Logout Button */}
            <button
              style={styles.logoutButton}
              onClick={handleLogout}
              onMouseEnter={(e) => Object.assign(e.target.style, styles.logoutButtonHover)}
              onMouseLeave={(e) => Object.assign(e.target.style, styles.logoutButton)}
            >
              <span className="material-icons" style={{ fontSize: '1rem' }}>
                logout
              </span>
              Sign Out
            </button>
            
            {/* Copyright */}
            <div style={styles.copyright}>
              © 2025 Veridian Systems
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Sidebar;