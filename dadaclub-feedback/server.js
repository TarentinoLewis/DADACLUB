// server.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Setup für ES Modules (__dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Sicherheitsheader & Performance-Header
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Content-Security-Policy', "default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com;");
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=()');
  next();
});

// CORS aktivieren
app.use(cors());

// JSON-Body-Parser
app.use(bodyParser.json());

// Statische Dateien ausliefern
app.use(express.static(path.join(__dirname, 'public'), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache');
    } else {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
  }
}));

// Feedback POST-Route
app.post('/feedback', (req, res) => {
  const { name, message } = req.body;
  const feedback = { name, message, date: new Date().toISOString() };
  const feedbackFile = path.join(__dirname, 'feedback.json');

  fs.readFile(feedbackFile, 'utf8', (err, data) => {
    const feedbacks = data ? JSON.parse(data) : [];
    feedbacks.push(feedback);

    fs.writeFile(feedbackFile, JSON.stringify(feedbacks, null, 2), err => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Fehler beim Speichern' });
      }
      res.json({ message: 'Danke für dein Feedback!' });
    });
  });
});

// Server starten
app.listen(PORT, () => {
  console.log(`✅ Server läuft auf http://localhost:${PORT}`);
});
