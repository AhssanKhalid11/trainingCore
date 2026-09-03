const workoutForm = document.getElementById("workout-form");
const workoutList = document.getElementById("workout-list");

const exerciseNameInput = document.getElementById("exercise-name");
const exerciseSetsInput = document.getElementById("exercise-sets");
const exerciseRepsInput = document.getElementById("exercise-reps");
const exerciseWeightInput = document.getElementById("exercise-weight");

let editingWorkoutId = null;

function getWorkouts() {
  const data = localStorage.getItem("workouts");
  return data ? JSON.parse(data) : [];
}

function saveWorkouts(workouts) {
  localStorage.setItem("workouts", JSON.stringify(workouts));
}

function renderWorkouts() {
  const workouts = getWorkouts();
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

function handleFormSubmit(event) {
  event.preventDefault();

  const isNameValid = validateExerciseName(exerciseNameInput);
  const isSetsValid = validateSets(exerciseSetsInput);
  const isRepsValid = validateReps(exerciseRepsInput);
  const isWeightValid = validateWeight(exerciseWeightInput);

  if (!isNameValid || !isSetsValid || !isRepsValid || !isWeightValid) {
    return;
  }

  const workouts = getWorkouts();

  if (editingWorkoutId) {
    const workoutToUpdate = workouts.find((w) => w.id === editingWorkoutId);
    workoutToUpdate.name = exerciseNameInput.value.trim();
    workoutToUpdate.sets = exerciseSetsInput.value;
    workoutToUpdate.reps = exerciseRepsInput.value;
    workoutToUpdate.weight = exerciseWeightInput.value;

    editingWorkoutId = null;
    workoutForm.querySelector(".form-submit-btn").textContent = "Add Workout";
  } else {
    const newWorkout = {
      id: Date.now().toString(),
      name: exerciseNameInput.value.trim(),
      sets: exerciseSetsInput.value,
      reps: exerciseRepsInput.value,
      weight: exerciseWeightInput.value,
    };

    workouts.push(newWorkout);
  }

  saveWorkouts(workouts);
  renderWorkouts();
  workoutForm.reset();
}

function handleListClick(event) {
  const action = event.target.getAttribute("data-action");
  if (!action) return;

  const listItem = event.target.closest(".workout-card");
  const workoutId = listItem.getAttribute("data-id");
  const workouts = getWorkouts();

  if (action === "delete") {
    const updatedWorkouts = workouts.filter((w) => w.id !== workoutId);
    saveWorkouts(updatedWorkouts);
    renderWorkouts();
  }

  if (action === "edit") {
    const workoutToEdit = workouts.find((w) => w.id === workoutId);

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

renderWorkouts();
