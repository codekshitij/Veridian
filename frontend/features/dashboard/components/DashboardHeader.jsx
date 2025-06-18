import React from 'react';
import { useAuth } from '../../../src/contexts/authContext'; // Adjust path based on location

// Define colors, potentially reusing from a central theme file if you had one
const dashboardHeaderColors = {
  background: '#FFFFFF', // White background
  textPrimary: '#333333', // Dark text
  textAccent: '#008080', // Primary teal for accents
  divider: '#EEEEEE',
  shadow: 'rgba(0, 0, 0, 0.05)', // Light shadow
};

// Styles for the DashboardHeader
const styles = {
  headerContainer: {
    width: 'calc(100% + 60px)',
    backgroundColor: dashboardHeaderColors.background,
    padding: '0px 20px',
    borderRadius: '8px 8px 0 0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    // Responsive adjustments - NOTE: These will NOT work as inline styles.
    // For media queries to apply, you'd need CSS Modules, Styled Components, etc.
    '@media (max-width: 768px)': {
      padding: '15px 20px',
      marginBottom: '20px',
    },
  },
  greetingText: {
    fontSize: '2.3em',
    fontWeight: '600',
    color: dashboardHeaderColors.textPrimary,
    marginBottom: '5px',
    // Responsive font size - NOTE: These will NOT work as inline styles.
    '@media (max-width: 768px)': {
      fontSize: '1.5em',
    },
    '@media (max-width: 480px)': {
      fontSize: '1.3em',
    },
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