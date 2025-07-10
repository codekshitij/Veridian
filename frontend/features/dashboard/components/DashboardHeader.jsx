import React from 'react';
import { useAuth } from '../../../src/contexts/authContext'; // Adjust path based on location

// Define colors, potentially reusing from a central theme file if you had one
const dashboardHeaderColors = {
  background: '#1A1A1A', // Dark background to match theme
  textPrimary: '#F8FAFC', // Light text to match theme
  textAccent: '#60A5FA', // Accent blue from theme
  divider: '#232B3E',
  shadow: 'rgba(0, 0, 0, 0.18)',
};

// Styles for the DashboardHeader
const styles = {
  headerContainer: {
    width: '100%',
    backgroundColor: '#0F172A',
    border: '2px solid #334155',
    color: '#FFFFFF',
    borderRadius: '14px',
    padding: '24px 32px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: '2rem',
    boxSizing: 'border-box',
  },
  greetingText: {
    fontSize: '2.3em',
    fontWeight: '700',
    color: dashboardHeaderColors.textPrimary,
    marginBottom: '0',
    letterSpacing: '0.5px',
    textShadow: '0 2px 8px #0ea5e944',
  },
  welcomeMessage: {
    fontSize: '1.2em',
    color: dashboardHeaderColors.textAccent, // Teal accent for welcome message
    fontWeight: '500',
    // Responsive font size - NOTE: These will NOT work as inline styles.
    '@media (max-width: 768px)': {
      fontSize: '0.9em',
    },
  },
};

function DashboardHeader() {
  // Use the useAuth hook to get user object and authentication status
  const { user, isAuthenticated } = useAuth();

  // Safely get the user's given_name attribute.
  // If user or attributes are null/undefined, userName will be undefined.
  const userName = user?.attributes?.given_name;
  

  return (
    <div style={styles.headerContainer}>
      {/* Conditionally render greeting based on authentication status and user data */}
      {isAuthenticated && userName ? ( // Check both isAuthenticated and if userName exists
        <>
          <h2 style={styles.greetingText}>Hello, {userName}!</h2>

        </>
      ) : (
        // Fallback for unauthenticated users or when name is not available
        <>
          <h2 style={styles.greetingText}>Hello!</h2>
          
        </>
      )}
    </div>
  );
}

export default DashboardHeader;