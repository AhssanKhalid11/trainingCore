const API_URL = "http://localhost:3000";

const workoutForm = document.getElementById("workout-form");
const workoutList = document.getElementById("workout-list");
const apiErrorBanner = document.getElementById("api-error-banner");

const exerciseNameInput = document.getElementById("exercise-name");
const exerciseSetsInput = document.getElementById("exercise-sets");
const exerciseRepsInput = document.getElementById("exercise-reps");
const exerciseWeightInput = document.getElementById("exercise-weight");

const randomWorkoutBtn = document.getElementById("random-workout-btn");
const randomWorkoutList = document.getElementById("random-workout-list");

let editingWorkoutId = null;

function showApiError() {
  apiErrorBanner.hidden = false;
}

function hideApiError() {
  apiErrorBanner.hidden = true;
}

async function getWorkouts() {
  try {
    const response = await fetch(`${API_URL}/workouts`);

    if (!response.ok) {
      throw new Error("Failed to fetch workouts");
    }

    hideApiError();
    return await response.json();
  } catch (error) {
    showApiError();
    return [];
  }
}

async function createWorkout(workout) {
  try {
    const response = await fetch(`${API_URL}/workouts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(workout),
    });

    if (!response.ok) {
      throw new Error("Failed to create workout");
    }

    hideApiError();
    return true;
  } catch (error) {
    showApiError();
    return false;
  }
}

async function updateWorkout(id, workout) {
  try {
    const response = await fetch(`${API_URL}/workouts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(workout),
    });

    if (!response.ok) {
      throw new Error("Failed to update workout");
    }

    hideApiError();
    return true;
  } catch (error) {
    showApiError();
    return false;
  }
}

async function deleteWorkout(id) {
  try {
    const response = await fetch(`${API_URL}/workouts/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete workout");
    }

    hideApiError();
    return true;
  } catch (error) {
    showApiError();
    return false;
  }
}

async function getRandomExercises() {
  try {
    const response = await fetch(`${API_URL}/exercises/random?count=5`);

    if (!response.ok) {
      throw new Error("Failed to fetch random exercises");
    }

    hideApiError();
    return await response.json();
  } catch (error) {
    showApiError();
    return [];
  }
}

async function renderWorkouts() {
  const workouts = await getWorkouts();
  workoutList.innerHTML = "";

  workouts.forEach((workout) => {
    const listItem = document.createElement("li");
    listItem.classList.add("workout-card");
    listItem.setAttribute("data-id", workout.id);

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("workout-card-info");

    const nameEl = document.createElement("span");
    nameEl.classList.add("workout-card-name");
    nameEl.textContent = workout.name;

    const detailsEl = document.createElement("span");
    detailsEl.classList.add("workout-card-details");
    detailsEl.textContent = `${workout.sets} sets x ${workout.reps} reps${workout.weight ? " @ " + workout.weight + "kg" : ""}`;

    infoDiv.appendChild(nameEl);
    infoDiv.appendChild(detailsEl);

    const actionsDiv = document.createElement("div");
    actionsDiv.classList.add("workout-card-actions");

    const editBtn = document.createElement("button");
    editBtn.classList.add("workout-card-btn", "workout-card-edit-btn");
    editBtn.textContent = "Edit";
    editBtn.setAttribute("data-action", "edit");

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("workout-card-btn", "workout-card-delete-btn");
    deleteBtn.textContent = "Delete";
    deleteBtn.setAttribute("data-action", "delete");

    actionsDiv.appendChild(editBtn);
    actionsDiv.appendChild(deleteBtn);

    listItem.appendChild(infoDiv);
    listItem.appendChild(actionsDiv);

    workoutList.appendChild(listItem);
  });
}

async function renderRandomWorkout() {
  const exercises = await getRandomExercises();
  randomWorkoutList.innerHTML = "";

  exercises.forEach((exercise) => {
    const listItem = document.createElement("li");
    listItem.classList.add("random-workout-item");

    const nameEl = document.createElement("div");
    nameEl.classList.add("random-workout-item-name");
    nameEl.textContent = exercise.name;

    const detailsEl = document.createElement("div");
    detailsEl.classList.add("random-workout-item-details");
    detailsEl.textContent = `${exercise.muscle_group} - ${exercise.difficulty}`;

    listItem.appendChild(nameEl);
    listItem.appendChild(detailsEl);

    randomWorkoutList.appendChild(listItem);
  });
}

async function handleFormSubmit(event) {
  event.preventDefault();

  const isNameValid = validateExerciseName(exerciseNameInput);
  const isSetsValid = validateSets(exerciseSetsInput);
  const isRepsValid = validateReps(exerciseRepsInput);
  const isWeightValid = validateWeight(exerciseWeightInput);

  if (!isNameValid || !isSetsValid || !isRepsValid || !isWeightValid) {
    return;
  }

  const workoutData = {
    name: exerciseNameInput.value.trim(),
    sets: exerciseSetsInput.value,
    reps: exerciseRepsInput.value,
    weight: exerciseWeightInput.value,
  };

  let success;

  if (editingWorkoutId) {
    success = await updateWorkout(editingWorkoutId, workoutData);
    editingWorkoutId = null;
    workoutForm.querySelector(".form-submit-btn").textContent = "Add Workout";
  } else {
    success = await createWorkout(workoutData);
  }

  if (success) {
    await renderWorkouts();
    workoutForm.reset();
  }
}

async function handleListClick(event) {
  const action = event.target.getAttribute("data-action");
  if (!action) return;

  const listItem = event.target.closest(".workout-card");
  const workoutId = listItem.getAttribute("data-id");

  if (action === "delete") {
    const success = await deleteWorkout(workoutId);
    if (success) {
      await renderWorkouts();
    }
  }

  if (action === "edit") {
    const workouts = await getWorkouts();
    const workoutToEdit = workouts.find((w) => w.id == workoutId);

    if (!workoutToEdit) return;

    exerciseNameInput.value = workoutToEdit.name;
    exerciseSetsInput.value = workoutToEdit.sets;
    exerciseRepsInput.value = workoutToEdit.reps;
    exerciseWeightInput.value = workoutToEdit.weight;

    editingWorkoutId = workoutId;
    workoutForm.querySelector(".form-submit-btn").textContent =
      "Update Workout";
  }
}

workoutForm.addEventListener("submit", handleFormSubmit);
workoutList.addEventListener("click", handleListClick);
randomWorkoutBtn.addEventListener("click", renderRandomWorkout);

renderWorkouts();
