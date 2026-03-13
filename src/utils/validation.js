/**
 * Validation utilities for the Construction Field Management App.
 */

// ── Login Validation ──────────────────────────────────────────────────────────
export function validateLoginForm({ email, password }) {
  const errors = {};

  if (!email.trim()) {
    errors.email = "Email address is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!password) {
    errors.password = "Password is required.";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
  }

  return errors;
}

// ── DPR Form Validation ───────────────────────────────────────────────────────
export function validateDPRForm({ projectId, date, weather, description, workerCount, photos }) {
  const errors = {};

  if (!projectId) {
    errors.projectId = "Please select a project.";
  }

  if (!date) {
    errors.date = "Date is required.";
  }

  if (!weather) {
    errors.weather = "Please select the weather condition.";
  }

  if (!description || description.trim().length < 10) {
    errors.description = "Work description must be at least 10 characters.";
  }

  const count = parseInt(workerCount, 10);
  if (!workerCount && workerCount !== 0) {
    errors.workerCount = "Worker count is required.";
  } else if (isNaN(count) || count <= 0) {
    errors.workerCount = "Worker count must be greater than 0.";
  }

  if (photos && photos.length > 3) {
    errors.photos = "You can upload a maximum of 3 photos.";
  }

  return errors;
}

/**
 * Returns true if the errors object has no keys.
 */
export function isFormValid(errors) {
  return Object.keys(errors).length === 0;
}
