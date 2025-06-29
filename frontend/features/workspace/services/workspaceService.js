// features/workspace/services/workspaceService.js
import { Auth } from "aws-amplify";

// Use your existing API Gateway base URL or create a new endpoint for workspace
const API_GATEWAY_BASE_URL =
  "https://tumlsjr0ec.execute-api.us-east-2.amazonaws.com/dev";

const workspaceService = {
  /**
   * Get all goals for a user within a date range
   */
  getGoals: async (userId, dateRange = null) => {
    try {
      const session = await Auth.currentSession();
      const idToken = session.getIdToken().getJwtToken();

      let url = `${API_GATEWAY_BASE_URL}/workspace/goals?userId=${userId}`;

      if (dateRange) {
        url += `&startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`;
      }

      console.log(
        "DEBUG (workspaceService.getGoals): Fetching goals from:",
        url
      );

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
      });

      console.log(
        "DEBUG (workspaceService.getGoals): Response status:",
        response.status
      );

      if (!response.ok) {
        let errorMessage = `Failed to fetch goals: ${response.statusText}`;
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

      const goals = await response.json();
      console.log(
        "DEBUG (workspaceService.getGoals): Goals fetched successfully:",
        goals
      );
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
      const session = await Auth.currentSession();
      const idToken = session.getIdToken().getJwtToken();

      console.log(
        "DEBUG (workspaceService.createGoal): Creating goal:",
        goalData
      );

      const response = await fetch(`${API_GATEWAY_BASE_URL}/workspace/goals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify(goalData),
      });

      console.log(
        "DEBUG (workspaceService.createGoal): Response status:",
        response.status
      );

      if (!response.ok) {
        let errorMessage = `Failed to create goal: ${response.statusText}`;
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

      const createdGoal = await response.json();
      console.log(
        "DEBUG (workspaceService.createGoal): Goal created successfully:",
        createdGoal
      );
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
      const session = await Auth.currentSession();
      const idToken = session.getIdToken().getJwtToken();

      console.log(
        "DEBUG (workspaceService.updateGoal): Updating goal:",
        goalId,
        updates
      );

      const response = await fetch(
        `${API_GATEWAY_BASE_URL}/workspace/goals/${goalId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify(updates),
        }
      );

      console.log(
        "DEBUG (workspaceService.updateGoal): Response status:",
        response.status
      );

      if (!response.ok) {
        let errorMessage = `Failed to update goal: ${response.statusText}`;
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

      const updatedGoal = await response.json();
      console.log(
        "DEBUG (workspaceService.updateGoal): Goal updated successfully:",
        updatedGoal
      );
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
      const session = await Auth.currentSession();
      const idToken = session.getIdToken().getJwtToken();

      console.log(
        "DEBUG (workspaceService.deleteGoal): Deleting goal:",
        goalId
      );

      const response = await fetch(
        `${API_GATEWAY_BASE_URL}/workspace/goals/${goalId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      console.log(
        "DEBUG (workspaceService.deleteGoal): Response status:",
        response.status
      );

      if (!response.ok) {
        let errorMessage = `Failed to delete goal: ${response.statusText}`;
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
        "DEBUG (workspaceService.deleteGoal): Goal deleted successfully"
      );
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
      const session = await Auth.currentSession();
      const idToken = session.getIdToken().getJwtToken();

      console.log(
        "DEBUG (workspaceService.updateTask): Updating task:",
        goalId,
        taskId,
        taskUpdates
      );

      const response = await fetch(
        `${API_GATEWAY_BASE_URL}/workspace/goals/${goalId}/tasks/${taskId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify(taskUpdates),
        }
      );

      console.log(
        "DEBUG (workspaceService.updateTask): Response status:",
        response.status
      );

      if (!response.ok) {
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

      const updatedGoal = await response.json();
      console.log(
        "DEBUG (workspaceService.updateTask): Task updated successfully"
      );
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
      const session = await Auth.currentSession();
      const idToken = session.getIdToken().getJwtToken();

      console.log(
        "DEBUG (workspaceService.addTask): Adding task:",
        goalId,
        taskData
      );

      const response = await fetch(
        `${API_GATEWAY_BASE_URL}/workspace/goals/${goalId}/tasks`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify(taskData),
        }
      );

      console.log(
        "DEBUG (workspaceService.addTask): Response status:",
        response.status
      );

      if (!response.ok) {
        let errorMessage = `Failed to add task: ${response.statusText}`;
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

      const updatedGoal = await response.json();
      console.log("DEBUG (workspaceService.addTask): Task added successfully");
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
      const session = await Auth.currentSession();
      const idToken = session.getIdToken().getJwtToken();

      console.log(
        "DEBUG (workspaceService.deleteTask): Deleting task:",
        goalId,
        taskId
      );

      const response = await fetch(
        `${API_GATEWAY_BASE_URL}/workspace/goals/${goalId}/tasks/${taskId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      console.log(
        "DEBUG (workspaceService.deleteTask): Response status:",
        response.status
      );

      if (!response.ok) {
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

      const updatedGoal = await response.json();
      console.log(
        "DEBUG (workspaceService.deleteTask): Task deleted successfully"
      );
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
      const session = await Auth.currentSession();
      const idToken = session.getIdToken().getJwtToken();

      console.log(
        "DEBUG (workspaceService.recordHabitCompletion): Recording completion:",
        goalId,
        completionDate
      );

      const response = await fetch(
        `${API_GATEWAY_BASE_URL}/workspace/goals/${goalId}/habits/complete`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({ completionDate }),
        }
      );

      console.log(
        "DEBUG (workspaceService.recordHabitCompletion): Response status:",
        response.status
      );

      if (!response.ok) {
        let errorMessage = `Failed to record habit completion: ${response.statusText}`;
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

      const updatedGoal = await response.json();
      console.log(
        "DEBUG (workspaceService.recordHabitCompletion): Habit completion recorded successfully"
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
      const session = await Auth.currentSession();
      const idToken = session.getIdToken().getJwtToken();

      console.log(
        "DEBUG (workspaceService.updateSkillModule): Updating module:",
        goalId,
        moduleId,
        moduleUpdates
      );

      const response = await fetch(
        `${API_GATEWAY_BASE_URL}/workspace/goals/${goalId}/modules/${moduleId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify(moduleUpdates),
        }
      );

      console.log(
        "DEBUG (workspaceService.updateSkillModule): Response status:",
        response.status
      );

      if (!response.ok) {
        let errorMessage = `Failed to update skill module: ${response.statusText}`;
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

      const updatedGoal = await response.json();
      console.log(
        "DEBUG (workspaceService.updateSkillModule): Skill module updated successfully"
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
      const session = await Auth.currentSession();
      const idToken = session.getIdToken().getJwtToken();

      let url = `${API_GATEWAY_BASE_URL}/workspace/analytics?userId=${userId}`;
      if (goalId) {
        url += `&goalId=${goalId}`;
      }

      console.log(
        "DEBUG (workspaceService.getGoalAnalytics): Fetching analytics from:",
        url
      );

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
      });

      console.log(
        "DEBUG (workspaceService.getGoalAnalytics): Response status:",
        response.status
      );

      if (!response.ok) {
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
        "DEBUG (workspaceService.getGoalAnalytics): Analytics fetched successfully:",
        analytics
      );
      return analytics;
    } catch (error) {
      console.error("WorkspaceService: Error fetching analytics:", error);
      throw error;
    }
  },
};

export default workspaceService;
