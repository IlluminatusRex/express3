const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const multer = require('multer');
const router = express.Router();
const cors = require('cors');
const shortid = require('shortid');
const app = express();

app.engine('.hbs', hbs());
app.set('view engine', '.hbs');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({
  "origin": "https://kodilla.com", //origin sets domains that we approve
  "methods": "GET,POST", //we allow only GET and POST methods
}));

const db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
];

app.get('/testimonials', (req, res) => {
  res.send(db);
});

app.get('/testimonials/random', (req, res) => {
  res.send(db[Math.floor(Math.random() * db.length)]);
});

app.get('/testimonials/:id', (req, res) => {
  const idSelect = db.find((item) => item.id === parseInt(req.params.id));
  if (idSelect) {
    res.send(idSelect);
  } else {
    res.status(404).send({ message: 'Not found...' });
  }
});

app.post('/testimonials', (req, res) => {
  const id = shortid();
  const { author, text } = req.body;
  db.push({ id, author, text });
  res.send({ message: 'ok' });
});

app.put('/testimonials/:id', (req, res) => {
  const idSelect = db.find((item) => item.id === parseInt(req.params.id));
  if (idSelect !== undefined) {
    const { author, text } = req.body;
    idSelect.author = author;
    idSelect.text = text;
    
    res.send({ message: 'ok' });
  } else {
    res.status(404).send({ message: 'Not found...' });
  }
});

app.delete('/testimonials/:id', (req, res) => {
  const idSelect = db.findIndex((item) => item.id === parseInt(req.params.id));
  if (idSelect !== -1) {
    db.splice(idSelect, 1);
    res.send({ message: 'ok' });
  } else {
    res.status(404).send({ message: 'Not found...' });
  }
});


app.use((req, res) => {
  res.status(404).send('404 not found...');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
