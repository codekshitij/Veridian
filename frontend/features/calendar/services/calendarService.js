// features/calendar/services/calendarService.js
// Following the pattern from your ideasService.js

import { Auth } from "aws-amplify";

// IMPORTANT: REPLACE THIS WITH YOUR API GATEWAY INVOKE URL
// Following the same pattern as your ideas service
const API_GATEWAY_BASE_URL =
  "https://1qh2o8e1v5.execute-api.us-east-2.amazonaws.com/dev";

const calendarService = {
  /**
   * Get tasks for a specific date range
   * @param {string} userId - User ID from Cognito
   * @param {string} startDate - Start date (YYYY-MM-DD)
   * @param {string} endDate - End date (YYYY-MM-DD)
   * @returns {Array} - Array of tasks
   */
  getTasks: async (userId, startDate, endDate = null) => {
    try {
      // Get the current session to extract the ID token for authorization
      const session = await Auth.currentSession();
      const idToken = session.getIdToken().getJwtToken();

      // Build query parameters
      const params = new URLSearchParams({
        userId,
        startDate,
        ...(endDate && { endDate }),
      });

      console.log("DEBUG (calendarService.getTasks): Fetching tasks for:", {
        userId,
        startDate,
        endDate,
      });

      const response = await fetch(
        `${API_GATEWAY_BASE_URL}/calendar/tasks?${params}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`, // Attach the ID token for Cognito Authorizer
          },
        }
      );

      console.log(
        "DEBUG (calendarService.getTasks): API Response status:",
        response.status
      );

      if (!response.ok) {
        // Attempt to parse error response from API Gateway/Lambda
        let errorMessage = `Failed to fetch tasks: ${response.statusText}`;
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

      const tasks = await response.json();
      console.log(
        "DEBUG (calendarService.getTasks): Tasks fetched successfully:",
        tasks
      );
      return tasks || [];
    } catch (error) {
      console.error("CalendarService: Error fetching tasks:", error);
      throw error; // Re-throw the error for the calling component to handle
    }
  },

  /**
   * Create a new task
   * @param {Object} taskData - Task data object
   * @returns {Object} - Created task
   */
  createTask: async (taskData) => {
    try {
      // Get the current session to extract the ID token for authorization
      const session = await Auth.currentSession();
      const idToken = session.getIdToken().getJwtToken();

      // Ensure taskData contains required fields
      if (
        !taskData.title ||
        !taskData.startTime ||
        !taskData.endTime ||
        !taskData.date
      ) {
        throw new Error(
          "Title, start time, end time, and date are required for the task."
        );
      }

      console.log(
        "DEBUG (calendarService.createTask): Sending data:",
        taskData
      );

      const response = await fetch(`${API_GATEWAY_BASE_URL}/calendar/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`, // Attach the ID token for Cognito Authorizer
        },
        body: JSON.stringify(taskData),
      });

      console.log(
        "DEBUG (calendarService.createTask): API Response status:",
        response.status
      );

      if (!response.ok) {
        // Attempt to parse error response from API Gateway/Lambda
        let errorMessage = `Failed to create task: ${response.statusText}`;
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

      const createdTask = await response.json();
      console.log(
        "DEBUG (calendarService.createTask): Task created successfully:",
        createdTask
      );
      return createdTask;
    } catch (error) {
      console.error("CalendarService: Error creating task:", error);
      throw error; // Re-throw the error for the calling component to handle
    }
  },

  /**
   * Update an existing task
   * @param {string} taskId - Task ID
   * @param {Object} updateData - Updated task data
   * @returns {Object} - Updated task
   */
  updateTask: async (taskId, updateData) => {
    try {
      // Get the current session to extract the ID token for authorization
      const session = await Auth.currentSession();
      const idToken = session.getIdToken().getJwtToken();

      console.log("DEBUG (calendarService.updateTask): Updating task:", {
        taskId,
        updateData,
      });

      const response = await fetch(
        `${API_GATEWAY_BASE_URL}/calendar/tasks/${taskId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`, // Attach the ID token for Cognito Authorizer
          },
          body: JSON.stringify(updateData),
        }
      );

      console.log(
        "DEBUG (calendarService.updateTask): API Response status:",
        response.status
      );

      if (!response.ok) {
        // Attempt to parse error response from API Gateway/Lambda
        let errorMessage = `Failed to update task: ${response.statusText}`;
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

      const updatedTask = await response.json();
      console.log(
        "DEBUG (calendarService.updateTask): Task updated successfully:",
        updatedTask
      );
      return updatedTask;
    } catch (error) {
      console.error("CalendarService: Error updating task:", error);
      throw error; // Re-throw the error for the calling component to handle
    }
  },

  /**
   * Delete a task
   * @param {string} taskId - Task ID
   * @returns {boolean} - Success status
   */
  deleteTask: async (taskId) => {
    try {
      // Get the current session to extract the ID token for authorization
      const session = await Auth.currentSession();
      const idToken = session.getIdToken().getJwtToken();

      console.log("DEBUG (calendarService.deleteTask): Deleting task:", taskId);

      const response = await fetch(
        `${API_GATEWAY_BASE_URL}/calendar/tasks/${taskId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`, // Attach the ID token for Cognito Authorizer
          },
        }
      );

      console.log(
        "DEBUG (calendarService.deleteTask): API Response status:",
        response.status
      );

      if (!response.ok) {
        // Attempt to parse error response from API Gateway/Lambda
        let errorMessage = `Failed to delete task: ${response.statusText}`;
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

      console.log(
        "DEBUG (calendarService.deleteTask): Task deleted successfully"
      );
      return true;
    } catch (error) {
      console.error("CalendarService: Error deleting task:", error);
      throw error; // Re-throw the error for the calling component to handle
    }
  },

  /**
   * Toggle task completion status
   * @param {string} taskId - Task ID
   * @param {boolean} completed - New completion status
   * @returns {Object} - Updated task
   */
  toggleTaskCompletion: async (taskId, completed) => {
    try {
      return await calendarService.updateTask(taskId, {
        completed,
        status: completed ? "completed" : "pending",
        completedAt: completed ? new Date().toISOString() : null,
      });
    } catch (error) {
      console.error("CalendarService: Error toggling task completion:", error);
      throw error;
    }
  },

  /**
   * Get productivity analytics for a user
   * @param {string} userId - User ID from Cognito
   * @param {string} startDate - Start date for analytics (YYYY-MM-DD)
   * @param {string} endDate - End date for analytics (YYYY-MM-DD)
   * @returns {Object} - Analytics data
   */
  getAnalytics: async (userId, startDate, endDate) => {
    try {
      // Get the current session to extract the ID token for authorization
      const session = await Auth.currentSession();
      const idToken = session.getIdToken().getJwtToken();

      const params = new URLSearchParams({
        userId,
        startDate,
        endDate,
      });

      console.log(
        "DEBUG (calendarService.getAnalytics): Fetching analytics for:",
        { userId, startDate, endDate }
      );

      const response = await fetch(
        `${API_GATEWAY_BASE_URL}/calendar/analytics?${params}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`, // Attach the ID token for Cognito Authorizer
          },
        }
      );

      console.log(
        "DEBUG (calendarService.getAnalytics): API Response status:",
        response.status
      );

      if (!response.ok) {
        // Attempt to parse error response from API Gateway/Lambda
        let errorMessage = `Failed to fetch analytics: ${response.statusText}`;
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

      const analytics = await response.json();
      console.log(
        "DEBUG (calendarService.getAnalytics): Analytics fetched successfully:",
        analytics
      );
      return analytics;
    } catch (error) {
      console.error("CalendarService: Error fetching analytics:", error);
      throw error; // Re-throw the error for the calling component to handle
    }
  },
};

export default calendarService;
