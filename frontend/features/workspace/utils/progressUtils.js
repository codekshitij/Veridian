// features/workspace/utils/progressUtils.js
import { calculateTimeProgress } from "./dateUtils";

/**
 * Calculate overall progress for a goal based on task completion
 * @param {Object} goal - The goal object with tasks
 * @returns {number} Progress percentage (0-100)
 */
export const calculateProgress = (goal) => {
  if (!goal) return 0;

  // If goal has a manual progress override, use that
  if (goal.manualProgress !== undefined && goal.manualProgress !== null) {
    return Math.max(0, Math.min(100, goal.manualProgress));
  }

  // Calculate based on tasks if they exist
  if (goal.tasks && goal.tasks.length > 0) {
    return calculateTaskProgress(goal.tasks);
  }

  // For habits, calculate based on completion records
  if (goal.type === "habit" && goal.completionRecords) {
    return calculateHabitProgress(goal);
  }

  // For skills, calculate based on modules/lessons
  if (goal.type === "skill" && goal.modules) {
    return calculateSkillProgress(goal.modules);
  }

  // Fallback to time-based progress if no other method available
  if (goal.startDate && goal.targetDate) {
    return calculateTimeProgress(goal.startDate, goal.targetDate);
  }

  return 0;
};

/**
 * Calculate progress based on task completion
 * @param {Array} tasks - Array of task objects
 * @returns {number} Progress percentage (0-100)
 */
export const calculateTaskProgress = (tasks) => {
  if (!tasks || tasks.length === 0) return 0;

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;

  return Math.round((completedTasks / totalTasks) * 100);
};

/**
 * Calculate weighted progress based on task completion with priorities
 * @param {Array} tasks - Array of task objects with priority weights
 * @returns {number} Progress percentage (0-100)
 */
export const calculateWeightedTaskProgress = (tasks) => {
  if (!tasks || tasks.length === 0) return 0;

  const priorityWeights = {
    low: 1,
    medium: 2,
    high: 3,
  };

  let totalWeight = 0;
  let completedWeight = 0;

  tasks.forEach((task) => {
    const weight = priorityWeights[task.priority] || 1;
    totalWeight += weight;

    if (task.completed) {
      completedWeight += weight;
    }
  });

  if (totalWeight === 0) return 0;
  return Math.round((completedWeight / totalWeight) * 100);
};

/**
 * Calculate habit progress based on completion streaks and target frequency
 * @param {Object} goal - Habit goal object
 * @returns {number} Progress percentage (0-100)
 */
export const calculateHabitProgress = (goal) => {
  if (!goal.completionRecords || !goal.targetFrequency) return 0;

  const now = new Date();
  const startDate = new Date(goal.startDate);
  const daysSinceStart = Math.ceil((now - startDate) / (1000 * 60 * 60 * 24));

  // Calculate expected completions based on frequency
  const expectedCompletions = Math.floor(daysSinceStart * goal.targetFrequency);
  const actualCompletions = goal.completionRecords.length;

  if (expectedCompletions === 0) return 0;

  const successRate = Math.min(actualCompletions / expectedCompletions, 1);
  return Math.round(successRate * 100);
};

/**
 * Calculate skill progress based on completed modules/lessons
 * @param {Array} modules - Array of skill modules
 * @returns {number} Progress percentage (0-100)
 */
export const calculateSkillProgress = (modules) => {
  if (!modules || modules.length === 0) return 0;

  const totalModules = modules.length;
  const completedModules = modules.filter((module) => module.completed).length;

  return Math.round((completedModules / totalModules) * 100);
};

/**
 * Get progress status based on percentage and timeline
 * @param {number} progress - Progress percentage (0-100)
 * @param {Object} goal - Goal object with dates
 * @returns {string} Status: 'on-track', 'at-risk', 'off-track'
 */
export const getProgressStatus = (progress, goal) => {
  if (!goal.startDate || !goal.targetDate) {
    // Without timeline, judge only by progress
    if (progress >= 80) return "on-track";
    if (progress >= 40) return "at-risk";
    return "off-track";
  }

  const timeProgress = calculateTimeProgress(goal.startDate, goal.targetDate);
  const progressDiff = progress - timeProgress;

  // If we're ahead of schedule or on track
  if (progressDiff >= -10) return "on-track";

  // If we're slightly behind
  if (progressDiff >= -30) return "at-risk";

  // If we're significantly behind
  return "off-track";
};

/**
 * Calculate estimated completion date based on current progress rate
 * @param {Object} goal - Goal object
 * @returns {Date|null} Estimated completion date
 */
export const estimateCompletionDate = (goal) => {
  const progress = calculateProgress(goal);

  if (progress >= 100) {
    return new Date(); // Already completed
  }

  if (progress === 0 || !goal.startDate) {
    return null; // Can't estimate without progress or start date
  }

  const startDate = new Date(goal.startDate);
  const now = new Date();
  const daysSinceStart = Math.ceil((now - startDate) / (1000 * 60 * 60 * 24));

  if (daysSinceStart <= 0) return null;

  // Calculate daily progress rate
  const dailyProgressRate = progress / daysSinceStart;

  if (dailyProgressRate <= 0) return null;

  // Calculate remaining days needed
  const remainingProgress = 100 - progress;
  const remainingDays = Math.ceil(remainingProgress / dailyProgressRate);

  // Add remaining days to current date
  const estimatedDate = new Date(now);
  estimatedDate.setDate(estimatedDate.getDate() + remainingDays);

  return estimatedDate;
};

/**
 * Calculate daily progress needed to meet target date
 * @param {Object} goal - Goal object with target date
 * @returns {number} Daily progress percentage needed
 */
export const calculateRequiredDailyProgress = (goal) => {
  const currentProgress = calculateProgress(goal);

  if (currentProgress >= 100) return 0;
  if (!goal.targetDate) return 0;

  const now = new Date();
  const targetDate = new Date(goal.targetDate);
  const daysRemaining = Math.ceil((targetDate - now) / (1000 * 60 * 60 * 24));

  if (daysRemaining <= 0) return 100; // Past due date

  const remainingProgress = 100 - currentProgress;
  return remainingProgress / daysRemaining;
};

/**
 * Get progress color based on status
 * @param {string} status - Progress status
 * @returns {string} CSS color value
 */
export const getProgressColor = (status) => {
  switch (status) {
    case "on-track":
      return "#10b981"; // Green
    case "at-risk":
      return "#f59e0b"; // Orange
    case "off-track":
      return "#ef4444"; // Red
    default:
      return "#6b7280"; // Gray
  }
};

/**
 * Format progress for display with appropriate units
 * @param {Object} goal - Goal object
 * @returns {string} Formatted progress string
 */
export const formatProgress = (goal) => {
  const progress = calculateProgress(goal);

  if (goal.type === "habit" && goal.completionRecords) {
    const streak = calculateCurrentStreak(goal.completionRecords);
    return `${streak} day streak • ${Math.round(progress)}%`;
  }

  if (goal.tasks && goal.tasks.length > 0) {
    const completed = goal.tasks.filter((t) => t.completed).length;
    const total = goal.tasks.length;
    return `${completed}/${total} tasks • ${Math.round(progress)}%`;
  }

  return `${Math.round(progress)}%`;
};

/**
 * Calculate current streak for habit tracking
 * @param {Array} completionRecords - Array of completion dates
 * @returns {number} Current streak count
 */
export const calculateCurrentStreak = (completionRecords) => {
  if (!completionRecords || completionRecords.length === 0) return 0;

  // Sort records by date (most recent first)
  const sortedRecords = completionRecords
    .map((record) => new Date(record.date))
    .sort((a, b) => b - a);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let streak = 0;
  let currentDate = new Date(today);

  for (const recordDate of sortedRecords) {
    recordDate.setHours(0, 0, 0, 0);

    if (recordDate.getTime() === currentDate.getTime()) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else if (recordDate.getTime() < currentDate.getTime()) {
      break; // Gap in streak
    }
  }

  return streak;
};
