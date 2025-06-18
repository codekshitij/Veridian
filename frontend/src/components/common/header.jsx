import React from 'react';

 // Assuming useAuth is correctly located

// --- Define Colors for Header Theme ---
const headerColors = {
  // Background colors
  backgroundPrimary: '#FFFFFF', // White background for the header
  backgroundAccent: '#F8F8F8', // Slightly off-white for hover/active if needed

  // Text colors
  textPrimary: '#333333', // Dark grey for general text
  textSecondary: '#666666', // Lighter grey for secondary text

  // Accent color (from your sidebar's teal palette)
  accentColor: '#008080', // Primary teal
  accentLight: '#4DE1E1', // Lighter teal for subtle highlights
  divider: '#EEEEEE', // Light grey divider
};

// --- Header Styles ---
const styles = {
  headerContainer: {
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: headerColors.backgroundPrimary,
    color: headerColors.textPrimary,
    padding: '15px 30px',
    borderBottom: `1px solid ${headerColors.divider}`, // Added border to the bottom
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxSizing: 'border-box',
    width: '100%', // Take full width of its parent grid column
    minHeight: '60px', // Minimum height for header
  // Added some margin top/bottom to separate it from edges
    // Responsive adjustments
    '@media (max-width: 768px)': {
      padding: '10px 20px',
      minHeight: '50px',
      margin: '5px 0',
    },
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  // Mobile toggle button (if Sidebar is hidden and toggled from Header)
  mobileToggle: {
    display: 'none', // Hidden on desktop
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '2em',
    color: headerColors.textPrimary,
    cursor: 'pointer',
    padding: '5px',
    lineHeight: '1',
    // Responsive display
    '@media (max-width: 768px)': {
      display: 'block', // Show on mobile
    },
  },
  appTitle: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: '1.9em',
    fontWeight: '500',
    color: headerColors.textPrimary,
    // Hide on mobile if sidebar shows it, or make smaller
    '@media (max-width: 768px)': {
      fontSize: '1.2em',
    },
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer', // Indicates it might be clickable for a dropdown
  },
  // Optional: Notification icon styling
  iconButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: headerColors.textSecondary,
    cursor: 'pointer',
    fontSize: '1.5em', // Size for Material Icons
    display: 'flex', // To center icon
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5px',
    borderRadius: '50%',
    transition: 'background-color 0.2s ease',
    // Hover state (requires CSS-in-JS)
    '&:hover': {
      backgroundColor: headerColors.backgroundAccent,
    },
  },
};

function Header() { // Receive toggle function for mobile
  

  // Get user initials for avatar (no longer displayed, but kept for context if needed elsewhere)


  return (
    <header style={styles.headerContainer}>
      <div style={styles.headerLeft}>

        {/* App Title/Logo */}
        <span style={styles.appTitle}>Veridian</span>
      </div>

      <div style={styles.headerRight}>
        {/* Notification Icon (Optional) */}
        {/* <button style={styles.iconButton} aria-label="Notifications">
          <span className="material-icons">notifications</span>
        </button> */}

        {/* User Info / Avatar - REMOVED */}
        {/* {isAuthenticated && user && (
          <div style={styles.userInfo}>
            <div style={styles.userAvatar}>{userInitials}</div>
            <span style={styles.userName}>{user.name || user.email}</span>
          </div>
        )} */}

        {/* Options for dropdown (e.g., settings, logout) can be added here */}
      </div>
    </header>
  );
}

export default Header;
