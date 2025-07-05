import React from 'react';
import DecryptedText from '../../animation/DecryptedText';

// --- Rebuilt Styles from Scratch ---

const styles = {
  // 1. The main container that fills the entire viewport and centers the card
  pageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#0F0F23',
    fontFamily: 'sans-serif',
    padding: '1rem', // Safe padding for smaller screens
    boxSizing: 'border-box',
  },

  // 2. The main card. A flex container for its two children (left and right sections)
  loginCard: {
    display: 'flex',
    width: '100%',
    maxWidth: '1200px',
    height: '750px',
    maxHeight: '90vh', // Ensures the card never exceeds 90% of the viewport height
    backgroundColor: '#16213E',
    borderRadius: '24px',
    overflow: 'hidden',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    border: '1px solid #334155',
  },

  // 3. The left (purple) section for branding and messaging
  leftSection: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '40%',
    flexShrink: 0, // Prevents this section from shrinking
    padding: '3rem',
    color: '#FFFFFF',
    background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
  },
  
  brandName: {
    fontWeight: '900',
    fontSize: '4rem',
  },

  welcomeMessage: {
    fontSize: '3.5rem',
    fontWeight: 'bold',
    lineHeight: 1.1,
  },
  
  // 4. The right (dark) section for the form. This is the scrollable container.
  rightSection: {
    display: 'flex',
    flexDirection: 'column',
    width: '60%',
    padding: '3rem',
    overflowY: 'auto', // Allow vertical scrolling ONLY within this container
    minHeight: 0,      // CRITICAL: Allows this container to shrink and enable overflow
  },
  
  // 5. General styles for form elements
  form: {
    width: '100%',
    maxWidth: '400px',
    margin: 'auto', // Center the form horizontally within the right section
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },

  formTitle: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#F8FAFC',
    textAlign: 'center',
  },
  
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },

  label: {
    fontWeight: 'bold',
    color: '#CBD5E1',
  },
  
  input: {
    padding: '1rem',
    backgroundColor: '#16213E',
    border: '1px solid #334155',
    borderRadius: '12px',
    fontSize: '1rem',
    color: '#F8FAFC',
    outline: 'none',
  },

  button: {
    padding: '1rem',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#FFFFFF',
    background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    textTransform: 'uppercase',
  },
  
  buttonDisabled: {
    background: '#475569',
    cursor: 'not-allowed',
  },
  
  errorText: {
    color: '#EF4444',
    textAlign: 'center',
  }
};


// --- The Rebuilt Component ---

function LoginPageUI({
  email,
  setEmail,
  password,
  setPassword,
  // You can add the other props back here as needed (e.g., newPassword)
  handleSubmit,
  loading,
  error,
}) {

  // Simple handler to merge disabled styles
  const getButtonStyle = () => {
    return loading 
      ? { ...styles.button, ...styles.buttonDisabled } 
      : styles.button;
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.loginCard}>
        
        {/* Left Section (Branding) */}
        <div style={styles.leftSection}>
          <div style={styles.brandName}>CRUX</div>
          <h1 style={{ ...styles.welcomeMessage, marginBottom: '-13rem' }}>
            <DecryptedText
              text="WELCOME BACK."
              speed={40}
              maxIterations={18}
              animateOn="view"
              revealDirection="center"
              className="decrypted-heading"
            />
          </h1>
          <p style={{ fontSize: '1.25rem', marginTop: 0, color: '#FFF', fontWeight: 500, textShadow: '0 0 0 transparent' }}>
            <DecryptedText
              text="Sign in to access your personalized dashboard and get back to achieving your goals."
              speed={18}
              maxIterations={12}
              animateOn="view"
              revealDirection="start"
              className="decrypted-para"
            />
          </p>
        </div>

        {/* Right Section (Form) - THIS PART SCROLLS INTERNALLY */}
        <div style={styles.rightSection}>
          <form onSubmit={handleSubmit} style={styles.form}>
            <h2 style={styles.formTitle}>Sign In</h2>

            <div style={styles.inputGroup}>
              <label htmlFor="email" style={styles.label}>Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label htmlFor="password" style={styles.label}>Password</label>
              <input
                type="password"
                id="password"
                placeholder="••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
                required
              />
            </div>
            
            {/* Display loading or error states */}
            {error && <p style={styles.errorText}>{error}</p>}

            <button type="submit" style={getButtonStyle()} disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
            
          </form>
        </div>
        
      </div>
    </div>
  );
}

export default LoginPageUI;