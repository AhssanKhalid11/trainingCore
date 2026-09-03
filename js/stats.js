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

  renderProgressChart(workouts);
}

function renderProgressChart(workouts) {
  const sortedWorkouts = [...workouts].reverse();

  const labels = sortedWorkouts.map((workout) => {
    const date = new Date(workout.date_logged);
    return date.toLocaleDateString();
  });

  const repsData = sortedWorkouts.map(
    (workout) => Number(workout.sets) * Number(workout.reps),
  );

  const canvas = document.getElementById("progress-chart");

  new Chart(canvas, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Total Reps per Workout",
          data: repsData,
          borderColor: "#7c5cfc",
          backgroundColor: "rgba(124, 92, 252, 0.15)",
          fill: true,
          tension: 0.3,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

renderStatsSummary();
