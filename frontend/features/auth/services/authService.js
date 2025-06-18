import { Auth } from 'aws-amplify'; // Assuming Auth is imported from aws-amplify

const authService = {
  // Method to get the current authenticated user session
  getCurrentAuthenticatedUser: async () => {
    try {
      const cognitoUser = await Auth.currentAuthenticatedUser();
      
      // --- DEBUGGING LOG: Raw Cognito user object from Amplify ---
      console.log("DEBUG (authService): Raw Cognito user from currentAuthenticatedUser:", cognitoUser);

      if (cognitoUser && cognitoUser.signInUserSession) {
        // Construct the user object for AuthContext
        // We ensure 'attributes' is a direct copy of cognitoUser.attributes
        return {
          user: {
            id: cognitoUser.username, // Or cognitoUser.attributes.sub
            email: cognitoUser.attributes.email,
            // A simple 'name' property for convenience (e.g., from given_name or username)
            name: cognitoUser.attributes.given_name || cognitoUser.username,
            // Crucially, pass the entire attributes object as received from Amplify
            attributes: cognitoUser.attributes // <--- This is vital for accessing 'given_name'
          },
          token: cognitoUser.signInUserSession.idToken.jwtToken,
        };
      }
      return null; // No authenticated user session
    } catch (error) {
      console.error("AuthService: Error getting current authenticated user:", error);
      // Depending on error, you might want to return null, or rethrow for specific handling
      return null;
    }
  },

  // Method for user login
  login: async (email, password) => {
    try {
      const cognitoUser = await Auth.signIn(email, password);

      // --- DEBUGGING LOG: Raw Cognito user object from Amplify after sign-in ---
      console.log("DEBUG (authService): Raw Cognito user after signIn:", cognitoUser);

      // Construct the user object for AuthContext after successful login
      return {
        user: {
          id: cognitoUser.username, // Or cognitoUser.attributes.sub
          email: cognitoUser.attributes.email,
          name: cognitoUser.attributes.given_name || cognitoUser.username,
          attributes: cognitoUser.attributes // <--- This is vital
        },
        token: cognitoUser.signInUserSession.idToken.jwtToken,
      };
    } catch (error) {
      console.error("AuthService: Error during login:", error);
      throw error; // Re-throw to allow AuthContext to catch and handle
    }
  },

  // Method for user signup
  signup: async (name, email, password) => {
    try {
        const signUpResponse = await Auth.signUp({
            username: email, // Email often serves as username
            password,
            attributes: {
                email, // Standard attribute
                given_name: name, // Assuming 'name' parameter here is the given name
                // If you want to use customFullName, change 'given_name' to 'custom:customFullName'
                // 'custom:customFullName': name,
            }
        });
        
        // --- DEBUGGING LOG: Raw Amplify signUp response ---
        console.log("DEBUG (authService): Raw Amplify signUp response:", signUpResponse);

        return signUpResponse; // This typically contains { userConfirmed, user }
    } catch (error) {
        console.error("AuthService: Error during signup:", error);
        throw error; // Re-throw for SignupPage to handle
    }
  },

  // Method for user logout
  logout: async () => {
    try {
      await Auth.signOut();
      console.log("AuthService: User logged out via Amplify.");
    } catch (error) {
      console.error("AuthService: Error during logout:", error);
      throw error;
    }
  },
};

export default authService;