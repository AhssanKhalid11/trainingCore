const db = require("./database");

const exercises = [
  { name: "Push Ups", muscle_group: "Chest", difficulty: "Beginner" },
  { name: "Bench Press", muscle_group: "Chest", difficulty: "Intermediate" },
  { name: "Squats", muscle_group: "Legs", difficulty: "Beginner" },
  { name: "Deadlifts", muscle_group: "Back", difficulty: "Advanced" },
  { name: "Pull Ups", muscle_group: "Back", difficulty: "Intermediate" },
  { name: "Bicep Curls", muscle_group: "Arms", difficulty: "Beginner" },
  { name: "Tricep Dips", muscle_group: "Arms", difficulty: "Intermediate" },
  { name: "Plank", muscle_group: "Core", difficulty: "Beginner" },
  { name: "Lunges", muscle_group: "Legs", difficulty: "Beginner" },
  {
    name: "Shoulder Press",
    muscle_group: "Shoulders",
    difficulty: "Intermediate",
  },
  { name: "Lat Pulldown", muscle_group: "Back", difficulty: "Beginner" },
  { name: "Leg Press", muscle_group: "Legs", difficulty: "Intermediate" },
];

const insertStatement = db.prepare(
  "INSERT INTO exercises (name, muscle_group, difficulty) VALUES (?, ?, ?)",
);

exercises.forEach((exercise) => {
  insertStatement.run(
    exercise.name,
    exercise.muscle_group,
    exercise.difficulty,
  );
});

insertStatement.finalize(() => {
  console.log("Exercises seeded successfully");
  db.close();
});
