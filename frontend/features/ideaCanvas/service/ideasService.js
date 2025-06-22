// src/features/ideas/services/ideasService.js
import { Auth } from "aws-amplify"; // Need Auth to get the current session/token

// IMPORTANT: REPLACE THIS WITH YOUR API GATEWAY INVOKE URL
// It should look like: https://xxxxxxxx.execute-api.your-region.amazonaws.com/dev
const API_GATEWAY_BASE_URL ="https://tumlsjr0ec.execute-api.us-east-2.amazonaws.com/dev";

const ideasService = {
  createIdea: async (ideaData) => {
    try {
      // Get the current session to extract the ID token for authorization
      const session = await Auth.currentSession();
      const idToken = session.getIdToken().getJwtToken();

      // Ensure ideaData contains title and description
      if (!ideaData.title || !ideaData.description) {
        throw new Error("Title and description are required for the idea.");
      }

      console.log("DEBUG (ideasService.createIdea): Sending data:", ideaData);

      const response = await fetch(`${API_GATEWAY_BASE_URL}/ideas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`, // Attach the ID token for Cognito Authorizer
        },
        body: JSON.stringify(ideaData),
      });

      console.log(
        "DEBUG (ideasService.createIdea): API Response status:",
        response.status
      );

      if (!response.ok) {
        // Attempt to parse error response from API Gateway/Lambda
        let errorMessage = `Failed to create idea: ${response.statusText}`;
        try {
          const errorData = await response.json();
          if (errorData.message) {
            errorMessage = errorData.message;
          }
        } catch (parseError) {
          console.error("Error parsing API error response:", parseError);
        }
        throw new Error(errorMessage);
      }

      const createdIdea = await response.json();
      console.log(
        "DEBUG (ideasService.createIdea): Idea created successfully:",
        createdIdea
      );
      return createdIdea;
    } catch (error) {
      console.error("IdeasService: Error creating idea:", error);
      throw error; // Re-throw the error for the calling component (AddIdeaModal) to handle
    }
  },

  // You will add other methods here later:
  // getIdeas: async () => { ... }
  // updateIdea: async (ideaId, updatedData) => { ... }
  // deleteIdea: async (ideaId) => { ... }
};

export default ideasService;
