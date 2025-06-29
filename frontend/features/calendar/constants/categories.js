// features/calendar/constants/categories.js

export const TASK_CATEGORIES = {
  "deep-work": {
    label: "Deep Work",
    icon: "🔧",
    color: "#008080",
    bgColor: "rgba(0, 128, 128, 0.1)",
    description: "Complex coding, debugging, architecture",
  },
  meeting: {
    label: "Meeting",
    icon: "👥",
    color: "#FF6B6B",
    bgColor: "rgba(255, 107, 107, 0.1)",
    description: "Team meetings, standups, reviews",
  },
  admin: {
    label: "Administrative",
    icon: "📝",
    color: "#4ECDC4",
    bgColor: "rgba(78, 205, 196, 0.1)",
    description: "Documentation, emails, reports",
  },
  learning: {
    label: "Learning",
    icon: "🎯",
    color: "#45B7D1",
    bgColor: "rgba(69, 183, 209, 0.1)",
    description: "Research, tutorials, new technologies",
  },
  idea: {
    label: "Idea Development",
    icon: "💡",
    color: "#96CEB4",
    bgColor: "rgba(150, 206, 180, 0.1)",
    description: "Brainstorming, prototyping, innovation",
  },
  break: {
    label: "Break",
    icon: "☕",
    color: "#F39C12",
    bgColor: "rgba(243, 156, 18, 0.1)",
    description: "Rest, lunch, coffee breaks",
  },
};

export const COMPLEXITY_LEVELS = {
  low: {
    label: "Low",
    color: "#96CEB4",
    indicator: "●",
    description: "Simple tasks, routine work",
  },
  medium: {
    label: "Medium",
    color: "#FECA57",
    indicator: "●●",
    description: "Moderate complexity, some thinking required",
  },
  high: {
    label: "High",
    color: "#FF6B6B",
    indicator: "●●●",
    description: "Complex tasks, deep focus needed",
  },
};

export const TASK_STATUS = {
  pending: {
    label: "Pending",
    color: "#95A5A6",
    icon: "⏳",
  },
  "in-progress": {
    label: "In Progress",
    color: "#3498DB",
    icon: "🔄",
  },
  completed: {
    label: "Completed",
    color: "#27AE60",
    icon: "✅",
  },
  cancelled: {
    label: "Cancelled",
    color: "#E74C3C",
    icon: "❌",
  },
};
