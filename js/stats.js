function getWorkouts() {
  const data = localStorage.getItem("workouts");
  return data ? JSON.parse(data) : [];
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

function renderStatsSummary() {
  const workouts = getWorkouts();
  const totals = calculateTotals(workouts);

  document.getElementById("total-workouts-value").textContent =
    totals.totalWorkouts;
  document.getElementById("total-sets-value").textContent = totals.totalSets;
  document.getElementById("total-reps-value").textContent = totals.totalReps;
}

renderStatsSummary();
