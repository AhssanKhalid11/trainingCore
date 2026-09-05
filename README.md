# Training Core

A full-stack workout tracking web app. Log workouts, generate random exercise
suggestions, track progress with charts, and unlock achievements as you hit
rep milestones for each exercise.

## Features

- Create, read, update, and delete workout entries via a REST API
- Random workout generator pulling from a seeded exercise database
- Progress chart visualizing total reps logged over time (Chart.js)
- Per-exercise achievement badges (unlocked at 50, 100, 250, 500 reps)
- Dark mode with persisted user preference (localStorage)
- Client-side form validation with inline, accessible error messages
- Responsive layout (desktop, tablet, mobile breakpoints)
- Accessibility: skip link, ARIA labels, aria-current, aria-invalid, live error alerts
- Unit tests for form validation logic (Jest)

## Tech Stack

**Frontend:** HTML, CSS, JavaScript (vanilla, DOM APIs, fetch)
**Backend:** Node.js, Express
**Database:** SQLite
**Charting:** Chart.js
**Testing:** Jest, jest-environment-jsdom

## Project Structure

trainingcore/
├── index.html
├── workouts.html
├── stats.html
├── css/
│ ├── reset.css
│ └── style.css
├── js/
│ ├── main.js
│ ├── validation.js
│ ├── validation.test.js
│ ├── workouts.js
│ └── stats.js
├── server/
│ ├── index.js
│ ├── database.js
│ └── seed.js
├── package.json
├── jest.config.js
└── README.md

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

**4. Run tests:**

```bash
npm test
```

## API Endpoints

| Method | Route             | Description                   |
| ------ | ----------------- | ----------------------------- |
| GET    | /workouts         | Get all logged workouts       |
| POST   | /workouts         | Create a new workout          |
| PUT    | /workouts/:id     | Update an existing workout    |
| DELETE | /workouts/:id     | Delete a workout              |
| GET    | /exercises        | Get all seeded exercises      |
| GET    | /exercises/random | Get a random set of exercises |

## Known Limitations

- No user authentication — all data is shared, not per-user
- SQLite database is local only (not yet deployed with persistent storage)
- Frontend does not yet handle API/network errors gracefully
