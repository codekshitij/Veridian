// features/workspace/utils/dateUtils.js

/**
 * Format a date as a relative time string (e.g., "2 days ago", "in 3 weeks")
 */
export const formatRelativeDate = (dateString) => {
  if (!dateString) return "No date";

  const date = new Date(dateString);
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tomorrow";
  if (diffDays === -1) return "Yesterday";

  if (diffDays > 0) {
    if (diffDays < 7) return `In ${diffDays} days`;
    if (diffDays < 30) return `In ${Math.ceil(diffDays / 7)} weeks`;
    if (diffDays < 365) return `In ${Math.ceil(diffDays / 30)} months`;
    return `In ${Math.ceil(diffDays / 365)} years`;
  } else {
    const absDays = Math.abs(diffDays);
    if (absDays < 7) return `${absDays} days ago`;
    if (absDays < 30) return `${Math.ceil(absDays / 7)} weeks ago`;
    if (absDays < 365) return `${Math.ceil(absDays / 30)} months ago`;
    return `${Math.ceil(absDays / 365)} years ago`;
  }
};

/**
 * Format a date for display (e.g., "Jan 15, 2025")
 */
export const formatDisplayDate = (dateString) => {
  if (!dateString) return "No date";

  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

/**
 * Format a date range for display (e.g., "Jan 1 - Mar 31, 2025")
 */
export const formatDateRange = (startDate, endDate) => {
  if (!startDate || !endDate) return "No date range";

  const start = new Date(startDate);
  const end = new Date(endDate);

  const startYear = start.getFullYear();
  const endYear = end.getFullYear();

  const startMonth = start.toLocaleDateString("en-US", { month: "short" });
  const endMonth = end.toLocaleDateString("en-US", { month: "short" });

  const startDay = start.getDate();
  const endDay = end.getDate();

  if (startYear === endYear) {
    if (start.getMonth() === end.getMonth()) {
      // Same month: "Jan 1-15, 2025"
      return `${startMonth} ${startDay}-${endDay}, ${startYear}`;
    } else {
      // Different months, same year: "Jan 1 - Mar 31, 2025"
      return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${startYear}`;
    }
  } else {
    // Different years: "Dec 1, 2024 - Feb 28, 2025"
    return `${startMonth} ${startDay}, ${startYear} - ${endMonth} ${endDay}, ${endYear}`;
  }
};

/**
 * Calculate the number of days between two dates
 */
export const daysBetween = (startDate, endDate) => {
  if (!startDate || !endDate) return 0;

  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};

/**
 * Calculate progress based on time elapsed (0-100%)
 */
export const calculateTimeProgress = (
  startDate,
  endDate,
  currentDate = new Date()
) => {
  if (!startDate || !endDate) return 0;

  const start = new Date(startDate);
  const end = new Date(endDate);
  const current = new Date(currentDate);

  if (current <= start) return 0;
  if (current >= end) return 100;

  const totalDuration = end.getTime() - start.getTime();
  const elapsedDuration = current.getTime() - start.getTime();

  return Math.round((elapsedDuration / totalDuration) * 100);
};

/**
 * Check if a date is within a given range
 */
export const isDateInRange = (date, startDate, endDate) => {
  if (!date || !startDate || !endDate) return false;

  const checkDate = new Date(date);
  const start = new Date(startDate);
  const end = new Date(endDate);

  return checkDate >= start && checkDate <= end;
};

/**
 * Get the start and end of the current week
 */
export const getCurrentWeek = () => {
  const now = new Date();
  const startOfWeek = new Date(now);
  const endOfWeek = new Date(now);

  // Get Monday as start of week
  const day = now.getDay();
  const diff = now.getDate() - day + (day === 0 ? -6 : 1);

  startOfWeek.setDate(diff);
  endOfWeek.setDate(diff + 6);

  return {
    startDate: startOfWeek.toISOString().split("T")[0],
    endDate: endOfWeek.toISOString().split("T")[0],
  };
};

/**
 * Get the start and end of the current month
 */
export const getCurrentMonth = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  return {
    startDate: start.toISOString().split("T")[0],
    endDate: end.toISOString().split("T")[0],
  };
};

/**
 * Get the start and end of the current quarter
 */
export const getCurrentQuarter = () => {
  const now = new Date();
  const quarter = Math.floor(now.getMonth() / 3);
  const start = new Date(now.getFullYear(), quarter * 3, 1);
  const end = new Date(now.getFullYear(), (quarter + 1) * 3, 0);

  return {
    startDate: start.toISOString().split("T")[0],
    endDate: end.toISOString().split("T")[0],
  };
};

/**
 * Convert ISO date string to input date format
 */
export const toInputDate = (isoString) => {
  if (!isoString) return "";
  return isoString.split("T")[0];
};

/**
 * Convert input date to ISO string
 */
export const toISODate = (inputDate) => {
  if (!inputDate) return null;
  return new Date(inputDate).toISOString();
};
