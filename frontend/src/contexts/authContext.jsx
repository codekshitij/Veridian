import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '../../features/auth/services/authService'; // <-- Ensure this import path is correct

// 1. Create the AuthContext
const AuthContext = createContext(null);

// 2. Create the AuthProvider component
export const AuthProvider = ({ children }) => {
    // State for authentication
    const [user, setUser] = useState(null); // Stores user object { id, email, name, etc. }
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // For initial auth check (e.g., from token)
    const [error, setError] = useState(null);       // To store any auth-related errors
    const [authToken, setAuthToken] = useState(null); // Explicitly store the auth token here

    // Initial check for an existing session using Amplify Auth service
    useEffect(() => {
        const checkUserSession = async () => {
            setIsLoading(true); // Start loading
            try {
                // Use authService.getCurrentAuthenticatedUser to check for an active Amplify session
                const sessionData = await authService.getCurrentAuthenticatedUser();
                
                // --- DEBUGGING LOG: Inspect raw sessionData ---
                console.log("DEBUG: checkUserSession - Raw sessionData:", sessionData);

                if (sessionData) {
                    // If sessionData is returned, means a user is authenticated
                    setUser(sessionData.user);
                    setIsAuthenticated(true);
                    setAuthToken(sessionData.token);
                    console.log("Session restored via AWS Amplify Auth. User object from session:", sessionData.user);
                } else {
                    setUser(null);
                    setIsAuthenticated(false);
                    setAuthToken(null);
                    console.log("No active AWS Amplify Auth session found or session invalid.");
                }
            } catch (e) {
                console.error("Error during Amplify session check:", e);
                setUser(null);
                setIsAuthenticated(false);
                setAuthToken(null);
                setError(e.message || "Failed to restore session. Please log in again.");
            } finally {
                setIsLoading(false); // End loading
            }
        };

        checkUserSession();
    }, []); // Empty dependency array means this runs once on mount

    // Login function: Now purely relies on authService
    const login = async (email, password) => {
        setIsLoading(true);
        setError(null); // Clear any previous errors
        try {
            const { token, user: userData } = await authService.login(email, password);

            // --- DEBUGGING LOG: Inspect userData after login ---
            console.log("DEBUG: login - UserData received after successful login:", userData);

            setUser(userData);
            setIsAuthenticated(true);
            setAuthToken(token); // Update token in state
            console.log("User logged in successfully:", userData);
        } catch (err) {
            console.error("Login error in AuthContext:", err);
            let userFriendlyError = err.message || 'Login failed. Please try again.';
            if (err.code === 'UserNotFoundException' || err.code === 'NotAuthorizedException') {
                userFriendlyError = 'Invalid email or password.';
            } else if (err.code === 'UserNotConfirmedException') {
                userFriendlyError = 'Account not confirmed. Please verify your email.';
            }
            setError(userFriendlyError);
            setIsAuthenticated(false);
            setUser(null);
            setAuthToken(null);
            throw err; // Re-throw so LoginPage can catch and display
        } finally {
            setIsLoading(false);
        }
    };

    // Signup function: Now calls authService.signup
    const signup = async (name, email, password) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await authService.signup(name, email, password);
            
            // --- DEBUGGING LOG: Inspect response after signup ---
            console.log("DEBUG: signup - Response after signup attempt:", response);

            console.log("User signed up process initiated:", response);
            setError(null); // Clear error if signup initiated successfully
        } catch (err) {
            console.error("Signup error in AuthContext:", err);
            let userFriendlyError = err.message || 'An error occurred during signup.';
            if (err.code === 'UsernameExistsException') {
                userFriendlyError = 'User with this email already exists.';
            }
            setError(userFriendlyError);
            setIsAuthenticated(false);
            setUser(null);
            setAuthToken(null);
            throw err; // Re-throw for SignupPage to handle
        } finally {
            setIsLoading(false);
        }
    };

    // Logout function: Now purely relies on authService
    const logout = async () => {
        setIsLoading(true);
        try {
            await authService.logout(); // Call Amplify's signOut
            console.log("User logged out successfully via Amplify.");
        } catch (err) {
            console.error("Error during logout:", err);
            setError(err.message || "Logout failed.");
        } finally {
            setUser(null);
            setIsAuthenticated(false);
            setAuthToken(null);
            setIsLoading(false);
            setError(null); // Clear error after successful logout
        }
    };

    // The value that will be available to all consuming components
    const contextValue = {
        user,
        isAuthenticated,
        isLoading,
        error,
        authToken, // Expose the token if components need it (e.g., for auth headers to other APIs)
        login,
        loginWith: login, // Alias for backward compatibility or different naming preference
        signup,
        logout,
        setError // Allow components to clear/set errors if needed (e.g., after user input)
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

// 3. Create a custom hook to easily use the AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined || context === null) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};