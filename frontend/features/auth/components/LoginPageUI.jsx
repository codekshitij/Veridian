import React, { useState } from 'react';

const styles = {
  pageContainer: {
    fontFamily: 'var(--font-family)',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F0F23', // Explicit dark background
    padding: 'var(--spacing-lg)',
    position: 'relative',
    overflow: 'hidden',
  },
  
  backgroundPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 25% 25%, rgba(79, 70, 229, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 75% 75%, rgba(124, 58, 237, 0.1) 0%, transparent 50%),
      linear-gradient(135deg, rgba(79, 70, 229, 0.05) 0%, rgba(124, 58, 237, 0.05) 100%)
    `,
    zIndex: 0,
  },
  
  loginCard: {
    borderRadius: '24px',
    boxShadow: '0 32px 64px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(248, 250, 252, 0.1)',
    display: 'flex',
    overflow: 'hidden',
    width: '100%',
    maxWidth: '1200px',
    minHeight: '700px',
    backgroundColor: '#16213E', // Explicit surface color
    border: '1px solid #334155',
    position: 'relative',
    zIndex: 1,
    backdropFilter: 'blur(20px)',
  },
  
  leftSection: {
    width: '500px',
    background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
    padding: '4rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    color: '#FFFFFF',
    position: 'relative',
    overflow: 'hidden',
  },
  
  leftSectionOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)
    `,
    zIndex: 0,
  },
  
  brandSection: {
    position: 'relative',
    zIndex: 1,
  },
  
  brandName: {
    fontSize: '2.75rem',
    fontWeight: '900',
    letterSpacing: '-0.03em',
    marginBottom: '0.75rem',
    textShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    color: '#FFFFFF',
  },
  
  brandTagline: {
    fontSize: '1.2rem',
    opacity: 0.95,
    fontWeight: '500',
    letterSpacing: '0.01em',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  
  mainMessageGroup: {
    position: 'relative',
    zIndex: 1,
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  
  mainMessageH1: {
    fontSize: '4.5rem',
    fontWeight: '900',
    lineHeight: '0.95',
    marginBottom: '2rem',
    letterSpacing: '-0.05em',
    textShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
    color: '#FFFFFF',
  },
  
  mainMessageP: {
    fontSize: '1.3rem',
    lineHeight: '1.6',
    opacity: 0.9,
    fontWeight: '400',
    maxWidth: '400px',
    letterSpacing: '0.01em',
    color: 'rgba(255, 255, 255, 0.85)',
  },
  
  decorativeElements: {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    gap: '1rem',
    marginTop: '3rem',
  },
  
  decorativeDot: {
    width: '14px',
    height: '14px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  
  rightSection: {
    flexGrow: 1,
    backgroundColor: '#1A2B5C', // Explicit elevated surface
    padding: '4rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    color: '#F8FAFC',
    position: 'relative',
  },
  
  rightSectionBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 0% 0%, rgba(79, 70, 229, 0.08) 0%, transparent 50%),
      radial-gradient(circle at 100% 100%, rgba(124, 58, 237, 0.06) 0%, transparent 50%)
    `,
    zIndex: 0,
  },
  
  formContainer: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '420px',
    margin: '0 auto',
    width: '100%',
  },
  
  welcomeHeading: {
    fontSize: '3.5rem',
    fontWeight: '900',
    marginBottom: '0.75rem',
    color: '#F8FAFC',
    letterSpacing: '-0.04em',
    textAlign: 'center',
  },
  
  welcomeSubheading: {
    fontSize: '1.2rem',
    color: '#CBD5E1',
    marginBottom: '3rem',
    fontWeight: '500',
    textAlign: 'center',
    letterSpacing: '0.01em',
  },
  
  loginForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  
  inputGroupLabel: {
    fontSize: '1rem',
    fontWeight: '700',
    color: '#F8FAFC',
    marginBottom: '0.75rem',
    letterSpacing: '0.01em',
  },
  
  inputWithButton: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  
  inputField: {
    width: '100%',
    padding: '1.25rem 1.5rem',
    backgroundColor: '#16213E',
    border: '2px solid #334155',
    borderRadius: '16px',
    fontSize: '1.1rem',
    color: '#F8FAFC',
    outline: 'none',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    fontFamily: 'var(--font-family)',
    fontWeight: '600',
  },
  
  inputFieldFocus: {
    borderColor: '#4F46E5',
    backgroundColor: '#243B73',
    boxShadow: '0 0 0 4px rgba(79, 70, 229, 0.15)',
    transform: 'translateY(-2px)',
  },
  
  inputFieldError: {
    borderColor: '#EF4444',
    boxShadow: '0 0 0 4px rgba(239, 68, 68, 0.15)',
  },
  
  passwordToggleButton: {
    position: 'absolute',
    right: '1.25rem',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    color: '#94A3B8',
    cursor: 'pointer',
    padding: '0.75rem',
    borderRadius: '12px',
    transition: 'all var(--transition-fast)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  passwordToggleButtonHover: {
    color: '#F8FAFC',
    backgroundColor: 'rgba(248, 250, 252, 0.1)',
  },
  
  formOptions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '1rem',
    marginTop: '-0.5rem',
  },
  
  rememberMe: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    cursor: 'pointer',
    color: '#CBD5E1',
    transition: 'color var(--transition-fast)',
    fontWeight: '500',
  },
  
  rememberMeInput: {
    width: '20px',
    height: '20px',
    accentColor: '#4F46E5',
    cursor: 'pointer',
  },
  
  forgotPassword: {
    color: '#4F46E5',
    textDecoration: 'none',
    fontWeight: '700',
    transition: 'all var(--transition-fast)',
    padding: '0.5rem',
    borderRadius: '8px',
  },
  
  forgotPasswordHover: {
    color: '#6366F1',
    backgroundColor: 'rgba(79, 70, 229, 0.15)',
  },
  
  signInButton: {
    width: '100%',
    padding: '1.5rem 2rem',
    background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '16px',
    fontSize: '1.2rem',
    fontWeight: '800',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    fontFamily: 'var(--font-family)',
    position: 'relative',
    overflow: 'hidden',
    letterSpacing: '0.02em',
    boxShadow: '0 12px 40px rgba(79, 70, 229, 0.4)',
    textTransform: 'uppercase',
  },
  
  signInButtonHover: {
    transform: 'translateY(-3px)',
    boxShadow: '0 20px 60px rgba(79, 70, 229, 0.5)',
  },
  
  signInButtonDisabled: {
    background: '#475569',
    color: '#94A3B8',
    cursor: 'not-allowed',
    transform: 'none',
    boxShadow: 'none',
  },
  
  loadingSpinner: {
    width: '22px',
    height: '22px',
    border: '3px solid rgba(255, 255, 255, 0.3)',
    borderTop: '3px solid #FFFFFF',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginRight: '0.75rem',
  },
  
  socialLoginSeparator: {
    textAlign: 'center',
    color: '#94A3B8',
    fontSize: '1rem',
    margin: '2.5rem 0',
    position: 'relative',
    fontWeight: '600',
  },
  
  separatorLine: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    height: '2px',
    background: 'linear-gradient(90deg, transparent, #334155, transparent)',
    zIndex: 0,
  },
  
  separatorText: {
    backgroundColor: '#1A2B5C',
    padding: '0 2rem',
    position: 'relative',
    zIndex: 1,
    fontWeight: '600',
  },
  
  socialButton: {
    width: '100%',
    padding: '1.25rem 2rem',
    border: '2px solid #334155',
    borderRadius: '16px',
    backgroundColor: '#16213E',
    color: '#F8FAFC',
    fontSize: '1.1rem',
    fontWeight: '700',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    fontFamily: 'var(--font-family)',
    position: 'relative',
    overflow: 'hidden',
  },
  
  socialButtonHover: {
    backgroundColor: '#243B73',
    borderColor: '#4F46E5',
    transform: 'translateY(-2px)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.2)',
  },
  
  googleIcon: {
    fontSize: '1.4rem',
    color: '#4F46E5',
  },
  
  signupLink: {
    textAlign: 'center',
    fontSize: '1.1rem',
    color: '#CBD5E1',
    marginTop: '3rem',
    fontWeight: '600',
  },
  
  signupLinkA: {
    color: '#4F46E5',
    textDecoration: 'none',
    fontWeight: '800',
    transition: 'all var(--transition-fast)',
    padding: '0.5rem',
    borderRadius: '8px',
  },
  
  signupLinkAHover: {
    color: '#6366F1',
    backgroundColor: 'rgba(79, 70, 229, 0.15)',
  },
  
  errorText: {
    color: '#EF4444',
    fontSize: '1rem',
    marginTop: '1.5rem',
    padding: '1.25rem 1.5rem',
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    border: '2px solid rgba(239, 68, 68, 0.3)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    fontWeight: '600',
  },
  
  // Mobile responsiveness
  '@media (max-width: 1024px)': {
    loginCard: {
      flexDirection: 'column',
      maxWidth: '500px',
    },
    leftSection: {
      width: '100%',
      padding: '3rem 2rem 2rem',
      minHeight: '300px',
    },
    rightSection: {
      padding: '3rem 2rem',
    },
    mainMessageH1: {
      fontSize: '3rem',
    },
    welcomeHeading: {
      fontSize: '2.5rem',
    },
  },
};

// Add keyframe animation for loading spinner
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  if (!document.head.querySelector('style[data-spinner]')) {
    styleSheet.setAttribute('data-spinner', 'true');
    document.head.appendChild(styleSheet);
  }
}

function LoginPageUI({
  email,
  setEmail,
  password,
  setPassword,
  newPasswordRequired,
  newPassword,
  setNewPassword,
  showPassword,
  setShowPassword,
  rememberMe,
  setRememberMe,
  handleSubmit,
  loading,
  error,
}) {
  const [focusedField, setFocusedField] = useState(null);
  
  return (
    <div style={styles.pageContainer}>
      <div style={styles.backgroundPattern}></div>
      
      <div style={styles.loginCard}>
        <div style={styles.leftSection}>
          <div style={styles.leftSectionOverlay}></div>
          
          <div style={styles.brandSection}>
            <div style={styles.brandName}>Veridian</div>
            <div style={styles.brandTagline}>Your productivity companion</div>
          </div>
          
          <div style={styles.mainMessageGroup}>
            <h1 style={styles.mainMessageH1}>Welcome Back</h1>
            <p style={styles.mainMessageP}>
              Continue your journey towards achieving your goals and maximizing your potential with our comprehensive productivity suite.
            </p>
            
            <div style={styles.decorativeElements}>
              <div style={styles.decorativeDot}></div>
              <div style={styles.decorativeDot}></div>
              <div style={styles.decorativeDot}></div>
            </div>
          </div>
        </div>
        
        <div style={styles.rightSection}>
          <div style={styles.rightSectionBg}></div>
          
          <div style={styles.formContainer}>
            <h2 style={styles.welcomeHeading}>Sign In</h2>
            <p style={styles.welcomeSubheading}>
              Enter your credentials to access your account
            </p>
            
            <form onSubmit={handleSubmit} style={styles.loginForm}>
              <div style={styles.inputGroup}>
                <label htmlFor="email" style={styles.inputGroupLabel}>
                  Email Address
                </label>
                <div style={styles.inputWithButton}>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      ...styles.inputField,
                      ...(focusedField === 'email' ? styles.inputFieldFocus : {}),
                      ...(error && !email ? styles.inputFieldError : {}),
                    }}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    required
                  />
                </div>
              </div>
              
              <div style={styles.inputGroup}>
                <label htmlFor="password" style={styles.inputGroupLabel}>
                  Password
                </label>
                <div style={styles.inputWithButton}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      ...styles.inputField,
                      ...(focusedField === 'password' ? styles.inputFieldFocus : {}),
                      ...(error && !password ? styles.inputFieldError : {}),
                    }}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    required
                  />
                  <button
                    type="button"
                    style={styles.passwordToggleButton}
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseEnter={(e) => Object.assign(e.target.style, styles.passwordToggleButtonHover)}
                    onMouseLeave={(e) => Object.assign(e.target.style, styles.passwordToggleButton)}
                  >
                    <span className="material-icons" style={{ fontSize: '1.3rem' }}>
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>
              
              {newPasswordRequired && (
                <div style={styles.inputGroup}>
                  <label htmlFor="new-password" style={styles.inputGroupLabel}>
                    New Password
                  </label>
                  <div style={styles.inputWithButton}>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="new-password"
                      placeholder="Enter your new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      style={{
                        ...styles.inputField,
                        ...(focusedField === 'newPassword' ? styles.inputFieldFocus : {}),
                      }}
                      onFocus={() => setFocusedField('newPassword')}
                      onBlur={() => setFocusedField(null)}
                      required
                    />
                  </div>
                </div>
              )}
              
              <div style={styles.formOptions}>
                <label style={styles.rememberMe}>
                  <input
                    type="checkbox"
                    id="remember-me"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    style={styles.rememberMeInput}
                  />
                  Remember me
                </label>
                <a 
                  href="#" 
                  style={styles.forgotPassword}
                  onMouseEnter={(e) => Object.assign(e.target.style, styles.forgotPasswordHover)}
                  onMouseLeave={(e) => Object.assign(e.target.style, styles.forgotPassword)}
                >
                  Forgot Password?
                </a>
              </div>
              
              <button
                type="submit"
                style={{
                  ...styles.signInButton,
                  ...(loading ? styles.signInButtonDisabled : {}),
                }}
                disabled={loading}
                onMouseEnter={(e) => {
                  if (!loading) Object.assign(e.target.style, styles.signInButtonHover);
                }}
                onMouseLeave={(e) => {
                  if (!loading) Object.assign(e.target.style, styles.signInButton);
                }}
              >
                {loading ? (
                  <>
                    <div style={styles.loadingSpinner}></div>
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
              
              {error && (
                <div style={styles.errorText}>
                  <span className="material-icons" style={{ fontSize: '1.3rem' }}>
                    error_outline
                  </span>
                  {error}
                </div>
              )}
              
              <div style={styles.socialLoginSeparator}>
                <div style={styles.separatorLine}></div>
                <span style={styles.separatorText}>Or continue with</span>
              </div>
              
              <button 
                type="button" 
                style={styles.socialButton}
                onMouseEnter={(e) => Object.assign(e.target.style, styles.socialButtonHover)}
                onMouseLeave={(e) => Object.assign(e.target.style, styles.socialButton)}
              >
                <span className="material-icons" style={styles.googleIcon}>
                  account_circle
                </span>
                Continue with Google
              </button>
            </form>
            
            <div style={styles.signupLink}>
              Don't have an account?{' '}
              <a 
                href="#" 
                style={styles.signupLinkA}
                onMouseEnter={(e) => Object.assign(e.target.style, styles.signupLinkAHover)}
                onMouseLeave={(e) => Object.assign(e.target.style, styles.signupLinkA)}
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPageUI;