// features/workspace/types/workspaceTypes.js

/**
 * Goal data structure schema
 */
export const goalSchema = {
  goalId: "string", // Unique identifier
  userId: "string", // Owner's user ID
  title: "string", // Goal title
  description: "string", // Optional description
  type: "string", // project, skill, habit, task, learning, health, creative, business
  status: "string", // active, paused, completed, archived
  priority: "string", // low, medium, high
  startDate: "string", // ISO date string
  targetDate: "string", // ISO date string (optional)
  completedDate: "string", // ISO date string (when completed)
  tags: ["string"], // Array of tags
  progress: "number", // Manual progress override (0-100)

  // Type-specific data
  tasks: ["object"], // For projects and general task tracking
  modules: ["object"], // For skills and learning
  completionRecords: ["object"], // For habits
  notes: "string", // General notes
  links: ["string"], // Related URLs

  // Metadata
  createdAt: "string", // ISO date string
  updatedAt: "string", // ISO date string
};

/**
 * Task data structure
 */
export const taskSchema = {
  taskId: "string",
  title: "string",
  description: "string",
  completed: "boolean",
  priority: "string", // low, medium, high
  dueDate: "string", // ISO date string
  estimatedHours: "number",
  actualHours: "number",
  dependencies: ["string"], // Array of task IDs
  tags: ["string"],
  createdAt: "string",
  updatedAt: "string",
  completedAt: "string",
};

/**
 * Skill module data structure
 */
export const moduleSchema = {
  moduleId: "string",
  title: "string",
  description: "string",
  completed: "boolean",
  progress: "number", // 0-100
  resources: ["object"], // Learning resources
  notes: "string",
  completedAt: "string",
};

/**
 * Habit completion record
 */
export const completionRecordSchema = {
  recordId: "string",
  date: "string", // ISO date string
  notes: "string",
  quality: "number", // 1-5 rating (optional)
  createdAt: "string",
};

/**
 * Resource object for skills/learning
 */
export const resourceSchema = {
  resourceId: "string",
  title: "string",
  url: "string",
  type: "string", // video, article, book, course, documentation
  completed: "boolean",
  notes: "string",
};

/**
 * Goal type definitions
 */
export const goalTypes = {
  PROJECT: "project",
  SKILL: "skill",
  HABIT: "habit",
  TASK: "task",
  LEARNING: "learning",
  HEALTH: "health",
  CREATIVE: "creative",
  BUSINESS: "business",
};

/**
 * Goal status definitions
 */
export const goalStatuses = {
  ACTIVE: "active",
  PAUSED: "paused",
  COMPLETED: "completed",
  ARCHIVED: "archived",
};

/**
 * Priority levels
 */
export const priorities = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
};

/**
 * Progress status definitions
 */
export const progressStatuses = {
  ON_TRACK: "on-track",
  AT_RISK: "at-risk",
  OFF_TRACK: "off-track",
};

/**
 * Default goal template
 */
export const createDefaultGoal = (userId, type = goalTypes.PROJECT) => ({
  goalId: `goal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  userId,
  title: "",
  description: "",
  type,
  status: goalStatuses.ACTIVE,
  priority: priorities.MEDIUM,
  startDate: new Date().toISOString().split("T")[0],
  targetDate: null,
  completedDate: null,
  tags: [],
  progress: null, // Let it calculate automatically
  tasks: [],
  modules: [],
  completionRecords: [],
  notes: "",
  links: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

/**
 * Default task template
 */
export const createDefaultTask = () => ({
  taskId: `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  title: "",
  description: "",
  completed: false,
  priority: priorities.MEDIUM,
  dueDate: null,
  estimatedHours: null,
  actualHours: null,
  dependencies: [],
  tags: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  completedAt: null,
});

/**
 * Default skill module template
 */
export const createDefaultModule = () => ({
  moduleId: `module_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  title: "",
  description: "",
  completed: false,
  progress: 0,
  resources: [],
  notes: "",
  completedAt: null,
});

/**
 * Default completion record template
 */
export const createDefaultCompletionRecord = (
  date = new Date().toISOString().split("T")[0]
) => ({
  recordId: `record_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  date,
  notes: "",
  quality: null,
  createdAt: new Date().toISOString(),
});

/**
 * Goal type configurations
 */
export const goalTypeConfigs = {
  [goalTypes.PROJECT]: {
    icon: "🚀",
    color: "#60a5fa",
    description: "Multi-step projects with tasks and deadlines",
    defaultFields: ["tasks", "targetDate"],
    progressCalculation: "tasks",
  },
  [goalTypes.SKILL]: {
    icon: "🧠",
    color: "#f59e0b",
    description: "Learning new skills with modules and resources",
    defaultFields: ["modules", "resources"],
    progressCalculation: "modules",
  },
  [goalTypes.HABIT]: {
    icon: "⚡",
    color: "#8b5cf6",
    description: "Daily habits and recurring activities",
    defaultFields: ["completionRecords", "targetFrequency"],
    progressCalculation: "frequency",
  },
  [goalTypes.TASK]: {
    icon: "✅",
    color: "#10b981",
    description: "Simple tasks and to-dos",
    defaultFields: ["dueDate"],
    progressCalculation: "manual",
  },
  [goalTypes.LEARNING]: {
    icon: "📚",
    color: "#f59e0b",
    description: "Structured learning with courses and materials",
    defaultFields: ["modules", "resources"],
    progressCalculation: "modules",
  },
  [goalTypes.HEALTH]: {
    icon: "💪",
    color: "#8b5cf6",
    description: "Health and fitness goals",
    defaultFields: ["completionRecords", "targetFrequency"],
    progressCalculation: "frequency",
  },
  [goalTypes.CREATIVE]: {
    icon: "🎨",
    color: "#f59e0b",
    description: "Creative projects and artistic endeavors",
    defaultFields: ["tasks", "targetDate"],
    progressCalculation: "tasks",
  },
  [goalTypes.BUSINESS]: {
    icon: "💼",
    color: "#60a5fa",
    description: "Business and professional development goals",
    defaultFields: ["tasks", "targetDate"],
    progressCalculation: "tasks",
  },
};

/**
 * Validation functions
 */
export const validators = {
  /**
   * Validate goal object
   */
  validateGoal: (goal) => {
    const errors = [];

    if (!goal.title || goal.title.trim().length === 0) {
      errors.push("Title is required");
    }

    if (goal.title && goal.title.length > 200) {
      errors.push("Title must be less than 200 characters");
    }

    if (!Object.values(goalTypes).includes(goal.type)) {
      errors.push("Invalid goal type");
    }

    if (!Object.values(goalStatuses).includes(goal.status)) {
      errors.push("Invalid goal status");
    }

    if (!Object.values(priorities).includes(goal.priority)) {
      errors.push("Invalid priority level");
    }

    if (goal.startDate && goal.targetDate) {
      const start = new Date(goal.startDate);
      const target = new Date(goal.targetDate);
      if (target <= start) {
        errors.push("Target date must be after start date");
      }
    }

    if (goal.progress !== null && (goal.progress < 0 || goal.progress > 100)) {
      errors.push("Progress must be between 0 and 100");
    }

    return errors;
  },

  /**
   * Validate task object
   */
  validateTask: (task) => {
    const errors = [];

    if (!task.title || task.title.trim().length === 0) {
      errors.push("Task title is required");
    }

    if (task.title && task.title.length > 200) {
      errors.push("Task title must be less than 200 characters");
    }

    if (!Object.values(priorities).includes(task.priority)) {
      errors.push("Invalid task priority");
    }

    if (task.estimatedHours !== null && task.estimatedHours < 0) {
      errors.push("Estimated hours cannot be negative");
    }

    if (task.actualHours !== null && task.actualHours < 0) {
      errors.push("Actual hours cannot be negative");
    }

    return errors;
  },
};

/**
 * Helper functions for working with goal data
 */
export const goalHelpers = {
  /**
   * Get display name for goal type
   */
  getTypeDisplayName: (type) => {
    const typeMap = {
      [goalTypes.PROJECT]: "Project",
      [goalTypes.SKILL]: "Skill",
      [goalTypes.HABIT]: "Habit",
      [goalTypes.TASK]: "Task",
      [goalTypes.LEARNING]: "Learning",
      [goalTypes.HEALTH]: "Health",
      [goalTypes.CREATIVE]: "Creative",
      [goalTypes.BUSINESS]: "Business",
    };
    return typeMap[type] || "Unknown";
  },

  /**
   * Get status display name and color
   */
  getStatusDisplay: (status) => {
    const statusMap = {
      [goalStatuses.ACTIVE]: { name: "Active", color: "#10b981" },
      [goalStatuses.PAUSED]: { name: "Paused", color: "#f59e0b" },
      [goalStatuses.COMPLETED]: { name: "Completed", color: "#8b5cf6" },
      [goalStatuses.ARCHIVED]: { name: "Archived", color: "#6b7280" },
    };
    return statusMap[status] || { name: "Unknown", color: "#6b7280" };
  },

  /**
   * Get priority display name and color
   */
  getPriorityDisplay: (priority) => {
    const priorityMap = {
      [priorities.LOW]: { name: "Low", color: "#6b7280" },
      [priorities.MEDIUM]: { name: "Medium", color: "#f59e0b" },
      [priorities.HIGH]: { name: "High", color: "#ef4444" },
    };
    return priorityMap[priority] || { name: "Unknown", color: "#6b7280" };
  },

  /**
   * Check if goal is overdue
   */
  isOverdue: (goal) => {
    if (!goal.targetDate || goal.status === goalStatuses.COMPLETED) {
      return false;
    }

    const today = new Date();
    const targetDate = new Date(goal.targetDate);
    return targetDate < today;
  },

  /**
   * Get days until target date
   */
  getDaysUntilTarget: (goal) => {
    if (!goal.targetDate) return null;

    const today = new Date();
    const targetDate = new Date(goal.targetDate);
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  },
};
