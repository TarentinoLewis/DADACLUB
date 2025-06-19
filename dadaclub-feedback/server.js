const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const feedbackFile = "feedback.json";

// POST /feedback – Nachricht speichern
app.post("/feedback", (req, res) => {
  const { name, message } = req.body;

  if (!name || !message) {
    return res.status(400).json({ message: "Name und Nachricht erforderlich." });
  }

  const feedback = { name, message, date: new Date().toISOString() };

  let data = [];
  if (fs.existsSync(feedbackFile)) {
    data = JSON.parse(fs.readFileSync(feedbackFile));
  }

  data.push(feedback);
  fs.writeFileSync(feedbackFile, JSON.stringify(data, null, 2));

  res.json({ message: "Vielen Dank für dein Feedback!" });
});

// GET /feedback – Alle Nachrichten anzeigen
app.get("/feedback", (req, res) => {
  if (fs.existsSync(feedbackFile)) {
    const data = JSON.parse(fs.readFileSync(feedbackFile));
    res.json(data);
  } else {
    res.json([]);
  }
});

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});

