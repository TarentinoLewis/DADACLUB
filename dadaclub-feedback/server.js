import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';

const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('public', {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache');
    } else {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
  }
}));
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
