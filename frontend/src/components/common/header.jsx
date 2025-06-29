import React from 'react';

const styles = {
  headerContainer: {
    fontFamily: 'var(--font-family)',
    backgroundColor: '#1A1A1A',
    color: '#FFFFFF',
    padding: '0.8rem 2rem',
    borderBottom: '2px solid #4B5563',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxSizing: 'border-box',
    width: '100%',
    minHeight: '80px',
    position: 'relative',
    backdropFilter: 'blur(10px)',
  },
  
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
    flex: 1, // Take up all available space
  },
  
  brandName: {
    fontFamily: 'var(--font-family)',
    fontSize: '2.5rem',
    fontWeight: '900',
    letterSpacing: '-0.03em',
    background: 'linear-gradient(135deg, #60A5FA 0%, #A78BFA 50%, #34D399 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textShadow: 'none',
    filter: 'drop-shadow(0 2px 8px rgba(96, 165, 250, 0.3))',
    position: 'relative',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginLeft: '14px',
  },
  
  brandNameHover: {
    transform: 'scale(1.02)',
    filter: 'drop-shadow(0 4px 12px rgba(96, 165, 250, 0.5))',
  },
  
  // Add a subtle glow effect behind the text
  brandContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    marginLeft: '32px', // More margin to ensure no overlap
  },
  
  brandGlow: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '120%',
    height: '120%',
    background: 'radial-gradient(circle, rgba(96, 165, 250, 0.1) 0%, transparent 70%)',
    borderRadius: '50%',
    zIndex: -1,
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  
  brandGlowActive: {
    opacity: 1,
  },
  
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    zIndex: 1,
  },
  
  iconButton: {
    backgroundColor: 'transparent',
    border: '2px solid #4B5563',
    borderRadius: '12px',
    color: '#E5E7EB',
    cursor: 'pointer',
    fontSize: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.7rem',
    transition: 'all 0.3s ease',
    position: 'relative',
    width: '40px',
    height: '40px',
  },
  
  iconButtonHover: {
    backgroundColor: '#2A2A2A',
    borderColor: '#60A5FA',
    color: '#60A5FA',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(96, 165, 250, 0.2)',
  },
  
  notificationBadge: {
    position: 'absolute',
    top: '6px',
    right: '6px',
    width: '10px',
    height: '10px',
    backgroundColor: '#F87171',
    borderRadius: '50%',
    border: '2px solid #1A1A1A',
    boxShadow: '0 0 6px rgba(248, 113, 113, 0.6)',
  },
  
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '0.5rem 0.8rem',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: '2px solid #4B5563',
    backgroundColor: '#2A2A2A',
  },
  
  userSectionHover: {
    backgroundColor: '#3A3A3A',
    borderColor: '#60A5FA',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
  },
  
  userAvatar: {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    backgroundColor: '#60A5FA',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: '1rem',
    border: '2px solid #93C5FD',
    boxShadow: '0 2px 8px rgba(96, 165, 250, 0.3)',
  },
  
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    '@media (max-width: 768px)': {
      display: 'none',
    },
  },
  
  userName: {
    fontSize: '1rem',
    fontWeight: '700',
    color: '#FFFFFF',
    lineHeight: '1.2',
  },
  
  userStatus: {
    fontSize: '0.85rem',
    color: '#34D399',
    lineHeight: '1.2',
    fontWeight: '600',
  },
  
  dropdownIcon: {
    color: '#9CA3AF',
    fontSize: '1rem',
    transition: 'color 0.3s ease',
  },
};

function Header() {
  const [brandHovered, setBrandHovered] = React.useState(false);
  const [notifHovered, setNotifHovered] = React.useState(false);
  const [userHovered, setUserHovered] = React.useState(false);

  return (
    <header style={styles.headerContainer}>
      <div style={styles.headerLeft}>
        {/* Veridian Brand Name */}
        <div style={styles.brandContainer}>
          <div 
            style={{
              ...styles.brandGlow,
              ...(brandHovered ? styles.brandGlowActive : {})
            }}
          ></div>
          <h1 
            style={{
              ...styles.brandName,
              ...(brandHovered ? styles.brandNameHover : {})
            }}
            onMouseEnter={() => setBrandHovered(true)}
            onMouseLeave={() => setBrandHovered(false)}
          >
            Veridian
          </h1>
        </div>
      </div>

      <div style={styles.headerRight}>
        {/* Notification Button */}
        <button
          style={{
            ...styles.iconButton,
            ...(notifHovered ? styles.iconButtonHover : {})
          }}
          aria-label="Notifications"
          onMouseEnter={() => setNotifHovered(true)}
          onMouseLeave={() => setNotifHovered(false)}
        >
          <span className="material-icons">notifications</span>
          <div style={styles.notificationBadge}></div>
        </button>

        {/* User Profile Section */}
        <div
          style={{
            ...styles.userSection,
            ...(userHovered ? styles.userSectionHover : {})
          }}
          onMouseEnter={() => setUserHovered(true)}
          onMouseLeave={() => setUserHovered(false)}
        >
          <div style={styles.userAvatar}>
            JD
          </div>
          <div style={styles.userInfo}>
            <span style={styles.userName}>John Doe</span>
            <span style={styles.userStatus}>● Online</span>
          </div>
          <span className="material-icons" style={styles.dropdownIcon}>
            keyboard_arrow_down
          </span>
        </div>
      </div>
    </header>
  );
}

export default Header;