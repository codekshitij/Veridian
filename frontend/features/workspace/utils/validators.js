// features/workspace/utils/validators.js

/**
 * Validation utilities for workspace forms
 */

export const validators = {
  /**
   * Validate goal title
   */
  validateTitle: (title) => {
    const errors = [];

    if (!title || title.trim().length === 0) {
      errors.push("Title is required");
    } else if (title.trim().length < 3) {
      errors.push("Title must be at least 3 characters long");
    } else if (title.length > 200) {
      errors.push("Title must be less than 200 characters");
    }

    return errors;
  },

  /**
   * Validate description
   */
  validateDescription: (description) => {
    const errors = [];

    if (description && description.length > 2000) {
      errors.push("Description must be less than 2000 characters");
    }

    return errors;
  },

  /**
   * Validate date range
   */
  validateDateRange: (startDate, endDate) => {
    const errors = [];

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (end <= start) {
        errors.push("End date must be after start date");
      }

      // Check if dates are reasonable (not too far in the past or future)
      const now = new Date();
      const maxPastDate = new Date(now.getFullYear() - 10, 0, 1);
      const maxFutureDate = new Date(now.getFullYear() + 10, 11, 31);

      if (start < maxPastDate) {
        errors.push("Start date cannot be more than 10 years in the past");
      }

      if (end > maxFutureDate) {
        errors.push("End date cannot be more than 10 years in the future");
      }
    }

    return errors;
  },

  /**
   * Validate progress value
   */
  validateProgress: (progress) => {
    const errors = [];

    if (progress !== null && progress !== undefined) {
      if (typeof progress !== "number") {
        errors.push("Progress must be a number");
      } else if (progress < 0 || progress > 100) {
        errors.push("Progress must be between 0 and 100");
      }
    }

    return errors;
  },

  /**
   * Validate time estimation
   */
  validateTimeEstimation: (estimatedHours, actualHours) => {
    const errors = [];

    if (estimatedHours !== null && estimatedHours !== undefined) {
      if (typeof estimatedHours !== "number" || estimatedHours < 0) {
        errors.push("Estimated hours must be a positive number");
      } else if (estimatedHours > 10000) {
        errors.push("Estimated hours seems unreasonably large");
      }
    }

    if (actualHours !== null && actualHours !== undefined) {
      if (typeof actualHours !== "number" || actualHours < 0) {
        errors.push("Actual hours must be a positive number");
      } else if (actualHours > 10000) {
        errors.push("Actual hours seems unreasonably large");
      }
    }

    return errors;
  },

  /**
   * Validate tags array
   */
  validateTags: (tags) => {
    const errors = [];

    if (tags && Array.isArray(tags)) {
      if (tags.length > 20) {
        errors.push("Maximum 20 tags allowed");
      }

      tags.forEach((tag, index) => {
        if (typeof tag !== "string") {
          errors.push(`Tag ${index + 1} must be a string`);
        } else if (tag.length > 50) {
          errors.push(`Tag "${tag}" is too long (max 50 characters)`);
        } else if (tag.length === 0) {
          errors.push("Empty tags are not allowed");
        }
      });

      // Check for duplicate tags
      const uniqueTags = new Set(tags.map((tag) => tag.toLowerCase()));
      if (uniqueTags.size !== tags.length) {
        errors.push("Duplicate tags are not allowed");
      }
    }

    return errors;
  },

  /**
   * Validate email format
   */
  validateEmail: (email) => {
    const errors = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email && !emailRegex.test(email)) {
      errors.push("Please enter a valid email address");
    }

    return errors;
  },

  /**
   * Validate URL format
   */
  validateUrl: (url) => {
    const errors = [];

    if (url) {
      try {
        new URL(url);
      } catch {
        errors.push("Please enter a valid URL");
      }
    }

    return errors;
  },

  /**
   * Validate frequency for habits (daily, weekly, etc.)
   */
  validateFrequency: (frequency) => {
    const errors = [];

    if (frequency !== null && frequency !== undefined) {
      if (typeof frequency !== "number" || frequency <= 0 || frequency > 10) {
        errors.push("Frequency must be a number between 1 and 10");
      }
    }

    return errors;
  },

  /**
   * Validate goal object completely
   */
  validateGoal: (goal) => {
    const allErrors = [];

    // Validate individual fields
    allErrors.push(...validators.validateTitle(goal.title));
    allErrors.push(...validators.validateDescription(goal.description));
    allErrors.push(
      ...validators.validateDateRange(goal.startDate, goal.targetDate)
    );
    allErrors.push(...validators.validateProgress(goal.progress));
    allErrors.push(...validators.validateTags(goal.tags));

    // Validate type-specific requirements
    if (goal.type === "habit" && goal.targetFrequency) {
      allErrors.push(...validators.validateFrequency(goal.targetFrequency));
    }

    // Validate links if present
    if (goal.links && Array.isArray(goal.links)) {
      goal.links.forEach((link, index) => {
        const urlErrors = validators.validateUrl(link);
        if (urlErrors.length > 0) {
          allErrors.push(`Link ${index + 1}: ${urlErrors[0]}`);
        }
      });
    }

    return allErrors;
  },

  /**
   * Validate task object completely
   */
  validateTask: (task) => {
    const allErrors = [];

    allErrors.push(...validators.validateTitle(task.title));
    allErrors.push(...validators.validateDescription(task.description));
    allErrors.push(
      ...validators.validateTimeEstimation(
        task.estimatedHours,
        task.actualHours
      )
    );
    allErrors.push(...validators.validateTags(task.tags));

    // Validate due date is not in the past (unless task is completed)
    if (task.dueDate && !task.completed) {
      const dueDate = new Date(task.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (dueDate < today) {
        allErrors.push(
          "Due date should not be in the past for incomplete tasks"
        );
      }
    }

    return allErrors;
  },

  /**
   * Validate module object for skills
   */
  validateModule: (module) => {
    const allErrors = [];

    allErrors.push(...validators.validateTitle(module.title));
    allErrors.push(...validators.validateDescription(module.description));
    allErrors.push(...validators.validateProgress(module.progress));

    // Validate resources if present
    if (module.resources && Array.isArray(module.resources)) {
      module.resources.forEach((resource, index) => {
        if (resource.url) {
          const urlErrors = validators.validateUrl(resource.url);
          if (urlErrors.length > 0) {
            allErrors.push(`Resource ${index + 1}: ${urlErrors[0]}`);
          }
        }

        if (!resource.title || resource.title.trim().length === 0) {
          allErrors.push(`Resource ${index + 1}: Title is required`);
        }
      });
    }

    return allErrors;
  },
};

/**
 * Sanitization utilities
 */
export const sanitizers = {
  /**
   * Sanitize text input
   */
  sanitizeText: (text) => {
    if (!text) return "";
    return text.trim().replace(/\s+/g, " ");
  },

  /**
   * Sanitize and normalize tags
   */
  sanitizeTags: (tags) => {
    if (!Array.isArray(tags)) return [];

    return tags
      .map((tag) => sanitizers.sanitizeText(tag))
      .filter((tag) => tag.length > 0)
      .map((tag) => tag.toLowerCase())
      .filter((tag, index, array) => array.indexOf(tag) === index) // Remove duplicates
      .slice(0, 20); // Limit to 20 tags
  },

  /**
   * Sanitize URL
   */
  sanitizeUrl: (url) => {
    if (!url) return "";

    const trimmed = url.trim();

    // Add https:// if no protocol specified
    if (
      trimmed &&
      !trimmed.startsWith("http://") &&
      !trimmed.startsWith("https://")
    ) {
      return `https://${trimmed}`;
    }

    return trimmed;
  },

  /**
   * Sanitize numeric input
   */
  sanitizeNumber: (value, min = null, max = null) => {
    const num = parseFloat(value);

    if (isNaN(num)) return null;

    if (min !== null && num < min) return min;
    if (max !== null && num > max) return max;

    return num;
  },

  /**
   * Sanitize date input
   */
  sanitizeDate: (dateString) => {
    if (!dateString) return null;

    const date = new Date(dateString);

    if (isNaN(date.getTime())) return null;

    return date.toISOString().split("T")[0];
  },
};

/**
 * Form state utilities
 */
export const formUtils = {
  /**
   * Get validation errors for a form field
   */
  getFieldErrors: (fieldName, value, validationRules = {}) => {
    const errors = [];

    // Required field validation
    if (
      validationRules.required &&
      (!value || value.toString().trim().length === 0)
    ) {
      errors.push(`${fieldName} is required`);
      return errors; // Return early if required field is empty
    }

    // Skip other validations if field is empty but not required
    if (!value || value.toString().trim().length === 0) {
      return errors;
    }

    // Length validations
    if (validationRules.minLength && value.length < validationRules.minLength) {
      errors.push(
        `${fieldName} must be at least ${validationRules.minLength} characters`
      );
    }

    if (validationRules.maxLength && value.length > validationRules.maxLength) {
      errors.push(
        `${fieldName} must be less than ${validationRules.maxLength} characters`
      );
    }

    // Numeric validations
    if (validationRules.min !== undefined) {
      const num = parseFloat(value);
      if (!isNaN(num) && num < validationRules.min) {
        errors.push(`${fieldName} must be at least ${validationRules.min}`);
      }
    }

    if (validationRules.max !== undefined) {
      const num = parseFloat(value);
      if (!isNaN(num) && num > validationRules.max) {
        errors.push(`${fieldName} must be no more than ${validationRules.max}`);
      }
    }

    // Pattern validation
    if (validationRules.pattern && !validationRules.pattern.test(value)) {
      errors.push(
        validationRules.patternMessage || `${fieldName} format is invalid`
      );
    }

    // Custom validation function
    if (
      validationRules.custom &&
      typeof validationRules.custom === "function"
    ) {
      const customErrors = validationRules.custom(value);
      if (Array.isArray(customErrors)) {
        errors.push(...customErrors);
      } else if (typeof customErrors === "string") {
        errors.push(customErrors);
      }
    }

    return errors;
  },

  /**
   * Validate entire form
   */
  validateForm: (formData, validationSchema) => {
    const errors = {};

    Object.keys(validationSchema).forEach((fieldName) => {
      const fieldErrors = formUtils.getFieldErrors(
        fieldName,
        formData[fieldName],
        validationSchema[fieldName]
      );

      if (fieldErrors.length > 0) {
        errors[fieldName] = fieldErrors;
      }
    });

    return errors;
  },

  /**
   * Check if form has any errors
   */
  hasErrors: (errors) => {
    return Object.keys(errors).some((key) =>
      Array.isArray(errors[key]) ? errors[key].length > 0 : !!errors[key]
    );
  },

  /**
   * Get first error message for a field
   */
  getFirstError: (errors, fieldName) => {
    const fieldErrors = errors[fieldName];
    if (Array.isArray(fieldErrors) && fieldErrors.length > 0) {
      return fieldErrors[0];
    }
    return null;
  },
};

export default {
  validators,
  sanitizers,
  formUtils,
};
