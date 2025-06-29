// features/calendar/constants/viewModes.js

export const VIEW_MODES = {
  TODAY: "today",
  WEEKLY: "weekly",
  MONTHLY: "monthly",
};

export const VIEW_CONFIG = {
  [VIEW_MODES.TODAY]: {
    label: "Today",
    icon: "today",
    description: "Detailed daily schedule",
  },
  [VIEW_MODES.WEEKLY]: {
    label: "Week",
    icon: "view_week",
    description: "7-day overview",
  },
  [VIEW_MODES.MONTHLY]: {
    label: "Month",
    icon: "calendar_view_month",
    description: "Monthly calendar",
  },
};

export const TIME_FORMATS = {
  HOUR_12: "12h",
  HOUR_24: "24h",
};

export const DATE_FORMATS = {
  SHORT: "MM/DD/YYYY",
  LONG: "MMMM DD, YYYY",
  ISO: "YYYY-MM-DD",
};
