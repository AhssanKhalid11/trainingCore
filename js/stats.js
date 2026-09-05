const API_URL = "http://localhost:3000";

const ACHIEVEMENT_MILESTONES = [50, 100, 250, 500];

const apiErrorBanner = document.getElementById("api-error-banner");

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

function calculateRepsPerExercise(workouts) {
  const repsPerExercise = {};

  workouts.forEach((workout) => {
    const exerciseName = workout.name.trim().toLowerCase();
    const totalRepsForThisEntry = Number(workout.sets) * Number(workout.reps);

    if (!repsPerExercise[exerciseName]) {
      repsPerExercise[exerciseName] = 0;
    }

    repsPerExercise[exerciseName] += totalRepsForThisEntry;
  });

  return repsPerExercise;
}

function buildAchievementsList(repsPerExercise) {
  const achievements = [];

  Object.keys(repsPerExercise).forEach((exerciseName) => {
    const totalReps = repsPerExercise[exerciseName];

    ACHIEVEMENT_MILESTONES.forEach((milestone) => {
      achievements.push({
        exerciseName: exerciseName,
        milestone: milestone,
        totalReps: totalReps,
        unlocked: totalReps >= milestone,
      });
    });
  });

  return achievements;
}

function renderAchievements(achievements) {
  const achievementsGrid = document.getElementById("achievements-grid");
  achievementsGrid.innerHTML = "";

  achievements.forEach((achievement) => {
    const card = document.createElement("div");
    card.classList.add("achievement-card");

    const statusText = achievement.unlocked
      ? "Unlocked"
      : `Locked, ${achievement.totalReps} of ${achievement.milestone} reps completed`;

    card.setAttribute(
      "aria-label",
      `${achievement.milestone} ${achievement.exerciseName} achievement. ${statusText}`,
    );

    if (achievement.unlocked) {
      card.classList.add("achievement-card--unlocked");
    }

    const icon = document.createElement("div");
    icon.classList.add("achievement-card-icon");
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = achievement.unlocked ? "🏆" : "🔒";

    const title = document.createElement("div");
    title.classList.add("achievement-card-title");
    title.textContent = `${achievement.milestone} ${achievement.exerciseName}`;

    const description = document.createElement("div");
    description.classList.add("achievement-card-description");
    description.textContent = achievement.unlocked
      ? "Unlocked"
      : `${achievement.totalReps} / ${achievement.milestone} reps`;

    card.appendChild(icon);
    card.appendChild(title);
    card.appendChild(description);

    achievementsGrid.appendChild(card);
  });
}

let progressChartInstance = null;

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

  if (progressChartInstance) {
    progressChartInstance.destroy();
  }

  progressChartInstance = new Chart(canvas, {
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

async function renderStatsSummary() {
  const workouts = await getWorkouts();
  const totals = calculateTotals(workouts);

  document.getElementById("total-workouts-value").textContent =
    totals.totalWorkouts;
  document.getElementById("total-sets-value").textContent = totals.totalSets;
  document.getElementById("total-reps-value").textContent = totals.totalReps;

  renderProgressChart(workouts);

  const repsPerExercise = calculateRepsPerExercise(workouts);
  const achievements = buildAchievementsList(repsPerExercise);
  renderAchievements(achievements);
}

renderStatsSummary();
