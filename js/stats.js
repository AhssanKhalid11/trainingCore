const API_URL = "http://localhost:3000";

async function getWorkouts() {
  const response = await fetch(`${API_URL}/workouts`);
  const data = await response.json();
  return data;
}

function calculateTotals(workouts) {
  const totalWorkouts = workouts.length;

  let totalSets = 0;
  let totalReps = 0;

  workouts.forEach((workout) => {
    totalSets += Number(workout.sets);
    totalReps += Number(workout.sets) * Number(workout.reps);
  });

  return { totalWorkouts, totalSets, totalReps };
}

async function renderStatsSummary() {
  const workouts = await getWorkouts();
  const totals = calculateTotals(workouts);

  document.getElementById("total-workouts-value").textContent =
    totals.totalWorkouts;
  document.getElementById("total-sets-value").textContent = totals.totalSets;
  document.getElementById("total-reps-value").textContent = totals.totalReps;
}

renderStatsSummary();
