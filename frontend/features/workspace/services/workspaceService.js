// features/workspace/services/workspaceService.js
import { Auth } from "aws-amplify";

const API_GATEWAY_BASE_URL =
  "https://jrx99mn1fb.execute-api.us-east-2.amazonaws.com/Dev";


const getAuthHeaders = async () => {
  try {
    const session = await Auth.currentSession();
    const idToken = session.getIdToken().getJwtToken();
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    };
  } catch (error) {
    console.error("No valid session found:", error);
    throw new Error("User is not authenticated");
  }
};

// Helper function to handle Lambda proxy response format
const handleLambdaResponse = async (response, operation) => {
  console.log(`DEBUG (${operation}): Response status:`, response.status);

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
  }

  const responseData = await response.json();
  console.log(`DEBUG (${operation}): Raw response:`, responseData);

  // Check if this is a Lambda proxy response with statusCode
  if (responseData.statusCode !== undefined) {
    if (responseData.statusCode >= 400) {
      let errorMessage = `${operation} failed`;
      try {
        const errorBody = JSON.parse(responseData.body);
        errorMessage = errorBody.message || errorBody.error || errorMessage;
      } catch  {
        errorMessage = responseData.body || errorMessage;
      }
      throw new Error(errorMessage);
    }

    // For successful Lambda proxy responses, parse the body
    if (responseData.body) {
      try {
        const actualData = JSON.parse(responseData.body);
        console.log(
          `DEBUG (${operation}): Parsed successful response:`,
          actualData
        );
        return actualData;
      } catch (parseError) {
        console.error(`Error parsing successful response body:`, parseError);
        return responseData.body;
      }
    }

    // If no body, return the response as-is (for DELETE operations)
    return responseData;
  }

  // Direct response (not Lambda proxy format)
  console.log(`DEBUG (${operation}): Direct response:`, responseData);
  return responseData;
};

const workspaceService = {
  /**
   * Get all goals for a user within a date range
   */
  getGoals: async (dateRange = null) => {
    try {
      const headers = await getAuthHeaders();

      let url = `${API_GATEWAY_BASE_URL}/workspace/goals`;
      if (dateRange) {
        url += `?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`;
      }

      const response = await fetch(url, {
        method: "GET",
        headers: headers,
      });

      const goals = await handleLambdaResponse(response, "getGoals");
      return goals;
    } catch (error) {
      console.error("WorkspaceService: Error fetching goals:", error);
      throw error;
    }
  },

  /**
   * Create a new goal
   */
  createGoal: async (goalData) => {
    try {
      const headers = await getAuthHeaders();

      console.log("DEBUG (createGoal): Creating goal:", goalData);

      const response = await fetch(`${API_GATEWAY_BASE_URL}/workspace/goals`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(goalData),
      });

      const createdGoal = await handleLambdaResponse(response, "createGoal");
      return createdGoal;
    } catch (error) {
      console.error("WorkspaceService: Error creating goal:", error);
      throw error;
    }
  },

  /**
   * Update an existing goal
   */
  updateGoal: async (goalId, updates) => {
    try {
      const headers = await getAuthHeaders();

      console.log("DEBUG (updateGoal): Updating goal:", goalId, updates);

      const response = await fetch(
        `${API_GATEWAY_BASE_URL}/workspace/goals/${goalId}`,
        {
          method: "PUT",
          headers: headers,
          body: JSON.stringify(updates),
        }
      );

      const updatedGoal = await handleLambdaResponse(response, "updateGoal");
      return updatedGoal;
    } catch (error) {
      console.error("WorkspaceService: Error updating goal:", error);
      throw error;
    }
  },

  /**
   * Delete a goal
   */
  deleteGoal: async (goalId) => {
    try {
      const headers = await getAuthHeaders();

      console.log("DEBUG (deleteGoal): Deleting goal:", goalId);

      const response = await fetch(
        `${API_GATEWAY_BASE_URL}/workspace/goals/${goalId}`,
        {
          method: "DELETE",
          headers: headers,
        }
      );

      await handleLambdaResponse(response, "deleteGoal");
      console.log("DEBUG (deleteGoal): Goal deleted successfully");
      return true;
    } catch (error) {
      console.error("WorkspaceService: Error deleting goal:", error);
      throw error;
    }
  },

  /**
   * Update a specific task within a goal
   */
  updateTask: async (goalId, taskId, taskUpdates) => {
    try {
      const headers = await getAuthHeaders();

      console.log(
        "DEBUG (updateTask): Updating task:",
        goalId,
        taskId,
        taskUpdates
      );

      const response = await fetch(
        `${API_GATEWAY_BASE_URL}/workspace/goals/${goalId}/tasks/${taskId}`,
        {
          method: "PUT",
          headers: headers,
          body: JSON.stringify(taskUpdates),
        }
      );

      const updatedGoal = await handleLambdaResponse(response, "updateTask");
      return updatedGoal;
    } catch (error) {
      console.error("WorkspaceService: Error updating task:", error);
      throw error;
    }
  },

  /**
   * Add a new task to a goal
   */
  addTask: async (goalId, taskData) => {
    try {
      const headers = await getAuthHeaders();

      console.log("DEBUG (addTask): Adding task:", goalId, taskData);

      const response = await fetch(
        `${API_GATEWAY_BASE_URL}/workspace/goals/${goalId}/tasks`,
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(taskData),
        }
      );

      const updatedGoal = await handleLambdaResponse(response, "addTask");
      return updatedGoal;
    } catch (error) {
      console.error("WorkspaceService: Error adding task:", error);
      throw error;
    }
  },

  /**
   * Delete a task from a goal
   */
  deleteTask: async (goalId, taskId) => {
    try {
      const headers = await getAuthHeaders();

      console.log("DEBUG (deleteTask): Deleting task:", goalId, taskId);

      const response = await fetch(
        `${API_GATEWAY_BASE_URL}/workspace/goals/${goalId}/tasks/${taskId}`,
        {
          method: "DELETE",
          headers: headers,
        }
      );

      const updatedGoal = await handleLambdaResponse(response, "deleteTask");
      return updatedGoal;
    } catch (error) {
      console.error("WorkspaceService: Error deleting task:", error);
      throw error;
    }
  },

  /**
   * Record habit completion
   */
  recordHabitCompletion: async (
    goalId,
    completionDate = new Date().toISOString().split("T")[0]
  ) => {
    try {
      const headers = await getAuthHeaders();

      console.log(
        "DEBUG (recordHabitCompletion): Recording completion:",
        goalId,
        completionDate
      );

      const response = await fetch(
        `${API_GATEWAY_BASE_URL}/workspace/goals/${goalId}/habits/complete`,
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify({ completionDate }),
        }
      );

      const updatedGoal = await handleLambdaResponse(
        response,
        "recordHabitCompletion"
      );
      return updatedGoal;
    } catch (error) {
      console.error(
        "WorkspaceService: Error recording habit completion:",
        error
      );
      throw error;
    }
  },

  /**
   * Update skill module progress
   */
  updateSkillModule: async (goalId, moduleId, moduleUpdates) => {
    try {
      const headers = await getAuthHeaders();

      console.log(
        "DEBUG (updateSkillModule): Updating module:",
        goalId,
        moduleId,
        moduleUpdates
      );

      const response = await fetch(
        `${API_GATEWAY_BASE_URL}/workspace/goals/${goalId}/modules/${moduleId}`,
        {
          method: "PUT",
          headers: headers,
          body: JSON.stringify(moduleUpdates),
        }
      );

      const updatedGoal = await handleLambdaResponse(
        response,
        "updateSkillModule"
      );
      return updatedGoal;
    } catch (error) {
      console.error("WorkspaceService: Error updating skill module:", error);
      throw error;
    }
  },

  /**
   * Get goal analytics/statistics
   */
  getGoalAnalytics: async (userId, goalId = null) => {
    try {
      const headers = await getAuthHeaders();

      let url = `${API_GATEWAY_BASE_URL}/workspace/analytics?userId=${userId}`;
      if (goalId) {
        url += `&goalId=${goalId}`;
      }

      console.log("DEBUG (getGoalAnalytics): Fetching analytics from:", url);

      const response = await fetch(url, {
        method: "GET",
        headers: headers,
      });

      const analytics = await handleLambdaResponse(
        response,
        "getGoalAnalytics"
      );
      return analytics;
    } catch (error) {
      console.error("WorkspaceService: Error fetching analytics:", error);
      throw error;
    }
  },
};

export default workspaceService;
