import React from 'react';
// If you're using icon libraries, you'd import them here, e.g.:
// import { Mail, Lock, Eye, EyeOff, Google } from 'lucide-react';

// --- Define Color Variables FIRST ---
const tealPrimary = '#008080';
const tealLight = '#4DE1E1';
const tealDark = '#005757';
const offWhite = '#F8F8F8';

// --- Define Styles as a JavaScript Object ---
const styles = {
  pageContainer: {
    fontFamily: "'Poppins', sans-serif",
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: '20px',
  },
  loginCard: {
    borderRadius: '10px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    overflow: 'hidden',
    width: '100%',
    maxWidth: '1200px',
    minHeight: '600px',
  },
  leftSection: {
    width: '450px',
    backgroundColor: '#FFFFFF',
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    color: '#333',
  },
  brandName: {
    fontSize: '1.6em',
    fontWeight: '700',
    letterSpacing: '1px',
    color: '#044343',
  },
  mainMessageGroup: {
    marginTop: 'auto',
  },
  mainMessageH1: {
    fontSize: '3em',
    fontWeight: '700',
    lineHeight: '1.1',
    marginBottom: '15px',
  },
  mainMessageP: {
    fontSize: '0.9em',
    lineHeight: '1.5',
    color: '#666',
  },
  rightSection: {
    flexGrow: 1,
    backgroundColor: '#044343',
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    color: '#FFFFFF',
    position: 'relative',
  },
  welcomeHeading: {
    fontSize: '2.2em',
    fontWeight: '600',
    marginBottom: '10px',
  },
  welcomeSubheading: {
    fontSize: '0.9em',
    color: offWhite,
    marginBottom: '30px',
  },
  loginForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputGroup: {},
  inputGroupLabel: {
    fontSize: '0.9em',
    fontWeight: '500',
    color: offWhite,
    marginBottom: '8px',
  },
  inputWithButton: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  inputField: {
    width: '100%',
    padding: '12px 15px',
    backgroundColor: tealDark,
    border: 'none',
    borderRadius: '5px',
    fontSize: '1em',
    color: '#FFFFFF',
    outline: 'none',
  },
  passwordToggleButton: {
    position: 'absolute',
    right: '5px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    color: offWhite,
    cursor: 'pointer',
    fontSize: '0.9em',
    padding: '8px 10px',
  },
  formOptions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '0.85em',
    color: offWhite,
  },
  rememberMe: {
    display: 'flex',
    alignItems: 'center',
  },
  rememberMeInput: {
    marginRight: '8px',
    accentColor: tealLight,
    width: '16px',
    height: '16px',
  },
  forgotPassword: {
    color: tealLight,
    textDecoration: 'none',
    fontWeight: '500',
  },
  signInButton: {
    width: '100%',
    padding: '15px',
    backgroundColor: '#FFFFFF',
    color: tealPrimary,
    border: 'none',
    borderRadius: '5px',
    fontSize: '1.1em',
    fontWeight: '600',
    cursor: 'pointer',
  },
  socialLoginSeparator: {
    textAlign: 'center',
    color: offWhite,
    fontSize: '0.85em',
    margin: '20px 0',
  },
  socialButton: {
    width: '100%',
    padding: '12px',
    border: `1px solid ${tealDark}`,
    borderRadius: '5px',
    backgroundColor: tealPrimary,
    color: '#FFFFFF',
    fontSize: '1em',
    fontWeight: '500',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
  },
  googleIcon: {
    width: '20px',
    height: '20px',
  },
  signupLink: {
    textAlign: 'center',
    fontSize: '0.9em',
    color: offWhite,
    marginTop: '30px',
  },
  signupLinkA: {
    color: tealLight,
    textDecoration: 'none',
    fontWeight: '600',
  },
};

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
  return (
    <div style={styles.pageContainer}>
      <div style={styles.loginCard}>
        <div style={styles.leftSection}>
          <div style={styles.brandName}>Veridian</div>
          <div style={styles.mainMessageGroup}>
            <h1 style={styles.mainMessageH1}>Get Everything You Want</h1>
            <p style={styles.mainMessageP}>
              You can get everything you want if you work hard, trust the process,
              and stick to the plan.
            </p>
          </div>
        </div>
        <div style={styles.rightSection}>
          <h2 style={styles.welcomeHeading}>Welcome Back</h2>
          <p style={styles.welcomeSubheading}>
            Enter your email and password to access your account
          </p>
          <form onSubmit={handleSubmit} style={styles.loginForm}>
            <div style={styles.inputGroup}>
              <label htmlFor="email" style={styles.inputGroupLabel}>
                Email
              </label>
              <div style={styles.inputWithButton}>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={styles.inputField}
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
                  style={styles.inputField}
                  required
                />
                <button
                  type="button"
                  style={styles.passwordToggleButton}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
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
                    style={styles.inputField}
                    required
                  />
                </div>
              </div>
            )}
            <div style={styles.formOptions}>
              <div style={styles.rememberMe}>
                <input
                  type="checkbox"
                  id="remember-me"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={styles.rememberMeInput}
                />
                <label htmlFor="remember-me">Remember me</label>
              </div>
              <a href="#" style={styles.forgotPassword}>
                Forgot Password
              </a>
            </div>
            <button
              type="submit"
              style={styles.signInButton}
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
            {error && (
              <p
                style={{
                  color: 'red',
                  textAlign: 'center',
                  fontSize: '0.9em',
                  marginTop: '10px',
                }}
              >
                {error}
              </p>
            )}
            <div style={styles.socialLoginSeparator}>
              <span>Or Sign In with</span>
            </div>
            <button type="button" style={styles.socialButton}>
              <span style={styles.googleIcon}></span> Sign In with Google
            </button>
          </form>
          <div style={styles.signupLink}>
            Don't have an account?{' '}
            <a href="#" style={styles.signupLinkA}>
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPageUI;