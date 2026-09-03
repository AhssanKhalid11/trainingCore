const express = require("express");
const cors = require("cors");
const db = require("./database");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Training Core API is running");
});

app.get("/workouts", (req, res) => {
  db.all("SELECT * FROM workouts ORDER BY id DESC", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post("/workouts", (req, res) => {
  const { name, sets, reps, weight } = req.body;
  const dateLogged = new Date().toISOString();

  db.run(
    "INSERT INTO workouts (name, sets, reps, weight, date_logged) VALUES (?, ?, ?, ?, ?)",
    [name, sets, reps, weight, dateLogged],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res
        .status(201)
        .json({ id: this.lastID, name, sets, reps, weight, dateLogged });
    },
  );
});

app.put("/workouts/:id", (req, res) => {
  const { id } = req.params;
  const { name, sets, reps, weight } = req.body;

  db.run(
    "UPDATE workouts SET name = ?, sets = ?, reps = ?, weight = ? WHERE id = ?",
    [name, sets, reps, weight, id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id, name, sets, reps, weight });
    },
  );
});

app.delete("/workouts/:id", (req, res) => {
  const { id } = req.params;

  db.run("DELETE FROM workouts WHERE id = ?", [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: "Workout deleted", id });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
