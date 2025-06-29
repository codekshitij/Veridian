// features/calendar/utils/dateUtils.js

/**
 * Date utilities for calendar functionality
 * Following the pattern from your existing utils
 */

/**
 * Format date to ISO string (YYYY-MM-DD)
 * @param {Date} date - Date object
 * @returns {string} - ISO formatted date string
 */
export const formatDateToISO = (date) => {
  if (!date) return "";
  return date.toISOString().split("T")[0];
};

/**
 * Format date for display
 * @param {Date} date - Date object
 * @param {string} format - Format type ('short', 'long', 'iso')
 * @returns {string} - Formatted date string
 */
export const formatDate = (date, format = "long") => {
  if (!date) return "";

  switch (format) {
    case "short":
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    case "long":
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    case "iso":
      return formatDateToISO(date);
    default:
      return date.toLocaleDateString();
  }
};

/**
 * Get start of week (Sunday)
 * @param {Date} date - Any date in the week
 * @returns {Date} - Start of week date
 */
export const getWeekStart = (date) => {
  const start = new Date(date);
  const day = start.getDay();
  const diff = start.getDate() - day;
  start.setDate(diff);
  start.setHours(0, 0, 0, 0);
  return start;
};

/**
 * Get end of week (Saturday)
 * @param {Date} date - Any date in the week
 * @returns {Date} - End of week date
 */
export const getWeekEnd = (date) => {
  const start = getWeekStart(date);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  return end;
};

/**
 * Get all days in a month with calendar grid (including prev/next month days)
 * @param {Date} date - Any date in the month
 * @returns {Array} - Array of day objects with date and isCurrentMonth flag
 */
export const getMonthDays = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const days = [];

  // Previous month's trailing days
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    const prevDate = new Date(year, month, -i);
    days.push({ date: prevDate, isCurrentMonth: false });
  }

  // Current month's days
  for (let day = 1; day <= daysInMonth; day++) {
    const currentDate = new Date(year, month, day);
    days.push({ date: currentDate, isCurrentMonth: true });
  }

  // Next month's leading days to complete 6 weeks (42 days)
  const remainingDays = 42 - days.length;
  for (let day = 1; day <= remainingDays; day++) {
    const nextDate = new Date(year, month + 1, day);
    days.push({ date: nextDate, isCurrentMonth: false });
  }

  return days;
};

/**
 * Check if two dates are the same day
 * @param {Date} date1 - First date
 * @param {Date} date2 - Second date
 * @returns {boolean} - True if same day
 */
export const isSameDay = (date1, date2) => {
  if (!date1 || !date2) return false;
  return formatDateToISO(date1) === formatDateToISO(date2);
};

/**
 * Check if date is today
 * @param {Date} date - Date to check
 * @returns {boolean} - True if today
 */
export const isToday = (date) => {
  return isSameDay(date, new Date());
};

/**
 * Add days to a date
 * @param {Date} date - Base date
 * @param {number} days - Number of days to add (can be negative)
 * @returns {Date} - New date
 */
export const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(date.getDate() + days);
  return result;
};

/**
 * Add weeks to a date
 * @param {Date} date - Base date
 * @param {number} weeks - Number of weeks to add (can be negative)
 * @returns {Date} - New date
 */
export const addWeeks = (date, weeks) => {
  return addDays(date, weeks * 7);
};

/**
 * Add months to a date
 * @param {Date} date - Base date
 * @param {number} months - Number of months to add (can be negative)
 * @returns {Date} - New date
 */
export const addMonths = (date, months) => {
  const result = new Date(date);
  result.setMonth(date.getMonth() + months);
  return result;
};

/**
 * Get week range display text
 * @param {Date} date - Any date in the week
 * @returns {string} - Week range text (e.g., "Jun 23 - Jun 29, 2025")
 */
export const getWeekRangeText = (date) => {
  const weekStart = getWeekStart(date);
  const weekEnd = getWeekEnd(date);

  const startText = weekStart.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  const endText = weekEnd.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return `${startText} - ${endText}`;
};
