const express = require('express');
const router = express.Router();
const db = require('./../db');

router.route('/').get((req, res) => {
  res.send(db.testimonials);
});

router.route('/random').get((req, res) => {
  const randomID = db.testimonials[Math.floor(Math.random() * db.testimonials.length)];
  res.send(randomID);
});

router.route('/').post((req, res) => {
  const id = shortid();
  const { author, text } = req.body;
  db.testimonials.push({ id, author, text });
  res.send({ message: 'ok' });
});

router.route('/:id').get((req, res) => {
  const idSelect = db.testimonials.find((item) => item.id === req.params.id);
  if (idSelect) {
    res.send(idSelect);
  } else {
    res.status(404).send({ message: 'Not found...' });
  }
});

router.route('/:id').put((req, res) => {
  const idSelect = db.testimonials.find((item) => item.id === req.params.id);
  if (idSelect) {
    const { author, text } = req.body;
    idSelect.author = author || idSelect.author;
    idSelect.text = text || idSelect.text;
    res.send({ message: 'ok' });
  } else {
    res.status(404).send({ message: 'Not found...' });
  }
});

router.route('/:id').delete((req, res) => {
  const idSelect = db.testimonials.findIndex((item) => item.id === req.params.id);
  console.log(idSelect);
  if (idSelect || idSelect === 0) {
    db.testimonials.splice(idSelect, 1);
    res.send({ message: 'ok' });
  } else {
    res.status(404).send({ message: 'Not found...' });
  }
});

module.exports = router;