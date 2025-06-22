import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext'; // Assuming useAuth is correctly located

// --- Google Material Icons (Web Font Method) ---
// No import needed here if linked in index.html.
// Just use <span className="material-icons">icon_name</span>

// --- Define Colors for Sidebar Theme (UPDATED) ---
const sidebarColors = {
  // Primary dark teal from your latest input
  backgroundPrimary: '#1A3636',
  // A slightly lighter teal for active/hover states or accents
  backgroundAccent: '#40534C',
  // Text colors
  textPrimary: '#FFFFFF', // White for main text
  textSecondary: '#CCCCCC', // Lighter grey for secondary text
  // Active item background
  activeItemBg: '#677D6A', // Background for active navigation item
  activeItemText: '#FFFFFF', // Text color for active navigation item
  divider: 'rgba(255, 255, 255, 0.1)', // Subtle white divider

  // Define a darker shade for hover effects if needed, based on backgroundAccent
  hoverDarker: '#2E3B3A', // Example darker shade
};

// --- Sidebar Styles (UPDATED with new colors) ---
const styles = {
  sidebarContainer: {
    fontFamily: "'Poppins', sans-serif",
    position: 'relative', // allow sticky footer positioning
    width: '250px', // Fixed width for desktop
    backgroundColor: sidebarColors.backgroundPrimary,
    color: sidebarColors.textPrimary,
    display: 'flex',
    flexDirection: 'column',
    height: '100vh', // Take full viewport height (adjusted by MainLayout's grid)
    padding: '20px 0',
    boxSizing: 'border-box',
    transition: 'width 0.3s ease', // For future collapse/expand features
    // Responsive: Hide by default on mobile, show via toggle
    '@media (max-width: 768px)': {
      width: '0', // Collapsed on mobile by default
      overflow: 'hidden',
      position: 'fixed', // Fixed position on mobile
      zIndex: 100, // Above other content
      boxShadow: '2px 0 5px rgba(0,0,0,0.5)',
    },
  },
  // Style for when sidebar is open on mobile
  sidebarOpen: {
    '@media (max-width: 768px)': {
      width: '250px',
    },
  },
  sidebarHeader: {
    padding: '0 20px 20px 20px',
    borderBottom: `1px solid ${sidebarColors.divider}`,
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  logo: {
    fontSize: '1.5em',
    fontWeight: '700',
    color: sidebarColors.textPrimary,
  },
  userSection: {
    padding: '10px 20px 20px 20px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    borderBottom: `1px solid ${sidebarColors.divider}`,
    marginBottom: '20px',
  },
  userIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: sidebarColors.backgroundAccent, // Placeholder user icon background
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: sidebarColors.textPrimary,
    fontWeight: 'bold',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  userName: {
    fontSize: '1em',
    fontWeight: '600',
    color: sidebarColors.textPrimary,
  },
  userEmail: {
    fontSize: '0.8em',
    color: sidebarColors.textSecondary,
  },
  navList: {
    listStyle: 'none',
    padding: '0',
    margin: '0',
    flexGrow: 1, // Pushes footer to bottom
    overflowY: 'auto', // Make nav list scrollable if too long
  },
  navItem: {
    margin: '5px 0',
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 20px',
    textDecoration: 'none',
    color: sidebarColors.textPrimary,
    fontSize: '1em',
    borderRadius: '5px', // Slight rounding
    margin: '0 10px', // Margin from sidebar edges
    transition: 'background-color 0.2s ease, color 0.2s ease',
    // Hover state (requires CSS-in-JS)
    '&:hover': {
      backgroundColor: sidebarColors.backgroundAccent,
    },
  },
  navLinkActive: {
    backgroundColor: sidebarColors.activeItemBg,
    color: sidebarColors.activeItemText,
    fontWeight: '600',
    // Ensures active link doesn't lose shape due to hover
    '&:hover': {
      backgroundColor: sidebarColors.activeItemBg,
      color: sidebarColors.activeItemText,
    },
  },
  navIcon: {
    marginRight: '15px',
    fontSize: '1.2em', // For text/emoji icons
    color: sidebarColors.textPrimary, // Default icon color
  },
  navIconActive: {
    color: sidebarColors.activeItemText, // Active icon color (should match active text color)
  },
  sidebarFooter: {
    position: 'sticky',
    bottom: '35px',
    padding: '8px 15px', // slightly reduced vertical padding
    borderTop: `1px solid ${sidebarColors.divider}`,
    backgroundColor: sidebarColors.backgroundPrimary,
    display:'flex',
    justifyContent: 'center',  // center the text horizontally
    alignItems: 'center', 

  },

  AccountButton: {
    width: '100%',
    padding: '10px 15px',
    backgroundColor: sidebarColors.backgroundAccent, // Accent color for logout button
    color: sidebarColors.textPrimary,
    border: 'none',
    borderRadius: '5px',
    marginBottom: '5px',
    cursor: 'pointer',
    display:'flex',
    alignItems:'center',
    justifyContent: 'center',
    gap: '10px',
    fontSize: '1em',
    fontWeight: '400',
    transition: 'background-color 0.2s ease',
    // Hover state (requires CSS-in-JS)
    '&:hover': {
      backgroundColor: sidebarColors.hoverDarker, // Darker on hover
    },
  },
  logoutButton: {
    width: '100%',
    padding: '10px 15px',
    marginTop: '5px',
    backgroundColor: sidebarColors.backgroundAccent, // Accent color for logout button
    
    color:'red',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1em',
    display:'flex',
    alignItems:'center',
    justifyContent: 'center',
    gap: '10px',
    fontWeight: '400',
    transition: 'background-color 0.2s ease',
    // Hover state (requires CSS-in-JS)
    '&:hover': {
      backgroundColor: sidebarColors.hoverDarker, // Darker on hover
    },
  },
  // Mobile toggle button (if sidebar is hidden)
  mobileToggle: {
    display: 'none', // Hidden on desktop
    '@media (max-width: 768px)': {
      display: 'block', // Show on mobile
      position: 'fixed',
      top: '20px',
      left: '20px',
      zIndex: 101, // Above sidebar
      backgroundColor: sidebarColors.backgroundPrimary,
      color: sidebarColors.textPrimary,
      border: 'none',
      borderRadius: '5px',
      padding: '10px 15px',
      cursor: 'pointer',
      boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
    },
  },
};

function Sidebar({ isMobileOpen }) { // Receive props for mobile toggle
  const { logout, isAuthenticated } = useAuth(); // isAuthenticated is a boolean from AuthContext
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login'); // Redirect to login after logout
    } catch (error) {
      console.error('Logout failed:', error);
      // You might want to show an error message to the user here
    }
  };

  // Define your navigation links
  const navLinks = [
    { path: '/dashboard', name: 'Dashboard', icon: 'home' },         // Material Icon: home
    { path: '/calendar', name: 'Calendar', icon: 'calendar_month' }, // Material Icon: calendar_month
    { path: '/okrs', name: 'OKRs', icon: 'ads_click' },               // Material Icon: ads_click (as alternative for 'target')
    { path: '/idea-canvas', name: 'Idea Canvas', icon: 'lightbulb' },// Material Icon: lightbulb
       // Material Icon: settings
  ];

  // Dynamic style for mobile sidebar
  const dynamicSidebarStyle = {
    ...styles.sidebarContainer,
    ...(isMobileOpen ? styles.sidebarOpen : {}),
  };

  return (
    <>
      {/* Mobile Sidebar Toggle Button - Renders outside the sidebar itself */}
      {/* You would typically put this in your Header or main layout for mobile */}
      {/* For demonstration, I'm including it here, but it might need to be repositioned */}
      {/*
      <button
        style={styles.mobileToggle}
        onClick={toggleMobileSidebar}
        aria-label="Toggle sidebar"
      >
        ☰
      </button>
      */}

      <div style={dynamicSidebarStyle}>
        {/* Sidebar Header/Logo - REMOVED Veridian Name/Logo */}
        {/* <div style={styles.sidebarHeader}>
          <span style={styles.logo}>Veridian</span>
        </div> */}

        {/* User Info Section - REMOVED */}
        {/* {isAuthenticated && user && (
          <div style={styles.userSection}>
            <div style={styles.userIcon}>{userInitials}</div>
            <div style={styles.userInfo}>
              <span style={styles.userName}>{user.name || user.email}</span>
              <span style={styles.userEmail}>{user.email}</span>
            </div>
          </div>
        )} */}

        {/* Navigation Links */}
        <ul style={{...styles.navList, paddingTop: '20px'}}> {/* Added padding if header is removed */}
          {navLinks.map((link) => (
            <li key={link.path} style={styles.navItem}>
              <NavLink
                to={link.path}
                style={({ isActive }) => ({
                  ...styles.navLink,
                  ...(isActive ? styles.navLinkActive : {}),
                })}
              >
                {({ isActive }) => (
                  <>
                    {/* Using Material Icons via web font */}
                    <span className="material-icons" style={{
                      ...styles.navIcon,
                      color: isActive ? styles.navIconActive.color : styles.navIcon.color, // Use navLinkActive color for active state
                    }}>
                      {link.icon}
                    </span>
                    {link.name}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
        {/* Logout & Account buttons above footer */}
        {isAuthenticated && (
          <div style={{
            borderTop: `1px solid ${sidebarColors.divider}`,
            padding: '10px 10px',
            margin: '10px 10px 18px',
          }}>
           {/* Account button */}
           <button
             style={styles.AccountButton}
             onClick={() => navigate('/account')}
           >
             <span className="material-icons" >settings</span>
             Account
           </button>
            {/* Logout button */}
            <button style={styles.logoutButton} onClick={handleLogout}>
              <span className="material-icons" style={{ marginRight: '10px', fontSize: '1.2em' }}>logout</span>
              Logout
            </button>
          </div>
        )}
        {/* Footer Placeholder (for spacing) */}
        <div style={styles.sidebarFooter} /><p style={{
        margin: 0,
        marginLeft: '10px',          // inline margin
        color: sidebarColors.textSecondary, // inline color
        fontSize: '1em',           // inline fontSize
        fontStyle: 'italic'          // any other inline props
      }}>© 2025 Veridian</p></div>
    </>
  );
}

export default Sidebar;
