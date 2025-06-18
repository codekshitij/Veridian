// features/auth/LoginPage.jsx
import React, { useState } from 'react';
import LoginPageUI from '../components/LoginPageUI';  // your presentational form
import { useAuth } from '../../../src/contexts/authContext';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // ← new state for the temp‐password challenge
  const [newPasswordRequired, setNewPasswordRequired] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Pass newPassword only if we're in challenge mode
      await login(
        email,
        password,
        newPasswordRequired ? newPassword : undefined
      );

      // success!
      navigate('/dashboard');
    } catch (err) {
      if (err.message === 'NEW_PASSWORD_REQUIRED') {
        // Cognito telling us: you must set a permanent password
        setNewPasswordRequired(true);
        setError('Please choose a new password.');
      } else {
        setError(err.message || 'Login failed. Please check your credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && (
        <div style={{ color: 'red', textAlign: 'center', marginBottom: 10 }}>
          {error}
        </div>
      )}
      <LoginPageUI
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}

        /* ↓ new props so your UI can render a “New Password” field */
        newPasswordRequired={newPasswordRequired}
        newPassword={newPassword}
        setNewPassword={setNewPassword}

        showPassword={showPassword}
        setShowPassword={setShowPassword}
        rememberMe={rememberMe}
        setRememberMe={setRememberMe}

        handleSubmit={handleSubmit}
        loading={loading}
      />
    </>
  );
}

export default LoginPage;
