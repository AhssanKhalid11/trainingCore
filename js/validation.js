function showError(inputElement, errorElementId, message) {
  const errorElement = document.getElementById(errorElementId);
  errorElement.textContent = message;
  inputElement.classList.add("form-input--invalid");
}

function clearError(inputElement, errorElementId) {
  const errorElement = document.getElementById(errorElementId);
  errorElement.textContent = "";
  inputElement.classList.remove("form-input--invalid");
}

function validateExerciseName(inputElement) {
  const value = inputElement.value.trim();

  if (value === "") {
    showError(
      inputElement,
      "exercise-name-error",
      "Exercise name is required.",
    );
    return false;
  }

  if (value.length < 2) {
    showError(
      inputElement,
      "exercise-name-error",
      "Name must be at least 2 characters.",
    );
    return false;
  }

  clearError(inputElement, "exercise-name-error");
  return true;
}

function validateSets(inputElement) {
  const value = Number(inputElement.value);

  if (inputElement.value.trim() === "" || value < 1) {
    showError(inputElement, "exercise-sets-error", "Sets must be at least 1.");
    return false;
  }

  clearError(inputElement, "exercise-sets-error");
  return true;
}

function validateReps(inputElement) {
  const value = Number(inputElement.value);

  if (inputElement.value.trim() === "" || value < 1) {
    showError(inputElement, "exercise-reps-error", "Reps must be at least 1.");
    return false;
  }

  clearError(inputElement, "exercise-reps-error");
  return true;
}

function validateWeight(inputElement) {
  const value = Number(inputElement.value);

  if (inputElement.value.trim() !== "" && value < 0) {
    showError(
      inputElement,
      "exercise-weight-error",
      "Weight cannot be negative.",
    );
    return false;
  }

  clearError(inputElement, "exercise-weight-error");
  return true;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    validateExerciseName,
    validateSets,
    validateReps,
    validateWeight,
  };
}
