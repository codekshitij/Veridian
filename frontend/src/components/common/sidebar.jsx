import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';

const styles = {
  sidebarContainer: {
    fontFamily: 'var(--font-family)',
    position: 'relative',
    width: '280px',
    backgroundColor: '#0F172A',
    borderRight: '2px solid #334155',
    color: '#FFFFFF',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    padding: '0',
    boxSizing: 'border-box',
    transition: 'width 0.3s ease, transform 0.3s ease',
    zIndex: 1000,
  },
  
  sidebarCollapsed: {
    width: '0px',
    transform: 'translateX(-100%)',
    overflow: 'hidden',
  },
  
  sidebarOpen: {
    '@media (max-width: 768px)': {
      width: '280px',
      transform: 'translateX(0)',
    },
  },
  
  // Toggle button that appears when sidebar is collapsed
  toggleButton: {
    position: 'fixed',
    top: '20px',
    left: '20px',
    width: '48px',
    height: '48px',
    backgroundColor: '#1E293B',
    border: '2px solid #475569',
    borderRadius: '12px',
    color: '#FFFFFF',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.3rem',
    fontWeight: '700',
    transition: 'all 0.3s ease',
    zIndex: 1001,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
  },
  
  toggleButtonHover: {
    backgroundColor: '#334155',
    borderColor: '#3B82F6',
    color: '#60A5FA',
    transform: 'scale(1.05)',
    boxShadow: '0 6px 20px rgba(59, 130, 246, 0.3)',
  },
  
  // Close button inside sidebar
  closeButton: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    width: '40px',
    height: '40px',
    backgroundColor: 'transparent',
    border: '2px solid #475569',
    borderRadius: '10px',
    color: '#94A3B8',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    transition: 'all 0.3s ease',
    zIndex: 10,
  },
  
  closeButtonHover: {
    backgroundColor: '#1E293B',
    borderColor: '#EF4444',
    color: '#F87171',
    transform: 'scale(1.05)',
  },
  
  navList: {
    listStyle: 'none',
    padding: '4rem 0.75rem 1.5rem', // Added top padding for close button
    margin: '0',
    flexGrow: 1,
    overflowY: 'auto',
  },
  
  navItem: {
    margin: '0.5rem 0',
  },
  
  navLink: {
    display: 'flex',
    alignItems: 'center',
    padding: '1rem 1.25rem',
    textDecoration: 'none',
    color: '#F1F5F9',
    fontSize: '1rem',
    fontWeight: '600',
    borderRadius: '12px',
    transition: 'all 0.3s ease',
    position: 'relative',
    border: '2px solid transparent',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },
  
  navLinkActive: {
    backgroundColor: '#3B82F6',
    color: '#FFFFFF',
    fontWeight: '700',
    boxShadow: '0 6px 20px rgba(59, 130, 246, 0.4)',
    border: '2px solid #60A5FA',
    transform: 'translateX(6px)',
  },
  
  navLinkHover: {
    backgroundColor: '#1E293B',
    color: '#FFFFFF',
    transform: 'translateX(4px)',
    border: '2px solid #475569',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
  },
  
  navIcon: {
    marginRight: '1rem',
    fontSize: '1.25rem',
    minWidth: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'inherit',
  },
  
  sidebarFooter: {
    padding: '1.25rem',
    borderTop: '2px solid #334155',
    backgroundColor: '#0F172A',
    marginTop: 'auto',
  },
  
  accountButton: {
    width: '100%',
    padding: '1rem 1.25rem',
    backgroundColor: '#1E293B',
    color: '#FFFFFF',
    border: '2px solid #475569',
    borderRadius: '12px',
    marginBottom: '0.75rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    fontSize: '0.95rem',
    fontWeight: '700',
    transition: 'all 0.3s ease',
  },
  
  accountButtonHover: {
    backgroundColor: '#334155',
    borderColor: '#3B82F6',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(59, 130, 246, 0.2)',
    color: '#60A5FA',
  },
  
  logoutButton: {
    width: '100%',
    padding: '1rem 1.25rem',
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
    color: '#FCA5A5',
    border: '2px solid #EF4444',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '0.95rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    fontWeight: '700',
    transition: 'all 0.3s ease',
  },
  
  logoutButtonHover: {
    backgroundColor: '#EF4444',
    color: '#FFFFFF',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(239, 68, 68, 0.4)',
  },
  
  copyright: {
    textAlign: 'center',
    marginTop: '0.75rem',
    padding: '0.5rem',
    color: '#64748B',
    fontSize: '0.8rem',
    fontStyle: 'italic',
    fontWeight: '500',
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
    { path: '/okrs', name: 'OKRs', icon: 'ads_click' },
    { path: '/idea-canvas', name: 'Idea Canvas', icon: 'lightbulb' },
  ];

  const dynamicSidebarStyle = {
    ...styles.sidebarContainer,
    ...(isCollapsed ? styles.sidebarCollapsed : {}),
    ...(isMobileOpen ? styles.sidebarOpen : {}),
  };

  return (
    <>
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
        {/* Close Button - Shows when sidebar is open */}
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

        {/* Navigation Links */}
        <ul style={styles.navList}>
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
                  }
                }}
                onMouseLeave={(e) => {
                  const currentPath = window.location.pathname;
                  const isActive = currentPath === link.path;
                  if (!isActive) {
                    Object.assign(e.target.style, {
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      color: '#F1F5F9',
                      transform: 'translateX(0)',
                      border: '2px solid transparent',
                      boxShadow: 'none',
                    });
                  }
                }}
              >
                <span className="material-icons" style={styles.navIcon}>
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
              <span className="material-icons" style={{ fontSize: '1.1rem' }}>
                settings
              </span>
              Account
            </button>
            
            {/* Logout Button */}
            <button
              style={styles.logoutButton}
              onClick={handleLogout}
              onMouseEnter={(e) => Object.assign(e.target.style, styles.logoutButtonHover)}
              onMouseLeave={(e) => Object.assign(e.target.style, styles.logoutButton)}
            >
              <span className="material-icons" style={{ fontSize: '1.1rem' }}>
                logout
              </span>
              Logout
            </button>
            
            {/* Copyright */}
            <div style={styles.copyright}>
              © 2025 Veridian
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Sidebar;