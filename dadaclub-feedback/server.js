import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/feedback', (req, res) => {
  const { name, message } = req.body;
  const feedback = { name, message, date: new Date().toISOString() };

  fs.readFile('feedback.json', 'utf8', (err, data) => {
    const feedbacks = data ? JSON.parse(data) : [];
    feedbacks.push(feedback);

    fs.writeFile('feedback.json', JSON.stringify(feedbacks, null, 2), err => {
      if (err) return res.status(500).json({ message: 'Fehler beim Speichern' });
      res.json({ message: 'Danke für dein Feedback!' });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
