# Training Core

A full-stack workout tracking web app. Log workouts, generate random exercise
suggestions, track progress with charts, and unlock achievements as you hit
rep milestones for each exercise.

## Features

- Create, read, update, and delete workout entries
- Random workout generator pulling from a seeded exercise database
- Progress chart visualizing total reps logged over time
- Per-exercise achievement badges (unlocked at 50, 100, 250, 500 reps)
- Dark mode with persisted user preference
- Client-side form validation with inline error messages

## Tech Stack

**Frontend:** HTML, CSS, JavaScript (vanilla, DOM APIs, fetch)
**Backend:** Node.js, Express
**Database:** SQLite
**Charting:** Chart.js

## Project Structure

trainingcore/
├── index.html
├── workouts.html
├── stats.html
├── css/
├── js/
└── server/
├── index.js
├── database.js
└── seed.js

## Running Locally

**1. Start the backend:**

```bash
cd server
npm install
node index.js
```

**2. Seed the exercises table (first time only):**

```bash
node seed.js
```

**3. Open the frontend:**
Open `index.html`, `workouts.html`, or `stats.html` using a local server
(e.g. VS Code Live Server extension) — opening the file directly will not
work since the frontend makes API requests to `http://localhost:3000`.

## API Endpoints

| Method | Route             | Description                   |
| ------ | ----------------- | ----------------------------- |
| GET    | /workouts         | Get all logged workouts       |
| POST   | /workouts         | Create a new workout          |
| PUT    | /workouts/:id     | Update an existing workout    |
| DELETE | /workouts/:id     | Delete a workout              |
| GET    | /exercises        | Get all seeded exercises      |
| GET    | /exercises/random | Get a random set of exercises |
